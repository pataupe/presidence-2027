/* ============================== ÉLECTIONS =============================== */
'use strict';

P.EUROPEENNES = 24;    // juin 2029
P.MUNICIPALES = 57;    // mars 2032

/* Part de l'espace politique déjà occupée par le président sortant */
const OCCUPE = {
  socdem: { sd: 0.3, gr: 0.8, ec: 0.9, lc: 1, nat: 1 },
  liberal: { sd: 1, gr: 1, ec: 1, lc: 0.3, nat: 0.95 },
  ecolo: { sd: 0.85, gr: 0.9, ec: 0.25, lc: 1, nat: 1 },
  souv: { sd: 1, gr: 1, ec: 1, lc: 0.85, nat: 0.3 },
  centre: { sd: 0.7, gr: 1, ec: 0.95, lc: 0.65, nat: 1 },
};

const BLOCS = [
  { k: 'gr', n: 'Gauche radicale' },
  { k: 'ec', n: 'Bloc écologiste' },
  { k: 'sd', n: 'Bloc social-démocrate' },
  { k: 'lc', n: 'Bloc libéral-conservateur' },
  { k: 'nat', n: 'Bloc nationaliste' },
];

P.monCamp = function (S) {
  const pr = P.PROGRAMS.find((p) => p.id === S.prog);
  return 'Majorité présidentielle (' + (pr ? pr.etiq.toLowerCase() : 'centre') + ')';
};

function scoreVous(S, kind) {
  let base = 17 + (S.g.op - 50) * 0.50 + (S.g.maj - 50) * 0.08;
  const fav = (S.f.pat + S.f.syn + S.f.ret + S.f.jeu + S.f.rur + S.f.fon) / 6;
  base += (fav - 50) * 0.13 + (S.f.med - 50) * 0.05;
  base -= Math.max(0, S.s.chom - 7.4) * 0.6;
  base += Math.max(-4, Math.min(4, (S.s.croi - 1) * 1.5));
  if (S.broken.length) base -= S.broken.length * 1.8;
  if (S.kept.length) base += S.kept.length * 1.4;
  if (kind === 'eur') base -= 3.5;
  if (kind === 'mun') base += (S.f.rur - 50) * 0.09 - 1.5;
  if (kind === 'leg') base += 2.5;
  if (kind === 'pres1') base += 3.5;
  base += P.rnd(-2.6, 2.6);
  return P.clamp(base, 5, 47);
}

P.resultats = function (S, kind) {
  const vous = scoreVous(S, kind);
  const occ = OCCUPE[S.prog] || OCCUPE.centre;
  const w = {
    gr: Math.max(2, 11 + (50 - S.s.just) * 0.20 + (S.f.syn - 50) * 0.06),
    ec: Math.max(2, 9 + (50 - S.s.vert) * 0.15 + (S.f.jeu - 50) * 0.05),
    sd: Math.max(2, 16 + (50 - S.s.serv) * 0.13),
    lc: Math.max(2, 18 + (50 - S.s.comp) * 0.10 + Math.max(0, S.s.dette - 110) * 0.11),
    nat: Math.max(3, 20 + Math.max(0, S.s.chom - 7.4) * 1.5 + (50 - S.s.secu) * 0.16 +
      (50 - S.g.op) * 0.09 + (S.f.rur - 50) * 0.05),
  };
  let tot = 0;
  BLOCS.forEach((b) => { w[b.k] *= (occ[b.k] == null ? 1 : occ[b.k]); tot += w[b.k]; });
  const reste = 100 - vous;
  const lignes = [{ n: P.monCamp(S), pct: vous, me: true }];
  BLOCS.forEach((b) => lignes.push({ n: b.n, k: b.k, pct: reste * w[b.k] / tot }));
  lignes.sort((a, b) => b.pct - a.pct);
  lignes.forEach((l) => (l.pct = P.round(l.pct, 1)));
  return lignes;
};

