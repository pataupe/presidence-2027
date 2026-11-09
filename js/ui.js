/* ============================ RENDU / INTERFACE ========================== */
'use strict';

const UI = (window.UI = {});
const $ = (id) => document.getElementById(id);

UI.screen = function (name) {
  ['home', 'setup', 'game'].forEach((n) => { $(n).hidden = (n !== name); });
  if (name !== 'game') window.scrollTo({ top: 0, behavior: 'instant' });
};

function pct(v) { return Math.max(0, Math.min(100, v)); }
function lvl(v) { return v < 25 ? 'd' : v < 42 ? 'w' : v > 66 ? 'ok' : ''; }
function fmt(v, dec) { return (dec ? v.toFixed(dec) : String(Math.round(v))).replace('.', ','); }
function signe(v, dec) { return (v > 0 ? '+' : '−') + fmt(Math.abs(v), dec); }

/* ------------------------------------------------------------- accueil --- */
UI.renderHome = function (save) {
  const reprise = save && save.t > 0 && !save.over;
  $('home-reprise').hidden = !reprise;
  if (reprise) {
    const pr = P.PROGRAMS.find((p) => p.id === save.prog);
    $('home-reprise-txt').textContent =
      'Partie en cours : ' + (pr ? pr.etiq.toLowerCase() : '') + ', ' + P.dateLabel(save.t) +
      ' (mois ' + (save.t + 1) + '/60), ' + Math.round(save.g.op) + ' % d’opinion favorable.';
  }
  const pal = P.palmares();
  $('home-palmares').hidden = !pal.length;
  if (pal.length) {
    $('home-palmares-list').innerHTML = pal.map((e) =>
      '<div class="stat"><span class="n">' + e.etiq + ' — ' + e.rang + '</span>' +
      '<span class="v num">' + e.score + '</span></div>').join('');
  }
};

/* ------------------------------------------------ choix du programme --- */
let setupProg = null, setupProms = [];

UI.renderSetup = function () {
  $('setup-progs').innerHTML = P.PROGRAMS.map((p) =>
    '<button class="pcard" type="button" data-prog="' + p.id + '" aria-pressed="' + (setupProg === p.id) + '">' +
    '<span class="lab">' + p.etiq + '</span>' +
    '<h3>' + p.t + '</h3>' +
    '<span class="pitch">' + p.pitch + '</span>' +
    '<span class="fw"><b>Force</b> ' + p.force + '</span>' +
    '<span class="fw bad"><b>Faiblesse</b> ' + p.faible + '</span>' +
    '</button>').join('');

  const prog = P.PROGRAMS.find((p) => p.id === setupProg);
  $('setup-proms-wrap').hidden = !prog;
  if (prog) {
    $('setup-proms').innerHTML = prog.promises.map((pr) =>
      '<button class="pchk" type="button" data-prom="' + pr.id + '" aria-pressed="' + (setupProms.indexOf(pr.id) >= 0) + '">' +
      '<span class="box">✓</span><span><span class="t">' + pr.t + '</span>' +
      '<span class="d">' + pr.d + '</span></span></button>').join('');
    $('setup-count').textContent = setupProms.length + '/3';
  }
  $('setup-go').disabled = !(prog && setupProms.length === 3);
};

UI.setupPickProg = function (id) {
  setupProg = id; setupProms = []; UI.renderSetup();
  $('setup-proms-wrap').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};
UI.setupPickProm = function (id) {
  const i = setupProms.indexOf(id);
  if (i >= 0) setupProms.splice(i, 1);
  else if (setupProms.length < 3) setupProms.push(id);
  UI.renderSetup();
};
UI.setupValues = () => ({ prog: setupProg, proms: setupProms });

