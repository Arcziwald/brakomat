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

export interface EmailLog {
  id: string;
  user_id: string | null;
  client_id: string | null;
  from_email: string;
  subject: string | null;
  received_at: string;
  matched: boolean;
}

export interface Attachment {
  id: string;
  user_id: string;
  client_id: string;
  email_log_id: string | null;
  item_id: string | null;
  filename: string;
  file_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  created_at: string;
}
