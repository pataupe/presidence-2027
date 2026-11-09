/* =========================================================================
   PRÉSIDENCE 2027 — moteur de simulation
   Aucune dépendance au DOM ici : état, modèle économique, tirage des cartes.
   ========================================================================= */
'use strict';

const P = (window.P = {
  CARDS: [],       // toutes les cartes (remplies par js/content/*.js)
  byId: {},        // index id -> carte
  PROGRAMS: [],    // programmes de départ
  ADVISORS: {},    // conseillers
  PMS: [],         // Premiers ministres mobilisables
  ENDINGS: [],     // fins de partie
  VERSION: 'v1',
});

/* ---------------------------------------------------------------- outils */
P.clamp = (v, a = 0, b = 100) => (v < a ? a : v > b ? b : v);
P.rnd = (a, b) => a + Math.random() * (b - a);
P.pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
P.round = (v, n = 0) => {
  const f = Math.pow(10, n);
  return Math.round(v * f) / f;
};

P.MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
  'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/* Le mandat court de juin 2027 à mai 2032 : t = 0 .. 59 */
P.TOTAL = 60;
P.dateOf = (t) => {
  const abs = 5 + t;                 // juin = index 5
  return { mois: P.MONTHS[abs % 12], an: 2027 + Math.floor(abs / 12), mi: abs % 12 };
};
P.dateLabel = (t) => {
  const d = P.dateOf(t);
  return d.mois + ' ' + d.an;
};

/* --------------------------------------------------------------- jauges */
P.GAUGES = [
  { k: 'op', n: 'Opinion', d: 'Ce que le pays pense de vous. À zéro, la rue réclame votre départ.' },
  { k: 'maj', n: 'Majorité', d: 'Votre socle à l’Assemblée. À zéro, la censure tombe.' },
  { k: 'soc', n: 'Climat social', d: 'Syndicats, corps intermédiaires, température de la rue.' },
  { k: 'fin', n: 'Finances', d: 'Marges budgétaires et confiance des marchés.' },
  { k: 'eur', n: 'Europe & monde', d: 'Crédibilité auprès des partenaires et des alliés.' },
];

P.STATS = [
  { k: 'croi', n: 'Croissance', u: ' %', dec: 1, good: 'up' },
  { k: 'chom', n: 'Chômage', u: ' %', dec: 1, good: 'down' },
  { k: 'infl', n: 'Inflation', u: ' %', dec: 1, good: 'target', target: 2 },
  { k: 'dette', n: 'Dette publique', u: ' % PIB', dec: 0, good: 'down' },
  { k: 'serv', n: 'Services publics', u: '/100', dec: 0, good: 'up' },
  { k: 'just', n: 'Justice sociale', u: '/100', dec: 0, good: 'up' },
  { k: 'secu', n: 'Sécurité', u: '/100', dec: 0, good: 'up' },
  { k: 'vert', n: 'Écologie', u: '/100', dec: 0, good: 'up' },
  { k: 'comp', n: 'Compétitivité', u: '/100', dec: 0, good: 'up' },
];

P.FACTIONS = [
  { k: 'pat', n: 'Patronat' },
  { k: 'syn', n: 'Syndicats' },
  { k: 'ret', n: 'Retraités' },
  { k: 'jeu', n: 'Jeunesse' },
  { k: 'rur', n: 'Ruralité' },
  { k: 'fon', n: 'Fonction publique' },
  { k: 'med', n: 'Médias' },
];

P.AXES = [
  { k: 'eco', n: 'Économie', left: 'Étatiste', right: 'Libérale' },
  { k: 'aut', n: 'Ordre', left: 'Libertaire', right: 'Autoritaire' },
  { k: 'ecol', n: 'Écologie', left: 'Productiviste', right: 'Écologiste' },
  { k: 'ue', n: 'Europe', left: 'Souverainiste', right: 'Fédéraliste' },
];

