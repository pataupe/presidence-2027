/* Harnais de test : charge le moteur du jeu sans DOM et simule des mandats. */
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];
global.window = global;
global.localStorage = { getItem: () => null, setItem: () => { }, removeItem: () => { } };

const FILES = [
  'js/state.js',
  'js/content/programs.js',
  'js/content/cards-eco.js',
  'js/content/cards-soc.js',
  'js/content/cards-reg.js',
  'js/content/cards-ecol.js',
  'js/content/cards-eur.js',
  'js/content/cards-inst.js',
  'js/content/chains.js',
  'js/content/crises.js',
  'js/budget.js',
  'js/elections.js',
  'js/endings.js',
];
FILES.forEach((f) => {
  const src = fs.readFileSync(path.join(ROOT, f), 'utf8');
  try { eval(src); } catch (e) { console.log('ERREUR DE CHARGEMENT ' + f + ' : ' + e.message); process.exit(1); }
});

const PP = global.P;
PP.CARDS.forEach((c) => { PP.byId[c.id] = c; });

/* ---------------------------------------------- vérifications statiques */
const pb = [];
const ids = new Set();
PP.CARDS.forEach((c) => {
  if (ids.has(c.id)) pb.push('id en double : ' + c.id);
  ids.add(c.id);
  if (!c.titre || !c.txt || !c.quote) pb.push('champ manquant : ' + c.id);
  if (!c.cat || !PP.CATS[c.cat]) pb.push('catégorie inconnue : ' + c.id + ' / ' + c.cat);
  if (!PP.ADVISORS[c.who]) pb.push('conseiller inconnu : ' + c.id + ' / ' + c.who);
  (c.choices || []).forEach((ch, i) => {
    if (!ch.t) pb.push('choix sans libellé : ' + c.id + '#' + i);
    if (!ch.out) pb.push('choix sans conséquence : ' + c.id + '#' + i);
    (ch.then || []).forEach((t) => { if (!PP.byId[t[0]]) pb.push('then inconnu : ' + c.id + ' -> ' + t[0]); });
    ['g', 's', 'f', 'x'].forEach((kk) => {
      for (const k in (ch[kk] || {})) {
        const ok = kk === 'g' ? PP.GAUGES.some((x) => x.k === k)
          : kk === 's' ? PP.STATS.some((x) => x.k === k)
            : kk === 'f' ? PP.FACTIONS.some((x) => x.k === k)
              : PP.AXES.some((x) => x.k === k);
        if (!ok) pb.push('clé inconnue ' + kk + '.' + k + ' dans ' + c.id + '#' + i);
      }
    });
    if (ch.pm && !PP.PMS.some((p) => p.n === ch.pm)) pb.push('PM inconnu : ' + ch.pm);
  });
});
Object.values(PP.CRISIS_CARD).forEach((id) => { if (!PP.byId[id]) pb.push('carte de crise manquante : ' + id); });
PP.PROGRAMS.forEach((pr) => { if (pr.promises.length < 3) pb.push('pas assez de promesses : ' + pr.id); });

/* promesses : les drapeaux cités existent-ils dans le contenu ? */
const flags = new Set();
PP.CARDS.forEach((c) => (c.choices || []).forEach((ch) => (ch.add || []).forEach((f) => flags.add(f))));
PP.PROGRAMS.forEach((pr) => pr.promises.forEach((p) => {
  (p.keeps || []).forEach((f) => { if (!flags.has(f)) pb.push('promesse « ' + p.t + ' » : drapeau tenu introuvable (' + f + ')'); });
  (p.breaks || []).forEach((f) => { if (!flags.has(f)) pb.push('promesse « ' + p.t + ' » : drapeau trahi introuvable (' + f + ')'); });
}));

console.log('Cartes : ' + PP.CARDS.length + ' · décisions possibles : ' +
  PP.CARDS.reduce((n, c) => n + c.choices.length, 0));
console.log(pb.length ? 'PROBLÈMES (' + pb.length + ') :\n - ' + [...new Set(pb)].join('\n - ') : 'Vérifications statiques : OK');

/* --------------------------------------------------- simulation de parties */
const vus = new Set();
const fins = {}; const rangs = {}; const scores = [];
let erreurs = 0, nans = 0, tours = 0, interrompus = 0;

