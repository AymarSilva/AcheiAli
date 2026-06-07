import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { listarCatalogos } from "@/lib/api"

export default async function BuscarPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const catalogos = await listarCatalogos()
  const termo = (q ?? "").trim().toLowerCase()

  const resultados = catalogos.filter((catalogo) => {
    const titulo = (catalogo.titulo ?? "").toLowerCase()
    const descricao = (catalogo.descricao ?? "").toLowerCase()
    return !termo || titulo.includes(termo) || descricao.includes(termo)
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <div className="mb-8 space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Buscar catálogos
          </h1>
          <p className="text-sm text-muted-foreground">
            Veja todos os catálogos disponíveis e clique para abrir o catálogo do ambulante.
          </p>
        </div>

        <form action="/buscar" className="mb-6 flex items-center gap-2 rounded-xl border border-border bg-card p-2 shadow-sm">
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder="Buscar por título ou descrição de catálogo..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            aria-label="Buscar catálogos"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Buscar
          </button>
        </form>

        <p className="mb-4 text-sm text-muted-foreground">
          {resultados.length} {resultados.length === 1 ? "catálogo encontrado" : "catálogos encontrados"}
        </p>

        {resultados.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resultados.map((catalogo) => (
              <Link
                key={catalogo.id}
                href={`/ambulante/${catalogo.ambulanteId}`}
                className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/50 hover:bg-primary/5"
              >
                <h2 className="text-lg font-semibold text-foreground">
                  {catalogo.titulo ?? "Catálogo"}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {catalogo.descricao ?? "Sem descrição disponível."}
                </p>
                <p className="mt-4 text-xs uppercase tracking-[.2em] text-primary">
                  Ver catálogo e itens
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhum catálogo encontrado. Tente outra busca.
            </p>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