P.CATS = {
  eco: { n: 'Économie', c: 'cat-eco' },
  soc: { n: 'Social', c: 'cat-soc' },
  reg: { n: 'Régalien', c: 'cat-reg' },
  ecol: { n: 'Écologie', c: 'cat-ecol' },
  eur: { n: 'International', c: 'cat-eur' },
  pol: { n: 'Vie politique', c: 'cat-pol' },
  crise: { n: 'Crise', c: 'cat-crise' },
  inst: { n: 'Institutions', c: 'cat-inst' },
};

/* ------------------------------------------------------- nouvelle partie */
P.newGame = function (programId, promiseIds) {
  const prog = P.PROGRAMS.find((p) => p.id === programId) || P.PROGRAMS[0];
  const S = {
    t: 0,
    prog: prog.id,
    pm: prog.pm || 'Hélène Vasseur',
    pmTrait: prog.pmTrait || null,
    g: Object.assign({ op: 56, maj: 58, soc: 58, fin: 50, eur: 58 }, prog.g),
    s: Object.assign({
      croi: 1.1, chom: 7.4, infl: 2.1, dette: 114,
      serv: 50, just: 50, secu: 50, vert: 50, comp: 50,
    }, prog.s),
    f: Object.assign({ pat: 50, syn: 50, ret: 50, jeu: 50, rur: 50, fon: 50, med: 50 }, prog.f),
    x: Object.assign({ eco: 0, aut: 0, ecol: 0, ue: 0 }, prog.x),
    flags: {},
    seen: {},
    queue: [],            // [{id, at}]
    hist: [],             // [{t, op, maj, soc, fin, eur}]
    feed: [],             // dépêches
    log: [],              // décisions marquantes
    trophies: {},
    promises: (promiseIds || []).slice(),
    broken: [],
    kept: [],
    crises: { op: 0, maj: 0, soc: 0, fin: 0, eur: 0 },
    censures: 0,
    lastCats: [],
    lastCrisis: -99,
    pmChanges: 0,
    over: null,           // clé de fin
    deficit: 4.4,
    cohab: false,
    decisions: 0,
    startStats: null,
    startGauges: null,
  };
  S.startStats = Object.assign({}, S.s);
  S.startGauges = Object.assign({}, S.g);
  S.hist.push(snapshot(S));
  P.news(S, 'Investiture. Vous entrez en fonction avec ' + Math.round(S.g.op) + ' % d’opinions favorables.', 'inst');
  (prog.flags || []).forEach((f) => (S.flags[f] = true));
  return S;
};

function snapshot(S) {
  return { t: S.t, op: S.g.op, maj: S.g.maj, soc: S.g.soc, fin: S.g.fin, eur: S.g.eur };
}
P.snapshot = snapshot;

/* -------------------------------------------------------------- dépêches */
P.news = function (S, txt, cat) {
  if (!txt) return;
  S.feed.unshift({ t: S.t, txt: txt, cat: cat || 'pol' });
  if (S.feed.length > 60) S.feed.pop();
};

/* ------------------------------------------------------------ promesses */
P.promiseById = (id) => {
  for (const pr of P.PROGRAMS) {
    const f = (pr.promises || []).find((x) => x.id === id);
    if (f) return f;
  }
  return null;
};

/* ------------------------------------------- application d'un effet brut
   eff = { g:{}, s:{}, f:{}, x:{}, add:[], del:[], then:[[id, delai]], news, out }
   Renvoie la liste des deltas pour l'affichage.                           */