/* ------------------------------------------------------ barre d'état --- */
UI.renderTop = function (S) {
  $('top-date').textContent = P.dateLabel(S.t);
  $('top-mois').textContent = 'Mois ' + Math.min(S.t + 1, 60) + '/60 · ' + S.pm +
    (S.flags.cohabitation ? ' · cohabitation' : '');
  $('top-prog').style.width = (S.t / P.TOTAL * 100) + '%';
  $('top-mini').innerHTML = P.GAUGES.map((g) =>
    '<span class="m" title="' + g.d + '"><i class="dot ' + (lvl(S.g[g.k]) === 'd' ? 'd' : lvl(S.g[g.k]) === 'w' ? 'w' : '') + '"></i>' +
    g.n + ' <b class="num">' + Math.round(S.g[g.k]) + '</b></span>').join('');
};

/* -------------------------------------------------- tableau de bord --- */
UI.renderPanels = function (S, flashKeys) {
  const fk = flashKeys || {};
  $('p-gauges').innerHTML = P.GAUGES.map((g) =>
    '<div class="gauge' + (fk['g' + g.k] ? ' flash' : '') + '">' +
    '<div class="g1"><b>' + g.n + '</b><span class="num">' + Math.round(S.g[g.k]) + '</span></div>' +
    '<div class="bar ' + lvl(S.g[g.k]) + '"><i style="width:' + pct(S.g[g.k]) + '%"></i></div></div>').join('');

  $('p-stats').innerHTML = P.STATS.map((st) => {
    const v = S.s[st.k], v0 = S.startStats[st.k], diff = v - v0;
    const dec = st.dec;
    let cls = 'flat', txt = '—';
    if (Math.abs(diff) > (dec ? 0.05 : 0.5)) {
      const bon = st.good === 'up' ? diff > 0 : st.good === 'down' ? diff < 0
        : Math.abs(v - st.target) < Math.abs(v0 - st.target);
      cls = bon ? 'up' : 'down';
      txt = signe(diff, dec);
    }
    return '<div class="stat"><span class="n">' + st.n + '</span>' +
      '<span class="v num">' + fmt(v, dec) + st.u + '</span>' +
      '<span class="a num ' + cls + '">' + txt + '</span></div>';
  }).join('') +
    '<div class="stat"><span class="n">Déficit public</span><span class="v num">' +
    fmt(S.deficit, 1) + ' % PIB</span><span class="a"></span></div>';

  $('p-facs').innerHTML = P.FACTIONS.map((f) =>
    '<div class="fac"><div><div style="display:flex;justify-content:space-between"><span>' + f.n +
    '</span><span class="num" style="color:var(--muted)">' + Math.round(S.f[f.k]) + '</span></div>' +
    '<div class="fb"><i style="width:' + pct(S.f[f.k]) + '%"></i></div></div>' +
    '<div class="num" style="font-size:11px;color:var(--muted)">' +
    (S.f[f.k] > 62 ? 'acquis' : S.f[f.k] > 46 ? 'neutre' : S.f[f.k] > 30 ? 'méfiant' : 'hostile') +
    '</div></div>').join('');

  $('p-feed').innerHTML = S.feed.slice(0, 14).map((d) =>
    '<div class="dep ' + d.cat + '"><time>' + P.dateLabel(d.t) + '</time>' + d.txt + '</div>').join('')
    || '<div class="dep">Pas encore de dépêche.</div>';

  /* agenda */
  const ag = [];
  const next = P.BUDGET_MONTHS.find((m) => m >= S.t);
  if (next != null) ag.push(['Budget de l’État', P.dateLabel(next)]);
  if (S.t <= P.EUROPEENNES) ag.push(['Élections européennes', P.dateLabel(P.EUROPEENNES)]);
  if (S.t <= P.MUNICIPALES) ag.push(['Élections municipales', P.dateLabel(P.MUNICIPALES)]);
  ag.push(['Fin du mandat', P.dateLabel(P.TOTAL - 1)]);
  $('p-agenda').innerHTML = ag.map((a) => '<div><span>' + a[0] + '</span><b>' + a[1] + '</b></div>').join('');

  UI.sparkline(S);
};