/* ---------------------------------------------------- scrutins intermédiaires */
P.electionIntermediaire = function (S, kind) {
  const lignes = P.resultats(S, kind);
  const rang = lignes.findIndex((l) => l.me) + 1;
  const vous = lignes.find((l) => l.me).pct;
  const nom = kind === 'eur' ? 'Élections européennes' : 'Élections municipales';
  const sous = kind === 'eur'
    ? 'Scrutin de liste nationale, participation 51 %.'
    : 'Dernier test électoral avant la présidentielle.';
  let eff = { g: {}, f: {} }, verdict;

  if (rang === 1) {
    eff.g = { maj: 7, op: 3 };
    eff.f = { med: 7 };
    verdict = 'Vous arrivez en tête. Rare pour un pouvoir en exercice, et cela va vous donner de l’air ' +
      'pendant plusieurs mois.';
  } else if (rang === 2) {
    eff.g = { maj: -2, op: -1 };
    verdict = 'Deuxième place. Le résultat est honorable pour un parti au pouvoir, et personne ne le dira.';
  } else if (rang === 3) {
    eff.g = { maj: -8, op: -4 };
    eff.f = { med: -6 };
    verdict = 'Troisième. Dans votre camp, les couteaux sortent dès le dimanche soir.';
  } else {
    eff.g = { maj: -14, op: -7, soc: -3 };
    eff.f = { med: -10 };
    verdict = 'Déroute. Votre majorité est désormais une addition de gens qui cherchent une porte de sortie.';
  }
  if (lignes[0].k === 'nat') {
    verdict += ' Le bloc nationaliste arrive premier : la séquence politique vient de changer de nature.';
    eff.g.soc = (eff.g.soc || 0) - 3;
  }
  const deltas = P.apply(S, eff);
  P.news(S, nom + ' : ' + vous.toFixed(1).replace('.', ',') + ' % pour votre camp, ' +
    (rang === 1 ? 'arrivé en tête.' : rang + 'e place.'), 'pol');
  if (rang >= 3) S.flags.defaite_intermediaire = true;
  if (rang === 1) S.flags.victoire_intermediaire = true;
  return { kind: kind, titre: nom, sous: sous, lignes: lignes, verdict: verdict, deltas: deltas };
};

/* --------------------------------------------------------------- législatives */
P.legislatives = function (S, camp) {
  const bonus = { peur: { op: 1, nat: 1.12 }, bilan: { op: S.g.op > 48 ? 4 : -3 }, espoir: { op: 2 }, alliance: { op: 3 } };
  const b = bonus[camp] || { op: 0 };
  if (b.op) S.g.op = P.clamp(S.g.op + b.op);
  const lignes = P.resultats(S, 'leg');
  if (camp === 'peur') {
    const n = lignes.find((l) => l.k === 'nat');
    if (n) n.pct = P.round(n.pct * 1.1, 1);
  }
  /* conversion en sièges : scrutin majoritaire, forte prime au premier */
  let tot = 0;
  lignes.forEach((l) => { l.pw = Math.pow(Math.max(1, l.pct), 1.75); tot += l.pw; });
  lignes.forEach((l) => { l.sieges = Math.round(577 * l.pw / tot); });
  const moi = lignes.find((l) => l.me);
  const premier = lignes.slice().sort((a, b2) => b2.sieges - a.sieges)[0];
  const partSieges = moi.sieges / 577 * 100;

  const eff = { g: { maj: 0 }, add: [], del: [] };
  let verdict;
  const cible = P.clamp(partSieges * 1.55, 5, 95);
  eff.g.maj = cible - S.g.maj;
  S.flags.legislatives_done = true;
  delete S.flags.dissolution;

  if (moi.sieges >= 289) {
    verdict = 'Majorité absolue. Vous avez gagné votre pari : le pays vous confie les clés une seconde fois.';
    eff.g.op = 6; eff.add.push('majorite_absolue'); eff.del.push('cohabitation');
  } else if (premier.me) {
    verdict = 'Majorité relative. Vous restez le premier groupe, et chaque texte se négociera vote par vote.';
    eff.g.op = 2; eff.del.push('cohabitation');
  } else if (premier.sieges >= 289) {
    verdict = 'Cohabitation. Le bloc ' + premier.n.toLowerCase() + ' obtient la majorité absolue : ' +
      'vous nommez son chef à Matignon et vous gardez la défense et la diplomatie.';
    eff.g.op = -6; eff.add.push('cohabitation');
    S.cohab = true;
  } else {
    verdict = 'Assemblée fracturée et vous n’êtes plus le premier groupe. Le pays est ingouvernable ' +
      'et c’est vous qui l’avez convoqué aux urnes.';
    eff.g.op = -9; eff.add.push('assemblee_bloquee');
  }
  const deltas = P.apply(S, eff);
  P.news(S, 'Législatives : ' + moi.sieges + ' sièges pour votre camp sur 577.', 'pol');
  return {
    kind: 'leg', titre: 'Élections législatives', sous: 'Scrutin majoritaire à deux tours, 577 sièges.',
    lignes: lignes.sort((a, b2) => b2.sieges - a.sieges), verdict: verdict, deltas: deltas, sieges: true,
  };
};