P.apply = function (S, eff, opts) {
  opts = opts || {};
  const deltas = [];
  if (!eff) return deltas;

  if (eff.g) for (const k in eff.g) {
    const before = S.g[k];
    S.g[k] = P.clamp(S.g[k] + eff.g[k]);
    if (Math.abs(S.g[k] - before) > 0.4) deltas.push({ type: 'g', k, v: S.g[k] - before });
  }
  if (eff.s) for (const k in eff.s) {
    const before = S.s[k];
    const lim = (k === 'dette') ? [0, 300] : (k === 'chom') ? [2.5, 20]
      : (k === 'croi') ? [-6, 7] : (k === 'infl') ? [-2, 18] : [0, 100];
    S.s[k] = P.clamp(S.s[k] + eff.s[k], lim[0], lim[1]);
    if (Math.abs(S.s[k] - before) > 0.04) deltas.push({ type: 's', k, v: S.s[k] - before });
  }
  if (eff.f) for (const k in eff.f) {
    const before = S.f[k];
    S.f[k] = P.clamp(S.f[k] + eff.f[k]);
    if (Math.abs(S.f[k] - before) > 0.4) deltas.push({ type: 'f', k, v: S.f[k] - before });
  }
  if (eff.x) for (const k in eff.x) S.x[k] = P.clamp(S.x[k] + eff.x[k], -100, 100);

  if (eff.pm && eff.pm !== S.pm) {
    S.pm = eff.pm;
    S.pmChanges++;
    const fiche = P.PMS.find((p) => p.n === eff.pm);
    if (fiche) {
      if (fiche.g) for (const k in fiche.g) S.g[k] = P.clamp(S.g[k] + fiche.g[k] * 0.5);
      if (fiche.f) for (const k in fiche.f) S.f[k] = P.clamp(S.f[k] + fiche.f[k] * 0.5);
    }
  }

  (eff.del || []).forEach((f) => { delete S.flags[f]; });
  (eff.add || []).forEach((f) => {
    S.flags[f] = true;
    checkPromise(S, f, deltas);
    if (P.TROPHIES[f]) S.trophies[f] = true;
  });

  (eff.then || []).forEach((pair) => {
    const id = pair[0], delay = pair[1] == null ? 1 : pair[1];
    S.queue.push({ id: id, at: S.t + delay });
  });

  if (eff.news) P.news(S, eff.news, opts.cat);
  return deltas;
};

/* Une promesse est trahie dès qu'un drapeau "casse" apparaît */
function checkPromise(S, flag, deltas) {
  S.promises.forEach((pid) => {
    const pr = P.promiseById(pid);
    if (!pr) return;
    if (pr.breaks && pr.breaks.indexOf(flag) >= 0 && S.broken.indexOf(pid) < 0 && S.kept.indexOf(pid) < 0) {
      S.broken.push(pid);
      const eff = { g: { op: -7, soc: -5, maj: -3 }, f: { med: -6, jeu: -4 } };
      const d2 = P.apply(S, eff);
      d2.forEach((d) => deltas.push(d));
      P.news(S, 'PROMESSE TRAHIE — « ' + pr.t + ' ». L’opposition ressort la vidéo de campagne.', 'pol');
    }
    if (pr.keeps && pr.keeps.indexOf(flag) >= 0 && S.kept.indexOf(pid) < 0 && S.broken.indexOf(pid) < 0) {
      S.kept.push(pid);
      const d2 = P.apply(S, { g: { op: +5, maj: +2 }, f: { med: +3 } });
      d2.forEach((d) => deltas.push(d));
      P.news(S, 'PROMESSE TENUE — « ' + pr.t + ' ». Vos soutiens respirent.', 'pol');
    }
  });
}

/* -------------------------------------------------- cohérence idéologique
   Trahir la ligne sur laquelle on a été élu coûte du soutien interne.    */
P.coherence = function (S, choice) {
  if (!choice.x) return null;
  const prog = P.PROGRAMS.find((p) => p.id === S.prog);
  if (!prog || !prog.line) return null;
  let worst = 0, axis = null;
  for (const k in choice.x) {
    const want = prog.line[k] || 0;
    const got = choice.x[k];
    if (want && Math.sign(want) !== Math.sign(got) && Math.abs(got) >= 6) {
      const pain = Math.abs(got) * (Math.abs(want) / 100);
      if (pain > worst) { worst = pain; axis = k; }
    }
  }
  if (worst < 2.2) return null;
  P.apply(S, { g: { maj: -Math.min(7, worst) }, f: { med: -2 } });
  return axis;
};

