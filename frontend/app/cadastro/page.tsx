"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CheckCircle2, Loader2 } from "lucide-react"
import { Logo } from "@/components/site-header"
import { criarAmbulante, criarCliente } from "@/lib/api"

type Tipo = "cliente" | "ambulante"

export default function CadastroPage() {
  const router = useRouter()
  const [tipo, setTipo] = useState<Tipo>("ambulante")
  const [nome, setNome] = useState("")
  const [documento, setDocumento] = useState("")
  const [senha, setSenha] = useState("")
  const [carregando, setCarregando] = useState(false)
  const [sucesso, setSucesso] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setCarregando(true)
    try {
      // Cliente -> POST /clientes | Ambulante -> POST /ambulantes
      if (tipo === "cliente") {
        await criarCliente({ documento, nome, senha })
      } else {
        await criarAmbulante({ documento, nome, senha })
      }
      
      setSucesso(true)
      setTimeout(() => router.push(tipo === "ambulante" ? "/painel" : "/buscar"), 1200)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-card px-4 py-12">
      <Logo />
      <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-sm">
        {sucesso ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <CheckCircle2 className="size-10 text-primary" />
            <p className="font-medium text-foreground">Conta criada com sucesso!</p>
            <p className="text-sm text-muted-foreground">Redirecionando...</p>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-1 text-center">
              <h1 className="text-xl font-semibold text-foreground">Criar conta</h1>
              <p className="text-sm text-muted-foreground">
                Junte-se ao AcheAli.
              </p>
            </div>

            <div className="mb-5 grid grid-cols-2 gap-2 rounded-lg bg-secondary p-1">
              {(["cliente", "ambulante"] as Tipo[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTipo(t)}
                  disabled
                  className={`rounded-md py-2 text-sm font-medium capitalize transition-colors ${
                    tipo === t
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground"
                  }`}
                >
                  {t === "cliente" ? "Sou cliente" : "Sou ambulante"}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <Campo label="Nome" value={nome} onChange={setNome} placeholder="Seu nome" />
              <Campo
                label={tipo === "cliente" ? "CPF" : "CPF ou CNPJ"}
                type="text"
                value={documento}
                onChange={setDocumento}
                placeholder={tipo === "cliente" ? "000.000.000-00" : "000.000.000-00 ou 00.000.000/0000-00"}
              />
              <Campo
                label="Senha"
                type="password"
                value={senha}
                onChange={setSenha}
                placeholder="Sua senha"
              />
              <button
                type="submit"
                disabled={carregando}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
              >
                {carregando && <Loader2 className="size-4 animate-spin" />}
                Criar conta
              </button>
            </form>
          </>
        )}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  )
}

function Campo({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}
