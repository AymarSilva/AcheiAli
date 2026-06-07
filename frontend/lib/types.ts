// Tipos do domínio AcheAli alinhados aos DTOs do backend.

export type Plano = "free" | "premium"

export type PlanoResponse = Plano | 0 | 1 | { tipo?: string | number }

export type TipoUsuario = "CLIENTE" | "AMBULANTE"

export interface Cliente {
  id: string
  nome: string
  cpf?: string
  telefone?: string
  rua?: string
  numero?: string
  logradouro?: string
  cep?: string
  email?: string
  cidade?: string
  criadoEm?: string
}

export interface Ambulante {
  id: string
  nome: string
  telefone?: string
  cpf?: string
  cnpj?: string
  plano?: PlanoResponse
  imagem?: string
  descricao?: string
  categoria?: string
  email?: string
  cidade?: string
  avaliacao?: number
  totalAvaliacoes?: number
  destaque?: boolean
}

export interface Catalogo {
  id: string
  ambulanteId: string
  titulo?: string
  descricao?: string
}

export interface ItemCatalogo {
  id: string
  catalogoId: string
  nome: string
  descricao?: string
  preco: number
  dataPerecivel?: string
  imagem?: string
  disponivel?: boolean
}

export interface PontoVenda {
  id: string
  ambulanteId: string
  nome: string
  latitude?: number
  longitude?: number
  ativo?: boolean
  endereco?: string
  cidade?: string
  diasSemana?: string[]
  horario?: string
}

export interface LoginDTO {
  documento: string
  senha: string
}

export interface LoginResponseDTO {
  id: string
  nome: string
  tipo?: TipoUsuario
  plano?: PlanoResponse
}

export interface Sessao {
  id: string
  nome: string
  tipo: TipoUsuario
  plano?: PlanoResponse
}

export interface CriarClienteDTO {
  nome: string
  documento: string
  telefone?: string
  senha: string
  rua?: string
  numero?: string
  logradouro?: string
  cep?: string
  email?: string
  cidade?: string
}

export interface CriarAmbulanteDTO {
  nome?: string
  senha?: string
  telefone?: string
  documento: string
}

export interface CriarItemDTO {
  nome?: string
  descricao?: string
  preco?: number
  dataPerecivel?: string
  imagem?: string
  disponivel?: boolean
}

export interface CriarPontoVendaDTO {
  nome?: string
  latitude?: number
  longitude?: number
  endereco?: string
  cidade?: string
  diasSemana?: string[]
  horario?: string
}

export interface AtualizarPontoVendaDTO {
  nome: string
  ativo: boolean
}

export interface UpgradePlanoDTO {
  plano: Plano
}