/* ------------------------------------------------- modèle macro mensuel */
P.tick = function (S) {
  const s = S.s, g = S.g, f = S.f;
  const notes = [];

  /* Croissance : patronat, compétitivité, marges budgétaires, climat social, dette */
  let cible = 0.9
    + (f.pat - 50) * 0.010
    + (s.comp - 50) * 0.016
    + (g.fin - 50) * 0.004
    + (g.eur - 50) * 0.004
    - (s.dette > 125 ? (s.dette - 125) * 0.012 : 0)
    - (g.soc < 40 ? (40 - g.soc) * 0.022 : 0)
    - (s.infl > 4 ? (s.infl - 4) * 0.10 : 0);
  if (S.flags.recession) cible -= 1.6;
  if (S.flags.guerre_commerciale) cible -= 0.7;
  if (S.flags.choc_energie) cible -= 0.8;
  s.croi += (cible - s.croi) * 0.22 + P.rnd(-0.12, 0.12);
  s.croi = P.clamp(s.croi, -6, 7);

  /* Chômage : loi d'Okun artisanale */
  let dch = -(s.croi - 1.0) * 0.072 + P.rnd(-0.03, 0.03);
  dch -= (s.comp - 50) * 0.0012;
  if (S.flags.contrats_aides) dch -= 0.03;
  if (S.flags.assurance_chomage_dure) dch -= 0.02;
  s.chom = P.clamp(s.chom + dch, 2.8, 20);

  /* Inflation */
  let ci = 1.9 + (g.fin < 40 ? (40 - g.fin) * 0.03 : 0) + (S.flags.choc_energie ? 2.2 : 0)
    + (S.flags.relance_massive ? 1.1 : 0) - (S.flags.austerite ? 0.5 : 0);
  s.infl += (ci - s.infl) * 0.2 + P.rnd(-0.08, 0.08);
  s.infl = P.clamp(s.infl, -1.5, 18);

  /* Déficit et dette (points de PIB par an) */
  let def = 4.6
    - (g.fin - 50) * 0.055
    + (s.chom - 7.4) * 0.22
    - (s.croi - 1.0) * 0.45
    + (S.flags.relance_massive ? 1.0 : 0)
    - (S.flags.austerite ? 1.1 : 0);
  if (s.dette > 120) def += (s.dette - 120) * 0.010; // charge de la dette
  S.deficit = P.round(P.clamp(def, -2, 12), 1);
  s.dette = P.clamp(s.dette + (S.deficit - s.croi * 0.9 - s.infl * 0.55) / 12, 20, 300);

  /* Les indicateurs qualitatifs s'érodent doucement si on ne les tient pas */
  s.serv = P.clamp(s.serv - 0.08 - (g.fin < 35 ? 0.12 : 0));
  s.secu = P.clamp(s.secu - 0.05);
  s.vert = P.clamp(s.vert - 0.06);
  s.just = P.clamp(s.just - 0.04 - (s.infl > 4 ? 0.1 : 0));
  s.comp = P.clamp(s.comp - 0.03);

  /* Opinion : tirée par le vécu des gens */
  const cibleOp = 48
    + (s.croi - 1.0) * 3.2
    - (s.chom - 7.4) * 2.6
    - (s.infl - 2.0) * 2.2
    + (s.serv - 50) * 0.16
    + (s.secu - 50) * 0.10
    + (s.just - 50) * 0.10
    + (f.med - 50) * 0.10
    - (s.dette > 140 ? (s.dette - 140) * 0.08 : 0);
  const vitesse = 0.055 + (f.med < 40 ? 0.015 : 0);
  g.op = P.clamp(g.op + (cibleOp - g.op) * vitesse + P.rnd(-0.5, 0.5));

  /* Climat social : se calme tout seul, se tend avec l'injustice ressentie */
  let dsoc = 0.55 - (50 - s.just) * 0.012 - (f.syn < 35 ? 0.35 : 0) - (s.infl > 4 ? 0.3 : 0);
  if (S.flags.greve_generale) dsoc -= 1.2;
  g.soc = P.clamp(g.soc + dsoc);

  /* Majorité : les alliés désertent un président impopulaire */
  const dmaj = (g.op - 46) * 0.022 + (S.cohab ? -0.25 : 0.05);
  g.maj = P.clamp(g.maj + dmaj);

  /* Finances : la charge de la dette ronge les marges */
  g.fin = P.clamp(g.fin - (s.dette > 115 ? (s.dette - 115) * 0.012 : 0) + (s.croi > 1.6 ? 0.18 : 0));

  /* Europe : revient au point d'équilibre */
  g.eur = P.clamp(g.eur + (52 - g.eur) * 0.02);

  /* Les syndicats et le patronat réagissent au réel */
  f.syn = P.clamp(f.syn + (s.just - 50) * 0.012);
  f.pat = P.clamp(f.pat + (s.comp - 50) * 0.012);
  f.ret = P.clamp(f.ret - (s.infl - 2) * 0.12);
  f.jeu = P.clamp(f.jeu + (s.vert - 50) * 0.010 - (s.chom - 7.4) * 0.05);
  f.med = P.clamp(f.med + (50 - f.med) * 0.02);

  /* Quelques dépêches automatiques quand un seuil est franchi */
  const mem = (S._mem = S._mem || {});
  const seuil = (key, val, cond, txt) => {
    if (cond && !mem[key]) { mem[key] = true; notes.push(txt); }
    if (!cond) mem[key] = false;
  };
  seuil('chom6', s.chom, s.chom < 6.0, 'Le chômage passe sous 6 %. Première fois depuis une génération.');
  seuil('chom10', s.chom, s.chom > 10, 'Le chômage franchit 10 %. Les files s’allongent à France Travail.');
  seuil('dette140', s.dette, s.dette > 140, 'La dette dépasse 140 % du PIB. Une agence de notation « surveille ».');
  seuil('dette100', s.dette, s.dette < 100, 'La dette repasse sous 100 % du PIB. Bercy sort le champagne.');
  seuil('infl5', s.infl, s.infl > 5, 'L’inflation dépasse 5 %. Les prix en rayon deviennent un sujet politique.');
  seuil('recess', s.croi, s.croi < 0, 'Deux trimestres de recul : le pays entre en récession.');
  notes.forEach((n) => P.news(S, n, 'eco'));

  S.hist.push(snapshot(S));
};

