"use client"

import { Container } from "@/components/layout/container"
import { SectionHeader } from "@/components/sections/section-header"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import type { FAQ } from "@/types"

interface FAQSectionProps {
  title?: string
  subtitle?: string
  description?: string
  faqs: FAQ[]
  className?: string
}

function FAQSection({
  title = "Perguntas Frequentes",
  subtitle,
  description,
  faqs,
  className,
}: FAQSectionProps) {
  return (
    <section className={cn("py-16 md:py-24 bg-surface", className)}>
      <Container className="max-w-3xl">
        <SectionHeader title={title} subtitle={subtitle} description={description} />
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="bg-white rounded-lg border border-border px-6">
              <AccordionTrigger className="body-md font-medium text-text">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="body-md text-text-light">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}

export { FAQSection }
