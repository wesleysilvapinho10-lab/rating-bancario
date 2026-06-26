"use client";

interface ScoreChartProps {
  score?: number;
}

const FAIXAS = [
  { label: "Baixo", min: 0, max: 300, color: "#ef4444" },
  { label: "Regular", min: 300, max: 600, color: "#f59e0b" },
  { label: "Bom", min: 600, max: 800, color: "#22c55e" },
  { label: "Excelente", min: 800, max: 1000, color: "#0c5fe0" },
];

export default function ScoreChart({ score = 742 }: ScoreChartProps) {
  const pct = Math.min(100, Math.max(0, (score / 1000) * 100));
  // semicircle gauge: angle from -90deg to 90deg mapped to 0-100%
  const angle = -90 + (pct / 100) * 180;
  const radius = 80;
  const cx = 100;
  const cy = 100;
  const needleX = cx + radius * Math.cos((angle * Math.PI) / 180);
  const needleY = cy + radius * Math.sin((angle * Math.PI) / 180);

  const faixaAtual =
    FAIXAS.find((f) => score >= f.min && score < f.max) ?? FAIXAS[FAIXAS.length - 1];

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 120" className="w-64 sm:w-80">
        {/* fundo do gauge dividido em faixas */}
        <path
          d="M 20 100 A 80 80 0 0 1 60 27"
          fill="none"
          stroke="#ef4444"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 60 27 A 80 80 0 0 1 100 20"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 100 20 A 80 80 0 0 1 150 33"
          fill="none"
          stroke="#22c55e"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 150 33 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="#0c5fe0"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* ponteiro */}
        <line
          x1={cx}
          y1={cy}
          x2={needleX}
          y2={needleY}
          stroke="#0f346f"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx={cx} cy={cy} r="5" fill="#0f346f" />
      </svg>

      <div className="-mt-6 text-center">
        <p className="text-4xl font-extrabold text-brand-900">{score}</p>
        <p className="text-sm font-semibold" style={{ color: faixaAtual.color }}>
          Rating {faixaAtual.label}
        </p>
        <p className="mt-1 text-xs text-slate-400">Pontuação fictícia para fins ilustrativos</p>
      </div>

      <div className="mt-4 grid w-full max-w-xs grid-cols-2 gap-3 text-center sm:grid-cols-4">
        {FAIXAS.map((f) => (
          <div key={f.label} className="rounded-lg bg-white/60 px-2 py-1.5 shadow-sm">
            <span
              className="block h-1.5 w-full rounded-full"
              style={{ backgroundColor: f.color }}
            />
            <span className="mt-1 block text-[11px] font-medium text-slate-600">
              {f.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
