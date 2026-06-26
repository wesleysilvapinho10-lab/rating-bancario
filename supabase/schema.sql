-- Tabela de leads gerados pelo formulário "Descubra seu Rating Bancário"
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text not null,
  area_atuacao text not null,
  created_at timestamp with time zone default now()
);

-- Habilita Row Level Security
alter table public.leads enable row level security;

-- Permite que a service role (usada nas API routes do servidor) insira leads.
-- Como os inserts acontecem via API route com a service role key, não é
-- necessário liberar insert para o público (anon) por padrão.
create policy "Service role pode inserir leads"
  on public.leads
  for insert
  to service_role
  with check (true);

-- (Opcional) Caso queira permitir inserts diretos do client com a anon key,
-- descomente a policy abaixo e ajuste a lógica da API route.
-- create policy "Anon pode inserir leads"
--   on public.leads
--   for insert
--   to anon
--   with check (true);
