/* =========================================================================
   Programmes, promesses de campagne, conseillers, Premiers ministres
   ========================================================================= */
'use strict';

P.CONTEXTE = 'Mai 2027. Vous êtes élu(e) président de la République avec 52 % des voix, ' +
  'dans un pays fatigué : 114 % de dette, 7,4 % de chômage, une Assemblée sans majorité claire ' +
  'et une rue qui ne demande qu’un prétexte. Cinq ans. Soixante mois. Une décision par mois.';

/* ------------------------------------------------------------ programmes */
P.PROGRAMS = [
  {
    id: 'socdem',
    t: 'La France qui protège',
    etiq: 'Social-démocrate',
    pitch: 'Vous avez gagné sur le pouvoir d’achat, l’hôpital et l’école. Les syndicats vous ' +
      'soutiennent, les marchés vous observent, Bercy vous explique déjà que « ce n’est pas finançable ».',
    force: 'Syndicats et fonction publique derrière vous',
    faible: 'Patronat méfiant, marges budgétaires nulles',
    pm: 'Djamila Aït-Saïd',
    g: { op: 58, maj: 54, soc: 64, fin: 42, eur: 56 },
    s: { just: 56, serv: 52, comp: 46, dette: 116 },
    f: { syn: 68, fon: 66, pat: 32, ret: 54, jeu: 56, rur: 46, med: 52 },
    x: { eco: -35, aut: -10, ecol: 10, ue: 15 },
    line: { eco: -60, aut: -20, ecol: 20, ue: 20 },
    promises: [
      { id: 'p_smic', t: 'Augmenter le SMIC de 10 %', d: 'Le cœur de votre campagne.', keeps: ['smic_augmente'], breaks: ['smic_refuse'] },
      { id: 'p_hopital', t: '30 000 soignants de plus à l’hôpital', d: 'Vous l’avez promis devant un CHU.', keeps: ['hopital_plan'], breaks: ['hopital_abandon'] },
      { id: 'p_retraites_non', t: 'Ne pas toucher à l’âge de départ', d: 'Trois fois répété en meeting.', keeps: ['retraites_abandon'], breaks: ['retraites_votee'] },
      { id: 'p_profs', t: 'Revaloriser les enseignants', d: '+20 % en début de carrière.', keeps: ['prof_revalorises'], breaks: ['fonctionnaires_gel'] },
      { id: 'p_isf', t: 'Rétablir un impôt sur les grandes fortunes', d: 'Symbole absolu de votre camp.', keeps: ['isf_retabli'], breaks: ['flat_tax_renforcee'] },
      { id: 'p_logement', t: 'Construire 500 000 logements abordables', d: 'Promis aux maires.', keeps: ['logement_plan'], breaks: [] },
    ],
  },
  {
    id: 'liberal',
    t: 'Travailler, produire, désendetter',
    etiq: 'Libéral réformateur',
    pitch: 'Vous avez gagné sur la dette, le travail et l’industrie. Les marchés respirent, ' +
      'les syndicats affûtent les banderoles, et vous avez promis d’aller vite.',
    force: 'Patronat, marchés, compétitivité',
    faible: 'Syndicats hostiles, rue inflammable',
    pm: 'Hélène Vasseur',
    g: { op: 54, maj: 60, soc: 50, fin: 60, eur: 62 },
    s: { comp: 58, just: 44, serv: 46, dette: 113 },
    f: { pat: 72, syn: 28, fon: 36, ret: 56, jeu: 44, rur: 52, med: 54 },
    x: { eco: 40, aut: 10, ecol: -5, ue: 25 },
    line: { eco: 65, aut: 15, ecol: -10, ue: 30 },
    promises: [
      { id: 'p_deficit', t: 'Ramener le déficit sous 3 %', d: 'Engagement pris devant Bruxelles.', keeps: ['deficit_3'], breaks: ['relance_massive'] },
      { id: 'p_retraites_oui', t: 'Faire passer la réforme des retraites', d: 'Votre réforme-totem.', keeps: ['retraites_votee'], breaks: ['retraites_abandon'] },
      { id: 'p_impots', t: 'Baisser les impôts de production', d: 'Promis au patronat.', keeps: ['impots_baisses'], breaks: ['impots_hausse'] },
      { id: 'p_chomage', t: 'Durcir les règles de l’assurance chômage', d: 'Objectif plein emploi.', keeps: ['assurance_chomage_dure'], breaks: ['assurance_chomage_elargie'] },
      { id: 'p_admin', t: 'Supprimer 100 000 postes dans l’administration', d: 'Chiffre lâché en débat.', keeps: ['fonctionnaires_gel'], breaks: ['fonctionnaires_revalo'] },
      { id: 'p_nuke', t: 'Lancer dix réacteurs nucléaires', d: 'Souveraineté énergétique.', keeps: ['nucleaire_lance'], breaks: ['nucleaire_abandon'] },
    ],
  },
  {
    id: 'ecolo',
    t: 'Bifurcation',
    etiq: 'Écologiste',
    pitch: 'Première présidence écologiste. Vous avez six mois d’état de grâce et une génération ' +
      'qui vous regarde. L’industrie, l’agriculture et les automobilistes, un peu moins.',
    force: 'Jeunesse, crédibilité climatique, Europe',
    faible: 'Ruralité et patronat sur la défensive',
    pm: 'Anne-Lise Trémaud',
    g: { op: 57, maj: 48, soc: 58, fin: 46, eur: 64 },
    s: { vert: 62, just: 54, comp: 44, dette: 115 },
    f: { jeu: 72, syn: 58, fon: 58, pat: 30, rur: 32, ret: 42, med: 56 },
    x: { eco: -20, aut: -25, ecol: 55, ue: 30 },
    line: { eco: -35, aut: -30, ecol: 70, ue: 35 },
    promises: [
      { id: 'p_climat', t: 'Diviser par deux les émissions en dix ans', d: 'Votre raison d’être.', keeps: ['renouvelables_massif'], breaks: ['autoroute_validee'] },
      { id: 'p_pesticides', t: 'Interdire les pesticides les plus dangereux', d: 'Promis aux apiculteurs.', keeps: ['pesticides_interdits'], breaks: ['pesticides_derogation'] },
      { id: 'p_train', t: 'Le train moins cher que l’avion', d: 'Mesure la plus populaire de votre programme.', keeps: ['ferroviaire_plan'], breaks: [] },
      { id: 'p_reno', t: 'Rénover 700 000 logements par an', d: 'Emploi local et sobriété.', keeps: ['renovation_plan'], breaks: [] },
      { id: 'p_ric', t: 'Instaurer le référendum d’initiative citoyenne', d: 'Votre promesse démocratique.', keeps: ['referendum_initiative'], breaks: ['49_3_utilise'] },
      { id: 'p_nonuke', t: 'Aucun nouveau réacteur nucléaire', d: 'Ligne rouge de vos alliés.', keeps: ['nucleaire_abandon'], breaks: ['nucleaire_lance'] },
    ],
  },
  {
    id: 'souv',
    t: 'La France chez elle',
    etiq: 'Souverainiste',
    pitch: 'Vous avez gagné sur l’immigration, la sécurité et le pouvoir d’achat. La haute ' +
      'administration vous regarde de travers, Bruxelles a prévu des réunions, la presse vous attend.',
    force: 'Ruralité, sécurité, soutien populaire massif',
    faible: 'Europe, médias, marchés',
    pm: 'Victor Delcourt',
    g: { op: 60, maj: 52, soc: 52, fin: 46, eur: 34 },
    s: { secu: 54, comp: 48, just: 48, dette: 116 },
    f: { rur: 70, ret: 62, pat: 46, syn: 42, fon: 36, jeu: 40, med: 32 },
    x: { eco: 5, aut: 45, ecol: -25, ue: -55 },
    line: { eco: 10, aut: 55, ecol: -25, ue: -65 },
    promises: [
      { id: 'p_immig', t: 'Diviser par trois l’immigration', d: 'La promesse qui vous a fait élire.', keeps: ['immigration_loi_dure'], breaks: ['immigration_loi_souple'] },
      { id: 'p_ordre', t: 'Rétablir l’ordre partout', d: '10 000 policiers de plus.', keeps: ['police_renforcee'], breaks: [] },
      { id: 'p_tva', t: 'Baisser la TVA sur l’alimentaire', d: 'Pouvoir d’achat immédiat.', keeps: ['tva_baisse_alim'], breaks: [] },
      { id: 'p_ric2', t: 'Un référendum par an', d: 'Rendre la parole au peuple.', keeps: ['referendum_initiative'], breaks: ['49_3_utilise'] },
      { id: 'p_reloc', t: 'Relocaliser l’industrie', d: 'Produire français.', keeps: ['relocalisation_plan'], breaks: ['mercosur_signe'] },
      { id: 'p_bruxelles', t: 'Reprendre la main sur nos frontières', d: 'Au besoin contre Bruxelles.', keeps: ['frontieres_nationales'], breaks: [] },
    ],
  },
  {
    id: 'centre',
    t: 'Le pays qui marche',
    etiq: 'Centriste gestionnaire',
    pitch: 'Vous avez gagné par défaut, au second tour, contre les extrêmes. Personne ne vous ' +
      'aime vraiment : c’est votre force, vous n’avez de compte à rendre à aucune base.',
    force: 'Europe, marchés, aucune aile à ménager',
    faible: 'Aucune base militante, zéro état de grâce',
    pm: 'Gilles Monteil',
    g: { op: 51, maj: 62, soc: 56, fin: 54, eur: 70 },
    s: { comp: 52, serv: 50, just: 48, dette: 114 },
    f: { pat: 56, syn: 44, ret: 54, jeu: 44, rur: 46, fon: 48, med: 58 },
    x: { eco: 15, aut: 10, ecol: 10, ue: 45 },
    line: { eco: 20, aut: 10, ecol: 15, ue: 50 },
    promises: [
      { id: 'p_pacte', t: 'Réformer sans bloquer le pays', d: 'Méthode avant idéologie.', keeps: ['pacte_social'], breaks: ['greve_generale'] },
      { id: 'p_medecin', t: 'Un médecin pour chaque Français', d: 'Fin des déserts médicaux.', keeps: ['medecins_regulation'], breaks: ['hopital_abandon'] },
      { id: 'p_tel', t: 'Interdire le smartphone au collège', d: 'Mesure consensuelle et peu coûteuse.', keeps: ['smartphone_interdit'], breaks: [] },
      { id: 'p_def', t: 'Bâtir une défense européenne', d: 'Votre grande ambition.', keeps: ['defense_europeenne'], breaks: [] },
      { id: 'p_simpl', t: 'Simplifier la vie des entreprises', d: 'Moins de normes, plus d’activité.', keeps: ['simplification'], breaks: [] },
      { id: 'p_49', t: 'Ne jamais utiliser le 49.3', d: 'Engagement solennel devant l’Assemblée.', keeps: [], breaks: ['49_3_utilise'], parDefaut: true },
    ],
  },
];

