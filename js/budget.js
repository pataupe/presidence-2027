/* ======================= PROJET DE LOI DE FINANCES ======================= */
'use strict';

/* Un point d'enveloppe ≈ 2 milliards d'euros. */
P.BUDGET_MONTHS = [5, 17, 29, 41, 53];

P.RECETTES = [
  {
    id: 'baisse', t: 'Baisser les impôts', d: 'Impôts de production et première tranche. −28 Md€ de recettes.',
    env: -14, g: { fin: -2, op: 4 }, s: { comp: 5, just: -3 }, f: { pat: 10, syn: -6 }, x: { eco: 12 },
    add: ['impots_baisses'],
  },
  {
    id: 'stable', t: 'Stabilité fiscale', d: 'Aucune hausse, aucune baisse. Le pari de la lisibilité.',
    env: 0, g: { fin: 1 }, s: { comp: 1 }, f: { pat: 3 },
  },
  {
    id: 'cible', t: 'Hausse ciblée', d: 'Hauts patrimoines, grandes entreprises, rentes. +32 Md€.',
    env: 16, g: { fin: 3, op: -1 }, s: { just: 5, comp: -4 }, f: { pat: -12, syn: 7, jeu: 4 }, x: { eco: -12 },
    add: ['impots_hausse'],
  },
  {
    id: 'generale', t: 'Hausse générale', d: 'CSG et TVA. +52 Md€, et tout le monde la voit.',
    env: 26, g: { fin: 6, op: -9, soc: -5 }, s: { just: -5, infl: 0.3 }, f: { ret: -12, syn: -4, pat: -2 }, x: { eco: 4 },
    add: ['impots_hausse'],
  },
];

P.POSTES = [
  { k: 'sante', n: 'Santé & hôpital', d: 'Soignants, équipements, accès aux soins' },
  { k: 'educ', n: 'Éducation & recherche', d: 'Enseignants, universités, laboratoires' },
  { k: 'ecolo', n: 'Écologie & énergie', d: 'Rénovation, réseaux, transports propres' },
  { k: 'regal', n: 'Sécurité, justice, armées', d: 'Effectifs, prisons, équipements' },
  { k: 'solid', n: 'Solidarités & retraites', d: 'Minima sociaux, pensions, handicap' },
  { k: 'indus', n: 'Économie & industrie', d: 'Aides à l’investissement, formation, recherche privée' },
];

P.BUDGET_BASE = 48;   // enveloppe de base en points
P.POSTE_REF = 6;      // niveau « reconduction » d'un poste

P.budgetEnvelope = function (S, recetteId) {
  const r = P.RECETTES.find((x) => x.id === recetteId) || P.RECETTES[1];
  let env = P.BUDGET_BASE + r.env;
  env -= Math.round(Math.max(0, S.s.dette - 110) * 0.22);     // charge de la dette
  env += Math.round((S.s.croi - 1.0) * 4);                     // la croissance fait les recettes
  if (S.flags.austerite) env -= 4;
  return Math.max(10, env);
};

/* Déficit prévisionnel affiché en direct pendant l'arbitrage */
P.budgetDeficit = function (S, recetteId, total) {
  const env = P.budgetEnvelope(S, recetteId);
  const r = P.RECETTES.find((x) => x.id === recetteId) || P.RECETTES[1];
  let def = 4.3 + (total - 36) * 0.075 - r.env * 0.075;
  def += Math.max(0, S.s.dette - 115) * 0.012;
  def -= (S.s.croi - 1.0) * 0.35;
  return { env: env, def: P.round(P.clamp(def, -1.5, 10), 1) };
};

P.budgetApply = function (S, recetteId, alloc) {
  const r = P.RECETTES.find((x) => x.id === recetteId) || P.RECETTES[1];
  const env = P.budgetEnvelope(S, recetteId);
  let total = 0;
  P.POSTES.forEach((p) => { total += alloc[p.k] || 0; });
  const reste = Math.max(0, env - total);

  const eff = { g: {}, s: {}, f: {}, x: {}, add: [] };
  const addG = (k, v) => (eff.g[k] = (eff.g[k] || 0) + v);
  const addS = (k, v) => (eff.s[k] = (eff.s[k] || 0) + v);
  const addF = (k, v) => (eff.f[k] = (eff.f[k] || 0) + v);

  /* volet recettes */
  for (const k in (r.g || {})) addG(k, r.g[k]);
  for (const k in (r.s || {})) addS(k, r.s[k]);
  for (const k in (r.f || {})) addF(k, r.f[k]);
  for (const k in (r.x || {})) eff.x[k] = (eff.x[k] || 0) + r.x[k];
  (r.add || []).forEach((f) => eff.add.push(f));

  /* volet dépenses : écart au niveau de reconduction */
  const d = (k) => (alloc[k] || 0) - P.POSTE_REF;
  addS('serv', d('sante') * 0.85 + d('educ') * 0.55);
  addS('just', d('sante') * 0.25 + d('solid') * 0.85);
  addS('vert', d('ecolo') * 1.05);
  addS('secu', d('regal') * 1.0);
  addS('comp', d('indus') * 0.85 + d('educ') * 0.5 + d('ecolo') * 0.2);
  addS('chom', d('indus') * -0.035);
  addF('fon', d('sante') * 0.7 + d('educ') * 0.7);
  addF('syn', d('solid') * 0.6 + d('sante') * 0.3);
  addF('ret', d('solid') * 0.8);
  addF('jeu', d('educ') * 0.6 + d('ecolo') * 0.5);
  addF('pat', d('indus') * 0.9 - d('solid') * 0.3);
  addF('rur', d('regal') * 0.4 + d('sante') * 0.3);
  addG('op', (d('sante') + d('solid')) * 0.3 - (total > env ? 4 : 0));
  addG('soc', (d('solid') + d('sante')) * 0.25);
  addG('eur', d('regal') * 0.15);

  /* non dépensé = désendettement */
  addG('fin', reste * 0.42 - Math.max(0, total - 36) * 0.14);
  addS('dette', -reste * 0.075);
  if (reste >= 8) eff.add.push('austerite');
  if (reste <= 1 && total > 44) eff.add.push('relance_massive');

  const deltas = P.apply(S, eff, { cat: 'eco' });
  const info = P.budgetDeficit(S, recetteId, total);
  S.deficit = info.def;
  if (info.def < 3) P.apply(S, { add: ['deficit_3'] });

  P.news(S, 'Budget ' + (P.dateOf(S.t).an + 1) + ' : ' + r.t.toLowerCase() +
    ', déficit prévu à ' + info.def.toFixed(1).replace('.', ',') + ' % du PIB.', 'eco');

  /* le budget doit être voté */
  let suite = null;
  if (S.g.maj < 42 && !S.flags.cohabitation) {
    S.queue.unshift({ id: 'inst_49_3', at: S.t });
    suite = 'L’Assemblée n’a pas de majorité pour ce budget.';
  }

  return { deltas: deltas, reste: reste, total: total, env: env, def: info.def, suite: suite };
};