UI.sparkline = function (S) {
  let h = S.hist;
  const W = 240, H = 56, pad = 3;
  if (!h.length) { $('p-spark').innerHTML = ''; return; }
  if (h.length === 1) h = [h[0], h[0]];
  const x = (i) => pad + i / Math.max(1, P.TOTAL - 1) * (W - pad * 2);
  const y = (v) => H - pad - (v / 100) * (H - pad * 2);
  let d = '', a = '';
  h.forEach((p, i) => { d += (i ? 'L' : 'M') + x(p.t).toFixed(1) + ' ' + y(p.op).toFixed(1) + ' '; });
  a = d + 'L' + x(h[h.length - 1].t).toFixed(1) + ' ' + (H - pad) + ' L' + x(0).toFixed(1) + ' ' + (H - pad) + ' Z';
  const last = h[h.length - 1];
  $('p-spark').innerHTML =
    '<svg class="spark" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Courbe de popularité : ' +
    Math.round(last.op) + ' % ce mois-ci">' +
    '<line x1="' + pad + '" x2="' + (W - pad) + '" y1="' + y(50) + '" y2="' + y(50) +
    '" stroke="var(--line)" stroke-dasharray="2 3" stroke-width="1"/>' +
    '<path d="' + a + '" fill="var(--bleu-soft)" stroke="none"/>' +
    '<path d="' + d + '" fill="none" stroke="var(--bleu)" stroke-width="1.8" stroke-linejoin="round"/>' +
    '<circle cx="' + x(last.t).toFixed(1) + '" cy="' + y(last.op).toFixed(1) + '" r="2.6" fill="var(--bleu)"/>' +
    '</svg>';
};

/* ----------------------------------------------------------- la carte --- */
UI.renderCard = function (S, c) {
  const a = P.advisor(S, c.who);
  const cat = P.CATS[c.cat] || P.CATS.pol;
  $('stage').innerHTML =
    '<article class="note">' +
    '<div class="head"><span class="chip ' + cat.c + '">' + cat.n + '</span>' +
    '<span class="ref">Note ' + (S.decisions + 1) + ' · ' + P.dateLabel(S.t) + '</span></div>' +
    '<div class="body"><h2>' + c.titre + '</h2>' +
    '<div class="quote"><div class="ava">' + a.i + '</div><div>' +
    '<div class="who">' + a.n + (a.r ? ', ' + a.r : '') + '</div>' +
    '<div class="say">« ' + c.quote + ' »</div></div></div>' +
    '<p class="brief">' + c.txt + '</p></div>' +
    '<div class="choices" id="choices">' +
    c.choices.map((ch, i) =>
      '<button class="ch" type="button" data-i="' + i + '">' +
      '<kbd>' + (i + 1) + '</kbd><span><span class="t">' + ch.t + '</span>' +
      (ch.d ? '<span class="d">' + ch.d + '</span>' : '') + '</span></button>').join('') +
    '</div></article>';
};

