import Link from "next/link";
import { cn, STATUS_LABELS, STATUS_CLASSES } from "@/lib/utils";
import type { Client, ItemStatus } from "@/lib/types";
import { ChevronRight } from "lucide-react";

interface ClientRow {
  id: string;
  name: string;
  period: string;
  missingCount: number;
  status: ItemStatus;
}

function deriveStatus(missingCount: number, items: { status: string; due_date: string | null }[] = []): ItemStatus {
  const now = new Date().toISOString().slice(0, 10);
  const hasOverdue = items.some(
    (i) => (i.status === "missing" || i.status === "overdue") && i.due_date && i.due_date < now
  );
  if (hasOverdue) return "overdue";
  if (missingCount > 0) return "missing";
  const hasReview = items.some((i) => i.status === "review");
  if (hasReview) return "review";
  return "received";
}

interface ClientsTableProps {
  clients: (Client & { items?: { status: string; due_date: string | null }[] })[];
}

export function ClientsTable({ clients }: ClientsTableProps) {
  const rows: ClientRow[] = clients.map((c) => {
    const missing = (c.items ?? []).filter(
      (i) => i.status === "missing" || i.status === "overdue"
    ).length;
    return {
      id: c.id,
      name: c.name,
      period: new Date(c.created_at).toLocaleDateString("pl-PL", { month: "long", year: "numeric" }),
      missingCount: missing,
      status: deriveStatus(missing, c.items),
    };
  });

  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-400">
        Brak klientow. Dodaj pierwszego klienta powyzej.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50">
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Klient</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Braki</th>
            <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((client) => (
            <tr key={client.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{client.name}</td>
              <td className="px-6 py-4">
                {client.missingCount > 0 ? (
                  <span className="text-amber-700 font-semibold">{client.missingCount}</span>
                ) : (
                  <span className="text-gray-400">0</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full", STATUS_CLASSES[client.status])}>
                  {STATUS_LABELS[client.status]}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  href={`/clients/${client.id}`}
                  className="inline-flex items-center gap-1 text-accent hover:text-accent-600 font-medium transition-colors"
                >
                  Otworz <ChevronRight className="w-4 h-4" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
