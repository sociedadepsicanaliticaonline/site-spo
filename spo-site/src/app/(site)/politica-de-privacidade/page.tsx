import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade e proteção de dados da Sociedade Psicanalítica Online.",
  alternates: { canonical: `${siteConfig.url}/politica-de-privacidade` },
}

export default function PrivacidadePage() {
  return (
    <>
      <HeroSection
        variant="internal"
        title="Política de Privacidade"
        subtitle="Proteção de Dados"
        description="A SPO está comprometida com a proteção da sua privacidade. Esta política explica como coletamos, usamos e protegemos seus dados pessoais."
        badge="LGPD"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-3xl space-y-10">
          <div className="space-y-4">
            <h2 className="heading-md text-text">1. Introdução</h2>
            <p className="body-md text-text-light leading-relaxed">
              A Sociedade Psicanalítica Online ("SPO"), inscrita sob o CNPJ 00.000.000/0001-00,
              leva a sério a privacidade dos seus usuários e alunos. Esta Política de Privacidade
              descreve como tratamos os dados pessoais coletados em nosso site, plataforma de
              ensino e demais serviços.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">2. Dados Coletados</h2>
            <p className="body-md text-text-light leading-relaxed">
              Podemos coletar as seguintes informações pessoais quando você utiliza nossos serviços:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-md text-text-light">
              <li>Nome completo</li>
              <li>Endereço de email</li>
              <li>Número de telefone</li>
              <li>Informações profissionais (formação, área de atuação)</li>
              <li>Dados de navegação (cookies, páginas visitadas)</li>
              <li>Informações de pagamento (processadas por gateway seguro)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">3. Finalidade do Tratamento</h2>
            <p className="body-md text-text-light leading-relaxed">
              Seus dados são utilizados para as seguintes finalidades:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-md text-text-light">
              <li>Processamento de matrículas e inscrições em seminários e eventos</li>
              <li>Comunicação sobre serviços, novidades e conteúdo educacional</li>
              <li>Melhoria da experiência de navegação e aprendizado</li>
              <li>Envio de certificados e materiais didáticos</li>
              <li>Cumprimento de obrigações legais e regulatórias</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">4. Compartilhamento de Dados</h2>
            <p className="body-md text-text-light leading-relaxed">
              A SPO não compartilha seus dados pessoais com terceiros para fins de marketing.
              Podemos compartilhar dados com processadores de pagamento, plataforma de hospedagem
              e ferramentas de análise, sempre sob contrato que garanta a proteção adequada dos dados.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">5. Direitos do Titular</h2>
            <p className="body-md text-text-light leading-relaxed">
              Nos termos da Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), você tem direito a:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-md text-text-light">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a exclusão dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Solicitar a portabilidade dos dados</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">6. Segurança</h2>
            <p className="body-md text-text-light leading-relaxed">
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra
              acesso não autorizado, destruição, perda ou alteração. Utilizamos criptografia SSL/TLS
              em todas as transmissões de dados e seguimos as melhores práticas de segurança da informação.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">7. Cookies</h2>
            <p className="body-md text-text-light leading-relaxed">
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para
              melhorar sua experiência. Você pode gerenciar as preferências de cookies nas
              configurações do seu navegador.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">8. Alterações nesta Política</h2>
            <p className="body-md text-text-light leading-relaxed">
              Esta política pode ser atualizada periodicamente. Recomendamos que você revise esta
              página regularmente para se manter informado sobre como protegemos seus dados.
              Alterações significativas serão comunicadas por email.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">9. Contato</h2>
            <p className="body-md text-text-light leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato
              conosco através do email privacidade@spo.com.br ou pelo formulário de contato em nosso site.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        variant="horizontal"
        title="Ainda tem dúvidas?"
        description="Entre em contato conosco para mais informações sobre nossa política de privacidade."
        cta={{ id: "cta-privacidade", title: "", description: "", buttonText: "Fale Conosco", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