UI.renderResult = function (S, c, ch, deltas, axe) {
  const chips = deltas.slice(0, 10).map((d) => {
    let nom, val, bon;
    if (d.type === 'g') {
      const g = P.GAUGES.find((x) => x.k === d.k); nom = g ? g.n : d.k; val = signe(d.v, 0); bon = d.v > 0;
    } else if (d.type === 'f') {
      const f = P.FACTIONS.find((x) => x.k === d.k); nom = f ? f.n : d.k; val = signe(d.v, 0); bon = d.v > 0;
    } else {
      const st = P.STATS.find((x) => x.k === d.k); nom = st ? st.n : d.k;
      val = signe(d.v, st && st.dec ? 1 : 0);
      bon = st && st.good === 'down' ? d.v < 0 : d.v > 0;
    }
    return '<span class="d-chip ' + (bon ? 'good' : 'bad') + '">' + nom + ' ' + val + '</span>';
  }).join('');

  const axeTxt = axe ? '<p class="out" style="color:var(--rouge);font-style:normal;font-size:14px">' +
    'Votre propre camp n’a pas voté cette ligne-là : une partie de votre majorité se détache.</p>' : '';

  const note = $('stage').querySelector('.note');
  const choices = $('choices');
  if (choices) choices.remove();
  const div = document.createElement('div');
  div.className = 'result';
  div.innerHTML =
    '<div class="pick">Décision : <b>' + ch.t + '</b></div>' +
    '<div class="deltas">' + (chips || '<span class="d-chip">Aucun effet mesurable</span>') + '</div>' +
    '<p class="out">' + (ch.out || '') + '</p>' + axeTxt +
    '<div class="btnrow" style="margin-top:16px"><button class="btn" type="button" id="suite">Continuer</button>' +
    '<span class="lab">ou appuyez sur Entrée</span></div>';
  note.appendChild(div);
  $('suite').focus({ preventScroll: true });
};

/* ---------------------------------------------------------- le budget --- */
function budgetBarHTML(S, state) {
  const info = P.budgetDeficit(S, state.recette, state.total);
  const over = state.total > info.env;
  return '<div><span class="lab">Enveloppe</span><div class="big num">' + info.env + '</div></div>' +
    '<div><span class="lab">Réparti</span><div class="big num' + (over ? ' over' : '') + '">' + state.total + '</div></div>' +
    '<div><span class="lab">Désendettement</span><div class="big num">' + Math.max(0, info.env - state.total) + '</div></div>' +
    '<div><span class="lab">Déficit prévu</span><div class="big num">' + fmt(info.def, 1) + ' %</div></div>';
}

UI.budgetBar = function (S, state) {
  const info = P.budgetDeficit(S, state.recette, state.total);
  const over = state.total > info.env;
  const bar = document.querySelector('.budgetbar');
  if (bar) bar.innerHTML = budgetBarHTML(S, state);
  const go = $('bud-go');
  if (go) {
    go.disabled = over;
    go.textContent = over ? 'Enveloppe dépassée' : 'Adopter le budget';
  }
};

UI.renderBudget = function (S, state) {
  const an = P.dateOf(S.t).an + 1;
  const info = P.budgetDeficit(S, state.recette, state.total);
  const over = state.total > info.env;
  $('stage').innerHTML =
    '<article class="note"><div class="head"><span class="chip">Loi de finances</span>' +
    '<span class="ref">' + P.dateLabel(S.t) + '</span></div>' +
    '<div class="body"><h2>Budget ' + an + '</h2>' +
    '<p class="brief">Vous arbitrez le projet de loi de finances. D’abord les recettes, ' +
    'ensuite la répartition de l’enveloppe. Ce qui n’est pas dépensé réduit le déficit. ' +
    'Un point d’enveloppe vaut environ deux milliards d’euros.</p>' +

    '<span class="lab" style="display:block;margin:18px 0 8px">1 · Recettes</span>' +
    '<div class="plist" id="bud-rec">' + P.RECETTES.map((r) =>
      '<button class="pchk" type="button" data-rec="' + r.id + '" aria-pressed="' + (state.recette === r.id) + '">' +
      '<span class="box">✓</span><span><span class="t">' + r.t + '</span><span class="d">' + r.d + '</span></span>' +
      '</button>').join('') + '</div>' +

    '<span class="lab" style="display:block;margin:18px 0 8px">2 · Dépenses</span>' +
    '<div class="budgetbar">' + budgetBarHTML(S, state) + '</div>' +
    '<div class="sliders" id="bud-sl">' + P.POSTES.map((p) =>
      '<div class="sl"><div class="s1"><span><span class="n">' + p.n + '</span> ' +
      '<span class="d">' + p.d + '</span></span>' +
      '<span class="v num" data-v="' + p.k + '">' + state.alloc[p.k] + ' pts</span></div>' +
      '<input type="range" min="0" max="14" step="1" value="' + state.alloc[p.k] +
      '" id="bud-' + p.k + '" data-k="' + p.k + '" aria-label="' + p.n + '"></div>').join('') +
    '</div>' +
    '<p class="brief" style="font-size:14px">Niveau de reconduction : 6 points par poste. ' +
    'En dessous, le secteur se dégrade ; au-dessus, il s’améliore.</p>' +
    '</div><div class="choices"><button class="btn" type="button" id="bud-go"' +
    (over ? ' disabled' : '') + '>' + (over ? 'Enveloppe dépassée' : 'Adopter le budget') + '</button></div></article>';
};

