import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Logo } from "@/components/shared/logo"
import { SocialIcons } from "@/components/shared/social-icons"
import { footerColumns } from "@/data/footer"
import { siteConfig } from "@/config/site"
import { Newsletter } from "@/components/shared/newsletter"

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
        <div className="mt-12 pt-8 border-t border-white/10">
          <Newsletter variant="light" />
        </div>
      </Container>
      <div className="border-t border-white/10 py-6">
        <Container className="flex flex-col md:flex-row items-center justify-between gap-4 body-sm text-white/40">
          <p>
            © {new Date().getFullYear()} {siteConfig.title}. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link href="/termos-de-uso" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/politica-de-privacidade" className="hover:text-white transition-colors">
              Privacidade
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}

export { Footer }
