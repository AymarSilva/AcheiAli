import Link from "next/link"
import Image from "next/image"
import { MapPin, Star } from "lucide-react"
import type { Ambulante } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

const planoLabel: Record<NonNullable<Ambulante["plano"]>, string> = {
  free: "",
  premium: "Premium",
}

export function AmbulanteCard({ ambulante }: { ambulante: Ambulante }) {
  return (
    <Link
      href={`/ambulante/${ambulante.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={ambulante.imagem || "/placeholder.svg"}
          alt={ambulante.nome}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {ambulante.plano && planoLabel[ambulante.plano] && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            {planoLabel[ambulante.plano]}
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold leading-tight text-card-foreground">
            {ambulante.nome}
          </h3>
          <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-foreground">
            <Star className="size-4 fill-primary text-primary" />
            {(ambulante.avaliacao ?? 0).toFixed(1)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {ambulante.descricao}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {ambulante.cidade}
          </span>
          <Badge variant="secondary" className="font-normal">
            {ambulante.categoria}
          </Badge>
        </div>
      </div>
    </Link>
  )
}