UI.renderBudgetResult = function (S, res) {
  $('stage').innerHTML =
    '<article class="note"><div class="head"><span class="chip">Loi de finances</span></div>' +
    '<div class="body"><h2>Le budget est arbitré</h2>' +
    '<p class="brief">' + res.total + ' points répartis sur une enveloppe de ' + res.env +
    ', ' + res.reste + ' points de désendettement, déficit prévisionnel à ' + fmt(res.def, 1) + ' % du PIB.' +
    (res.suite ? ' ' + res.suite : '') + '</p>' +
    '<div class="deltas">' + UI.chips(res.deltas) + '</div></div>' +
    '<div class="choices"><button class="btn" type="button" id="suite">Continuer</button></div></article>';
  $('suite').focus({ preventScroll: true });
};

UI.chips = function (deltas) {
  return deltas.slice(0, 14).map((d) => {
    let nom, val, bon;
    if (d.type === 'g') { const g = P.GAUGES.find((x) => x.k === d.k); nom = g ? g.n : d.k; val = signe(d.v, 0); bon = d.v > 0; }
    else if (d.type === 'f') { const f = P.FACTIONS.find((x) => x.k === d.k); nom = f ? f.n : d.k; val = signe(d.v, 0); bon = d.v > 0; }
    else {
      const st = P.STATS.find((x) => x.k === d.k); nom = st ? st.n : d.k;
      val = signe(d.v, st && st.dec ? 1 : 0); bon = st && st.good === 'down' ? d.v < 0 : d.v > 0;
    }
    return '<span class="d-chip ' + (bon ? 'good' : 'bad') + '">' + nom + ' ' + val + '</span>';
  }).join('');
};

/* -------------------------------------------------------- les scrutins --- */
UI.renderElection = function (S, res) {
  const max = Math.max.apply(null, res.lignes.map((l) => l.pct));
  const lignes = (arr) => arr.map((l) =>
    '<div class="score' + (l.me ? ' me' : '') + '">' +
    '<div><div class="n">' + (l.me ? '<b>' + l.n + '</b>' : l.n) +
    (l.sieges != null ? ' <span style="color:var(--muted)">· ' + l.sieges + ' sièges</span>' : '') + '</div>' +
    '<div class="pb"><i style="width:' + (l.pct / Math.max(1, max) * 100) + '%"></i></div></div>' +
    '<div class="pv num">' + fmt(l.pct, 1) + '</div></div>').join('');

  $('stage').innerHTML =
    '<article class="note"><div class="head"><span class="chip cat-pol">Scrutin</span>' +
    '<span class="ref">' + P.dateLabel(S.t) + '</span></div>' +
    '<div class="body"><h2>' + res.titre + '</h2>' +
    '<p class="brief" style="font-size:15px">' + res.sous + '</p>' +
    '<div class="scores">' + lignes(res.lignes) + '</div>' +
    (res.t2 ? '<span class="lab">Second tour</span><div class="scores">' + lignes(res.t2) + '</div>' : '') +
    '<p class="brief">' + res.verdict + '</p>' +
    '<div class="deltas">' + UI.chips(res.deltas || []) + '</div>' +
    '</div><div class="choices"><button class="btn" type="button" id="suite">Continuer</button></div></article>';
  $('suite').focus({ preventScroll: true });
};

