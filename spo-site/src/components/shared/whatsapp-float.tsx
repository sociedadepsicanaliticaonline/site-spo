import { MessageCircle } from "lucide-react"
import { siteConfig } from "@/config/site"

function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.whatsapp}`
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar pelo WhatsApp"
      title="Falar pelo WhatsApp"
      className="group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-[60] inline-flex items-center justify-center"
    >
      <span
        aria-hidden="true"
        className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping"
      />
      <span className="relative inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 hover:bg-[#1ebe5b] hover:scale-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40 transition-all duration-200"
      >
        <MessageCircle className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.25} />
      </span>
    </a>
  )
}

export { WhatsAppFloat }
