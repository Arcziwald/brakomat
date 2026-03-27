"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Faktury", "Wyciagi", "Umowy", "Deklaracje", "Akceptacje"];

export function AddTemplateForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [days, setDays] = useState("14");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("templates").insert({
      user_id: user.id,
      name,
      category: category || null,
      default_due_days: parseInt(days) || 14,
    });

    setName(""); setCategory(""); setDays("14");
    setOpen(false);
    setLoading(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" /> Nowy szablon
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Nowy szablon</h3>
          <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa *</label>
            <input required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="np. Faktury kosztowe"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            >
              <option value="">Bez kategorii</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Domyslny termin (dni)</label>
            <input type="number" min="1" max="90" value={days} onChange={(e) => setDays(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setOpen(false)}
              className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50"
            >Anuluj</button>
            <button type="submit" disabled={loading}
              className="flex-1 bg-navy-900 hover:bg-navy-800 disabled:opacity-60 text-white py-2.5 rounded-lg text-sm font-semibold"
            >{loading ? "Zapisuje..." : "Dodaj szablon"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