/* ------------------------------------------------- fin et grand bilan --- */
UI.renderFinaleQuestion = function (S) {
  $('stage').innerHTML =
    '<article class="note"><div class="head"><span class="chip cat-pol">Fin de mandat</span></div>' +
    '<div class="body"><h2>Vous représentez-vous ?</h2>' +
    '<div class="quote"><div class="ava">OS</div><div><div class="who">Olivier Sarda, secrétaire général de l’Élysée</div>' +
    '<div class="say">« La question doit être tranchée avant la fin de la semaine. Après, elle se tranchera sans vous. »</div>' +
    '</div></div>' +
    '<p class="brief">Cinq ans de mandat s’achèvent. Vous êtes à ' + Math.round(S.g.op) +
    ' % d’opinions favorables, avec ' + S.kept.length + ' promesse(s) tenue(s) sur ' + S.promises.length +
    '. Le pays doit choisir, et vous devez d’abord choisir.</p></div>' +
    '<div class="choices">' +
    '<button class="ch" type="button" data-fin="candidat"><kbd>1</kbd><span><span class="t">Je suis candidat</span>' +
    '<span class="d">Vous remettez votre bilan entre les mains des électeurs</span></span></button>' +
    '<button class="ch" type="button" data-fin="retrait"><kbd>2</kbd><span><span class="t">Je ne me représente pas</span>' +
    '<span class="d">Vous quittez l’Élysée au terme des cinq ans</span></span></button>' +
    '</div></article>';
};

UI.renderFin = function (S, fin) {
  $('stage').innerHTML =
    '<article class="note"><div class="head"><span class="chip cat-crise">' + fin.s + '</span>' +
    '<span class="ref">' + P.dateLabel(S.t) + '</span></div>' +
    '<div class="body"><h2>' + fin.t + '</h2><p class="brief">' + fin.txt + '</p></div>' +
    '<div class="choices"><button class="btn" type="button" id="suite">Voir le bilan du mandat</button></div></article>';
  $('suite').focus({ preventScroll: true });
};

