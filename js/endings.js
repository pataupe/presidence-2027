/* =================== FINS DE MANDAT, BILAN, POSTÉRITÉ =================== */
'use strict';

P.FINS = {
  demission_forcee: {
    t: 'Démission',
    s: 'Mandat interrompu',
    txt: 'Deux fois au plus bas jamais mesuré, une majorité évaporée, et un pays qui ne vous écoute plus. ' +
      'Vous annoncez votre départ dans une allocution de quatre minutes, sans effets, en regardant la caméra. ' +
      'L’intérim est assuré par le président du Sénat. L’élection anticipée est fixée dans trente-cinq jours.',
  },
  crise_regime: {
    t: 'Crise de régime',
    s: 'Mandat interrompu',
    txt: 'Deux gouvernements censurés, aucun budget voté, une Assemblée que plus aucune combinaison ne rend ' +
      'gouvernable. La Ve République a tenu sur une hypothèse : qu’une majorité existe toujours. Votre mandat ' +
      'démontre le contraire, et vous laissez un pays qui devra réécrire ses institutions.',
  },
  pays_bloque: {
    t: 'Le pays bloqué',
    s: 'Mandat interrompu',
    txt: 'Six semaines de grève reconductible, des carburants rationnés, des villes sans ramassage, ' +
      'et quatre millions de personnes dans la rue. Rien ne redémarre. Vous partez pour que le pays reparte : ' +
      'c’est la seule chose qu’il vous reste à offrir.',
  },
  tutelle: {
    t: 'Sous tutelle',
    s: 'Mandat interrompu',
    txt: 'Les adjudications ne trouvent plus preneur, les taux dépassent 7 %, et le pays signe un programme ' +
      'd’assistance avec ses partenaires européens. Les décisions budgétaires se prennent désormais ailleurs. ' +
      'Vous restez en fonction, mais vous ne gouvernez plus les comptes publics.',
  },
  isolement: {
    t: 'Isolement total',
    s: 'Mandat interrompu',
    txt: 'La France n’est plus consultée, plus invitée, plus écoutée. Les décisions européennes se prennent sans elle, ' +
      'les alliances se recomposent autour d’elle. Il n’y a pas eu de rupture spectaculaire : juste une place ' +
      'perdue, réunion après réunion.',
  },
  demission_parole: {
    t: 'Parole tenue',
    s: 'Démission volontaire',
    txt: 'Vous avez engagé votre mandat sur un référendum. Le pays a dit non. Vous partez le lendemain, ' +
      'sans négocier, sans attendre. Les commentateurs parlent d’un gâchis ; les historiens, plus tard, ' +
      'parleront d’un des rares moments où une parole politique a été honorée à la lettre.',
  },
};

/* ------------------------------------------------------- portrait politique */
P.portrait = function (S) {
  const x = S.x, g = S.g, s = S.s;
  const cands = [
    { c: S.flags.etat_urgence && x.aut > 30, t: 'L’homme d’ordre', d: 'Vous avez gouverné avec l’état d’exception comme méthode.' },
    { c: x.aut > 45, t: 'Le président-préfet', d: 'L’autorité avant la délibération, partout et tout le temps.' },
    { c: x.ecol > 40 && s.vert > 62, t: 'Le bifurcateur', d: 'Vous avez engagé le pays dans une transition qu’il n’avait pas tout à fait demandée.' },
    { c: x.eco > 45 && s.dette < 112, t: 'Le liquidateur de dette', d: 'Comptes redressés, services publics amaigris, croissance retrouvée.' },
    { c: x.eco < -40 && s.just > 60, t: 'Le redistributeur', d: 'Vous avez déplacé la richesse. Le pays s’en souviendra des deux côtés.' },
    { c: x.ue < -40, t: 'Le souverain', d: 'Vous avez repris des marges nationales, au prix de votre influence européenne.' },
    { c: x.ue > 45 && g.eur > 65, t: 'L’Européen', d: 'Vous avez pensé la France comme une puissance à l’intérieur d’un ensemble.' },
    { c: S.kept.length >= 3 && S.broken.length === 0, t: 'Celui qui a tenu parole', d: 'Trois promesses faites, trois promesses tenues. C’est inhabituel.' },
    { c: S.broken.length >= 2, t: 'Le renonciateur', d: 'Élu sur un programme, vous en avez gouverné un autre.' },
    { c: g.op > 55 && g.soc > 55, t: 'Le rassembleur', d: 'Vous avez gouverné sans fracturer le pays. Peu y parviennent.' },
    { c: S.pmChanges >= 3, t: 'Le consommateur de Premiers ministres', d: 'Quatre chefs de gouvernement en cinq ans.' },
    { c: s.chom < 6, t: 'Le président du plein emploi', d: 'Le chômage au plus bas depuis cinquante ans.' },
    { c: true, t: 'Le gestionnaire', d: 'Ni rupture ni effondrement : un mandat de métier, qui ne fera pas de chapitre.' },
  ];
  return cands.find((c) => c.c);
};

