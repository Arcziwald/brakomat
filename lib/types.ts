export type ItemStatus = "missing" | "received" | "review" | "overdue";

export interface Client {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  status: string;
  created_at: string;
  items?: Item[];
}

export interface Template {
  id: string;
  user_id: string;
  name: string;
  category: string | null;
  default_due_days: number;
  created_at: string;
}

export interface Item {
  id: string;
  user_id: string;
  client_id: string;
  template_id: string | null;
  title: string;
  period_label: string | null;
  due_date: string | null;
  status: ItemStatus;
  note: string | null;
  last_reminder_at: string | null;
  created_at: string;
}
