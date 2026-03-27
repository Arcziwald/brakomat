import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  accent?: "default" | "amber" | "red" | "blue";
}

const accentClasses = {
  default: "bg-navy-50 text-navy-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
  blue: "bg-blue-50 text-blue-600",
};

const valueClasses = {
  default: "text-navy-900",
  amber: "text-amber-700",
  red: "text-red-700",
  blue: "text-blue-700",
};

export function StatCard({
  label,
  value,
  icon: Icon,
  accent = "default",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-5">
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          accentClasses[accent]
        )}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className={cn("text-3xl font-bold", valueClasses[accent])}>
          {value}
        </div>
        <div className="text-sm text-gray-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}
