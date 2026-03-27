import { AppShell } from "@/components/layout/AppShell";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Plus, Search } from "lucide-react";

export default function ClientsPage() {
  return (
    <AppShell title="Klienci">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj klienta…"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition"
            />
          </div>
          <button className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" />
            Dodaj klienta
          </button>
        </div>

        <ClientsTable />
      </div>
    </AppShell>
  );
}
