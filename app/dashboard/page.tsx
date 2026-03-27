import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { createClient } from "@/lib/supabase/server";
import { Users, FileWarning, Clock, Search, Plus } from "lucide-react";
import Link from "next/link";

export default async function DashboardPage() {
  const supabase = createClient();

  const [{ count: clientCount }, { data: items }] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("items").select("status, due_date"),
  ]);

  const allItems = items ?? [];
  const now = new Date().toISOString().slice(0, 10);

  const missingCount = allItems.filter(
    (i) => i.status === "missing" || i.status === "overdue"
  ).length;
  const overdueCount = allItems.filter(
    (i) => (i.status === "missing" || i.status === "overdue") && i.due_date && i.due_date < now
  ).length;
  const reviewCount = allItems.filter((i) => i.status === "review").length;

  // Recent missing items for the list
  const { data: recentItems } = await supabase
    .from("items")
    .select("id, title, status, due_date, clients(id, name)")
    .in("status", ["missing", "overdue"])
    .order("due_date", { ascending: true })
    .limit(5);

  return (
    <AppShell title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Klienci" value={clientCount ?? 0} icon={Users} />
          <StatCard label="Braki dokumentow" value={missingCount} icon={FileWarning} accent="amber" />
          <StatCard label="Po terminie" value={overdueCount} icon={Clock} accent="red" />
          <StatCard label="Do sprawdzenia" value={reviewCount} icon={Search} accent="blue" />
        </div>

        <div className="flex gap-3">
          <Link href="/clients" className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Dodaj klienta
          </Link>
        </div>

        {/* Najpilniejsze braki */}
        <div className="bg-white rounded-2xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Najpilniejsze braki</h2>
            <Link href="/clients" className="text-sm text-accent hover:text-accent-600 font-medium transition-colors">
              Zobacz wszystkich
            </Link>
          </div>
          {!recentItems || recentItems.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-400 text-sm">
              Brak pilnych dokumentow. Swietnie!
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {recentItems.map((item: any) => (
                <div key={item.id} className="px-6 py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{item.clients?.name ?? "—"}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    {item.due_date && (
                      <span className="text-xs text-gray-400">
                        {new Date(item.due_date).toLocaleDateString("pl-PL")}
                      </span>
                    )}
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      item.status === "overdue" ? "status-overdue" : "status-missing"
                    }`}>
                      {item.status === "overdue" ? "Po terminie" : "Brakuje"}
                    </span>
                    <Link href={`/clients/${item.clients?.id}`} className="text-xs text-accent hover:text-accent-600 font-medium transition-colors">
                      Otworz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
