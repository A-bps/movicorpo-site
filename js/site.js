/* MoviCorpo — montagem do site a partir de conteudo/dados.js. Sem build, sem rastreadores. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var D = window.MOVI, C = D.config;
  var RAIZ = document.body.getAttribute("data-raiz") || "";
  var PAGINA = document.body.getAttribute("data-pagina") || "";

  var DIAS = [
    ["seg", "Seg", "segunda-feira"], ["ter", "Ter", "terça-feira"], ["qua", "Qua", "quarta-feira"],
    ["qui", "Qui", "quinta-feira"], ["sex", "Sex", "sexta-feira"], ["sab", "Sáb", "sábado"]
  ];
  function diaLong(k) { for (var i = 0; i < DIAS.length; i++) if (DIAS[i][0] === k) return DIAS[i][2]; return k; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function hora(h) { return h.replace(":", "h").replace(/h00$/, "h"); }
  function ok(item) { return item && item.status !== "inativo" && (item.status === "confirmado" || C.mostrarRascunho); }
  function wa(numero, msg) { return "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg); }
  function waLink(numero, msg, rotulo, classe, medir, extra) {
    return '<a class="' + classe + '" href="' + wa(numero, msg) + '" target="_blank" rel="noopener" data-medir="' + esc(medir || "") + '"' + (extra || "") + '>' + rotulo + "</a>";
  }
  function unidadesAtivas() { var r = []; for (var k in D.unidades) if (ok(D.unidades[k])) r.push(k); return r; }
  function turmasLinhas() {
    var out = [];
    D.turmas.forEach(function (t) {
      if (!ok(t) || !ok(D.unidades[t.unidade])) return;
      t.dias.forEach(function (d) { t.horas.forEach(function (h) { out.push({ mod: t.modalidade, und: t.unidade, dia: d, hora: h, mais60: !!t.mais60 }); }); });
    });
    return out;
  }
  function msgTurma(l) {
    var u = D.unidades[l.und], m = D.modalidades[l.mod];
    return "Olá! Vim pelo site e gostaria de saber sobre " + m.mensagem + " " + u.no + ", " + diaLong(l.dia) + " às " + hora(l.hora) +
      ". Há disponibilidade? Gostaria de conhecer os planos e as condições da aula experimental.";
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- fotos (ilustrativas, de banco de imagens): ver dados.js → imagens ---------- */
  var IMG = D.imagens || {};
  function foto(k, o) {
    o = o || {}; var m = IMG[k]; if (!m) return "";
    var base = RAIZ + "assets/fotos/" + k + "-";
    return '<figure class="ph ' + (o.cls || "") + '" style="--pos:' + (m.pos || "50% 50%") + (o.ar ? ";--ar:" + o.ar : ";--ar:" + m.w + "/" + m.h) + '"><span class="ph-in"><img src="' + base + '1200.webp" srcset="' + base + "700.webp 700w, " + base + "1200.webp 1200w, " + base + '1800.webp 1800w" sizes="' + (o.sizes || "(min-width:1000px) 50vw, 100vw") + '" width="' + m.w + '" height="' + m.h + '" alt="' + esc(m.alt) + '" ' + (o.eager ? 'fetchpriority="high"' : 'loading="lazy"') + ' decoding="async"></span>' + (o.leg ? '<figcaption class="ph-leg">' + o.leg + "</figcaption>" : "") + "</figure>";
  }
  function marcaArte() {
    return '<div class="marca-arte" aria-hidden="true"><img src="' + RAIZ + 'assets/logo-mark.png" width="320" height="454" alt="" loading="lazy"><svg viewBox="0 0 400 400" focusable="false"><path class="tr desenha" d="M30 300 C 110 60, 230 360, 370 110" style="stroke-width:3"/><path class="tr fino desenha" d="M30 330 C 110 90, 230 390, 370 140" style="stroke:#42C4D3"/></svg></div>';
  }
  function celular() {
    return '<svg viewBox="0 0 220 380" aria-hidden="true"><rect x="10" y="10" width="200" height="360" rx="34" fill="none" stroke="#fff" stroke-width="6"/><rect x="82" y="22" width="56" height="9" rx="4.5" fill="#fff" opacity=".5"/>' +
      '<circle cx="110" cy="170" r="52" fill="#42C4D3" opacity=".25" class="pulso" style="transform-origin:110px 170px"/><circle cx="110" cy="170" r="42" fill="#42C4D3"/>' +
      '<path class="tr claro desenha-loop" d="M88 172 L105 190 L136 150" style="stroke:#123B56;stroke-width:9;stroke-linejoin:round"/><rect x="46" y="250" width="128" height="14" rx="7" fill="#fff" opacity=".85"/><rect x="66" y="278" width="88" height="10" rx="5" fill="#fff" opacity=".4"/></svg>';
  }
  function tracoFundo(y, flip) {
    return '<div class="traco-fundo" aria-hidden="true"><svg viewBox="0 0 1600 400" style="top:' + y + ';' + (flip ? "transform:scaleX(-1)" : "") + '"><path class="tr fino" style="stroke:#42C4D3;opacity:.55" d="M0 300 C 300 40, 500 420, 820 220 S 1300 60, 1600 200"/></svg></div>';
  }

  /* ---------- layout comum ---------- */
  function link(href, txt, id) { return '<a href="' + RAIZ + href + '"' + (PAGINA === id ? ' aria-current="page"' : "") + ">" + txt + "</a>"; }
  function montarLayout() {
    var h = "";
    if (C.demo) h += '<div class="demo" role="note">Demonstração de proposta. Horários, endereços e condições estão em validação com a equipe da MoviCorpo.</div>';
    h += '<a class="pular" href="#principal">Pular para o conteúdo</a>';
    h += '<header class="topo"><div class="wrap"><a class="logo" href="' + RAIZ + './" aria-label="MoviCorpo, página inicial"><img src="' + RAIZ + 'assets/logo.png" width="640" height="416" alt="MoviCorpo"></a>' +
      '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>' +
      '<nav class="nav" id="nav" aria-label="Principal">' +
      link("#modalidades", "Modalidades", "") .replace('href="' + RAIZ + '#', 'href="' + RAIZ + (PAGINA === "home" ? "" : "./") + '#') +
      link("#turmas", "Horários e unidades", "").replace('href="' + RAIZ + '#', 'href="' + RAIZ + (PAGINA === "home" ? "" : "./") + '#') +
      link("feedbacks/", "Feedbacks", "feedbacks") + link("nossa-historia/", "Nossa história", "historia") + link("#totalpass", "TotalPass", "").replace('href="' + RAIZ + '#', 'href="' + RAIZ + (PAGINA === "home" ? "" : "./") + '#') +
      waLink(C.whatsappPrincipal, "Olá! Vim pelo site da MoviCorpo e gostaria de falar com a equipe.", "Falar com a equipe", "btn pq", "cabecalho") +
      "</nav></div></header>";
    document.body.insertAdjacentHTML("afterbegin", h);

    var un = unidadesAtivas().map(function (k) {
      var u = D.unidades[k];
      return "<li><strong>" + esc(u.nome) + "</strong><br>" + esc(u.endereco) + '<br><a href="' + wa(u.whatsapp, "Olá! Vim pelo site e gostaria de falar com a equipe da unidade " + u.nome + ".") + '" target="_blank" rel="noopener" data-medir="rodape:' + k + '">' + esc(u.telefone) + " (WhatsApp)</a></li>";
    }).join("");
    var f = '<footer class="rodape"><div class="wrap"><div><a class="logo" href="' + RAIZ + './"><img src="' + RAIZ + 'assets/logo.png" width="640" height="416" alt="MoviCorpo"></a><p style="margin-top:12px">Movimento é qualidade de vida.</p></div>' +
      '<div><h2>Navegação</h2><ul><li><a href="' + RAIZ + 'pilates-solo/">Pilates solo</a></li><li><a href="' + RAIZ + 'treinamento-funcional/">Treinamento funcional</a></li><li><a href="' + RAIZ + 'fisioterapia/">Fisioterapia</a></li><li><a href="' + RAIZ + 'feedbacks/">Feedbacks</a></li><li><a href="' + RAIZ + 'nossa-historia/">Nossa história</a></li><li><a href="' + RAIZ + 'eventos/">Eventos</a></li></ul></div>' +
      '<div><h2>Unidades e contato</h2><ul>' + un + "</ul></div>" +
      '<div><h2>Redes</h2><ul><li><a href="' + esc(C.instagram) + '" target="_blank" rel="noopener">Instagram @movi.corpo</a></li></ul></div>' +
      '<div class="fim"><p>Horários e disponibilidade devem ser confirmados com a equipe. Última revisão da grade: ' + esc(C.atualizadoEm.split("-").reverse().join("/")) + ".</p>" +
      (C.demo ? "<p>Esta é uma demonstração de proposta, não o canal oficial da MoviCorpo.</p>" : "") + "</div></div></footer>";
    document.body.insertAdjacentHTML("beforeend", f);

    document.body.insertAdjacentHTML("beforeend", '<div class="barra"><a class="btn sec2" href="' + RAIZ + (PAGINA === "home" ? "" : "./") + '#turmas">Ver horários</a>' +
      waLink(C.whatsappPrincipal, "Olá! Vim pelo site da MoviCorpo e gostaria de falar com a equipe.", "WhatsApp", "btn", "barra-movel") + "</div>");

    var b = document.querySelector(".menu-btn"), n = document.getElementById("nav");
    b.addEventListener("click", function () { var a = n.classList.toggle("aberto"); b.setAttribute("aria-expanded", a); b.textContent = a ? "Fechar" : "Menu"; });
    n.addEventListener("click", function (e) { if (e.target.tagName === "A") { n.classList.remove("aberto"); b.setAttribute("aria-expanded", "false"); b.textContent = "Menu"; } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && n.classList.contains("aberto")) { n.classList.remove("aberto"); b.setAttribute("aria-expanded", "false"); b.textContent = "Menu"; b.focus(); } });
  }

  /* ---------- seletor ---------- */
  function seletor(el) {
    var linhas = turmasLinhas(), sel = { und: "", mod: "", dia: "", per: "" };
    var unds = unidadesAtivas(), mods = {};
    linhas.forEach(function (l) { mods[l.mod] = 1; });
    var perDe = function (l) { return parseInt(l.hora, 10) < 12 ? "manha" : "noite"; };
    var grupos = [
      ["und", "Unidade", [["", "Qualquer unidade"]].concat(unds.map(function (k) { return [k, D.unidades[k].nome]; }))],
      ["mod", "Modalidade", [["", "Todas"]].concat(Object.keys(mods).map(function (k) { return [k, D.modalidades[k].curto]; }))],
      ["dia", "Dia", [["", "Qualquer dia"]].concat(DIAS.map(function (d) { return [d[0], d[1]]; }))],
      ["per", "Período", [["", "Qualquer"], ["manha", "Manhã"], ["noite", "Fim do dia"]]]
    ];
    var html = '<div class="sel"><div class="sel-grupos">';
    grupos.forEach(function (g) {
      html += '<fieldset><legend>' + g[1] + '</legend><div class="chips">';
      g[2].forEach(function (o, i) {
        html += '<label class="chip"><input type="radio" name="f-' + g[0] + '" value="' + o[0] + '"' + (i === 0 ? " checked" : "") + "><span>" + esc(o[1]) + "</span></label>";
      });
      html += "</div></fieldset>";
    });
    html += '</div><div class="sel-barra"><p class="sel-count" id="sel-count" aria-live="polite"></p><button type="button" class="limpar" id="sel-limpar">Limpar escolhas</button></div><div class="res" id="sel-res"></div>' +
      '<div class="sel-rodape"><p><strong>Não achou o horário que procura?</strong><br>A equipe pode falar sobre outros horários.</p>' +
      waLink(C.whatsappPrincipal, "Olá! Vim pelo site e gostaria de saber sobre outros horários de aula. Pode me ajudar?", "Falar com a equipe sobre outros horários", "btn sec2", "seletor-outros") + "</div>" +
      '<p class="aviso">Programação publicada, não é vaga em tempo real. Consultar não reserva a aula: a equipe confirma a disponibilidade pelo WhatsApp.</p></div>';
    el.innerHTML = html;

    function bate(l, s) { return (!s.und || l.und === s.und) && (!s.mod || l.mod === s.mod) && (!s.dia || l.dia === s.dia) && (!s.per || perDe(l) === s.per); }
    function atualizar() {
      // opções sem combinação cadastrada ficam desabilitadas
      el.querySelectorAll("input[type=radio]").forEach(function (inp) {
        var campo = inp.name.slice(2), t = { und: sel.und, mod: sel.mod, dia: sel.dia, per: sel.per };
        t[campo] = inp.value;
        inp.disabled = !linhas.some(function (l) { return bate(l, t); });
      });
      var achadas = linhas.filter(function (l) { return bate(l, sel); });
      var porDia = {};
      achadas.forEach(function (l) { (porDia[l.dia] = porDia[l.dia] || []).push(l); });
      var h = "", n = 0;
      DIAS.forEach(function (d) {
        var L = porDia[d[0]]; if (!L) return;
        L.sort(function (a, b) { return a.hora < b.hora ? -1 : a.hora > b.hora ? 1 : 0; });
        h += '<section class="res-dia"><h3>' + d[2] + "</h3><ul>";
        L.forEach(function (l) {
          var u = D.unidades[l.und];
          h += '<li class="item" style="--i:' + Math.min(n++, 14) + '"><span class="hora">' + hora(l.hora) + '</span><span class="qual">' + esc(D.modalidades[l.mod].nome) + '<span class="onde">' + esc(u.nome) + " · " + esc(u.endereco) + "</span></span>" +
            waLink(u.whatsapp, msgTurma(l), "Consultar disponibilidade", "btn pq sec2", l.und + ":" + l.mod) +
            (l.mais60 ? '<p class="nota">Também divulgada para o público 60+. Consulte a equipe.</p>' : "") + "</li>";
        });
        h += "</ul></section>";
      });
      document.getElementById("sel-res").innerHTML = h;
      document.getElementById("sel-count").textContent = achadas.length + (achadas.length === 1 ? " horário na programação" : " horários na programação");
    }
    el.addEventListener("change", function (e) { if (e.target.name) { sel[e.target.name.slice(2)] = e.target.value; atualizar(); } });
    document.getElementById("sel-limpar").addEventListener("click", function () {
      sel = { und: "", mod: "", dia: "", per: "" };
      el.querySelectorAll("input[type=radio]").forEach(function (i) { i.checked = i.value === ""; });
      atualizar();
    });
    window.MOVI_SEL = { set: function (p) {
      sel = { und: p.und || "", mod: p.mod || "", dia: p.dia || "", per: p.per || "" };
      ["und", "mod", "dia", "per"].forEach(function (c) { var i = el.querySelector('input[name="f-' + c + '"][value="' + sel[c] + '"]'); if (i && !i.disabled) i.checked = true; });
      atualizar();
    } };
    atualizar();
  }

  /* ---------- agenda por unidade (tabela → cartões) ---------- */
  function agenda(el) {
    var und = el.getAttribute("data-unidade"), u = D.unidades[und];
    var L = turmasLinhas().filter(function (l) { return l.und === und; });
    var mods = []; L.forEach(function (l) { if (mods.indexOf(l.mod) < 0) mods.push(l.mod); });
    if (!L.length) { el.innerHTML = '<p>Os horários desta unidade serão publicados em breve. Fale com a equipe.</p>'; return; }
    var h = '<table class="agenda"><caption class="so-leitor">Programação de ' + esc(u.nome) + "</caption><thead><tr><th scope=\"col\">Dia</th>";
    mods.forEach(function (m) { h += '<th scope="col">' + esc(D.modalidades[m].nome) + "</th>"; });
    h += "</tr></thead><tbody>";
    DIAS.forEach(function (d) {
      var tem = L.some(function (l) { return l.dia === d[0]; }); if (!tem) return;
      h += '<tr><th scope="row">' + d[2] + "</th>";
      mods.forEach(function (m) {
        var hs = L.filter(function (l) { return l.dia === d[0] && l.mod === m; }).sort(function (a, b) { return a.hora < b.hora ? -1 : 1; });
        if (!hs.length) { h += '<td class="sem vazio" data-rotulo="' + esc(D.modalidades[m].nome) + '">—</td>'; return; }
        h += '<td data-rotulo="' + esc(D.modalidades[m].nome) + '"><div class="pills">' + hs.map(function (l) {
          return waLink(u.whatsapp, msgTurma(l), hora(l.hora), "pill", und + ":" + m, ' aria-label="Consultar ' + esc(D.modalidades[m].nome) + ", " + d[2] + " às " + hora(l.hora) + '"');
        }).join("") + "</div></td>";
      });
      h += "</tr>";
    });
    h += "</tbody></table><p class=\"aviso\">Toque em um horário para consultar a disponibilidade pelo WhatsApp. Horários e vagas devem ser confirmados com a equipe. Última revisão da grade: " + esc(C.atualizadoEm.split("-").reverse().join("/")) + ".</p>";
    el.innerHTML = h;
  }

  /* ---------- demais blocos ---------- */
  /* ---------- cinema: fotos grandes ao fundo, rolagem normal e capítulos de texto por cima ---------- */
  var gancho = [];
  var CURTO = { pilates: "Pilates", funcional: "Funcional", mais60: "60+", fisioterapia: "Fisioterapia", miofascial: "Miofascial" };
  function cine(el) {
    var S = D.servicos.filter(ok).filter(function (x) { return IMG[x.foto]; });
    var nomes = ["Início"].concat(S.map(function (x) { return CURTO[x.id] || x.nome; })), chaves = ["pilates1"].concat(S.map(function (x) { return x.foto; }));
    var stage = document.createElement("div"); stage.className = "cine-stage";
    stage.innerHTML = chaves.map(function (k, i) { return foto(k, { cls: "cine-img" + (i ? "" : " ativo"), ar: "auto", sizes: "100vw", eager: i < 2 }); }).join("") +
      '<nav class="cine-rail" aria-label="Capítulos da página inicial"><ol>' + nomes.map(function (n, i) { return '<li><button type="button" data-i="' + i + '"' + (i ? "" : ' class="on"') + ">" + esc(n) + "</button></li>"; }).join("") + '</ol><div class="cine-prog" aria-hidden="true"><i></i></div></nav>';
    el.insertBefore(stage, el.firstChild);
    var cols = el.querySelector(".cine-cols");
    cols.insertAdjacentHTML("beforeend", S.map(function (x, i) {
      return '<article class="ch" data-i="' + (i + 1) + '"' + (i === 0 ? ' id="modalidades"' : "") + '><div class="ch-in"><p class="sobre">Modalidade</p><h2 class="ch-t">' + esc(x.nome) + '</h2><p class="lead">' + esc(x.resumo) + "</p><p>" + esc(x.comecar) + '</p><div class="btn-linha">' +
        waLink(C.whatsappPrincipal, x.mensagem, esc(x.cta), "btn", "modalidade:" + x.id) + '<a class="btn sec2" href="' + RAIZ + x.pagina + '">Saber mais</a></div></div></article>';
    }).join(""));
    var ims = [].slice.call(stage.querySelectorAll(".cine-img")), chs = [].slice.call(cols.querySelectorAll(".ch")), bts = [].slice.call(stage.querySelectorAll(".cine-rail button")), prog = stage.querySelector(".cine-prog i"), cur = 0, parado = matchMedia("(prefers-reduced-motion: reduce)").matches;
    function set(i) {
      if (i === cur) return;
      var velho = ims[cur]; velho.classList.remove("ativo"); velho.classList.add("sai");
      ims[i].classList.remove("sai"); ims[i].classList.add("ativo");
      setTimeout(function () { velho.classList.remove("sai"); }, 1300);
      chs.forEach(function (c, j) { c.classList.toggle("on", j === i); });
      bts.forEach(function (b, j) { b.classList.toggle("on", j === i); });
      cur = i;
    }
    gancho.push(function () {
      var vh = innerHeight, linha = vh * 0.55, idx = 0, melhor = 1e9, rc;
      chs.forEach(function (c, i) { var r = c.getBoundingClientRect(), d = (r.top <= linha && r.bottom > linha) ? 0 : Math.min(Math.abs(r.top - linha), Math.abs(r.bottom - linha)); if (d < melhor) { melhor = d; idx = i; rc = r; } });
      set(idx);
      var r = chs[idx].getBoundingClientRect(), cp = Math.max(0, Math.min(1, (linha - r.top) / Math.max(1, r.height)));
      if (!parado) ims[idx].querySelector("img").style.transform = "scale(" + (1.14 - 0.12 * cp).toFixed(3) + ")";
      var rr = el.getBoundingClientRect(), p = Math.max(0, Math.min(1, -rr.top / Math.max(1, rr.height - vh)));
      prog.style.transform = "scaleY(" + p.toFixed(3) + ")";
    });
    bts.forEach(function (b) { b.addEventListener("click", function () { chs[+b.getAttribute("data-i")].scrollIntoView({ behavior: parado ? "auto" : "smooth", block: "start" }); }); });
  }
  function unidadesHome(el) {
    el.innerHTML = '<div class="und">' + unidadesAtivas().map(function (k) {
      var u = D.unidades[k];
      return '<article class="und-bloco"><h3>' + esc(u.nome) + '</h3><p class="rot">' + esc(u.rotulo) + '</p><dl><dt>Endereço</dt><dd>' + esc(u.endereco) + ", " + esc(u.cidade) + "</dd><dt>WhatsApp</dt><dd>" + esc(u.telefone) + "</dd></dl>" +
        '<div class="btn-linha" style="margin:0"><a class="btn" href="' + RAIZ + "unidades/" + k + '/">Ver horários da unidade</a>' +
        (u.mapa ? '<a class="btn sec2" href="' + esc(u.mapa) + '" target="_blank" rel="noopener">Como chegar</a>' : "") + "</div></article>";
    }).join("") + "</div>";
  }
  function totalpass(el) {
    var t = D.totalpass; if (!ok(t)) { el.hidden = true; return; }
    el.innerHTML = '<div class="wrap"><div class="tp"><svg class="tp-fundo" viewBox="0 0 800 400" aria-hidden="true"><path class="tr" d="M0 320 C 200 40, 380 400, 600 200 S 760 60, 800 100"/><path class="tr fino" d="M0 350 C 200 70, 380 430, 600 230 S 760 90, 800 130"/></svg>' +
      '<div class="tp-cel" aria-hidden="true">' + celular() + '</div><div style="position:relative"><p class="sobre" style="color:#7fdce8">TotalPass</p><h2>' + esc(t.titulo) + "</h2><p class=\"lead\" style=\"margin-top:.8em\">" + esc(t.texto) + '</p><ol class="tp-passos">' +
      t.passos.map(function (p) { return "<li><strong>" + esc(p.t) + "</strong><span>" + esc(p.d) + "</span></li>"; }).join("") + '</ol><div class="btn-linha">' +
      waLink(C.whatsappPrincipal, t.mensagem, esc(t.cta), "btn claro", "totalpass") + "</div></div></div></div>";
  }
  function faq(el) {
    el.innerHTML = '<div class="faq">' + D.faq.filter(ok).map(function (q) { return "<details><summary>" + esc(q.p) + "</summary><p>" + esc(q.r) + "</p></details>"; }).join("") + "</div>";
  }
  function equipe(el) {
    el.innerHTML = '<div class="equipe">' + D.equipe.map(function (p) {
      var ini = p.nome.replace(/^(Dra?\.)\s*/, "").split(" ").filter(function (x) { return x.length > 2 || true; }).map(function (x) { return x[0]; }).slice(0, 2).join("");
      var img = p.foto && p.foto.src ? '<img src="' + RAIZ + esc(p.foto.src) + '" alt="' + esc(p.foto.alt) + '" width="84" height="84">' : '<span class="mono" aria-hidden="true">' + esc(ini) + "</span>";
      return '<div class="pessoa">' + img + "<div><h3>" + esc(p.nome) + "</h3><p>" + esc(p.papel || "Equipe MoviCorpo") + "</p>" + (p.resumo ? "<p>" + esc(p.resumo) + "</p>" : "") +
        (p.registro ? "<p>" + esc(p.registro) + "</p>" : "") + (p.formacao ? "<p>" + esc(p.formacao) + "</p>" : "") + (p.especializacoes ? "<p>" + esc(p.especializacoes) + "</p>" : "") + "</div></div>";
    }).join("") + "</div>";
  }
  function eventos(el) {
    el.innerHTML = '<div class="evt-lista">' + D.eventos.filter(ok).map(function (e) {
      return '<div class="evt-item"><h3>' + esc(e.nome) + "<small>" + e.ano + "</small></h3><p>" + esc(e.texto) + "</p></div>";
    }).join("") + "</div>";
  }
  function galeria(el) {
    var g = D.fotos.galeria || []; if (!g.length) { el.hidden = true; return; }
    el.querySelector("[data-slot]").innerHTML = '<div class="galeria">' + g.map(function (f) { return '<img src="' + RAIZ + esc(f.src) + '" alt="' + esc(f.alt) + '" width="' + (f.w || 1200) + '" height="' + (f.h || 800) + '" loading="lazy">'; }).join("") + "</div>";
  }
  function depoimentos(el) {
    var d = D.depoimentos.filter(function (x) { return x.autorizado && x.texto; });
    if (!d.length) { el.hidden = true; return; }
    el.querySelector("[data-slot]").innerHTML = '<div class="depo">' + d.map(function (x) { return "<blockquote><p>" + esc(x.texto) + "</p><footer>" + esc(x.nome) + "</footer></blockquote>"; }).join("") + "</div>";
  }
  /* ---------- feedbacks: cartões com o mesmo padrão visual ---------- */
  var ASPAS = '<svg class="fb-q" viewBox="0 0 48 36" aria-hidden="true" focusable="false"><path d="M0 36V20C0 8 7 1 19 0v7c-6 1-9 5-9 10h9v19H0zm27 0V20C27 8 34 1 46 0v7c-6 1-9 5-9 10h9v19H27z"/></svg>';
  function fbLista() { return (D.depoimentos || []).filter(function (x) { return x.autorizado && x.texto; }); }
  function fbCard(x, grande) {
    return '<figure class="fb-card' + (grande ? " grande" : "") + '">' + ASPAS + "<blockquote><p>" + esc(x.texto) + '</p></blockquote><figcaption><span class="fb-tema">' + esc(x.tema) + '</span><span class="fb-de">Mensagem de aluno(a)</span></figcaption></figure>';
  }
  function fbDestaque(el) {
    var L = fbLista().filter(function (x) { return x.destaque; }); if (!L.length) { el.hidden = true; return; }
    var box = el.querySelector("[data-slot]");
    box.innerHTML = '<div class="fb-stage" role="group" aria-roledescription="carrossel" aria-label="Feedbacks de alunos">' +
      L.map(function (x, i) { return '<div class="fb-slide' + (i ? "" : " ativo") + '" aria-hidden="' + (i ? "true" : "false") + '">' + fbCard(x, true) + "</div>"; }).join("") + "</div>" +
      '<div class="fb-ctrl"><button type="button" class="fb-seta" data-d="-1" aria-label="Feedback anterior">&#8592;</button><div class="fb-pontos">' +
      L.map(function (x, i) { return '<button type="button" aria-label="Ver feedback ' + (i + 1) + '"' + (i ? "" : ' class="ativo"') + "></button>"; }).join("") +
      '</div><button type="button" class="fb-seta" data-d="1" aria-label="Próximo feedback">&#8594;</button></div>';
    var sl = box.querySelectorAll(".fb-slide"), pt = box.querySelectorAll(".fb-pontos button"), cur = 0, timer;
    function ir(n) {
      cur = (n + sl.length) % sl.length;
      sl.forEach(function (x, i) { x.classList.toggle("ativo", i === cur); x.setAttribute("aria-hidden", i === cur ? "false" : "true"); });
      pt.forEach(function (x, i) { x.classList.toggle("ativo", i === cur); });
    }
    function auto() { clearInterval(timer); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(function () { ir(cur + 1); }, 9000); }
    box.querySelectorAll(".fb-seta").forEach(function (b) { b.addEventListener("click", function () { ir(cur + (+b.getAttribute("data-d"))); auto(); }); });
    pt.forEach(function (b, i) { b.addEventListener("click", function () { ir(i); auto(); }); });
    box.addEventListener("mouseenter", function () { clearInterval(timer); });
    box.addEventListener("mouseleave", auto);
    box.addEventListener("focusin", function () { clearInterval(timer); });
    auto();
  }
  function fbTodos(el) {
    var L = fbLista(); if (!L.length) { el.hidden = true; return; }
    var temas = []; L.forEach(function (x) { if (temas.indexOf(x.tema) < 0) temas.push(x.tema); });
    var h = '<fieldset class="fb-filtro"><legend class="so-leitor">Filtrar por tema</legend><div class="chips">' +
      [["", "Todos"]].concat(temas.map(function (t) { return [t, t]; })).map(function (o, i) { return '<label class="chip"><input type="radio" name="fb-tema" value="' + esc(o[0]) + '"' + (i ? "" : " checked") + "><span>" + esc(o[1]) + "</span></label>"; }).join("") +
      '</div></fieldset><p class="sel-count" id="fb-count" aria-live="polite"></p><div class="fb-grade" id="fb-grade"></div>';
    el.innerHTML = h;
    function mostrar(t) {
      var f = L.filter(function (x) { return !t || x.tema === t; });
      document.getElementById("fb-grade").innerHTML = f.map(function (x, i) { return '<div class="fb-item" style="--i:' + Math.min(i, 12) + '">' + fbCard(x, false) + "</div>"; }).join("");
      document.getElementById("fb-count").textContent = f.length + (f.length === 1 ? " feedback" : " feedbacks");
    }
    el.addEventListener("change", function (e) { if (e.target.name === "fb-tema") mostrar(e.target.value); });
    mostrar("");
  }
  var TOPO = { pilates: ["pilates2", "Pilates solo"], funcional: ["funcional3", "Treinamento funcional"], fisioterapia: ["fisio1", "Fisioterapia"] };
  function heroArte(el) {
    var t = TOPO[el.getAttribute("data-foto")];
    el.innerHTML = t ? foto(t[0], { cls: "ph-topo kb", ar: "auto", eager: true, sizes: "100vw" }) : marcaArte();
    if (t) { el.classList.add("topo-foto"); var pt = el.closest(".pag-topo"); if (pt) pt.classList.add("com-foto"); }
  }
  function fotoBloco(el) { el.innerHTML = foto(el.getAttribute("data-img"), { cls: "ph-bloco kb rv", ar: el.getAttribute("data-ar") || "3/2" }); }
  function wapp(el) {
    var u = D.unidades[el.getAttribute("data-und")] || { whatsapp: C.whatsappPrincipal };
    el.innerHTML = waLink(u.whatsapp, el.getAttribute("data-msg"), el.getAttribute("data-rotulo"), el.getAttribute("data-classe") || "btn", el.getAttribute("data-medir"));
  }
  function endereco(el) {
    var u = D.unidades[el.getAttribute("data-unidade")];
    el.innerHTML = '<p class="lead">' + esc(u.endereco) + ", " + esc(u.cidade) + "<br>WhatsApp " + esc(u.telefone) + "</p>" +
      (u.mapa ? '<p><a class="btn sec2 pq" href="' + esc(u.mapa) + '" target="_blank" rel="noopener">Como chegar</a></p>' : "");
  }
  function tracos(el) { el.outerHTML = tracoFundo(el.getAttribute("data-y") || "10%", el.hasAttribute("data-flip")); }

  var MAPA = { seletor: seletor, agenda: agenda, unidades: unidadesHome, totalpass: totalpass, faq: faq, equipe: equipe, eventos: eventos, galeria: galeria, depoimentos: depoimentos, arte: heroArte, foto: fotoBloco, cine: cine, "fb-destaque": fbDestaque, "fb-todos": fbTodos, wapp: wapp, endereco: endereco, traco: tracos };

  montarLayout();
  document.querySelectorAll("[data-render]").forEach(function (el) { var f = MAPA[el.getAttribute("data-render")]; if (f) f(el); });

  /* entrada suave (só opacidade). Verificação por rolagem, sem depender de IntersectionObserver. */
  var revs = [].slice.call(document.querySelectorAll(".rev"));
  function verRev() {
    revs = revs.filter(function (r) {
      var t = r.getBoundingClientRect().top;
      if (t < innerHeight * 0.92) { r.classList.add("in"); return false; }
      return true;
    });
    if (!revs.length) { removeEventListener("scroll", verRev); removeEventListener("resize", verRev); }
  }
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { revs.forEach(function (r) { r.classList.add("in"); }); revs = []; }
  else { addEventListener("scroll", verRev, { passive: true }); addEventListener("resize", verRev); verRev(); }

  /* ---------- vida extra: cabeçalho, CTA flutuante, parallax, título, atalhos ---------- */
  var topo = document.querySelector(".topo"), flu = document.createElement("a"), reduz = matchMedia("(prefers-reduced-motion: reduce)").matches;
  flu.className = "flutuante"; flu.target = "_blank"; flu.rel = "noopener"; flu.setAttribute("data-medir", "flutuante");
  flu.href = wa(C.whatsappPrincipal, "Olá! Vim pelo site da MoviCorpo e gostaria de falar com a equipe."); flu.textContent = "Falar com a equipe";
  document.body.appendChild(flu);
  var fotos = [].slice.call(document.querySelectorAll(".ph")), tick = false;
  function aoRolar() {
    if (tick) return; tick = true;
    requestAnimationFrame(function () {
      tick = false;
      topo.classList.toggle("rolou", scrollY > 30);
      flu.classList.toggle("on", scrollY > 700);
      fotos.forEach(function (f) {
        var r = f.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight * 1.05) {
          if (!f.classList.contains("vis") && !f.closest(".cine-stage")) f.classList.add("vis");
          if (!reduz && !f.closest(".cine-stage")) f.firstElementChild.style.transform = "translate3d(0," + Math.max(-34, Math.min(34, (r.top + r.height / 2 - innerHeight / 2) * -0.07)).toFixed(1) + "px,0)";
        }
      });
      gancho.forEach(function (g) { g(); });
    });
  }
  addEventListener("scroll", aoRolar, { passive: true }); addEventListener("resize", aoRolar); aoRolar();
  if (reduz) document.querySelectorAll("svg").forEach(function (v) { if (v.pauseAnimations) v.pauseAnimations(); });
  document.querySelectorAll("h1").forEach(function (h) {
    if (h.querySelector("*")) return;
    var de = h.hasAttribute("data-realce") ? +h.getAttribute("data-realce") : 1e9;
    h.setAttribute("aria-label", h.textContent);
    h.innerHTML = h.textContent.split(" ").map(function (w, i) { return '<span class="pal' + (i >= de ? " hl" : "") + '" aria-hidden="true"><span style="animation-delay:' + (0.15 + i * 0.09).toFixed(2) + 's">' + esc(w) + "</span></span>"; }).join(" ");
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-preset]"); if (!b || !window.MOVI_SEL) return;
    window.MOVI_SEL.set({ mod: b.getAttribute("data-preset") });
    document.getElementById("turmas").scrollIntoView({ behavior: reduz ? "auto" : "smooth" });
  });

  /* pontos de medição: só emitem um evento local. Nada é enviado a lugar nenhum enquanto config.medicao.ativo = false. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-medir]");
    if (a && C.medicao && C.medicao.ativo) {
      document.dispatchEvent(new CustomEvent("movi:clique", { detail: { alvo: a.getAttribute("data-medir"), pagina: PAGINA } }));
    }
  });
})();
