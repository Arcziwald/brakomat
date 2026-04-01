-- Brakomat — schemat bazy danych
-- Uruchom w Supabase Dashboard → SQL Editor

create table clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  email text,
  phone text,
  status text default 'missing',
  created_at timestamptz default now()
);

create table templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  category text,
  default_due_days int default 14,
  created_at timestamptz default now()
);

create table items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  client_id uuid references clients(id) on delete cascade not null,
  template_id uuid references templates(id) on delete set null,
  title text not null,
  period_label text,
  due_date date,
  status text default 'missing',
  note text,
  last_reminder_at timestamptz,
  created_at timestamptz default now()
);

-- Row Level Security (kazdy widzi tylko swoje dane)
alter table clients enable row level security;
alter table templates enable row level security;
alter table items enable row level security;

create policy "wlasne klienty" on clients
  for all using (auth.uid() = user_id);

create policy "wlasne szablony" on templates
  for all using (auth.uid() = user_id);

create policy "wlasne pozycje" on items
  for all using (auth.uid() = user_id);

-- ============================================================
-- Sprint 3: Email Inbound Pipeline
-- Uruchom w Supabase SQL Editor po Sprint 1+2
-- ============================================================

create table email_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  client_id uuid references clients(id) on delete set null,
  from_email text not null,
  subject text,
  received_at timestamptz default now(),
  matched bool default false
);

create table attachments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  client_id uuid references clients(id) on delete cascade not null,
  email_log_id uuid references email_logs(id) on delete cascade,
  item_id uuid references items(id) on delete set null,
  filename text not null,
  file_path text not null,
  mime_type text,
  size_bytes int,
  created_at timestamptz default now()
);

alter table email_logs enable row level security;
alter table attachments enable row level security;

create policy "wlasne email_logs" on email_logs
  for all using (auth.uid() = user_id);

create policy "wlasne zalaczniki" on attachments
  for all using (auth.uid() = user_id);
