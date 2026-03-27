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
