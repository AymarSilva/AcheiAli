"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Boxes,
  Check,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Store,
  Trash2,
  X,
} from "lucide-react"
import type {
  Ambulante,
  Catalogo,
  ItemCatalogo,
  Plano,
  PontoVenda,
} from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
  atualizarItem,
  atualizarPlano,
  criarItem,
  criarPonto,
  removerItem,
  removerPonto,
} from "@/lib/api"

const abas = [
  { id: "perfil", label: "Perfil & Plano", icon: Store },
  { id: "catalogo", label: "Catálogo", icon: Boxes },
  { id: "pontos", label: "Pontos de Venda", icon: MapPin },
] as const

const planos: { id: Plano; nome: string; preco: string; recursos: string[] }[] = [
  {
    id: "free",
    nome: "Free",
    preco: "R$ 0",
    recursos: ["Perfil básico", "Até 5 itens", "1 ponto de venda"],
  },
  {
    id: "premium",
    nome: "Premium",
    preco: "R$ 39/mês",
    recursos: ["Destaque na busca", "Itens ilimitados", "Pontos ilimitados"],
  },
]

const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

export function PainelCliente({
  ambulante,
  catalogo,
  itens: itensIniciais,
  pontos: pontosIniciais,
}: {
  ambulante: Ambulante
  catalogo?: Catalogo
  itens: ItemCatalogo[]
  pontos: PontoVenda[]
}) {
  const [aba, setAba] = useState<(typeof abas)[number]["id"]>("perfil")
  const [planoAtual, setPlanoAtual] = useState<Plano>(ambulante.plano ?? "free")
  const [salvando, setSalvando] = useState<Plano | null>(null)

  const [itens, setItens] = useState<ItemCatalogo[]>(itensIniciais)
  const [pontos, setPontos] = useState<PontoVenda[]>(pontosIniciais)

  async function mudarPlano(plano: Plano) {
    setSalvando(plano)
    await atualizarPlano(ambulante.id, plano) // PUT /ambulantes/{id}/plano
    setPlanoAtual(plano)
    setSalvando(null)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Painel do ambulante
        </h1>
        <p className="text-sm text-muted-foreground">
          Gerencie seu perfil, plano, catálogo e pontos de venda.
        </p>
      </div>

      {/* Abas */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1">
        {abas.map((a) => (
          <button
            key={a.id}
            onClick={() => setAba(a.id)}
            className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
              aba === a.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            <a.icon className="size-4" />
            {a.label}
          </button>
        ))}
      </div>

      {aba === "perfil" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-center">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={ambulante.imagem || "/placeholder.svg"}
                alt={ambulante.nome}
                fill
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 space-y-1">
              <h2 className="text-lg font-semibold text-foreground">
                {ambulante.nome}
              </h2>
              <p className="text-sm text-muted-foreground">{ambulante.descricao}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
                <Badge variant="secondary">{ambulante.categoria}</Badge>
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5" />
                  {ambulante.cidade}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-base font-semibold text-foreground">
              Seu plano
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              {planos.map((p) => {
                const ativo = planoAtual === p.id
                return (
                  <div
                    key={p.id}
                    className={`flex flex-col rounded-xl border bg-card p-5 transition-colors ${
                      ativo ? "border-primary ring-1 ring-primary" : "border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground">{p.nome}</h4>
                      {ativo && (
                        <Badge className="bg-primary text-primary-foreground">
                          Atual
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-2xl font-bold text-foreground">
                      {p.preco}
                    </p>
                    <ul className="mt-4 flex-1 space-y-2">
                      {p.recursos.map((r) => (
                        <li
                          key={r}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <Check className="size-4 shrink-0 text-primary" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <button
                      disabled={ativo || salvando !== null}
                      onClick={() => mudarPlano(p.id)}
                      className={`mt-5 flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${
                        ativo
                          ? "bg-secondary text-muted-foreground"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {salvando === p.id && <Loader2 className="size-4 animate-spin" />}
                      {ativo
                        ? "Plano atual"
                        : salvando === p.id
                          ? "Salvando..."
                          : "Selecionar"}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {aba === "catalogo" && (
        <CatalogoAba
          ambulanteId={ambulante.id}
          catalogo={catalogo}
          itens={itens}
          setItens={setItens}
        />
      )}

      {aba === "pontos" && (
        <PontosAba
          ambulanteId={ambulante.id}
          cidadePadrao={ambulante.cidade ?? ""}
          pontos={pontos}
          setPontos={setPontos}
        />
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Aba Catálogo                                                               */
/* -------------------------------------------------------------------------- */
function CatalogoAba({
  ambulanteId,
  catalogo,
  itens,
  setItens,
}: {
  ambulanteId: string
  catalogo?: Catalogo
  itens: ItemCatalogo[]
  setItens: React.Dispatch<React.SetStateAction<ItemCatalogo[]>>
}) {
  const catalogoId = catalogo?.id ?? `cat-${ambulanteId}`
  const [aberto, setAberto] = useState(false)
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [descricao, setDescricao] = useState("")
  const [salvando, setSalvando] = useState(false)
  const [removendo, setRemovendo] = useState<string | null>(null)

  async function adicionar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    // POST /ambulantes/{id}/catalogo/itens
    const novo = await criarItem(catalogoId, {
      nome,
      descricao,
      preco: Number(preco.replace(",", ".")) || 0,
      imagem: "/placeholder.svg",
      disponivel: true,
    })
    setItens((prev) => [...prev, novo])
    setNome("")
    setPreco("")
    setDescricao("")
    setAberto(false)
    setSalvando(false)
  }

  async function alternarDisponibilidade(item: ItemCatalogo) {
    // PUT /ambulantes/{id}/catalogo/itens/{itemId}
    setItens((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, disponivel: !i.disponivel } : i,
      ),
    )
    await atualizarItem(item.id, { disponivel: !item.disponivel })
  }

  async function excluir(itemId: string) {
    setRemovendo(itemId)
    // DELETE /ambulantes/{id}/catalogo/itens/{itemId}
    await removerItem(itemId)
    setItens((prev) => prev.filter((i) => i.id !== itemId))
    setRemovendo(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {catalogo?.titulo ?? "Seu catálogo"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {itens.length} {itens.length === 1 ? "item" : "itens"} cadastrados
          </p>
        </div>
        <button
          onClick={() => setAberto((v) => !v)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {aberto ? <X className="size-4" /> : <Plus className="size-4" />}
          {aberto ? "Cancelar" : "Novo item"}
        </button>
      </div>

      {aberto && (
        <form
          onSubmit={adicionar}
          className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2"
        >
          <CampoForm label="Nome do item" value={nome} onChange={setNome} required />
          <CampoForm
            label="Preço (R$)"
            value={preco}
            onChange={setPreco}
            placeholder="0,00"
            inputMode="decimal"
            required
          />
          <div className="sm:col-span-2">
            <CampoForm
              label="Descrição"
              value={descricao}
              onChange={setDescricao}
              placeholder="Detalhes do item"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={salvando}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {salvando && <Loader2 className="size-4 animate-spin" />}
              Salvar item
            </button>
          </div>
        </form>
      )}

      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
        {itens.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.imagem || "/placeholder.svg"}
                alt={item.nome}
                fill
                sizes="56px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-card-foreground">
                {item.nome}
              </p>
              <p className="text-sm text-muted-foreground">
                {brl(item.preco)}
                {" · "}
                {item.disponivel ? "Disponível" : "Indisponível"}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => alternarDisponibilidade(item)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  item.disponivel
                    ? "bg-secondary text-secondary-foreground hover:bg-accent"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {item.disponivel ? "Pausar" : "Ativar"}
              </button>
              <button
                onClick={() => excluir(item.id)}
                disabled={removendo === item.id}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                aria-label="Excluir item"
              >
                {removendo === item.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </button>
            </div>
          </div>
        ))}
        {itens.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            Nenhum item cadastrado ainda.
          </p>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Aba Pontos de venda                                                        */
/* -------------------------------------------------------------------------- */
function PontosAba({
  ambulanteId,
  cidadePadrao,
  pontos,
  setPontos,
}: {
  ambulanteId: string
  cidadePadrao: string
  pontos: PontoVenda[]
  setPontos: React.Dispatch<React.SetStateAction<PontoVenda[]>>
}) {
  const [aberto, setAberto] = useState(false)
  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [horario, setHorario] = useState("")
  const [salvando, setSalvando] = useState(false)
  const [removendo, setRemovendo] = useState<string | null>(null)

  async function adicionar(e: React.FormEvent) {
    e.preventDefault()
    setSalvando(true)
    // POST /ambulantes/{id}/pontos-venda
    const novo = await criarPonto(ambulanteId, {
      nome,
      endereco,
      cidade: cidadePadrao,
      diasSemana: ["Seg", "Ter", "Qua", "Qui", "Sex"],
      horario: horario || "08h às 18h",
    })
    setPontos((prev) => [...prev, novo])
    setNome("")
    setEndereco("")
    setHorario("")
    setAberto(false)
    setSalvando(false)
  }

  async function excluir(pontoId: string) {
    setRemovendo(pontoId)
    // DELETE /pontos-venda/{id}
    await removerPonto(pontoId)
    setPontos((prev) => prev.filter((p) => p.id !== pontoId))
    setRemovendo(null)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Pontos de venda
          </h2>
          <p className="text-sm text-muted-foreground">
            Onde seus clientes podem te encontrar
          </p>
        </div>
        <button
          onClick={() => setAberto((v) => !v)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {aberto ? <X className="size-4" /> : <Plus className="size-4" />}
          {aberto ? "Cancelar" : "Novo ponto"}
        </button>
      </div>

      {aberto && (
        <form
          onSubmit={adicionar}
          className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2"
        >
          <CampoForm label="Nome do local" value={nome} onChange={setNome} required />
          <CampoForm
            label="Horário"
            value={horario}
            onChange={setHorario}
            placeholder="08h às 18h"
          />
          <div className="sm:col-span-2">
            <CampoForm
              label="Endereço"
              value={endereco}
              onChange={setEndereco}
              placeholder="Rua, bairro"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={salvando}
              className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {salvando && <Loader2 className="size-4 animate-spin" />}
              Salvar ponto
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {pontos.map((ponto) => (
          <div
            key={ponto.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="flex items-center gap-2 font-medium text-card-foreground">
                <MapPin className="size-4 text-primary" />
                {ponto.nome}
              </h3>
              <button
                onClick={() => excluir(ponto.id)}
                disabled={removendo === ponto.id}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                aria-label="Excluir ponto"
              >
                {removendo === ponto.id ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Trash2 className="size-4" />
                )}
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {ponto.endereco} — {ponto.cidade}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {(ponto.diasSemana ?? []).join(", ")} · {ponto.horario ?? ""}
            </p>
          </div>
        ))}
        {pontos.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-muted-foreground">
            Nenhum ponto de venda cadastrado.
          </p>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Campo de formulário reutilizável                                           */
/* -------------------------------------------------------------------------- */
function CampoForm({
  label,
  value,
  onChange,
  placeholder,
  required,
  inputMode,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  inputMode?: "text" | "decimal"
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        value={value}
        required={required}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
