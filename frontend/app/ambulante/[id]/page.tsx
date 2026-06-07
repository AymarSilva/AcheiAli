import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Mail, MapPin, Phone, Star } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Badge } from "@/components/ui/badge"
import {
  obterAmbulante,
  obterCatalogo,
  listarItens
} from "@/lib/api"

export default async function AmbulantePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const ambulante = await obterAmbulante(id)
  if (!ambulante) notFound()

  const catalogo = await obterCatalogo(id)
  const itens = catalogo ? await listarItens(catalogo.id) : []
  // const pontos = await listarPontos(id)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Capa */}
        <div className="relative h-56 w-full overflow-hidden bg-muted md:h-72">
          <Image
            src={ambulante.imagem || "/placeholder.svg"}
            alt={ambulante.nome}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="mx-auto max-w-5xl px-4">
          <Link
            href="/buscar"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Voltar para a busca
          </Link>

          {/* Cabeçalho do ambulante */}
          <div className="mt-4 flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{ambulante.categoria}</Badge>
                {ambulante.plano === "premium" && (
                  <Badge className="bg-primary text-primary-foreground">
                    {ambulante.plano === "premium" ? "Premium" : "Verificado"}
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">
                {ambulante.nome}
              </h1>
              <p className="max-w-2xl text-pretty text-muted-foreground">
                {ambulante.descricao}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5 font-medium text-foreground">
                  <Star className="size-4 fill-primary text-primary" />
                  {(ambulante.avaliacao ?? 0).toFixed(1)}
                  <span className="font-normal text-muted-foreground">
                    ({ambulante.totalAvaliacoes})
                  </span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-4" />
                  {ambulante.cidade}
                </span>
                {ambulante.telefone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-4" />
                    {ambulante.telefone}
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <Mail className="size-4" />
                  {ambulante.email}
                </span>
              </div>
            </div>
          </div>

          {/* Catálogo / itens */}
          <section className="py-8">
            <h2 className="text-xl font-semibold text-foreground">
              {catalogo?.titulo ?? "Cardápio"}
            </h2>
            {catalogo?.descricao && (
              <p className="mt-1 text-sm text-muted-foreground">
                {catalogo.descricao}
              </p>
            )}

            {itens.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 rounded-xl border border-border bg-card p-3"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.imagem || "/placeholder.svg"}
                        alt={item.nome}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-medium text-card-foreground">
                          {item.nome}
                        </h3>
                        <span className="shrink-0 font-semibold text-primary">
                          R$ {item.preco.toFixed(2)}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {item.descricao}
                      </p>
                      <span
                        className={`mt-auto pt-2 text-xs font-medium ${
                          item.disponivel
                            ? "text-foreground"
                            : "text-muted-foreground"
                        }`}
                      >
                        {item.disponivel ? "Disponível" : "Indisponível no momento"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-xl border border-dashed border-border bg-card py-10 text-center text-sm text-muted-foreground">
                Este ambulante ainda não cadastrou itens no catálogo.
              </p>
            )}
          </section>

          {/* Pontos de venda */}
          {/* <section className="border-t border-border py-8">
            <h2 className="text-xl font-semibold text-foreground">
              Onde encontrar
            </h2>
            {pontos.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {pontos.map((ponto) => (
                  <div
                    key={ponto.id}
                    className="rounded-xl border border-border bg-card p-4"
                  >
                    <h3 className="flex items-center gap-2 font-medium text-card-foreground">
                      <MapPin className="size-4 text-primary" />
                      {ponto.nome}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {ponto.endereco} — {ponto.cidade}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-4" />
                        {ponto.horario}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {(ponto.diasSemana ?? []).map((dia) => (
                          <Badge key={dia} variant="secondary" className="font-normal">
                            {dia}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-xl border border-dashed border-border bg-card py-10 text-center text-sm text-muted-foreground">
                Nenhum ponto de venda cadastrado.
              </p>
            )}
          </section> */}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
