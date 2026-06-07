"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Search, Sparkles, Store, MapPin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { categorias } from "@/lib/mock-data"
import { listarCatalogos } from "@/lib/api"
import type { Catalogo } from "@/lib/types"

export default function HomePage() {
  const [catalogos, setCatalogos] = useState<Catalogo[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await listarCatalogos()
        setCatalogos(dados)
      } catch (err) {
        setErro("Não foi possível carregar os catálogos.")
      } finally {
        setCarregando(false)
      }
    }
    carregar()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-card">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center md:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
              <Sparkles className="size-4 text-primary" />
              Ambulantes da sua cidade, num só lugar
            </span>
            <h1 className="max-w-2xl text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Ache ali o que você <span className="text-primary">procura</span>
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              Comidas, doces, artesanato e muito mais. Descubra ambulantes
              perto de você, veja cardápios e saiba onde encontrá-los.
            </p>
            <form
              action="/buscar"
              className="flex w-full max-w-lg items-center gap-2 rounded-xl border border-border bg-background p-2 shadow-sm"
            >
              <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
              <input
                name="q"
                placeholder="O que você está procurando?"
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Buscar ambulantes"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Buscar
              </button>
            </form>
          </div>
        </section>

        {/* Categorias */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="mb-6 text-xl font-semibold text-foreground">
            Explore por categoria
          </h2>
          <div className="flex flex-wrap gap-3">
            {categorias.map((cat) => (
              <Link
                key={cat}
                href={`/buscar?categoria=${encodeURIComponent(cat)}`}
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-colors hover:border-primary/40 hover:bg-accent hover:text-accent-foreground"
              >
                {cat}
              </Link>
            ))}
          </div>
        </section>

        {/* Catálogos disponíveis */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              Catálogos disponíveis
            </h2>
            <Link
              href="/buscar"
              className="text-sm font-medium text-primary hover:underline"
            >
              Ver todos
            </Link>
          </div>
          {carregando ? (
            <div className="rounded-xl border border-border bg-card py-16 text-center">
              <p className="text-sm text-muted-foreground">Carregando catálogos...</p>
            </div>
          ) : erro ? (
            <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
              <p className="text-sm text-destructive">{erro}</p>
            </div>
          ) : catalogos.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {catalogos.map((catalogo) => (
                <Link
                  key={catalogo.id}
                  href={`/ambulante/${catalogo.ambulanteId}`}
                  className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/50 hover:bg-primary/5"
                >
                  <h3 className="text-lg font-semibold text-foreground">
                    {catalogo.titulo ?? "Catálogo"}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {catalogo.descricao ?? "Sem descrição disponível."}
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-[.2em] text-primary">
                    Ver catálogo
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
              <p className="text-sm text-muted-foreground">
                Nenhum catálogo disponível.
              </p>
            </div>
          )}
        </section>

        {/* Como funciona */}
        <section className="border-t border-border bg-card">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
            {[
              {
                icon: Search,
                titulo: "Busque",
                texto: "Encontre ambulantes por nome, categoria ou cidade.",
              },
              {
                icon: Store,
                titulo: "Descubra",
                texto: "Veja cardápios, itens, preços e avaliações.",
              },
              {
                icon: MapPin,
                titulo: "Encontre",
                texto: "Saiba os pontos de venda e horários de cada um.",
              },
            ].map((item) => (
              <div key={item.titulo} className="flex flex-col items-start gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <item.icon className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-foreground">
                  {item.titulo}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {item.texto}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