/* ------------------------------------------------------- tirage de carte */
P.eligible = function (S, c) {
  if (!c || !c.choices || !c.choices.length) return false;
  if (c.once !== false && S.seen[c.id]) return false;
  if (c.direct) return false;                       // atteignable seulement via "then"
  if (c.min != null && S.t < c.min) return false;
  if (c.max != null && S.t > c.max) return false;
  if (c.prog && c.prog.indexOf(S.prog) < 0) return false;
  if (c.need) { for (const fl of c.need) if (!S.flags[fl]) return false; }
  if (c.not) { for (const fl of c.not) if (S.flags[fl]) return false; }
  if (c.req && !c.req(S)) return false;
  return true;
};

P.weightOf = function (S, c) {
  let w = c.w == null ? 10 : c.w;
  if (c.cat === 'crise') {
    const depuis = S.t - S.lastCrisis;
    if (depuis < 7) w *= 0.15;
    else if (depuis > 13) w *= 4;
  }
  // on évite d'enchaîner trois cartes du même domaine
  const rep = S.lastCats.filter((x) => x === c.cat).length;
  if (rep === 1) w *= 0.55;
  if (rep >= 2) w *= 0.18;
  if (c.urgent && c.urgent(S)) w *= 8;
  return Math.max(0.01, w);
};

