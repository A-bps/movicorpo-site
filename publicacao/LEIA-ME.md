# Preparação para publicação (só depois da aprovação do cliente)

1. **Domínio:** definir e substituir `DOMINIO-A-DEFINIR` em `sitemap.xml`.
2. **noindex:** a demonstração tem `<meta name="robots" content="noindex, nofollow">` em todas as páginas. Remover na publicação aprovada. Isso não é controle de acesso: para restringir a visita, usar senha na hospedagem.
3. **Faixa de demonstração:** `config.demo = false` em `conteudo/dados.js`.
4. **Sitemap:** copiar `sitemap.xml` para a raiz do site publicado. Adicionar a linha `Sitemap:` num `robots.txt` só na publicação.
5. **Canonical e og:url:** incluir com o domínio real.
6. **Dados estruturados:** `schema-modelo.json` usa só nome e Instagram. Acrescentar endereço e telefone depois que estiverem validados. Não acrescentar notas, avaliações, preços nem horários gerais.
7. **Imagem de compartilhamento:** `assets/og.png` é o logo sobre fundo gelo; trocar por foto autorizada se houver.
8. **Privacidade/medição:** só ativar medição depois de escolher a ferramenta e publicar uma política que descreva a prática real. Nenhum banner de cookies foi criado porque nenhum cookie ou rastreador é usado.
