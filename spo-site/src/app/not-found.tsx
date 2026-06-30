import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Página não encontrada",
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="heading-xl text-primary mb-4">404</h1>
      <h2 className="heading-lg text-text mb-4">Página não encontrada</h2>
      <p className="body-lg text-text-light mb-8 max-w-md">
        A página que você procura não existe ou foi movida.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center h-11 px-6 rounded-lg bg-primary text-white body-md font-medium hover:bg-primary-light transition-colors"
      >
        Voltar para Home
      </Link>
    </div>
  )
}
