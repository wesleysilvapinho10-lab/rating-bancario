"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import type { Lead, LeadInput } from "@/types/lead";

interface LeadFormProps {
  onSuccess: (lead: Lead) => void;
}

const AREAS_DE_ATUACAO: { value: string; label: string }[] = [
  { value: "comercio", label: "Comércio" },
  { value: "servicos", label: "Serviços" },
  { value: "industria", label: "Indústria" },
  { value: "profissional_liberal", label: "Profissional Liberal" },
  { value: "agronegocio", label: "Agronegócio" },
  { value: "outro", label: "Outro" },
];

const initialState: LeadInput = {
  nome: "",
  email: "",
  telefone: "",
  area_atuacao: "",
};

function formatTelefone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6)
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10)
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [form, setForm] = useState<LeadInput>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof LeadInput, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function validate(): boolean {
    const newErrors: Partial<Record<keyof LeadInput, string>> = {};

    if (!form.nome.trim()) newErrors.nome = "Informe seu nome completo.";
    if (!form.email.trim()) {
      newErrors.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Informe um e-mail válido.";
    }
    if (form.telefone.replace(/\D/g, "").length < 10) {
      newErrors.telefone = "Informe um telefone válido com DDD.";
    }
    if (!form.area_atuacao) newErrors.area_atuacao = "Selecione sua área de atuação.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Erro ao enviar seus dados.");
      }

      onSuccess(result.lead ?? form);
    } catch (error) {
      console.error(error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar seus dados. Tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-950 via-brand-900 to-brand-700 px-4 py-12">
      <div className="w-full max-w-md animate-fade-in rounded-2xl bg-white p-8 shadow-card sm:p-10">
        <div className="mb-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
            Análise gratuita
          </span>
          <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
            Descubra seu Rating Bancário
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Preencha seus dados e veja em poucos segundos como bancos e
            instituições financeiras avaliam o seu crédito.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="nome" className="mb-1 block text-sm font-medium text-slate-700">
              Nome completo
            </label>
            <input
              id="nome"
              type="text"
              autoComplete="name"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              placeholder="Seu nome completo"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-500 ${
                errors.nome ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="voce@email.com"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-500 ${
                errors.email ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="telefone" className="mb-1 block text-sm font-medium text-slate-700">
              Telefone
            </label>
            <input
              id="telefone"
              type="tel"
              autoComplete="tel"
              value={form.telefone}
              onChange={(e) =>
                setForm({ ...form, telefone: formatTelefone(e.target.value) })
              }
              placeholder="(11) 91234-5678"
              className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-500 ${
                errors.telefone ? "border-red-400" : "border-slate-200"
              }`}
            />
            {errors.telefone && (
              <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="area_atuacao"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Área de atuação
            </label>
            <select
              id="area_atuacao"
              value={form.area_atuacao}
              onChange={(e) =>
                setForm({ ...form, area_atuacao: e.target.value as LeadInput["area_atuacao"] })
              }
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-brand-500 ${
                errors.area_atuacao ? "border-red-400" : "border-slate-200"
              }`}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {AREAS_DE_ATUACAO.map((area) => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </select>
            {errors.area_atuacao && (
              <p className="mt-1 text-xs text-red-500">{errors.area_atuacao}</p>
            )}
          </div>

          {submitError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Gerando análise..." : "Gerar Análise"}
          </button>

          <p className="text-center text-xs text-slate-400">
            Seus dados estão seguros e não serão compartilhados com terceiros.
          </p>
        </form>
      </div>
    </div>
  );
}
