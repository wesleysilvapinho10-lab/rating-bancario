const DEPOIMENTOS = [
  {
    nome: "Marcos Vieira",
    cargo: "Dono de comércio varejista",
    texto:
      "Depois de entender meu rating bancário, consegui renegociar a taxa de juros do capital de giro da minha loja. Economizei milhares de reais por ano.",
    estrelas: 5,
  },
  {
    nome: "Patrícia Andrade",
    cargo: "Advogada autônoma",
    texto:
      "Eu não sabia que minha pontuação influenciava tanto na liberação de crédito. Em poucos meses aplicando as orientações, meu limite quase dobrou.",
    estrelas: 5,
  },
  {
    nome: "Felipe Rocha",
    cargo: "Sócio de empresa de serviços",
    texto:
      "O acompanhamento com o especialista foi decisivo para aprovarmos uma linha de crédito para expansão do negócio com taxa muito melhor.",
    estrelas: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M9.05 2.93a1 1 0 0 1 1.9 0l1.27 3.9a1 1 0 0 0 .95.69h4.1a1 1 0 0 1 .59 1.81l-3.32 2.41a1 1 0 0 0-.36 1.12l1.27 3.9a1 1 0 0 1-1.54 1.12l-3.32-2.41a1 1 0 0 0-1.18 0l-3.32 2.41a1 1 0 0 1-1.54-1.12l1.27-3.9a1 1 0 0 0-.36-1.12L2.14 9.33a1 1 0 0 1 .59-1.81h4.1a1 1 0 0 0 .95-.69l1.27-3.9Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Quem já melhorou o rating, comprova
          </h2>
          <p className="mt-3 text-slate-500">
            Profissionais e empresários que aplicaram as orientações da nossa
            análise de rating bancário.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {DEPOIMENTOS.map((d) => (
            <div
              key={d.nome}
              className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm"
            >
              <Stars count={d.estrelas} />
              <p className="text-sm leading-relaxed text-slate-600">“{d.texto}”</p>
              <div className="mt-auto flex items-center gap-3 pt-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
                  {d.nome.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{d.nome}</p>
                  <p className="text-xs text-slate-400">{d.cargo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
