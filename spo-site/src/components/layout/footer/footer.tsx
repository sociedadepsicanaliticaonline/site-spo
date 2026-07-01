import Link from "next/link"
import Image from "next/image"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/shared/logo"
import { SocialIcons } from "@/components/shared/social-icons"
import { footerColumns } from "@/data/footer"
import { siteConfig } from "@/config/site"
import escLogo from "@/assets/logo-esc.png"

function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-6">
            <Logo variant="light" />
            <p className="body-md text-white/70 max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>
            <SocialIcons links={siteConfig.socialLinks} variant="light" />
            <div className="space-y-2 text-white/60 body-sm">
              <p>{siteConfig.email}</p>
              <p>{siteConfig.phone}</p>
            </div>
          </div>
          {footerColumns.map((column) => (
            <div key={column.id} className="lg:col-span-2 space-y-4">
              <h3 className="caption text-white font-bold tracking-wider">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="body-md text-white/60 hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between body-sm text-white/40">
          <p>
            © {new Date().getFullYear()} {siteConfig.title}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-3">
            <Link href="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
            <Link
              href="https://escdev.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-white transition-colors"
              aria-label="Feito com carinho por EscDev"
            >
              <span>Feito com carinho por:</span>
              <Image
                src={escLogo}
                alt="EscDev"
                className="h-[42px] w-auto"
                unoptimized
              />
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export { Footer }