/* ----------------------------------------------------------------- référendum */
P.referendum = function (S, camp) {
  let oui = 49 + (S.g.op - 50) * 0.75 + (S.f.med - 50) * 0.12 + (S.g.soc - 50) * 0.1;
  if (camp === 'technique') oui += 5;
  if (camp === 'tiroir') oui += 7;
  if (camp === 'perso') oui += P.rnd(-9, 9);
  oui += P.rnd(-5, 5);
  oui = P.round(P.clamp(oui, 12, 88), 1);
  const gagne = oui > 50;
  const eff = { g: {}, f: {}, add: [] };
  let verdict;
  if (gagne) {
    eff.g = { op: 9, maj: 12, soc: 5 };
    eff.f = { med: 8 };
    eff.add.push('referendum_gagne');
    verdict = 'Le oui l’emporte. Vous avez une légitimité directe que personne ne peut vous contester ' +
      'pendant au moins un an.';
    if (camp === 'tiroir') { eff.f.med = -4; verdict += ' La question à tiroirs laissera un goût amer, mais le résultat est là.'; }
  } else {
    eff.g = { op: -13, maj: -14, soc: -4 };
    eff.f = { med: -8 };
    eff.add.push('referendum_perdu');
    verdict = 'Le non l’emporte. Vous avez posé une question au pays et il a répondu non.';
    if (camp === 'perso') {
      verdict += ' Vous aviez engagé votre mandat : la question de votre départ est désormais ouverte.';
      S.queue.unshift({ id: 'inst_apres_non', at: S.t });
    }
  }
  const deltas = P.apply(S, eff);
  P.news(S, 'Référendum : ' + oui.toFixed(1).replace('.', ',') + ' % de oui, ' +
    (100 - oui).toFixed(1).replace('.', ',') + ' % de non.', 'pol');
  return {
    kind: 'ref', titre: 'Référendum', sous: 'Participation 62 %.',
    lignes: [{ n: 'Oui', pct: oui, me: gagne }, { n: 'Non', pct: P.round(100 - oui, 1), me: !gagne }],
    verdict: verdict, deltas: deltas,
  };
};

P.CARDS.push({
  id: 'inst_apres_non', cat: 'inst', who: 'sg', direct: true,
  titre: 'Après le non',
  quote: 'Vous aviez dit que vous partiriez. Soixante-huit pour cent des Français s’en souviennent très bien.',
  txt: 'Tenir parole ouvre une élection anticipée. Rester ouvre trois ans de contestation de légitimité.',
  choices: [
    { t: 'Démissionner', g: { }, add: ['demission_parole'], out: 'Vous tenez parole. Peu de présidents l’ont fait.' },
    { t: 'Rester, et l’assumer', g: { op: -8, maj: -6 }, f: { med: -10 }, s: { just: -4 }, x: { aut: 10 },
      out: 'Vous restez. Chaque discours commencera désormais par la question de votre légitimité.' },
    { t: 'Rester, mais dissoudre l’Assemblée', g: { op: -2 }, add: ['dissolution'], then: [['inst_legislatives', 1]],
      out: 'Vous transférez la sanction aux députés. Ils vont adorer.' },
  ],
});

/* -------------------------------------------------------------- présidentielle */
P.presidentielle = function (S, candidat) {
  if (candidat === 'retrait') return { renonce: true };
  const t1 = P.resultats(S, 'pres1');
  const moi = t1.find((l) => l.me);
  const autres = t1.filter((l) => !l.me).sort((a, b) => b.pct - a.pct);
  const qualifie = moi.pct >= autres[0].pct ? 1 : (moi.pct >= autres[1].pct ? 2 : 0);
  const res = { kind: 'pres', titre: 'Élection présidentielle', sous: 'Premier tour, participation 74 %.', lignes: t1 };

  if (!qualifie) {
    res.elimine = true;
    res.adversaire = autres[0];
    res.verdict = 'Éliminé au premier tour. Vous êtes le premier président sortant dans ce cas.';
    return res;
  }
  const adv = qualifie === 1 ? autres[0] : autres[0];
  /* second tour : report des voix selon l'adversaire et votre bilan */
  let moiT2 = 50 + (moi.pct - adv.pct) * 1.1 + (S.g.op - 50) * 0.35;
  /* report des voix : le « front républicain » existe encore, mais il s'use
     avec l'impopularité du sortant */
  if (adv.k === 'nat') moiT2 += 5 + (S.g.op - 45) * 0.22;
  if (adv.k === 'gr') moiT2 += 2 + (S.g.op - 45) * 0.12;
  if (S.flags.cohabitation) moiT2 -= 4;
  moiT2 += (S.kept.length - S.broken.length) * 1.6;
  moiT2 += P.rnd(-4, 4);
  moiT2 = P.round(P.clamp(moiT2, 20, 80), 1);
  res.t2 = [
    { n: 'Vous', pct: moiT2, me: true },
    { n: adv.n, pct: P.round(100 - moiT2, 1) },
  ];
  res.gagne = moiT2 > 50;
  res.adversaire = adv;
  return res;
};
