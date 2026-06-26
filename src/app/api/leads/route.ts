import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import type { LeadInput } from "@/types/lead";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: Partial<LeadInput>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido." },
      { status: 400 }
    );
  }

  const nome = body.nome?.trim();
  const email = body.email?.trim();
  const telefone = body.telefone?.trim();
  const areaAtuacao = body.area_atuacao?.trim();

  if (!nome || !email || !telefone || !areaAtuacao) {
    return NextResponse.json(
      { error: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Informe um e-mail válido." },
      { status: 400 }
    );
  }

  // PLACEHOLDER SUPABASE: insere o lead na tabela "leads".
  // Veja /supabase/schema.sql para criar a tabela e src/lib/supabase.ts
  // para configurar as variáveis de ambiente.
  const { data, error } = await supabaseAdmin
    .from("leads")
    .insert([
      {
        nome,
        email,
        telefone,
        area_atuacao: areaAtuacao,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar lead no Supabase:", error.message);
    return NextResponse.json(
      {
        error:
          "Não foi possível salvar seus dados agora. Verifique a configuração do Supabase.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ lead: data }, { status: 201 });
}
