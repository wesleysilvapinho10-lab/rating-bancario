"use client";

import type { Lead } from "@/types/lead";
import ScoreChart from "./ScoreChart";
import Testimonials from "./Testimonials";
import WhatsAppCTA from "./WhatsAppCTA";

interface RatingLandingPageProps {
  lead: Lead;
}

const PASSOS_MELHORIA = [
  {
    titulo: "Mantenha contas em dia",
    descricao:
      "Pagar contas, boletos e financiamentos na data certa é o fator que mais pesa na composição do seu rating.",
  },
  {
    titulo: "Reduza o uso do limite",
    descricao:
      "Usar uma fatia menor do limite disponível em cartões e contas demonstra equilíbrio financeiro para os bancos.",
  },
  {
    titulo: "Negative? Regularize",
    descricao:
      "Quitar ou renegociar pendências em aberto remove um dos maiores bloqueios para acesso a crédito.",
  },
  {
    titulo: "Diversifique seu relacionamento bancário",
    descricao:
      "Ter histórico positivo em mais de uma instituição fortalece sua reputação de crédito no mercado.",
  },
];

const BENEFICIOS = [
  {
    titulo: "Juros mais baixos",
    descricao: "Empresas e profissionais com rating alto acessam taxas significativamente menores em empréstimos e financiamentos.",
    icone: "📉",
  },
  {
    titulo: "Limites maiores",
    descricao: "Bancos liberam limites de crédito e capital de giro mais altos para quem tem bom histórico.",
    icone: "💳",
  },
  {
    titulo: "Aprovação mais rápida",
    descricao: "Propostas de crédito com rating elevado passam por análises mais rápidas e burocracia reduzida.",
    icone: "⚡",
  },
  {
    titulo: "Mais credibilidade",
    descricao: "Fornecedores, parceiros e investidores avaliam positivamente empresas com rating bancário sólido.",
    icone: "🤝",
  },
];

export default function RatingLandingPage({ lead }: RatingLandingPageProps) {
  const primeiroNome = lead.nome?.split(" ")[0] || "";

  return (
    <main className="bg-slate-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-4 py-16 text-white sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-100">
              Análise concluída
            </span>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {primeiroNome ? `${primeiroNome}, este é o seu` : "Este é o seu"}{" "}
              <span className="text-brand-200">Rating Bancário</span>
            </h1>
            <p className="mt-4 max-w-lg text-brand-100/90">
              Com base nos dados informados, geramos uma estimativa do seu
              perfil de crédito. Veja abaixo como melhorar sua pontuação e
              conquistar melhores condições com os bancos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <WhatsAppCTA nome={lead.nome} />
              <a
                href="#como-melhorar"
                className="inline-flex items-center justify-center rounded-lg border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Como melhorar meu rating
              </a>
            </div>
          </div>

          <div className="animate-fade-in rounded-2xl bg-white/95 p-6 shadow-card sm:p-8">
            <ScoreChart score={742} />
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              O que é o Rating Bancário?
            </h2>
            <p className="mt-3 text-slate-500">
              É a nota que bancos e instituições financeiras atribuem ao seu
              perfil para decidir condições de crédito: taxa de juros, limite
              aprovado e velocidade de liberação.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { label: "Histórico de pagamentos", valor: "35%" },
              { label: "Uso de crédito disponível", valor: "30%" },
              { label: "Relacionamento bancário", valor: "20%" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center"
              >
                <p className="text-3xl font-extrabold text-brand-700">{item.valor}</p>
                <p className="mt-2 text-sm text-slate-600">{item.label}</p>
                <div className="mt-4 h-2 w-full origin-left rounded-full bg-brand-100">
                  <div
                    className="h-2 origin-left animate-grow-bar rounded-full bg-brand-600"
                    style={{ width: item.valor }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO MELHORAR */}
      <section id="como-melhorar" className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Como melhorar seu rating
            </h2>
            <p className="mt-3 text-slate-500">
              Ações simples que, aplicadas com consistência, elevam sua
              pontuação ao longo dos meses.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PASSOS_MELHORIA.map((passo, i) => (
              <div
                key={passo.titulo}
                className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{passo.titulo}</h3>
                  <p className="mt-1 text-sm text-slate-500">{passo.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFICIOS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Por que ter um rating alto importa
            </h2>
            <p className="mt-3 text-slate-500">
              Vantagens reais para empresas e profissionais que cuidam da
              própria reputação de crédito.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFICIOS.map((b) => (
              <div
                key={b.titulo}
                className="rounded-2xl border border-slate-100 p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-3xl">{b.icone}</span>
                <h3 className="mt-3 font-semibold text-slate-800">{b.titulo}</h3>
                <p className="mt-2 text-sm text-slate-500">{b.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* CTA FINAL */}
      <section className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Pronto para melhorar seu Rating Bancário?
          </h2>
          <p className="mt-3 text-brand-100/90">
            Fale agora com um de nossos especialistas e receba um plano de
            ação personalizado para o seu perfil ou empresa.
          </p>
          <div className="mt-8 flex justify-center">
            <WhatsAppCTA nome={lead.nome} />
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Rating Bancário. Todos os dados de score
        exibidos são fictícios e usados apenas para fins ilustrativos.
      </footer>
    </main>
  );
}
