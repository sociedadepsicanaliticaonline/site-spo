"use client"

import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

interface ContactSectionProps {
  title?: string
  subtitle?: string
  description?: string
  className?: string
}

function ContactSection({
  title = "Fale Conosco",
  subtitle,
  description,
  className,
}: ContactSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-white", className)}>
      <Container>
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/5 shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="body-md font-medium text-text">Email</h3>
                  <p className="body-md text-text-light">{siteConfig.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/5 shrink-0">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="body-md font-medium text-text">Telefone</h3>
                  <p className="body-md text-text-light">{siteConfig.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/5 shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="body-md font-medium text-text">Endereço</h3>
                  <p className="body-md text-text-light">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input placeholder="Nome" aria-label="Nome" />
              <Input type="email" placeholder="Email" aria-label="Email" />
            </div>
            <Input placeholder="Assunto" aria-label="Assunto" />
            <Textarea placeholder="Sua mensagem" rows={5} aria-label="Mensagem" />
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="h-4 w-4" />
              Enviar Mensagem
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}

export { ContactSection }
