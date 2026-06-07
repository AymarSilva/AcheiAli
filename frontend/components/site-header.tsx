"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MapPin, Search } from "lucide-react"
import { useEffect, useState } from "react"
import type { Sessao } from "@/lib/types"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <MapPin className="size-5" strokeWidth={2.5} />
      </span>
      <span className="text-lg font-semibold tracking-tight">
        Achei<span className="text-primary">Ali</span>
      </span>
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [sessao, setSessao] = useState<Sessao | null>(null)

  useEffect(() => {
    const raw = localStorage.getItem("acheali_sessao")
    setSessao(raw ? (JSON.parse(raw) as Sessao) : null)
  }, [])

  function sair() {
    localStorage.removeItem("acheali_sessao")
    setSessao(null)
    window.location.href = "/login"
  }

  const navItemClass = (href: string) => {
    const isActive = pathname === href
    return isActive
      ? "rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      : "rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/buscar" className="transition-colors hover:text-foreground">
            Buscar
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/buscar"
            className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
            aria-label="Buscar"
          >
            <Search className="size-5" />
          </Link>
          {sessao ? (
            <>
              <Link href="/painel" className={navItemClass("/painel")}>
                Catálogo
              </Link>
              <Link href="/plano" className={navItemClass("/plano")}>Plano</Link>
              <button
                onClick={sair}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                Entrar
              </Link>
              <Link
                href="/plano"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Plano
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
