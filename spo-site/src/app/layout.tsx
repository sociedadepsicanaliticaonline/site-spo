import type { Metadata } from "next"
import { playfairDisplay, inter } from "@/lib/fonts"
import { Providers } from "@/providers"
import { siteConfig } from "@/config/site"
import { SkipLink } from "@/components/ui/skip-link/skip-link"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: siteConfig.seo.titleTemplate,
  },
  description: siteConfig.seo.defaultDescription,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.seo.defaultDescription,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.seo.defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-background text-text antialiased">
        <SkipLink />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
