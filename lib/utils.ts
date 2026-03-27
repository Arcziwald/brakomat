import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ItemStatus = "missing" | "received" | "review" | "overdue";

export const STATUS_LABELS: Record<ItemStatus, string> = {
  missing: "Brakuje",
  received: "Otrzymano",
  review: "Do sprawdzenia",
  overdue: "Po terminie",
};

export const STATUS_CLASSES: Record<ItemStatus, string> = {
  missing: "status-missing",
  received: "status-received",
  review: "status-review",
  overdue: "status-overdue",
};

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("pl-PL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
