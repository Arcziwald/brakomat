import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentItems } from "@/components/dashboard/RecentItems";
import { Users, FileWarning, Clock, Search, Plus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Klienci" value={12} icon={Users} />
          <StatCard
            label="Braki dokumentów"
            value={34}
            icon={FileWarning}
            accent="amber"
          />
          <StatCard
            label="Po terminie"
            value={7}
            icon={Clock}
            accent="red"
          />
          <StatCard
            label="Do sprawdzenia"
            value={5}
            icon={Search}
            accent="blue"
          />
        </div>

        {/* Quick actions */}
        <div className="flex gap-3">
          <Link
            href="/clients"
            className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Dodaj klienta
          </Link>
          <Link
            href="/clients"
            className="flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Dodaj brak
          </Link>
        </div>

        {/* Recent items */}
        <RecentItems />
      </div>
    </AppShell>
  );
}
