import { AppShell } from "@/components/layout/AppShell";
import { Plus, Pencil, Trash2 } from "lucide-react";

const templates = [
  { id: 1, name: "Faktury kosztowe", category: "Faktury", defaultDueDays: 10 },
  { id: 2, name: "Faktury sprzedażowe", category: "Faktury", defaultDueDays: 10 },
  { id: 3, name: "Wyciąg bankowy", category: "Wyciągi", defaultDueDays: 15 },
  { id: 4, name: "Umowa zlecenie", category: "Umowy", defaultDueDays: 20 },
  { id: 5, name: "JPK_V7", category: "Deklaracje", defaultDueDays: 25 },
  { id: 6, name: "PIT-11", category: "Deklaracje", defaultDueDays: 30 },
  { id: 7, name: "Akceptacja bilansu", category: "Akceptacje", defaultDueDays: 20 },
];

const categoryColors: Record<string, string> = {
  Faktury: "bg-blue-100 text-blue-700",
  Wyciągi: "bg-purple-100 text-purple-700",
  Umowy: "bg-orange-100 text-orange-700",
  Deklaracje: "bg-green-100 text-green-700",
  Akceptacje: "bg-pink-100 text-pink-700",
};

export default function TemplatesPage() {
  return (
    <AppShell title="Szablony">
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Szablony to typy dokumentów, które możesz szybko dodawać do klientów.
          </p>
          <button className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Nowy szablon
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Nazwa
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Kategoria
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Domyślny termin
                </th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {templates.map((tpl) => (
                <tr key={tpl.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {tpl.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        categoryColors[tpl.category] ?? "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tpl.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {tpl.defaultDueDays} dni
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-accent transition-colors p-1">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
