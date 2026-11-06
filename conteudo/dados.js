/* ============================================================
   MoviCorpo — CONTEÚDO CENTRAL DO SITE (único arquivo que o proprietário precisa editar)
   Leia: GUIA-DE-EDICAO.md
   - status: "rascunho" (aparece na demonstração, ainda sem validação), "confirmado" (validado pela equipe)
             ou "inativo" (nunca aparece no site).
   - config.mostrarRascunho = false  → o site passa a mostrar SOMENTE o que estiver "confirmado".
   - Nada aqui é preço, promoção, depoimento ou título profissional: o que não foi confirmado fica vazio.
   - Disponibilidade NÃO é vaga em tempo real: são horários de programação que a equipe confirma no WhatsApp.
   ============================================================ */
window.MOVI = {

  config: {
    demo: true,                      // true = mostra a faixa "demonstração" e mantém noindex nas páginas
    atualizadoEm: "2026-11-06",      // EDITE À MÃO quando a grade for revisada (não muda sozinha)
    mostrarRascunho: true,
    instagram: "https://www.instagram.com/movi.corpo/",
    whatsappPrincipal: "5517992041780",
    telefonePrincipal: "(17) 99204-1780",
    cidade: "São José do Rio Preto, SP",
    medicao: { ativo: false }        // ver GUIA-DE-EDICAO.md (nenhum rastreador é instalado por padrão)
  },

  /* ---------- Unidades ----------
     whatsapp: número que recebe as consultas daquela unidade (roteamento editável).
     mapa: deixe null até validar a localização; só então aparece "Como chegar". */
  unidades: {
    eldorado: {
      status: "rascunho",
      nome: "Eldorado",
      rotulo: "Matriz",
      no: "no Eldorado",
      endereco: "Mato Grosso, 685 — Eldorado",
      cidade: "São José do Rio Preto, SP",
      whatsapp: "5517992041780",
      telefone: "(17) 99204-1780",
      mapa: null,
      foto: null
    },
    "bosque-da-felicidade": {
      status: "rascunho",
      nome: "Bosque da Felicidade",
      rotulo: "Unidade 2",
      no: "no Bosque da Felicidade",
      endereco: "Rua Rubens Scrignolli, 1015",
      cidade: "São José do Rio Preto, SP",
      whatsapp: "5517991249318",
      telefone: "(17) 99124-9318",
      mapa: null,
      foto: null
    },
    /* Locais históricos: NÃO aparecem. Só entram quando o proprietário confirmar. */
    "vila-diniz-gibi-thai": {
      status: "inativo",
      nome: "Vila Diniz (parceria Gibi Thai)",
      endereco: "Rua Luiz Pinto de Moraes, 371",
      observacao: "Parceria divulgada em 2026; Pilates terça/quinta 07h–08h. Aguardando confirmação."
    },
    "boa-vista-basilica": {
      status: "inativo",
      nome: "Boa Vista / Basílica",
      observacao: "Aparece em posts de 2025. Fora das unidades ativas."
    }
  },

  /* ---------- Modalidades (rótulos usados no seletor e nas mensagens) ---------- */
  modalidades: {
    pilates:   { nome: "Pilates solo",            curto: "Pilates",             mensagem: "Pilates" },
    funcional: { nome: "Treinamento funcional",   curto: "Funcional",           mensagem: "treinamento funcional" }
  },

  /* ---------- Grade de turmas (programação publicada, NÃO vagas) ----------
     Cada linha vira um horário por dia. Para editar: mude dias/horas ou troque status. */
  turmas: [
    // Pilates — Eldorado (publicação de 07/10/2026)
    { modalidade: "pilates",   unidade: "eldorado", dias: ["seg","qua","sex"],              horas: ["07:00","08:00"], status: "rascunho" },
    { modalidade: "pilates",   unidade: "eldorado", dias: ["seg","ter","qua","qui","sex"],  horas: ["18:00"],         status: "rascunho" },
    { modalidade: "pilates",   unidade: "eldorado", dias: ["seg","ter","qua","qui"],        horas: ["19:00"],         status: "rascunho" },
    // Funcional — Eldorado. O sábado 09h também foi divulgado como "60+": é a MESMA turma, não cadastrar outra.
    { modalidade: "funcional", unidade: "eldorado", dias: ["ter","qui"],                    horas: ["07:00"],         status: "rascunho" },
    { modalidade: "funcional", unidade: "eldorado", dias: ["sab"],                          horas: ["09:00"],         status: "rascunho", mais60: true },
    // Pilates — Bosque da Felicidade (publicação de 22/10/2026)
    { modalidade: "pilates",   unidade: "bosque-da-felicidade", dias: ["seg","qua"],        horas: ["18:00"],         status: "rascunho" },
    { modalidade: "pilates",   unidade: "bosque-da-felicidade", dias: ["seg","qua","sex"],  horas: ["19:00"],         status: "rascunho" }
  ],

  /* ---------- Fotos ----------
     Enquanto null, o site mostra uma composição gráfica abstrata. Para usar uma foto AUTORIZADA:
     coloque o arquivo em /fotos/ e escreva { src: "fotos/aula-01.jpg", alt: "Descrição real da foto", w: 1600, h: 1000 }. */
  fotos: {
    hero: null,
    pilates: null,
    funcional: null,
    fisioterapia: null,
    historia: null,
    eventos: null,
    galeria: []                      // lista de { src, alt, w, h } — se vazia, a seção Comunidade (galeria) fica oculta
  },

  /* ---------- Fotos ilustrativas de banco de imagens (Unsplash, licença livre) ----------
     NÃO são fotos da MoviCorpo: servem para a demonstração e devem ser trocadas por fotos autorizadas.
     Arquivos em assets/fotos/<chave>-700|1200|1800.webp. pos = ponto de foco do recorte. Créditos: interno/CREDITOS-FOTOS.md. */
  imagens: {
    pilates1:   { w: 2000, h: 2667, pos: "50% 55%", alt: "Três mulheres deitadas em colchonetes, cada uma com uma perna estendida para o alto, em uma sala clara" },
    pilates2:   { w: 2000, h: 1335, pos: "62% 55%", alt: "Pessoas sentadas em colchonetes alongando as pernas à frente, em um estúdio com janelas" },
    funcional1: { w: 2000, h: 1333, pos: "50% 42%", alt: "Cinco mulheres em pé, lado a lado, levantando halteres acima da cabeça em um salão amplo" },
    funcional3: { w: 2000, h: 1333, pos: "34% 40%", alt: "Mulher esticando faixas elásticas acima da cabeça durante uma aula em grupo" },
    mais60a:    { w: 2000, h: 1333, pos: "40% 34%", alt: "Mulher idosa de camiseta listrada se exercitando em pé durante uma aula em grupo, com cadeiras ao redor" },
    mais60b:    { w: 2000, h: 1333, pos: "50% 40%", alt: "Pessoas mais velhas sentadas em cadeiras exercitando os braços com faixas elásticas coloridas" },
    fisio1:     { w: 2000, h: 1334, pos: "58% 45%", alt: "Fisioterapeuta apoiando o joelho de uma pessoa deitada em uma maca azul" },
    fisio2:     { w: 2000, h: 1333, pos: "50% 50%", alt: "Profissional orientando uma pessoa que segura halteres leves nas duas mãos" },
    miofascial: { w: 2000, h: 1333, pos: "30% 62%", alt: "Homem deitado sobre um rolo de liberação apoiado em um tapete, com as mãos atrás da cabeça" }
  },

  /* ---------- Modalidades da home e das páginas ---------- */
  servicos: [
    {
      id: "pilates", status: "rascunho", foto: "pilates2", nome: "Pilates solo", pagina: "pilates-solo/", arte: 0,
      resumo: "Aulas no solo, com colchonetes e acessórios como bola, faixa elástica, overball e arco, com orientação profissional.",
      comecar: "Escolha uma unidade e um horário no seletor e consulte a disponibilidade e as condições com a equipe.",
      cta: "Consultar Pilates", mensagem: "Olá! Vim pelo site e gostaria de saber sobre as aulas de Pilates solo. Quais unidades e horários estão disponíveis? Gostaria de conhecer os planos e as condições."
    },
    {
      id: "funcional", status: "rascunho", foto: "funcional1", nome: "Treinamento funcional", pagina: "treinamento-funcional/", arte: 1,
      resumo: "Treino em grupo no Eldorado, em horários de manhã e aos sábados.",
      comecar: "Consulte os horários e pergunte à equipe sobre a aula experimental.",
      cta: "Consultar aula experimental", mensagem: "Olá! Vim pelo site e gostaria de saber sobre o treinamento funcional no Eldorado. Há disponibilidade? Gostaria de consultar a aula experimental."
    },
    {
      id: "mais60", status: "rascunho", foto: "mais60a", nome: "Funcional 60+", pagina: "treinamento-funcional/#mais-60", arte: 2,
      resumo: "A proposta de funcional também foi apresentada para o público 60+. Consulte a equipe sobre a turma de sábado, às 09h, no Eldorado.",
      comecar: "A equipe confirma a turma e a melhor opção para você.",
      cta: "Consultar turma 60+", mensagem: "Olá! Vim pelo site e gostaria de saber sobre o funcional para o público 60+, aos sábados às 09h no Eldorado. Há disponibilidade?"
    },
    {
      id: "fisioterapia", status: "rascunho", foto: "fisio1", nome: "Fisioterapia", pagina: "fisioterapia/", arte: 3,
      resumo: "Atendimento individual com a equipe. A conversa começa pela avaliação profissional.",
      comecar: "Fale com a equipe para saber como funciona o atendimento, a unidade e os horários.",
      cta: "Consultar atendimento", mensagem: "Olá! Vim pelo site e gostaria de saber como funciona o atendimento de fisioterapia na MoviCorpo e como agendar uma avaliação."
    },
    {
      id: "miofascial", status: "rascunho", foto: "miofascial", nome: "Liberação miofascial", pagina: "fisioterapia/#liberacao-miofascial", arte: 4,
      resumo: "Técnica citada nas publicações da MoviCorpo. Disponibilidade e indicação são definidas pela equipe, sob consulta.",
      comecar: "Pergunte à equipe se a técnica faz sentido para o seu caso.",
      cta: "Consultar liberação miofascial", mensagem: "Olá! Vim pelo site e gostaria de saber sobre a liberação miofascial. Como funciona a consulta?"
    }
  ],

  /* ---------- Equipe: só aparece o que estiver preenchido. Não inventar títulos. ---------- */
  equipe: [
    { nome: "Dra. Beatriz de Deus", papel: "", resumo: "", foto: null,
      registro: "", formacao: "", especializacoes: "" },   // registro/formação/especializações ficam ocultos até haver dado verificado
    { nome: "Dr. Jhon Hesley", papel: "", resumo: "", foto: null,
      registro: "", formacao: "", especializacoes: "" }
  ],

  /* ---------- TotalPass ---------- */
  totalpass: {
    status: "rascunho",
    titulo: "Seu benefício também pode fazer parte da sua rotina de movimento.",
    texto: "Alguns horários aceitam o TotalPass. São horários específicos, com vagas limitadas por turma, e a consulta e o agendamento prévios com a equipe são necessários. Confirme com a equipe se o seu plano é elegível.",
    passos: [
      { t: "Consulte horários e elegibilidade", d: "Fale com a equipe e veja quais aulas aceitam o TotalPass." },
      { t: "Agende com a equipe", d: "O horário é combinado antes, porque as vagas por turma são limitadas." },
      { t: "Faça o check-in no aplicativo", d: "No dia da aula, o check-in é feito no aplicativo TotalPass." }
    ],
    cta: "Consultar aulas pelo TotalPass",
    mensagem: "Olá! Vim pelo site e tenho TotalPass. Gostaria de saber quais aulas aceitam o benefício, os horários disponíveis e como fazer o agendamento."
  },

  /* ---------- Eventos (histórico, com ano; não é serviço diário) ---------- */
  eventos: [
    { status: "rascunho", nome: "Alpha Games", ano: 2025,
      texto: "Participação divulgada em 2025 com uma área de recovery para atletas e público, incluindo liberação miofascial, imersão no gelo e, segundo a divulgação do evento, dry needling.",
      fotos: [] },
    { status: "rascunho", nome: "Corrida Rodobens", ano: 2025,
      texto: "Participação divulgada em 2025 com recovery para os corredores, incluindo liberação miofascial e imersão no gelo.",
      fotos: [] }
  ],

  /* ---------- Feedbacks (depoimentos de alunos) ----------
     Mensagens reais recebidas pela equipe e divulgadas nos stories "Feedback" do Instagram. Transcritas sem nome e sem foto,
     com ajustes mínimos de pontuação. PENDENTE: aprovação da equipe MoviCorpo e dos autores (ver interno/CHECKLIST-CLIENTE.md).
     Para tirar um relato do ar, mude autorizado para false. destaque: true = aparece no carrossel da página inicial.
     tema: "Dores e mobilidade", "Rotina e disposição", "Comunidade" ou "Carinho com a equipe" (usado nos filtros). */
  depoimentos: [
    { autorizado: true, tema: "Dores e mobilidade", destaque: true, texto: "Pilates pra mim foi uma nova página na minha vida. Eu antes do Pilates era uma mulher cheia de dores; depois do Pilates sou uma mulher com muito mais disposição, ânimo e bem menos dores. Gratidão à vcs, Bia e John, por tanto empenho e determinação com a equipe que formamos." },
    { autorizado: true, tema: "Rotina e disposição", destaque: true, texto: "Eu era extremamente sedentária, sempre arrumava uma desculpa pra não me exercitar. Hoje estou muito mais disposta, sem dores de coluna, joelho, etc. Aprendo com vcs que ter mobilidade é o melhor que podemos fazer a nós mesmos. Obrigada por tudo!" },
    { autorizado: true, tema: "Comunidade", destaque: true, texto: "O Pilates, além de mudar minha vida, proporciona esses momentos de confraternização e novos amigos. Gratidão por tudo!" },
    { autorizado: true, tema: "Rotina e disposição", destaque: false, texto: "Eu que nunca fiz nenhuma atividade física, além de caminhada leve, senti nesses dois meses melhora na elasticidade do corpo e na força dos braços. Está sendo muito bom!" },
    { autorizado: true, tema: "Dores e mobilidade", destaque: false, texto: "A minha experiência no Pilates é maravilhosa. Quando comecei a fazer, não conseguia nem ajoelhar. Hoje minhas dores melhoraram muito." },
    { autorizado: true, tema: "Rotina e disposição", destaque: false, texto: "Hoje tenho a rotina de fazer um exercício, melhorou minhas dores no punho e ombros. Eu, de fato, estou adorando! Obrigada!" },
    { autorizado: true, tema: "Dores e mobilidade", destaque: false, texto: "O Pilates é a atividade física com que mais me identifiquei. Tem me ajudado muito, tanto fisicamente como mentalmente. Aliviou minhas dores, criei mais força, principalmente nas pernas e abdômen. Estou muito feliz por fazer algo com prazer." },
    { autorizado: true, tema: "Rotina e disposição", destaque: false, texto: "Pra mim, fazer Pilates foi uma das melhores escolhas que fiz. Percebo que hoje estou bem melhor que quando comecei, porque eu estava simplesmente travada. O Pilates me ajuda muito também na parte psicológica. Só tenho a agradecer e, com certeza, super indico." },
    { autorizado: true, tema: "Rotina e disposição", destaque: false, texto: "Eu estou amando o Pilates, tem me ajudado muito com as minhas dores. Melhor escolha que fiz foi começar a fazer Pilates." },
    { autorizado: true, tema: "Rotina e disposição", destaque: false, texto: "Amei a aula! Estou quebrada, mas super bem. Estava precisando muito." },
    { autorizado: true, tema: "Comunidade", destaque: false, texto: "Obrigada por mostrar pra minha mãe o quanto é maravilhoso se priorizar, se cuidar. Ela está apaixonada por tudo: pelas aulas, por vc, pelas novas amigas." },
    { autorizado: true, tema: "Carinho com a equipe", destaque: false, texto: "Parabéns a vocês por nos ajudar a cuidar da nossa saúde. Vocês são muito top. Deus nos abençoe sempre." },
    { autorizado: true, tema: "Carinho com a equipe", destaque: false, texto: "Vocês são muito dedicados e merecem todo sucesso na profissão e na vida. Obrigada pela dedicação e carinho com a gente." },
    { autorizado: true, tema: "Carinho com a equipe", destaque: false, texto: "Agradecemos a profissional incrível que você é e o Jhon, que sempre fazem tudo para acontecer da melhor forma, pois fazem o que gostam e sempre com uma dose generosa de amor, carinho, dedicação, comprometimento e profissionalismo." }
  ],

  /* ---------- Perguntas frequentes ---------- */
  faq: [
    { status: "rascunho", p: "Quais modalidades a MoviCorpo divulga?",
      r: "Pilates solo, treinamento funcional (incluindo uma proposta para o público 60+) e fisioterapia, com liberação miofascial sob consulta." },
    { status: "rascunho", p: "Como consulto uma turma?",
      r: "Use o seletor “Encontre sua turma”, escolha o horário e toque em “Consultar disponibilidade”. O WhatsApp abre com uma mensagem pronta, que você revisa e envia." },
    { status: "rascunho", p: "Em quais unidades a MoviCorpo atende?",
      r: "Neste momento, o site apresenta duas unidades: Eldorado e Bosque da Felicidade." },
    { status: "rascunho", p: "Consultar um horário é o mesmo que reservar a vaga?",
      r: "Não. O site mostra a programação publicada. A disponibilidade e o agendamento são confirmados pela equipe, no WhatsApp." },
    { status: "rascunho", p: "Como funciona a consulta pelo TotalPass?",
      r: "Há horários específicos, com vagas limitadas por turma. Consulte e agende antes com a equipe e, no dia da aula, faça o check-in no aplicativo TotalPass." },
    { status: "rascunho", p: "Como peço informações sobre planos e valores?",
      r: "Consulte planos e condições com a equipe pelo WhatsApp da unidade." },
    { status: "rascunho", p: "Preciso ter experiência?",
      r: "A equipe conversa com você sobre como começar. Consulte pelo WhatsApp." },
    { status: "rascunho", p: "Quanto tempo dura a aula?",
      r: "Confirme a duração ao consultar o horário com a equipe." },
    { status: "rascunho", p: "A aula experimental é gratuita?",
      r: "As condições da aula experimental dependem da modalidade e do período. Pergunte à equipe." },
    { status: "rascunho", p: "Há reposição de aulas?",
      r: "Consulte a equipe sobre as regras de reposição." }
  ],

  /* ---------- Ofertas e descontos de parceiros: NADA ativo. ----------
     Parceria Team Rafa Silva (percentuais sem vigência): não publicar até haver condições escritas. */
  ofertas: []
};
