import type {
  Ambulante,
  Catalogo,
  Cliente,
  CriarAmbulanteDTO,
  CriarClienteDTO,
  CriarItemDTO,
  CriarPontoVendaDTO,
  ItemCatalogo,
  LoginResponseDTO,
  Plano,
  PontoVenda,
} from "./types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:7070"

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    let errorMessage = `Erro ${response.status} em ${method} ${path}`
    try {
      const errorBody = await response.json()
      if (errorBody?.message) {
        errorMessage = String(errorBody.message)
      }
    } catch {
      // ignore parse errors and use generic message
    }
    throw new Error(errorMessage)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

function isCNPJ(documento: string): boolean {
  const cleaned = documento.replace(/\D/g, "")
  return cleaned.length === 14
}

function isCPF(documento: string): boolean {
  const cleaned = documento.replace(/\D/g, "")
  return cleaned.length === 11
}

export async function criarCliente(data: CriarClienteDTO): Promise<Cliente> {
  const { documento, ...rest } = data
  const payload = {
    ...rest,
    cpf: documento,
  }
  return request<Cliente>("POST", "/clientes", payload)
}

export async function criarAmbulante(data: CriarAmbulanteDTO): Promise<Ambulante> {
  const { documento, ...rest } = data
  const payload: Record<string, unknown> = { ...rest }

  if (isCNPJ(documento)) {
    payload.cnpj = documento
  } else if (isCPF(documento)) {
    payload.cpf = documento
  }

  return request<Ambulante>("POST", "/ambulantes", payload)
}

export async function login(
  documento: string,
  senha: string,
): Promise<LoginResponseDTO> {
  return request<LoginResponseDTO>("POST", "/login", { documento, senha })
}

export async function listarClientes(): Promise<Cliente[]> {
  return request<Cliente[]>("GET", "/clientes")
}

export async function obterCliente(id: string): Promise<Cliente> {
  return request<Cliente>("GET", `/clientes/${id}`)
}

export async function listarAmbulantes(): Promise<Ambulante[]> {
  return request<Ambulante[]>("GET", "/ambulantes")
}

export async function obterAmbulante(id: string): Promise<Ambulante> {
  return request<Ambulante>("GET", `/ambulantes/${id}`)
}

export async function listarCatalogos(): Promise<Catalogo[]> {
  return request<Catalogo[]>("GET", "/ambulantes/catalogos")
}

export async function atualizarPlano(id: string, plano: Plano): Promise<void> {
  return request<void>("PUT", `/ambulantes/${id}/plano`, {
    plano: plano === "free" ? 0 : 1,
  })
}

export async function obterCatalogo(ambulanteId: string): Promise<Catalogo> {
  return request<Catalogo>("GET", `/ambulantes/${ambulanteId}/catalogo`)
}

export async function criarCatalogo(
  ambulanteId: string,
  data: { titulo: string; descricao?: string },
): Promise<Catalogo> {
  return request<Catalogo>("POST", `/ambulantes/${ambulanteId}/catalogo`, data)
}

export async function listarItens(catalogoId: string): Promise<ItemCatalogo[]> {
  return request<ItemCatalogo[]>("GET", `/catalogos/${catalogoId}/itens`)
}

export async function criarItem(
  catalogoId: string,
  data: CriarItemDTO,
): Promise<ItemCatalogo> {
  return request<ItemCatalogo>("POST", `/catalogos/${catalogoId}/itens`, data)
}

export async function atualizarItem(
  itemId: string,
  data: Partial<CriarItemDTO>,
): Promise<ItemCatalogo> {
  return request<ItemCatalogo>("PUT", `/itens/${itemId}`, data)
}

export async function removerItem(itemId: string): Promise<void> {
  return request<void>("DELETE", `/itens/${itemId}`)
}

// export async function listarPontos(ambulanteId: string): Promise<PontoVenda[]> {
//   return request<PontoVenda[]>("GET", `/ambulantes/${ambulanteId}/pontos-venda`)
// }

export async function criarPonto(
  ambulanteId: string,
  data: CriarPontoVendaDTO,
): Promise<PontoVenda> {
  return request<PontoVenda>("POST", `/ambulantes/${ambulanteId}/pontos-venda`, data)
}

export async function removerPonto(pontoId: string): Promise<void> {
  return request<void>("DELETE", `/pontos-venda/${pontoId}`)
}