/* ------------------------------------------------------------------- presse */
P.revuePresse = function (S) {
  const out = [];
  const push = (c, j, t) => { if (c) out.push({ j: j, t: t }); };
  push(S.s.chom < 6.5, 'L’Écho du soir', 'Le chômage au plus bas : un mandat sauvé par l’emploi');
  push(S.s.chom > 10, 'L’Écho du soir', 'Dix pour cent de chômage : la facture d’un quinquennat');
  push(S.s.dette > 135, 'Le Quotidien', 'Dette : le mandat qui a fait sauter les digues');
  push(S.s.dette < 108, 'Le Quotidien', 'Désendettement : le pari tenu, et son coût social');
  push(S.g.soc < 35, 'La Gazette', 'Cinq ans de conflit : le pays n’a jamais été aussi tendu');
  push(S.g.soc > 65, 'La Gazette', 'La paix sociale retrouvée, à crédit ou pour de bon ?');
  push(S.s.serv > 62, 'Le Quotidien', 'Hôpital, école : les services publics respirent à nouveau');
  push(S.s.serv < 40, 'Le Quotidien', 'Services publics : la décennie du renoncement');
  push(S.s.vert > 62, 'Infos24', 'Climat : la France de nouveau dans la trajectoire');
  push(S.s.vert < 40, 'Infos24', 'Climat : cinq années perdues');
  push(S.flags['49_3_utilise'], 'La Gazette', 'Le 49.3, méthode de gouvernement');
  push(S.flags.retraites_votee, 'L’Écho du soir', 'Retraites : la réforme est passée, la blessure reste');
  push(S.flags.cohabitation, 'Le Quotidien', 'Cohabitation : qui gouvernait vraiment ?');
  push(S.flags.etat_urgence, 'La Gazette', 'État d’urgence : ce que la République y a laissé');
  push(S.flags.accord_geneve, 'Infos24', 'Genève : le jour où la diplomatie française a compté');
  push(S.flags.nucleaire_lance, 'L’Écho du soir', 'Nucléaire : un choix pour soixante ans');
  push(S.flags.grand_debat, 'La Gazette', 'La grande consultation : prise de parole ou thérapie collective ?');
  push(S.trophies.hopital_sauve, 'Infos24', 'L’hôpital public tient debout : comment ils l’ont fait');
  const secours = [
    { j: 'Le Quotidien', t: 'Un mandat sans récit : le bilan en quatre chiffres' },
    { j: 'La Gazette', t: 'Ce que ces cinq ans ont changé, et ce qu’ils n’ont pas touché' },
    { j: 'Infos24', t: 'Les cinq décisions qui résument le quinquennat' },
  ];
  while (out.length < 3 && secours.length) out.push(secours.shift());
  return out.slice(0, 4);
};