function nan(S) {
  const bad = [];
  for (const k in S.g) if (!isFinite(S.g[k])) bad.push('g.' + k);
  for (const k in S.s) if (!isFinite(S.s[k])) bad.push('s.' + k);
  for (const k in S.f) if (!isFinite(S.f[k])) bad.push('f.' + k);
  return bad;
}

const N = +(process.argv[3] || 300);
for (let n = 0; n < N; n++) {
  const prog = PP.PROGRAMS[n % PP.PROGRAMS.length];
  const proms = prog.promises.slice().sort(() => Math.random() - .5).slice(0, 3).map((p) => p.id);
  let S;
  try {
    S = PP.newGame(prog.id, proms);
    let pending = null, garde = 0;
    while (S.t < PP.TOTAL && !S.over && garde++ < 400) {
      const z = PP.checkZero(S);
      if (z === 'over') break;
      if (S.flags.demission_parole) { S.over = 'demission_parole'; break; }

      if (PP.BUDGET_MONTHS.indexOf(S.t) >= 0 && !S.flags['bud' + S.t]) {
        S.flags['bud' + S.t] = true;
        const rec = PP.RECETTES[Math.floor(Math.random() * PP.RECETTES.length)].id;
        const alloc = {};
        const env = PP.budgetEnvelope(S, rec);
        let reste = env;
        PP.POSTES.forEach((p) => { const v = Math.min(reste, Math.floor(Math.random() * 11)); alloc[p.k] = v; reste -= v; });
        PP.budgetApply(S, rec, alloc);
      } else if (S.t === PP.EUROPEENNES && !S.flags.eur_done) {
        S.flags.eur_done = true; PP.electionIntermediaire(S, 'eur');
      } else if (S.t === PP.MUNICIPALES && !S.flags.mun_done) {
        S.flags.mun_done = true; PP.electionIntermediaire(S, 'mun');
      } else {
        const c = PP.draw(S);
        if (!c) { console.log('AUCUNE CARTE au mois ' + S.t); break; }
        vus.add(c.id);
        const i = Math.floor(Math.random() * c.choices.length);
        const ch = c.choices[i];
        S.seen[c.id] = true; S.decisions++;
        if (c.cat === 'crise') S.lastCrisis = S.t;
        S.lastCats.push(c.cat); if (S.lastCats.length > 2) S.lastCats.shift();
        PP.apply(S, ch, { cat: c.cat });
        PP.coherence(S, ch);
        if (ch.special === 'legislatives') PP.legislatives(S, ch.camp);
        if (ch.special === 'referendum') PP.referendum(S, ch.camp);
      }
      const bad = nan(S);
      if (bad.length) { nans++; console.log('NaN (' + bad.join(',') + ') mois ' + S.t + ' prog ' + prog.id); break; }
      S.t++; tours++;
      if (S.t < PP.TOTAL) PP.tick(S);
    }
    let pres = null;
    if (!S.over) pres = PP.presidentielle(S, Math.random() < .85 ? 'candidat' : 'retrait');
    else interrompus++;
    const b = PP.bilan(S, pres);
    PP.partageTexte(S, b, pres);
    scores.push(b.score);
    rangs[b.rang] = (rangs[b.rang] || 0) + 1;
    const f = S.over || (pres && pres.renonce ? 'retrait' : pres && pres.gagne ? 'réélu' : pres && pres.elimine ? 'éliminé T1' : 'battu');
    fins[f] = (fins[f] || 0) + 1;
  } catch (e) {
    erreurs++;
    if (erreurs < 4) console.log('EXCEPTION (' + prog.id + ', mois ' + (S ? S.t : '?') + ') : ' + e.message + '\n' + (e.stack || '').split('\n')[1]);
  }
}

console.log('\n' + N + ' mandats simulés · ' + tours + ' mois joués · exceptions : ' + erreurs + ' · NaN : ' + nans);
console.log('Cartes vues au moins une fois : ' + vus.size + '/' + PP.CARDS.length);
const jamais = PP.CARDS.filter((c) => !vus.has(c.id)).map((c) => c.id);
if (jamais.length) console.log('Jamais tirées : ' + jamais.join(', '));
console.log('Score moyen : ' + Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) +
  ' · min ' + Math.min(...scores) + ' · max ' + Math.max(...scores));
console.log('Mandats interrompus : ' + interrompus + '/' + N);
console.log('Fins : ' + JSON.stringify(fins));
console.log('Rangs : ' + JSON.stringify(rangs));
