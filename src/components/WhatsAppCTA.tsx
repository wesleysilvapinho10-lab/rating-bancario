"use client";

interface WhatsAppCTAProps {
  nome?: string;
  label?: string;
  className?: string;
}

export default function WhatsAppCTA({ nome, label, className }: WhatsAppCTAProps) {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511999999999";
  const mensagem = encodeURIComponent(
    `Olá! Meu nome é ${nome ?? "[seu nome]"} e acabei de fazer minha análise de Rating Bancário. Quero falar com um especialista para melhorar meu score.`
  );
  const href = `https://wa.me/${phone}?text=${mensagem}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        "inline-flex items-center justify-center gap-2 rounded-lg bg-success-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-success-500/30 transition hover:bg-success-600"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-5 w-5"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.45 5.15L2 22l5.13-1.55a9.86 9.86 0 0 0 4.91 1.32h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.84 14.07c-.25.7-1.45 1.34-2 1.42-.51.08-1.16.11-1.87-.12-.43-.13-.98-.32-1.69-.62-2.97-1.28-4.9-4.27-5.05-4.47-.15-.2-1.2-1.6-1.2-3.05 0-1.45.76-2.16 1.03-2.46.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.84 2.07.92 2.22.08.15.13.33.03.53-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.18.3.8 1.32 1.72 2.13 1.18 1.05 2.18 1.38 2.49 1.53.31.15.49.13.67-.05.18-.18.78-.9.99-1.21.2-.31.41-.26.68-.16.28.1 1.76.83 2.06.98.3.15.5.23.57.36.08.13.08.74-.17 1.43z" />
      </svg>
      {label ?? "Falar com um especialista no WhatsApp"}
    </a>
  );
}
