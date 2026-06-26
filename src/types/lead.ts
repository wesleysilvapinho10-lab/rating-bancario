export type AreaAtuacao =
  | "comercio"
  | "servicos"
  | "industria"
  | "profissional_liberal"
  | "agronegocio"
  | "outro";

export interface LeadInput {
  nome: string;
  email: string;
  telefone: string;
  area_atuacao: AreaAtuacao | "";
}

export interface Lead extends LeadInput {
  id?: string;
  created_at?: string;
}