P.draw = function (S) {
  /* 1. une carte programmée arrive à échéance */
  const dueIdx = S.queue.findIndex((q) => q.at <= S.t);
  if (dueIdx >= 0) {
    const q = S.queue.splice(dueIdx, 1)[0];
    const c = P.byId[q.id];
    if (c) return c;
  }
  /* 2. tirage pondéré dans le vivier */
  const pool = P.CARDS.filter((c) => P.eligible(S, c));
  if (!pool.length) return P.byId['filler_01'] || null;
  let total = 0;
  const ws = pool.map((c) => { const w = P.weightOf(S, c); total += w; return w; });
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) { r -= ws[i]; if (r <= 0) return pool[i]; }
  return pool[pool.length - 1];
};

/* ------------------------------------------------- crises terminales 0 % */
P.CRISIS_CARD = { op: 'fin_op', maj: 'fin_maj', soc: 'fin_soc', fin: 'fin_fin', eur: 'fin_eur' };
P.ZERO_END = { op: 'demission_forcee', maj: 'crise_regime', soc: 'pays_bloque', fin: 'tutelle', eur: 'isolement' };

P.checkZero = function (S) {
  for (const k in P.CRISIS_CARD) {
    if (S.g[k] <= 0.5) {
      S.crises[k]++;
      if (S.crises[k] >= 2) { S.over = P.ZERO_END[k]; return 'over'; }
      S.g[k] = 10;
      S.queue.unshift({ id: P.CRISIS_CARD[k], at: S.t });
      return k;
    }
  }
  return null;
};

/* ------------------------------------------------------------- trophées */
P.TROPHIES = {
  retraites_votee: 'Réforme des retraites adoptée',
  nucleaire_lance: 'Nouveau programme nucléaire lancé',
  dette_maitrisee: 'Dette sous contrôle',
  plein_emploi: 'Plein emploi atteint',
  hopital_sauve: 'Hôpital public redressé',
  jamais_49_3: 'Jamais recouru au 49.3',
  grand_debat: 'Grande consultation nationale menée',
  proportionnelle: 'Proportionnelle instaurée',
  ue_relancee: 'Relance européenne arrachée',
  smic_augmente: 'Hausse historique du SMIC',
  impots_baisses: 'Impôts durablement baissés',
  armee_renforcee: 'Effort de défense tenu',
  ia_souveraine: 'Souveraineté numérique engagée',
  logement_debloque: 'Crise du logement desserrée',
  sante_universelle: 'Accès aux soins rétabli partout',
  zero_censure: 'Jamais censuré',
  pacte_social: 'Grand pacte social signé',
};

/* --------------------------------------------------------- sauvegarde */
const SKEY = 'presidence2027.save.v1';
P.save = function (S) {
  try { localStorage.setItem(SKEY, JSON.stringify(S)); } catch (e) { /* mode privé */ }
};
P.load = function () {
  try {
    const raw = localStorage.getItem(SKEY);
    if (!raw) return null;
    const S = JSON.parse(raw);
    if (!S || typeof S.t !== 'number') return null;
    return S;
  } catch (e) { return null; }
};
P.clearSave = function () { try { localStorage.removeItem(SKEY); } catch (e) { } };

P.palmares = function () {
  try { return JSON.parse(localStorage.getItem('presidence2027.palmares.v1') || '[]'); }
  catch (e) { return []; }
};
P.addPalmares = function (entry) {
  try {
    const l = P.palmares();
    l.unshift(entry);
    localStorage.setItem('presidence2027.palmares.v1', JSON.stringify(l.slice(0, 12)));
  } catch (e) { }
};
