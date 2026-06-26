import { createClient } from "@supabase/supabase-js";

/**
 * PLACEHOLDER DE INTEGRAÇÃO COM SUPABASE
 * ----------------------------------------------------------------
 * 1. Crie um projeto em https://supabase.com
 * 2. Rode o SQL em /supabase/schema.sql no SQL Editor do seu projeto
 *    para criar a tabela "leads".
 * 3. Copie .env.example para .env.local e preencha:
 *      NEXT_PUBLIC_SUPABASE_URL
 *      NEXT_PUBLIC_SUPABASE_ANON_KEY
 *      SUPABASE_SERVICE_ROLE_KEY
 * 4. Na Vercel, adicione as mesmas variáveis em
 *    Project Settings -> Environment Variables.
 * ----------------------------------------------------------------
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * Cliente para uso no browser (client components).
 * Usa a chave anônima — segura para expor publicamente.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Cliente para uso exclusivo em server (API routes / route handlers).
 * Usa a service role key — NUNCA importe este cliente em um componente
 * client ("use client") nem exponha essa chave no browser.
 */
export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey || supabaseAnonKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);