UI.renderBilan = function (S, b, pres, partage) {
  const d = (k) => S.s[k] - S.startStats[k];
  const ind = P.STATS.map((st) => {
    const diff = d(st.k), dec = st.dec;
    const bon = st.good === 'up' ? diff > 0 : st.good === 'down' ? diff < 0
      : Math.abs(S.s[st.k] - st.target) < Math.abs(S.startStats[st.k] - st.target);
    const plat = Math.abs(diff) < (dec ? 0.06 : 0.6);
    return '<div class="stat"><span class="n">' + st.n + '</span>' +
      '<span class="v num" style="color:var(--muted)">' + fmt(S.startStats[st.k], dec) + '</span>' +
      '<span class="v num">→ ' + fmt(S.s[st.k], dec) + st.u + '</span>' +
      '<span class="a num ' + (plat ? 'flat' : bon ? 'up' : 'down') + '">' +
      (plat ? '—' : signe(diff, dec)) + '</span></div>';
  }).join('');

  $('stage').innerHTML =
    '<article class="note"><div class="head"><span class="chip">Bilan du mandat</span>' +
    '<span class="ref">2027 — ' + P.dateOf(Math.min(S.t, 59)).an + '</span></div>' +
    '<div class="body final">' +
    '<div class="bigscore"><span class="s num">' + b.score + '</span><span class="lab">/ 1000</span>' +
    '<span class="r">' + b.rang + '</span></div>' +
    '<div><span class="lab">Portrait politique</span>' +
    '<h2 style="font-size:30px;margin-top:4px">« ' + b.portrait.t + ' »</h2></div>' +
    '<p class="brief">' + b.verdict + '</p>' +

    '<div class="grid2">' +
    '<div><span class="lab">Le pays que vous laissez</span><div class="stats" style="margin-top:9px">' + ind + '</div></div>' +
    '<div><span class="lab">Promesses de campagne</span><div class="proms" style="margin-top:9px">' +
    b.promesses.map((p) => '<div class="prom"><span class="tag ' +
      (p.etat === 'tenue' ? 'ok' : p.etat === 'trahie' ? 'ko' : 'na') + '">' + p.etat + '</span>' +
      '<span>' + p.t + '</span></div>').join('') + '</div>' +
    (b.trophees.length ? '<span class="lab" style="display:block;margin-top:16px">Au tableau d’honneur</span>' +
      '<div class="trophies" style="margin-top:8px">' + b.trophees.map((t) => '<span class="troph">' + t + '</span>').join('') + '</div>' : '') +
    '</div></div>' +

    '<div><span class="lab">Revue de presse</span><div class="press" style="margin-top:9px">' +
    b.presse.map((p) => '<div class="pz"><div class="j">' + p.j + '</div><div class="t">' + p.t + '</div></div>').join('') +
    '</div></div>' +

    '<div><span class="lab">Votre courbe de popularité</span><div id="bilan-spark" style="margin-top:6px"></div></div>' +
    '<div><span class="lab">Partager votre bilan</span>' +
    '<div class="share" id="share-txt">' + partage.replace(/</g, '&lt;') + '</div>' +
    '<div class="btnrow" style="margin-top:10px">' +
    '<button class="btn ghost small" type="button" id="copy">Copier le bilan</button>' +
    '<span id="copy-ok" class="lab" hidden>Copié</span></div></div>' +
    '</div>' +
    '<div class="choices"><div class="btnrow">' +
    '<button class="btn" type="button" id="again">Rejouer avec un autre programme</button>' +
    '</div></div></article>';

  const sp = $('bilan-spark');
  const tmp = document.createElement('div'); tmp.id = 'p-spark-tmp';
  sp.appendChild(tmp);
  const W = 560, H = 110, pad = 6;
  const x = (t) => pad + t / (P.TOTAL - 1) * (W - pad * 2);
  const y = (v) => H - pad - (v / 100) * (H - pad * 2);
  let line = '';
  S.hist.forEach((p, i) => { line += (i ? 'L' : 'M') + x(p.t).toFixed(1) + ' ' + y(p.op).toFixed(1) + ' '; });
  sp.innerHTML = '<svg viewBox="0 0 ' + W + ' ' + H + '" style="width:100%;height:auto;display:block" role="img" ' +
    'aria-label="Popularité de ' + Math.round(S.hist[0].op) + ' % à ' + Math.round(S.g.op) + ' %">' +
    '<line x1="' + pad + '" x2="' + (W - pad) + '" y1="' + y(50) + '" y2="' + y(50) + '" stroke="var(--line)" stroke-dasharray="3 4"/>' +
    '<text x="' + (pad + 2) + '" y="' + (y(50) - 4) + '" font-size="9" fill="var(--muted)" font-family="Archivo, sans-serif">50 %</text>' +
    '<path d="' + line + '" fill="none" stroke="var(--bleu)" stroke-width="2"/>' +
    '<circle cx="' + x(S.hist[S.hist.length - 1].t).toFixed(1) + '" cy="' + y(S.g.op).toFixed(1) + '" r="3.4" fill="var(--rouge)"/>' +
    '<text x="' + pad + '" y="' + (H - 1) + '" font-size="9" fill="var(--muted)" font-family="Archivo, sans-serif">juin 2027</text>' +
    '<text x="' + (W - pad) + '" y="' + (H - 1) + '" font-size="9" fill="var(--muted)" text-anchor="end" font-family="Archivo, sans-serif">mai 2032</text>' +
    '</svg>';
};
