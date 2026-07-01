import type { FormacaoContent, FormacaoContentKey } from "@/types"

export const formacaoContents: FormacaoContent[] = [
  {
    id: "fc-nossa-proposta",
    key: "nossa-proposta",
    content: `<p>A proposta de formação continuada da <strong>Sociedade Psicanalítica Online</strong> se inscreve na tradição freudo-lacaniana e se sustenta sobre três eixos indissociáveis: <em>análise pessoal</em>, <em>supervisão</em> e <em>estudo teórico</em>.</p>
<p>Inspirada nos moldes de transmissão da psicanálise tal como foram propostos por Freud e relidos por Lacan, a SPO entende a formação como um percurso singular, que se faz no tempo de cada analista, a partir de seu próprio desejo e de seu trabalho com a clínica.</p>
<p>Mais do que cursos ou eventos pontuais, a formação continuada aqui proposta é um caminho: o de habitar a psicanálise — em sua teoria, em sua ética e em sua prática — atravessando a experiência do inconsciente.</p>
<p>Os dispositivos que oferecemos — seminários, cartéis, análises e supervisões — se articulam justamente para que cada analista possa construir, com rigor e liberdade, o seu percurso.</p>`,
    updatedAt: "2025-12-01",
  },
  {
    id: "fc-analises-intro",
    key: "analises-intro",
    content: `<p>A <strong>análise pessoal</strong> é o pilar fundador da formação do psicanalista. Foi Freud quem, ao formalizar a psicanálise, apontou que não basta ao analista conhecer a teoria: é preciso que ele próprio se submeta à experiência do inconsciente, em seu próprio tratamento.</p>
<p>Lacan, por sua vez, radicalizou essa proposição ao afirmar que <em>o analista só se autoriza por si mesmo</em>. Isso não exclui a análise pessoal — ao contrário, é a partir dela que essa autorização pode advir: o analista se constitui, em parte, pelo que a sua própria análise lhe permite descobrir sobre o seu desejo e sobre o seu modo de gozar.</p>
<p>Manter uma análise pessoal em curso, ao longo de toda a formação (e, para muitos, ao longo de toda a vida), é portanto uma condição ética e clínica. É também uma forma de não se instalar no lugar de quem tudo sabe, abrindo espaço para a surpresa e para o saber do inconsciente.</p>
<p>A SPO oferece, neste espaço, uma lista de analistas formados e em formação avançada, credenciados pela sociedade, com os quais é possível iniciar ou dar continuidade a um processo analítico. Todos atuam no campo da psicanálise lacaniana e estão habilitados a receber analisantes em diferentes estados e cidades do Brasil.</p>`,
    updatedAt: "2025-12-01",
  },
  {
    id: "fc-supervisoes-intro",
    key: "supervisoes-intro",
    content: `<p>A <strong>supervisão</strong> é, junto com a análise pessoal e o estudo teórico, um dos três pilares da formação psicanalítica. Ela consiste em um espaço regular de discussão da clínica, no qual o analista em formação apresenta casos e é escutado por um supervisor mais experiente.</p>
<p>Freud já recomendava, em seus <em>Recomendações ao médico que pratica a psicanálise</em>, que o analista se submetesse periodicamente à supervisão de um colega mais experiente, a fim de evitar pontos cegos e de sustentar a direção do tratamento. Lacan, por sua vez, criou o dispositivo do <em>passe</em> e formalizou a Escola como lugar de transmissão, no qual a supervisão ocupa um lugar central.</p>
<p>Supervisionar é, em última instância, sustentar a clínica do impossível: lembrar ao analista, diante do caso que parece não se mover, que o inconsciente não se controla — mas que há direção possível do tratamento. É também partilhar as angústias próprias do ofício, a fim de que o analista não fique sozinho diante do que a clínica lhe apresenta.</p>
<p>A SPO oferece, nesta página, uma lista de supervisões regulares conduzidas por psicanalistas com experiência clínica e de ensino. Os grupos acontecem em diferentes dias e formatos, presencial ou online, e podem ser procurados diretamente com o(a) supervisor(a).</p>`,
    updatedAt: "2025-12-01",
  },
]

export function getFormacaoContentByKey(key: FormacaoContentKey): FormacaoContent | undefined {
  return formacaoContents.find((item) => item.key === key)
}
