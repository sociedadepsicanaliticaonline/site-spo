import { HeroSection } from "@/components/sections/hero-section"
import { CTASection } from "@/components/sections/cta-section"
import { Container } from "@/components/layout/container"
import { siteConfig } from "@/config/site"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos e condições de uso da plataforma da Sociedade Psicanalítica Online.",
  alternates: { canonical: `${siteConfig.url}/termos-de-uso` },
}

export default function TermosPage() {
  return (
    <>
      <HeroSection
        variant="internal"
        title="Termos de Uso"
        subtitle="Condições Gerais"
        description="Os termos e condições gerais de uso da plataforma e serviços oferecidos pela Sociedade Psicanalítica Online."
        badge="Versão 1.0 — 2024"
      />

      <section className="py-16 md:py-24 bg-white">
        <Container className="max-w-3xl space-y-10">
          <div className="space-y-4">
            <h2 className="heading-md text-text">1. Aceitação dos Termos</h2>
            <p className="body-md text-text-light leading-relaxed">
              Ao acessar ou utilizar o site, a plataforma de ensino e os serviços da Sociedade
              Psicanalítica Online ("SPO"), você concorda com os termos e condições descritos neste
              documento. Caso não concorde com qualquer parte destes termos, solicitamos que não
              utilize nossos serviços.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">2. Definições</h2>
            <p className="body-md text-text-light leading-relaxed">
              Para os fins destes Termos de Uso, considera-se:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-md text-text-light">
              <li><strong className="text-text">SPO</strong> — Sociedade Psicanalítica Online, responsável pela plataforma e serviços.</li>
              <li><strong className="text-text">Usuário</strong> — toda pessoa física que acessa o site ou utiliza os serviços.</li>
              <li><strong className="text-text">Aluno</strong> — usuário matriculado em um seminário ou programa de formação.</li>
              <li><strong className="text-text">Plataforma</strong> — ambiente virtual de aprendizagem e site institucional.</li>
              <li><strong className="text-text">Conteúdo</strong> — materiais didáticos, videoaulas, textos e demais recursos disponibilizados.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">3. Cadastro e Matrícula</h2>
            <p className="body-md text-text-light leading-relaxed">
              Para se matricular em um seminário, o usuário deve fornecer informações precisas e atualizadas.
              O usuário é responsável pela confidencialidade de seus dados de acesso e por todas as
              atividades realizadas em sua conta. A SPO se reserva o direito de cancelar matrículas
              em caso de informações falsas ou uso inadequado da plataforma.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">4. Propriedade Intelectual</h2>
            <p className="body-md text-text-light leading-relaxed">
              Todo o conteúdo disponibilizado na plataforma — incluindo videoaulas, textos, imagens,
              apresentações e materiais complementares — é de propriedade exclusiva da SPO ou de
              seus licenciantes. É proibida a reprodução, distribuição, modificação ou comercialização
              do conteúdo sem autorização expressa por escrito.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">5. Conduta do Usuário</h2>
            <p className="body-md text-text-light leading-relaxed">
              O usuário se compromete a utilizar a plataforma de forma ética e respeitosa, abstendo-se de:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-md text-text-light">
              <li>Compartilhar credenciais de acesso com terceiros</li>
              <li>Gravar, reproduzir ou distribuir conteúdo das aulas sem autorização</li>
              <li>Utilizar a plataforma para fins ilícitos ou não autorizados</li>
              <li>Desrespeitar professores, colegas ou membros da equipe SPO</li>
              <li>Tentar burlar sistemas de segurança ou acesso restrito</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">6. Pagamentos e Reembolsos</h2>
            <p className="body-md text-text-light leading-relaxed">
              Os pagamentos são processados através de gateway de pagamento seguro. O aluno tem
              direito de solicitar reembolso integral em até 7 dias corridos após a matrícula,
              conforme previsto no Código de Defesa do Consumidor. Após esse período, o reembolso
              será avaliado caso a caso pela administração da SPO.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">7. Certificados</h2>
            <p className="body-md text-text-light leading-relaxed">
              Os certificados são emitidos ao final de cada seminário, mediante cumprimento dos requisitos
              de carga horária e avaliação. Os certificados são válidos como formação complementar
              e aprimoramento profissional, nos termos da legislação aplicável.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">8. Limitação de Responsabilidade</h2>
            <p className="body-md text-text-light leading-relaxed">
              A SPO não se responsabiliza por danos indiretos, lucros cessantes ou perda de
              oportunidades decorrentes do uso ou da impossibilidade de uso da plataforma.
              A responsabilidade máxima da SPO se limita ao valor pago pelo usuário pelo serviço
              contratado.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="heading-md text-text">9. Disposições Gerais</h2>
            <p className="body-md text-text-light leading-relaxed">
              Estes Termos de Uso são regidos pela legislação brasileira. Fica eleito o foro da
              Comarca de São Paulo para dirimir quaisquer controvérsias. A SPO pode alterar estes
              termos a qualquer momento, comunicando os usuários com antecedência razoável.
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        variant="horizontal"
        title="Dúvidas sobre os termos?"
        description="Estamos à disposição para esclarecer qualquer questão."
        cta={{ id: "cta-termos", title: "", description: "", buttonText: "Fale Conosco", buttonHref: `https://wa.me/${siteConfig.whatsapp}`, variant: "primary" }}
      />
    </>
  )
}
