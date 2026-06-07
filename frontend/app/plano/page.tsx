"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { atualizarPlano } from "@/lib/api"
import type { Plano, Sessao } from "@/lib/types"

export default function PlanoPage() {
  const router = useRouter()
  const [sessao, setSessao] = useState<Sessao | null>(null)
  const [salvando, setSalvando] = useState(false)

  useEffect(() => {
    const raw = localStorage.getItem("acheali_sessao")
    setSessao(raw ? (JSON.parse(raw) as Sessao) : null)
  }, [])

  async function escolher(plano: Plano) {
    if (!sessao?.id) return
    setSalvando(true)
    await atualizarPlano(sessao.id, plano)
    const novaSessao = { ...sessao, plano }
    localStorage.setItem("acheali_sessao", JSON.stringify(novaSessao))
    setSessao(novaSessao)
    setSalvando(false)
    router.push("/painel")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-6 px-4 py-10">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Escolha seu plano</h1>
          <p className="text-sm text-muted-foreground">
            Selecione entre free e premium para atualizar a coluna `plano`.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {([
            { id: "free" as const, nome: "Free", descricao: "Plano gratuito", destaque: false },
            { id: "premium" as const, nome: "Premium", descricao: "Plano pago com destaque", destaque: true },
          ] as const).map((item) => (
            <button
              key={item.id}
              disabled={salvando}
              onClick={() => escolher(item.id)}
              className={`rounded-xl border p-5 text-left transition-colors hover:border-primary ${
                sessao?.plano === item.id ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              <p className="text-lg font-semibold text-foreground">{item.nome}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.descricao}</p>
            </button>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
