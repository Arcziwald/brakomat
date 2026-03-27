"use client";

import { useState } from "react";
import { cn, STATUS_LABELS, STATUS_CLASSES, formatDate } from "@/lib/utils";
import type { ItemStatus } from "@/lib/utils";
import { Copy, Check, MessageSquare, X } from "lucide-react";

interface Item {
  id: number;
  title: string;
  dueDate: string;
  status: ItemStatus;
  note: string;
}

const ALL_STATUSES: ItemStatus[] = ["missing", "received", "review", "overdue"];

function buildReminder(
  variant: "polite" | "short" | "formal",
  clientName: string,
  missing: string[]
): string {
  const list = missing.map((m) => `• ${m}`).join("\n");
  if (variant === "polite") {
    return `Cześć,\n\nchciałem/am przypomnieć o brakujących dokumentach za bieżący okres:\n${list}\n\nGdy je dostaniemy, będziemy mogli zamknąć temat terminowo. Dziękuję z góry!\n\nPozdrawiam`;
  }
  if (variant === "short") {
    return `Cześć, przypominam o: ${missing.join(", ")}. Proszę o dosłanie gdy możliwe.`;
  }
  return `Szanowni Państwo,\n\nW związku z koniecznością terminowego zamknięcia okresu rozliczeniowego, uprzejmie prosimy o dostarczenie następujących dokumentów:\n${list}\n\nZ poważaniem,\nBiuro Rachunkowe`;
}

interface ReminderModalProps {
  clientName: string;
  missingItems: string[];
  onClose: () => void;
}

function ReminderModal({ clientName, missingItems, onClose }: ReminderModalProps) {
  const [active, setActive] = useState<"polite" | "short" | "formal">("polite");
  const [copied, setCopied] = useState(false);

  const text = buildReminder(active, clientName, missingItems);

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
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Variant tabs */}
        <div className="flex gap-2 px-6 pt-4">
          {(["polite", "short", "formal"] as const).map((v) => {
            const labels = { polite: "Uprzejmy", short: "Krótki", formal: "Formalny" };
            return (
              <button
                key={v}
                onClick={() => setActive(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  active === v
                    ? "bg-navy-900 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {labels[v]}
              </button>
            );
          })}
        </div>

        <div className="px-6 py-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-gray-50 rounded-xl p-4 border border-gray-200 font-sans leading-relaxed min-h-[160px]">
            {text}
          </pre>
        </div>

        <div className="px-6 pb-5">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 w-full justify-center bg-accent hover:bg-accent-500 text-navy-900 font-bold py-3 rounded-xl transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Skopiowano!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Kopiuj do schowka
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ClientItemsTableProps {
  clientName: string;
  items: Item[];
}

export function ClientItemsTable({ clientName, items: initialItems }: ClientItemsTableProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [showReminder, setShowReminder] = useState(false);

  const missingItems = items
    .filter((i) => i.status === "missing" || i.status === "overdue")
    .map((i) => i.title);

  const updateStatus = (id: number, status: ItemStatus) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <>
      {showReminder && (
        <ReminderModal
          clientName={clientName}
          missingItems={missingItems}
          onClose={() => setShowReminder(false)}
        />
      )}

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowReminder(true)}
          disabled={missingItems.length === 0}
          className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Wygeneruj przypomnienie ({missingItems.length})
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Pozycja
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Termin
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Notatka
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {item.title}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {formatDate(item.dueDate)}
                </td>
                <td className="px-6 py-4">
                  <select
                    value={item.status}
                    onChange={(e) =>
                      updateStatus(item.id, e.target.value as ItemStatus)
                    }
                    className={cn(
                      "text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer",
                      STATUS_CLASSES[item.status]
                    )}
                  >
                    {ALL_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {item.note || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
