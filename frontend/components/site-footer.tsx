import { Logo } from "./site-header"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Ache ali o que você procura. Conectamos você aos ambulantes da sua
            cidade.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-10 gap-y-4 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Plataforma</span>
            <a href="/buscar" className="text-muted-foreground hover:text-foreground">
              Buscar
            </a>
            <a href="/painel" className="text-muted-foreground hover:text-foreground">
              Para ambulantes
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium text-foreground">Conta</span>
            <a href="/login" className="text-muted-foreground hover:text-foreground">
              Entrar
            </a>
            <a href="/cadastro" className="text-muted-foreground hover:text-foreground">
              Criar conta
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AcheAli. Todos os direitos reservados.
      </div>
    </footer>
  )
}
