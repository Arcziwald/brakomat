"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn, STATUS_LABELS, STATUS_CLASSES, formatDate } from "@/lib/utils";
import type { Item, ItemStatus } from "@/lib/types";
import { Copy, Check, MessageSquare, X, Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const ALL_STATUSES: ItemStatus[] = ["missing", "received", "review", "overdue"];

function buildReminder(variant: "polite" | "short" | "formal", missing: string[]): string {
  const list = missing.map((m) => `- ${m}`).join("\n");
  if (variant === "polite")
    return `Czesc,\n\nchcialem/am przypomniec o brakujacych dokumentach za biezacy okres:\n${list}\n\nGdy je dostaniemy, bedziemy mogli zamknac temat terminowo. Dziekuje z gory!\n\nPozdrawiam`;
  if (variant === "short")
    return `Czesc, przypominam o: ${missing.join(", ")}. Prosze o doslanie gdy mozliwe.`;
  return `Szanowni Panstwo,\n\nW zwiazku z koniecznoscia terminowego zamkniecia okresu rozliczeniowego, uprzejmie prosimy o dostarczenie nastepujacych dokumentow:\n${list}\n\nZ powazaniem,\nBiuro Rachunkowe`;
}

function ReminderModal({ clientName, missingItems, onClose }: { clientName: string; missingItems: string[]; onClose: () => void }) {
  const [active, setActive] = useState<"polite" | "short" | "formal">("polite");
  const [copied, setCopied] = useState(false);
  const text = buildReminder(active, missingItems);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Generator przypomnienia</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex gap-2 px-6 pt-4">
          {(["polite", "short", "formal"] as const).map((v) => {
            const labels = { polite: "Uprzejmy", short: "Krotki", formal: "Formalny" };
            return (
              <button key={v} onClick={() => setActive(v)}
                className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  active === v ? "bg-navy-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >{labels[v]}</button>
            );
          })}
        </div>
        <div className="px-6 py-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 rounded-xl p-4 border border-gray-200 font-sans leading-relaxed min-h-[160px]">
            {text}
          </pre>
        </div>
        <div className="px-6 pb-5">
          <button onClick={handleCopy}
            className="flex items-center gap-2 w-full justify-center bg-accent hover:bg-accent-500 text-navy-900 font-bold py-3 rounded-xl transition-colors"
          >
            {copied ? <><Check className="w-4 h-4" /> Skopiowano!</> : <><Copy className="w-4 h-4" /> Kopiuj do schowka</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function AddItemModal({ clientId, onClose }: { clientId: string; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("items").insert({
      user_id: user.id,
      client_id: clientId,
      title,
      due_date: dueDate || null,
      status: "missing",
    });
    onClose();
    router.refresh();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Nowa pozycja</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa dokumentu *</label>
            <input required value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="np. Faktury kosztowe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Termin</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
            >Anuluj</button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-semibold"
            >{loading ? "Zapisuje..." : "Dodaj"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function ClientItemsTable({ clientId, clientName, items: initialItems }: { clientId: string; clientName: string; items: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [showReminder, setShowReminder] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const supabase = createClient();

  const missingItems = items.filter((i) => i.status === "missing" || i.status === "overdue").map((i) => i.title);

  async function updateStatus(id: string, status: ItemStatus) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    await supabase.from("items").update({ status }).eq("id", id);
  }

  return (
    <>
      {showReminder && <ReminderModal clientName={clientName} missingItems={missingItems} onClose={() => setShowReminder(false)} />}
      {showAddItem && <AddItemModal clientId={clientId} onClose={() => setShowAddItem(false)} />}

      <div className="flex justify-between mb-4">
        <button onClick={() => setShowAddItem(true)}
          className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" /> Dodaj pozycje
        </button>
        <button onClick={() => setShowReminder(true)} disabled={missingItems.length === 0}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" /> Przypomnienie ({missingItems.length})
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center text-gray-400">
          Brak pozycji. Dodaj pierwsza pozycje powyzej.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pozycja</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Termin</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Notatka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                  <td className="px-6 py-4 text-gray-500">{item.due_date ? formatDate(item.due_date) : "—"}</td>
                  <td className="px-6 py-4">
                    <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value as ItemStatus)}
                      className={cn("text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer", STATUS_CLASSES[item.status])}
                    >
                      {ALL_STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">{item.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
