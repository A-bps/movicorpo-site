# Guia de edição — site MoviCorpo (demonstração)

**Limitação, dita com franqueza:** este ambiente não tem servidor nem banco de dados, então **não existe painel administrativo**. Em vez de criar um painel de enfeite, todo o conteúdo editável fica em **um único arquivo de texto**: `conteudo/dados.js`. Para publicar a alteração, o arquivo editado é enviado para a hospedagem. Um painel com login e persistência exigiria um serviço de backend (decisão a tomar na fase de publicação).

## O que editar (tudo em `conteudo/dados.js`)
| Quero mudar | Onde no arquivo |
|---|---|
| Endereço, telefone ou WhatsApp de uma unidade | `unidades` → `eldorado` / `bosque-da-felicidade` (`whatsapp` define para onde vai cada consulta) |
| Horários das turmas | `turmas` (dias, horas, status). Uma linha = um conjunto de dias e horários |
| Incluir nova modalidade no seletor | `modalidades` + nova linha em `turmas` |
| Textos das modalidades | `servicos` |
| Equipe (cargo, resumo, foto, registro) | `equipe` (campos vazios ficam ocultos) |
| TotalPass | `totalpass` |
| Eventos | `eventos` |
| Perguntas frequentes | `faq` |
| Fotos | `fotos` (colocar o arquivo autorizado em uma pasta `fotos/` e preencher `src`, `alt`) |
| Depoimentos | `depoimentos` (só com autorização e texto aprovado; vazio = seção oculta) |
| Data "última revisão da grade" | `config.atualizadoEm` — **edite à mão** a cada revisão; não muda sozinha |

## Situação editorial (campo `status`)
- `"rascunho"`: aparece na demonstração, mas ainda não foi validado pela equipe.
- `"confirmado"`: validado.
- `"inativo"`: nunca aparece.
Quando tudo estiver validado, troque para `"confirmado"` e coloque `config.mostrarRascunho = false`: o site passa a exibir só o que está confirmado.
Horários de turma **não** viram horário geral de funcionamento: o site só mostra a programação de cada turma.

## Mensagens do WhatsApp
Todas abrem o WhatsApp com texto pronto que a pessoa precisa enviar. Nada é enviado sozinho e o site nunca diz "agendamento confirmado". O site não coleta sintomas nem dados de saúde.

## Medição de cliques (desligada)
Os botões de WhatsApp têm o atributo `data-medir` (ex.: `bosque-da-felicidade:pilates`). Com `config.medicao.ativo = true`, o site dispara um evento local `movi:clique` com o alvo; **nenhum rastreador é instalado e nada é enviado a lugar nenhum**. Para medir de verdade, será preciso escolher uma ferramenta, ligar o ouvinte desse evento e publicar uma política de privacidade que descreva a prática real.

## Testar no computador
```bash
node servir.js
```
Abra http://localhost:5174

## Publicação (depois da aprovação)
Ver `publicacao/LEIA-ME.md` (remover noindex, definir domínio, sitemap, dados estruturados).

## Fotos e animações (versão 3, 06/11/2026)
- As fotos de exercícios são **fotos de banco de imagens** (Unsplash), não da MoviCorpo. Ficam em `assets/fotos/` e são declaradas em `conteudo/dados.js → imagens` (arquivo, texto alternativo, ponto de foco). Créditos em `interno/CREDITOS-FOTOS.md`.
- **Para trocar por foto autorizada:** coloque a foto em `assets/fotos/` com o mesmo nome-base (`pilates1-700.webp`, `-1200.webp`, `-1800.webp`) e ajuste `alt` e `pos` da chave. Os avisos "foto ilustrativa" foram retirados do site a pedido (06/11/2026); a origem das fotos continua registrada em `interno/CREDITOS-FOTOS.md`.
- **Página inicial em modo cinema (tema escuro):** a foto grande fica ao fundo, com degradê, e o texto aparece na parte de baixo. Ao rolar, a foto troca a cada capítulo (Início, Pilates, Funcional, 60+, Fisioterapia, Miofascial) com zoom lento ligado à rolagem, e uma barra lateral à direita mostra onde você está. A rolagem é a normal do navegador. A ordem, os textos e a foto de cada capítulo vêm de `servicos` em `conteudo/dados.js` (campo `foto`); a foto do capítulo inicial é a chave `pilates1`, definida em `js/site.js` (função `cine`).
- **Páginas internas** usam a foto como fundo do topo, com degradê. Botões e etiquetas têm efeito de vidro (transparente).
- **Versões anteriores guardadas** (rodam com o `servir.js` de cada pasta): `esboco-2-ilustracoes/` (desenhos animados) e `esboco-3-fotos-claro/` (fotos em cartões, tema claro, scrollytelling com foto fixa ao lado do texto).
- Quem tem "movimento reduzido" ativado no aparelho vê tudo parado e legível.

## Feedbacks (aba "Feedbacks" e destaque na página inicial)
- Ficam em `depoimentos` no `conteudo/dados.js`: `{ autorizado, tema, destaque, texto }`. Todos aparecem no mesmo padrão visual, sem nome e sem foto.
- `autorizado: false` tira o relato do ar. `destaque: true` coloca no carrossel da página inicial. `tema` alimenta os filtros da página /feedbacks/.
- Para acrescentar um feedback novo: copie uma linha, cole o texto e escolha o tema. Não é preciso mexer em mais nada.