/* ----------------------------------------------------------- conseillers */
P.ADVISORS = {
  pm: { n: '%PM%', r: 'Premier ministre', i: 'PM' },
  eco: { n: 'Marc Delannoy', r: 'ministre de l’Économie', i: 'MD' },
  int: { n: 'Serge Fabre', r: 'ministre de l’Intérieur', i: 'SF' },
  trav: { n: 'Nadia Belkacem', r: 'ministre du Travail', i: 'NB' },
  san: { n: 'Claire Vignal', r: 'ministre de la Santé', i: 'CV' },
  edu: { n: 'Hugo Lenoir', r: 'ministre de l’Éducation', i: 'HL' },
  ecol: { n: 'Léa Vaillant', r: 'ministre de la Transition écologique', i: 'LV' },
  def: { n: 'Thibault Rességuier', r: 'ministre des Armées', i: 'TR' },
  ext: { n: 'Inès Rahmani', r: 'ministre des Affaires étrangères', i: 'IR' },
  jus: { n: 'Pierre-Henri Malet', r: 'garde des Sceaux', i: 'PM' },
  agri: { n: 'Yann Kerbrat', r: 'ministre de l’Agriculture', i: 'YK' },
  com: { n: 'Mathilde Crozet', r: 'conseillère communication', i: 'MC' },
  sg: { n: 'Olivier Sarda', r: 'secrétaire général de l’Élysée', i: 'OS' },
  sond: { n: 'Fatou Diarra', r: 'votre sondeuse', i: 'FD' },
  syn: { n: 'Le premier syndicat', r: 'intersyndicale', i: 'CG' },
  pat: { n: 'Le mouvement patronal', r: 'organisation patronale', i: 'MP' },
  ue: { n: 'La Commission européenne', r: 'Bruxelles', i: 'UE' },
  maire: { n: 'Les maires', r: 'association des maires', i: 'AM' },
  gen: { n: 'Le chef d’état-major', r: 'armées', i: 'EM' },
  pref: { n: 'Le préfet de police', r: 'préfecture', i: 'PP' },
  tres: { n: 'L’Agence France Trésor', r: 'dette souveraine', i: 'AF' },
  presse: { n: 'La presse', r: 'conférence de rédaction', i: 'LP' },
  moi: { n: 'Vous', r: 'bureau d’angle, 23 h', i: 'VP' },
};