/* --------------------------------------------------------------- le bilan */
P.bilan = function (S, pres) {
  const d = (k) => S.s[k] - S.startStats[k];

  /* trophées calculés en fin de partie, avant le score */
  if (!S.flags['49_3_utilise']) S.trophies.jamais_49_3 = true;
  if (S.s.chom < 6) S.trophies.plein_emploi = true;
  if (S.s.dette < 110) S.trophies.dette_maitrisee = true;
  if (!S.flags.gouv_technique && !S.flags.cohabitation && S.pmChanges === 0) S.trophies.zero_censure = true;

  let score = 0;
  score += S.g.op * 1.3 + S.g.maj * 0.45 + S.g.soc * 0.8 + S.g.fin * 0.55 + S.g.eur * 0.5;
  score += -d('chom') * 15;
  score += d('croi') * 14;
  score += -d('dette') * 2.3;
  score += d('serv') * 1.7 + d('just') * 1.7 + d('secu') * 1.3 + d('vert') * 1.5 + d('comp') * 1.3;
  score += S.kept.length * 26 - S.broken.length * 30;
  score += Object.keys(S.trophies).length * 9;
  if (S.flags.cohabitation) score -= 60;
  if (S.flags.etat_urgence) score -= 30;
  if (S.flags.defaut_partiel) score -= 120;
  if (S.flags.pacte_social) score += 35;
  if (S.over) score -= 200;
  if (pres && pres.gagne) score += 130;
  if (pres && pres.renonce) score -= 30;
  if (pres && pres.elimine) score -= 90;
  score = Math.max(0, Math.round(P.clamp(score + 70, 0, 1000)));

  let rang;
  if (score > 850) rang = 'Entré dans l’histoire';
  else if (score > 700) rang = 'Mandat réussi';
  else if (score > 560) rang = 'Mandat honorable';
  else if (score > 420) rang = 'Mandat contesté';
  else if (score > 270) rang = 'Mandat raté';
  else rang = 'Désastre historique';

  const port = P.portrait(S);
  const parts = [];
  if (S.over) {
    parts.push('Votre mandat s’est arrêté avant son terme, au ' + (S.t + 1) + 'e mois sur soixante.');
  } else if (pres && pres.gagne) {
    parts.push('Réélu avec ' + pres.t2[0].pct.toFixed(1).replace('.', ',') + ' % des voix, vous repartez pour cinq ans.');
  } else if (pres && pres.renonce) {
    parts.push('Vous n’avez pas sollicité de second mandat et vous avez quitté l’Élysée au terme des cinq ans.');
  } else if (pres && pres.elimine) {
    parts.push('Éliminé au premier tour de votre propre réélection : un précédent dans l’histoire de la Ve République.');
  } else if (pres) {
    parts.push('Battu au second tour avec ' + pres.t2[0].pct.toFixed(1).replace('.', ',') + ' % des voix.');
  }
  parts.push(d('chom') < -0.6 ? 'Le chômage a reculé de ' + Math.abs(d('chom')).toFixed(1).replace('.', ',') + ' point et cela restera votre meilleur argument.'
    : d('chom') > 0.6 ? 'Le chômage a progressé de ' + d('chom').toFixed(1).replace('.', ',') + ' point : aucun discours n’effacera cette ligne.'
      : 'Le chômage est resté à peu près stable, ce qui se plaide dans les deux sens.');
  parts.push(d('dette') > 8 ? 'La dette a pris ' + Math.round(d('dette')) + ' points de PIB : vos successeurs hériteront de la facture.'
    : d('dette') < -4 ? 'Vous avez réduit la dette de ' + Math.abs(Math.round(d('dette'))) + ' points de PIB, ce qu’aucun gouvernement n’avait fait depuis des décennies.'
      : 'La dette est restée sous contrôle sans être réduite.');
  if (S.broken.length) parts.push('Vous avez renoncé à ' + S.broken.length + ' de vos promesses de campagne, et on vous l’a rappelé chaque semaine.');
  if (S.kept.length >= 2) parts.push('Vous avez tenu ' + S.kept.length + ' engagements sur les trois pris devant les électeurs.');
  parts.push(port.d);

  const promesses = S.promises.map((pid) => {
    const pr = P.promiseById(pid);
    let etat = 'sans suite';
    if (S.kept.indexOf(pid) >= 0) etat = 'tenue';
    else if (S.broken.indexOf(pid) >= 0) etat = 'trahie';
    else if (pr && pr.parDefaut) etat = 'tenue';
    return { t: pr ? pr.t : pid, etat: etat };
  });

  return {
    score: score, rang: rang, portrait: port, presse: P.revuePresse(S),
    verdict: parts.join(' '), promesses: promesses,
    trophees: Object.keys(S.trophies).map((k) => P.TROPHIES[k]).filter(Boolean),
  };
};

P.partageTexte = function (S, b, pres) {
  const pr = P.PROGRAMS.find((p) => p.id === S.prog);
  const l = [];
  l.push('PRÉSIDENCE 2027 — ' + (pr ? pr.etiq : '') + ' — ' + b.rang + ' (' + b.score + '/1000)');
  l.push('« ' + b.portrait.t + ' »');
  l.push('Opinion ' + Math.round(S.g.op) + ' % · chômage ' + S.s.chom.toFixed(1).replace('.', ',') +
    ' % · dette ' + Math.round(S.s.dette) + ' % du PIB');
  if (S.over) l.push('Mandat interrompu au mois ' + (S.t + 1) + '/60 : ' + (P.FINS[S.over] ? P.FINS[S.over].t : ''));
  else if (pres && pres.gagne) l.push('Réélu avec ' + pres.t2[0].pct.toFixed(1).replace('.', ',') + ' %');
  else if (pres && pres.renonce) l.push('Non candidat à sa réélection');
  else if (pres) l.push('Battu à la présidentielle');
  l.push('Promesses tenues : ' + S.kept.length + '/' + S.promises.length);
  return l.join('\n');
};
