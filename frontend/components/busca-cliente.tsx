"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import type { Ambulante } from "@/lib/types"
import { categorias } from "@/lib/mock-data"
import { AmbulanteCard } from "@/components/ambulante-card"

export function BuscaCliente({
  ambulantes,
  queryInicial = "",
  categoriaInicial = "",
}: {
  ambulantes: Ambulante[]
  queryInicial?: string
  categoriaInicial?: string
}) {
  const [q, setQ] = useState(queryInicial)
  const [categoria, setCategoria] = useState(categoriaInicial)

  const resultados = useMemo(() => {
    const termo = q.trim().toLowerCase()
    return ambulantes.filter((a) => {
      const casaCategoria = !categoria || a.categoria === categoria
      const casaTermo =
        !termo ||
        a.nome.toLowerCase().includes(termo) ||
        (a.descricao ?? "").toLowerCase().includes(termo) ||
        (a.cidade ?? "").toLowerCase().includes(termo) ||
        (a.categoria ?? "").toLowerCase().includes(termo)
      return casaCategoria && casaTermo
    })
  }, [ambulantes, q, categoria])

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-card p-2">
        <Search className="ml-2 size-5 shrink-0 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por nome, cidade ou categoria..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          aria-label="Buscar ambulantes"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoria("")}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
            !categoria
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-card-foreground hover:bg-accent"
          }`}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoria(cat)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              categoria === cat
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-card-foreground hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground">
        {resultados.length}{" "}
        {resultados.length === 1
          ? "ambulante encontrado"
          : "ambulantes encontrados"}
      </p>

      {resultados.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((amb) => (
            <AmbulanteCard key={amb.id} ambulante={amb} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Nenhum ambulante encontrado. Tente outra busca.
          </p>
        </div>
      )}
    </div>
  )
}
