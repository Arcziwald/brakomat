import { AppShell } from "@/components/layout/AppShell";
import { ClientItemsTable } from "@/components/clients/ClientItemsTable";
import Link from "next/link";
import { ChevronLeft, Mail, Phone, Plus } from "lucide-react";

// Mock data for client detail
const clientData = {
  "1": {
    id: "1",
    name: "Firma ABC Sp. z o.o.",
    email: "ksiegowosc@firma-abc.pl",
    phone: "+48 600 100 200",
    period: "Marzec 2025",
    items: [
      { id: 1, title: "Faktury kosztowe", dueDate: "2025-03-15", status: "overdue" as const, note: "" },
      { id: 2, title: "Wyciąg bankowy", dueDate: "2025-03-20", status: "received" as const, note: "Dostaliśmy 15.03" },
      { id: 3, title: "Umowa zlecenie", dueDate: "2025-03-10", status: "overdue" as const, note: "" },
      { id: 4, title: "JPK_V7", dueDate: "2025-03-25", status: "review" as const, note: "Do sprawdzenia przez Annę" },
      { id: 5, title: "PIT-11", dueDate: "2025-03-31", status: "missing" as const, note: "" },
    ],
  },
};

const defaultClient = {
  id: "0",
  name: "Nieznany klient",
  email: "—",
  phone: "—",
  period: "—",
  items: [],
};

export default function ClientDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const client =
    clientData[params.id as keyof typeof clientData] ?? defaultClient;

  const missingCount = client.items.filter(
    (i) => i.status === "missing" || i.status === "overdue"
  ).length;

  return (
    <AppShell title={client.name}>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Breadcrumb */}
        <Link
          href="/clients"
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Wszyscy klienci
        </Link>

        {/* Client header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{client.name}</h2>
              <div className="flex flex-wrap gap-5 mt-3">
                <a
                  href={`mailto:${client.email}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  {client.email}
                </a>
                <a
                  href={`tel:${client.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-gray-400">Okres</div>
                <div className="text-sm font-semibold text-gray-700">
                  {client.period}
                </div>
              </div>
              <div className="text-right pl-4 border-l border-gray-200">
                <div className="text-xs text-gray-400">Braki</div>
                <div className="text-sm font-bold text-amber-600">
                  {missingCount}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">
              Pozycje ({client.items.length})
            </h3>
            <button className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              Dodaj pozycję
            </button>
          </div>
          <ClientItemsTable clientName={client.name} items={client.items} />
        </div>
      </div>
    </AppShell>
  );
}