P.advisor = function (S, key) {
  const a = P.ADVISORS[key] || P.ADVISORS.sg;
  const n = a.n === '%PM%' ? S.pm : a.n;
  const i = a.n === '%PM%' ? initials(S.pm) : a.i;
  return { n: n, r: a.r, i: i };
};
function initials(name) {
  return (name || '').split(/[\s-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

/* ----------------------------------------------------- Premiers ministres */
P.PMS = [
  { n: 'Hélène Vasseur', d: 'Haute fonctionnaire de Bercy. Compétente, glaciale, zéro réseau militant.', g: { fin: 8, maj: 4, soc: -5 }, f: { pat: 6, syn: -6, fon: 2 } },
  { n: 'Gilles Monteil', d: 'Quarante ans de Palais-Bourbon. Il connaît les 577 prénoms.', g: { maj: 14, op: -4 }, f: { med: 3 } },
  { n: 'Samir Kassab', d: 'Maire populaire d’une grande ville. Les gens l’arrêtent dans la rue.', g: { op: 10, soc: 4, fin: -4 }, f: { jeu: 7, pat: -5 } },
  { n: 'Anne-Lise Trémaud', d: 'Ingénieure des mines passée à l’écologie. Inattaquable sur les chiffres.', g: { eur: 6, soc: 3 }, s: { vert: 5 }, f: { jeu: 6, rur: -5, pat: -4 } },
  { n: 'Victor Delcourt', d: 'Aile droite, parler franc, clivant par construction.', g: { maj: 6, soc: -8 }, s: { secu: 5 }, f: { ret: 6, rur: 6, syn: -8, jeu: -6 } },
  { n: 'Djamila Aït-Saïd', d: 'Ancienne syndicaliste. La rue la respecte, la Bourse moins.', g: { soc: 12, fin: -6 }, f: { syn: 10, fon: 6, pat: -8 } },
  { n: 'Raphaël Ostermann', d: 'Patron de start-up industrielle. Aucune expérience politique, un carnet d’adresses.', g: { fin: 5, maj: -5 }, s: { comp: 6 }, f: { pat: 10, fon: -5 } },
];
