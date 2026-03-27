import Link from "next/link";
import { cn, STATUS_LABELS, STATUS_CLASSES, formatDate } from "@/lib/utils";
import type { ItemStatus } from "@/lib/utils";

const recentItems = [
  {
    id: 1,
    clientId: "1",
    clientName: "Firma ABC Sp. z o.o.",
    title: "Faktury kosztowe",
    dueDate: "2025-03-15",
    status: "overdue" as ItemStatus,
  },
  {
    id: 2,
    clientId: "2",
    clientName: "Jan Nowak — JDG",
    title: "Wyciąg bankowy",
    dueDate: "2025-03-20",
    status: "missing" as ItemStatus,
  },
  {
    id: 3,
    clientId: "3",
    clientName: "Studio Kreatywne XYZ",
    title: "Umowa zlecenie",
    dueDate: "2025-03-18",
    status: "overdue" as ItemStatus,
  },
  {
    id: 4,
    clientId: "4",
    clientName: "Tech Solutions Sp. k.",
    title: "JPK_V7",
    dueDate: "2025-03-25",
    status: "review" as ItemStatus,
  },
  {
    id: 5,
    clientId: "1",
    clientName: "Firma ABC Sp. z o.o.",
    title: "PIT-11",
    dueDate: "2025-03-31",
    status: "missing" as ItemStatus,
  },
];

export function RecentItems() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Najpilniejsze braki</h2>
        <Link
          href="/clients"
          className="text-sm text-accent hover:text-accent-600 font-medium transition-colors"
        >
          Zobacz wszystkich
        </Link>
      </div>
      <div className="divide-y divide-gray-50">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="px-6 py-4 flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{item.clientName}</p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-gray-400">
                {formatDate(item.dueDate)}
              </span>
              <span
                className={cn(
                  "text-xs font-medium px-2.5 py-1 rounded-full",
                  STATUS_CLASSES[item.status]
                )}
              >
                {STATUS_LABELS[item.status]}
              </span>
              <Link
                href={`/clients/${item.clientId}`}
                className="text-xs text-accent hover:text-accent-600 font-medium transition-colors"
              >
                Otwórz
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
