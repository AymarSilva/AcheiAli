"use client"

import { useEffect, useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { criarCatalogo, criarItem, obterAmbulante, obterCatalogo, listarItens } from "@/lib/api"
import type { Ambulante, Catalogo, ItemCatalogo, Sessao } from "@/lib/types"
// imagens não são suportadas; exibir apenas textos

function obterTipoPlano(plano: unknown) {
  if (plano === "free" || plano === "premium") return plano
  if (plano === 0 || plano === "0") return "free"
  if (plano === 1 || plano === "1") return "premium"
  if (typeof plano === "object" && plano !== null) {
    const tipo = String((plano as { tipo?: unknown }).tipo ?? "").toLowerCase()
    if (tipo.includes("free")) return "free"
    if (tipo.includes("premium")) return "premium"
  }
  return undefined
}

export default function PainelPage() {
  const [ambulante, setAmbulante] = useState<Ambulante | null>(null)
  const [catalogo, setCatalogo] = useState<Catalogo | undefined>()
  const [itens, setItens] = useState<ItemCatalogo[]>([])
  const [tituloCatalogo, setTituloCatalogo] = useState("")
  const [descricaoCatalogo, setDescricaoCatalogo] = useState("")
  const [criandoCatalogo, setCriandoCatalogo] = useState(false)
  const [erroCatalogo, setErroCatalogo] = useState<string | null>(null)

  const [novoItemNome, setNovoItemNome] = useState("")
  const [novoItemPreco, setNovoItemPreco] = useState("")
  const [novoItemDescricao, setNovoItemDescricao] = useState("")
  const [salvandoItem, setSalvandoItem] = useState(false)
  const [erroItem, setErroItem] = useState<string | null>(null)

  const plano = obterTipoPlano(ambulante?.plano)
  const planoGratis = plano === "free"

  async function criarNovoCatalogo() {
    if (!ambulante) return
    setCriandoCatalogo(true)
    setErroCatalogo(null)

    try {
      const novoCatalogo = await criarCatalogo(ambulante.id, {
        titulo: tituloCatalogo,
        descricao: descricaoCatalogo,
      })
      setCatalogo(novoCatalogo)
      setTituloCatalogo("")
      setDescricaoCatalogo("")
    } catch (error) {
      if (error instanceof Error) {
        setErroCatalogo(error.message)
      } else {
        setErroCatalogo("Não foi possível criar o catálogo. Tente novamente.")
      }
    } finally {
      setCriandoCatalogo(false)
    }
  }

  useEffect(() => {
    const raw = localStorage.getItem("acheali_sessao")
    const sessao = raw ? (JSON.parse(raw) as Sessao) : null

    async function carregar() {
      if (!sessao?.id) return
      const dadosAmbulante = await obterAmbulante(sessao.id)
      const dadosCatalogo = await obterCatalogo(sessao.id).catch(() => undefined)
      const dadosItens = dadosCatalogo ? await listarItens(dadosCatalogo.id).catch(() => []) : []

      // debug: inspecionar payload de itens recebido do backend
      console.debug("dadosItens recebidos:", dadosItens)

      setAmbulante(dadosAmbulante)
      setCatalogo(dadosCatalogo)
      setItens(dadosItens)

      localStorage.setItem(
        "acheali_sessao",
        JSON.stringify({ ...sessao, plano: dadosAmbulante.plano }),
      )
    }

    carregar()
  }, [])

  async function adicionarItem() {
    if (!catalogo) return
    setSalvandoItem(true)
    setErroItem(null)

    try {
      const novo = await criarItem(catalogo.id, {
        nome: novoItemNome,
        preco: Number(novoItemPreco.replace(",", ".")) || 0,
        descricao: novoItemDescricao,
      })
      console.debug("item criado:", novo)
      setItens((prev) => [...prev, novo])
      setNovoItemNome("")
      setNovoItemPreco("")
      setNovoItemDescricao("")
    } catch (error) {
      setErroItem("Não foi possível adicionar o item. Tente novamente.")
    } finally {
      setSalvandoItem(false)
    }
  }

  if (!ambulante) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4 py-10">
          <p className="text-sm text-muted-foreground">Carregando catálogo...</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
        <section className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {catalogo?.titulo ?? "Catálogo"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {catalogo?.descricao ?? "Itens do catálogo do ambulante."}
            </p>
          </div>

          {catalogo ? (
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Adicionar item ao catálogo</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Insira o nome, preço e descrição para criar um novo item.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">Nome</span>
                    <input
                      value={novoItemNome}
                      onChange={(event) => setNovoItemNome(event.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="Ex: Pastel de queijo"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">Preço</span>
                    <input
                      value={novoItemPreco}
                      onChange={(event) => setNovoItemPreco(event.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="12,50"
                    />
                  </label>
                  <label className="space-y-2 text-sm">
                    <span className="font-medium text-foreground">Descrição</span>
                    <input
                      value={novoItemDescricao}
                      onChange={(event) => setNovoItemDescricao(event.target.value)}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                      placeholder="Opcional: uma breve descrição"
                    />
                  </label>
                </div>
                {erroItem && <p className="mt-3 text-sm text-destructive">{erroItem}</p>}
                <button
                  onClick={adicionarItem}
                  disabled={salvandoItem || !novoItemNome.trim() || !novoItemPreco.trim()}
                  className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvandoItem ? "Salvando item..." : "Adicionar item"}
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {itens.length === 0 ? (
                  <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
                    Nenhum item cadastrado ainda. Use o formulário acima para adicionar itens ao catálogo.
                  </div>
                ) : (
                  itens.map((item) => (
                    <article key={item.id} className="rounded-xl border border-border bg-card p-4">
                      {/* imagem removida — exibir apenas textos */}
                        <div className="flex items-start justify-between gap-3">
                          <h2 className="font-semibold text-card-foreground">{item.nome}</h2>
                          <span className="shrink-0 font-semibold text-primary">
                            {Number(item.preco).toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.descricao && item.descricao.trim() !== "" ? item.descricao : "Sem descrição."}
                        </p>
                        {item.dataPerecivel && (
                          <p className="mt-1 text-sm text-muted-foreground">Validade: {item.dataPerecivel}</p>
                        )}
                    </article>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-6">
              <h2 className="text-lg font-bold text-foreground">Crie seu catálogo</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ainda não existe um catálogo para este ambulante. Preencha o título e a descrição para criar.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-foreground">Título do catálogo</span>
                  <input
                    value={tituloCatalogo}
                    onChange={(event) => setTituloCatalogo(event.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Ex: Cardápio da semana"
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-foreground">Descrição</span>
                  <input
                    value={descricaoCatalogo}
                    onChange={(event) => setDescricaoCatalogo(event.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                    placeholder="Opcional: uma breve descrição"
                  />
                </label>
              </div>
              {erroCatalogo && (
                <p className="mt-3 text-sm text-destructive">{erroCatalogo}</p>
              )}
              <button
                onClick={criarNovoCatalogo}
                disabled={criandoCatalogo || !tituloCatalogo.trim()}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {criandoCatalogo ? "Criando catálogo..." : "Criar catálogo"}
              </button>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
