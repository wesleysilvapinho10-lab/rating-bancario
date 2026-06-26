# Rating Bancário

Aplicação Next.js (App Router) + TypeScript + Tailwind CSS para captura de
leads ("Descubra seu Rating Bancário") seguida de uma landing page de alta
conversão sobre rating bancário.

## Fluxo

1. **Tela inicial** (`LeadForm`): formulário com Nome, E-mail, Telefone e
   Área de Atuação.
2. Ao enviar, os dados são salvos via `POST /api/leads` na tabela `leads` do
   Supabase.
3. Em caso de sucesso, a aplicação troca de tela (sem reload) para a
   **Landing Page de Rating Bancário** (`RatingLandingPage`), com gráfico de
   score fictício, explicações de como melhorar o rating, benefícios,
   depoimentos e CTA para WhatsApp.

## Estrutura de pastas

```
rating-bancario/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx              # alterna entre LeadForm e RatingLandingPage
│  │  ├─ layout.tsx
│  │  ├─ globals.css
│  │  └─ api/leads/route.ts    # insere o lead no Supabase
│  ├─ components/
│  │  ├─ LeadForm.tsx
│  │  ├─ RatingLandingPage.tsx
│  │  ├─ ScoreChart.tsx
│  │  ├─ Testimonials.tsx
│  │  └─ WhatsAppCTA.tsx
│  ├─ lib/
│  │  └─ supabase.ts           # clients Supabase (anon + service role)
│  └─ types/
│     └─ lead.ts
├─ supabase/
│  └─ schema.sql                # SQL para criar a tabela "leads"
├─ .env.example
└─ package.json
```

## Configurando o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, rode o conteúdo de `supabase/schema.sql` para criar a
   tabela `leads` (colunas: `id`, `nome`, `email`, `telefone`,
   `area_atuacao`, `created_at`).
3. Em **Project Settings → API**, copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public key` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role key` → `SUPABASE_SERVICE_ROLE_KEY`
4. Duplique `.env.example` como `.env.local` e preencha os valores.

A inserção do lead acontece na API route `src/app/api/leads/route.ts`,
usando o client `supabaseAdmin` (service role), para não expor a chave de
serviço no browser.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Deploy na Vercel

1. Suba o repositório para o GitHub/GitLab/Bitbucket.
2. Importe o projeto na [Vercel](https://vercel.com/new).
3. Em **Environment Variables**, adicione as mesmas variáveis do
   `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (número do especialista, formato
     internacional, ex: `5511999999999`)
4. Deploy. A Vercel detecta automaticamente o framework Next.js.

## Observações

- Os gráficos de score na landing page são **fictícios**, apenas
  ilustrativos.
- O número de WhatsApp do CTA é lido de `NEXT_PUBLIC_WHATSAPP_NUMBER`;
  configure-o antes de publicar.
- A política RLS padrão da tabela `leads` permite apenas inserts via
  `service_role` (usada no servidor). Ajuste em `supabase/schema.sql` se
  quiser permitir inserts diretos do client.
