import Link from "next/link";
import { cn, STATUS_LABELS, STATUS_CLASSES } from "@/lib/utils";
import type { ItemStatus } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface Client {
  id: string;
  name: string;
  period: string;
  missingCount: number;
  status: ItemStatus;
}

const clients: Client[] = [
  {
    id: "1",
    name: "Firma ABC Sp. z o.o.",
    period: "Marzec 2025",
    missingCount: 3,
    status: "overdue",
  },
  {
    id: "2",
    name: "Jan Nowak — JDG",
    period: "Marzec 2025",
    missingCount: 1,
    status: "missing",
  },
  {
    id: "3",
    name: "Studio Kreatywne XYZ",
    period: "Marzec 2025",
    missingCount: 2,
    status: "overdue",
  },
  {
    id: "4",
    name: "Tech Solutions Sp. k.",
    period: "Marzec 2025",
    missingCount: 1,
    status: "review",
  },
  {
    id: "5",
    name: "Restauracja Pod Lipami",
    period: "Marzec 2025",
    missingCount: 0,
    status: "received",
  },
];

export function ClientsTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Klient
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Okres
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Braki
            </th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {clients.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">
                {client.name}
              </td>
              <td className="px-6 py-4 text-gray-500">{client.period}</td>
              <td className="px-6 py-4">
                {client.missingCount > 0 ? (
                  <span className="inline-flex items-center gap-1 text-amber-700 font-semibold">
                    {client.missingCount}
                  </span>
                ) : (
                  <span className="text-gray-400">—</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span
                  className={cn(
                    "text-xs font-medium px-2.5 py-1 rounded-full",
                    STATUS_CLASSES[client.status]
                  )}
                >
                  {STATUS_LABELS[client.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/clients/${client.id}`}
                  className="inline-flex items-center gap-1 text-accent hover:text-accent-600 font-medium transition-colors"
                >
                  Otwórz
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
