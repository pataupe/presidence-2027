/* ================== ÉCONOMIE, FISCALITÉ, TRAVAIL, INDUSTRIE ============== */
'use strict';

P.CARDS.push(

  {
    id: 'eco_smic', cat: 'eco', who: 'trav', w: 14, max: 14,
    titre: 'Le SMIC, maintenant ou jamais',
    quote: 'Si on ne le fait pas dans les six premiers mois, on ne le fera jamais. Et tout le monde le sait.',
    txt: 'Le coup de pouce au SMIC est le premier arbitrage de votre mandat. Bercy a chiffré : chaque point coûte ' +
      'environ 1,4 milliard en allègements de cotisations, et tire mécaniquement les salaires juste au-dessus.',
    choices: [
      {
        t: '+10 % tout de suite', d: 'Le pouvoir d’achat d’abord',
        g: { op: 8, soc: 7, fin: -9 }, s: { just: 7, comp: -4, infl: 0.4, chom: 0.15 },
        f: { syn: 14, pat: -14, jeu: 6 }, x: { eco: -12 }, add: ['smic_augmente'],
        news: 'SMIC : +10 %. Deux millions de salariés concernés, le patronat parle de « choc de coûts ».',
        out: 'Vingt-quatre heures de bonheur politique. Puis les premiers plans sociaux dans l’hôtellerie.',
      },
      {
        t: '+4 %, et une prime défiscalisée', d: 'Compromis négocié',
        g: { op: 4, soc: 3, fin: -4 }, s: { just: 3 }, f: { syn: 4, pat: -4 },
        news: 'Hausse modérée du SMIC complétée par une prime exonérée de cotisations.',
        out: 'Personne n’est content, personne ne descend dans la rue. C’est à peu près la définition du métier.',
      },
      {
        t: 'Rien, mais une baisse de la CSG', d: 'Cibler le salaire net',
        g: { op: 2, soc: -5, fin: -5 }, s: { comp: 2, just: -2 }, f: { syn: -10, pat: 6 },
        x: { eco: 8 }, add: ['smic_refuse'],
        news: 'Pas de coup de pouce au SMIC : le gouvernement préfère alléger la CSG.',
        out: 'Les économistes applaudissent. Les caissières ne lisent pas les économistes.',
      },
    ],
  },

  {
    id: 'eco_isf', cat: 'eco', who: 'eco', w: 11,
    titre: 'Faut-il rétablir un impôt sur la fortune ?',
    quote: 'Rendement réel : six à neuf milliards. Coût réel : un article dans la presse économique mondiale et trois départs.',
    txt: 'Votre majorité réclame un symbole fiscal. Bercy brandit l’étude sur l’exil des patrimoines, ' +
      'l’opposition parle de « matraquage », vos électeurs de « justice ».',
    choices: [
      {
        t: 'Impôt sur la fortune improductive', d: 'Yachts, jets, immobilier de rapport',
        g: { op: 6, fin: 5, soc: 4, eur: -2 }, s: { just: 8, comp: -3 },
        f: { syn: 8, pat: -10, jeu: 5 }, x: { eco: -18 }, add: ['isf_retabli'],
        news: 'Création d’un impôt sur la fortune improductive. Les cabinets de défiscalisation recrutent.',
        out: 'Votre camp exulte. Deux milliardaires annoncent leur « installation » à Bruxelles.',
      },
      {
        t: 'Taxer les très hauts héritages', d: 'Moins visible, plus rentable',
        g: { op: 2, fin: 6 }, s: { just: 6, comp: -1 }, f: { pat: -6, ret: -8, jeu: 4 },
        x: { eco: -10 }, add: ['succession_reforme'],
        news: 'Réforme des droits de succession sur les patrimoines au-delà de 2 millions d’euros.',
        out: 'Les notaires vous détestent. Les économistes vous trouvent, pour une fois, rationnel.',
      },
      {
        t: 'Au contraire : renforcer la flat tax', d: 'Attirer les capitaux',
        g: { op: -5, fin: 3, soc: -4 }, s: { comp: 6, just: -7 },
        f: { pat: 12, syn: -10 }, x: { eco: 16 }, add: ['flat_tax_renforcee'],
        news: 'Fiscalité du capital allégée pour « ramener les investisseurs ».',
        out: 'La Bourse de Paris salue. Votre aile gauche convoque une réunion de groupe.',
      },
      {
        t: 'Rien. Stabilité fiscale cinq ans', d: 'Promesse de non-surprise',
        g: { op: -2, fin: 2 }, s: { comp: 4 }, f: { pat: 8, syn: -6 }, x: { eco: 8 },
        news: 'Le président promet « zéro nouvel impôt pendant cinq ans ».',
        out: 'Phrase facile à prononcer, très difficile à tenir soixante mois. On vous la ressortira.',
      },
    ],
  },

  {
    id: 'eco_superprofits', cat: 'eco', who: 'eco', w: 10, min: 6,
    titre: 'Superprofits énergétiques',
    quote: 'Trois groupes vont publier des résultats record pendant que les gens arbitrent entre chauffer et manger.',
    txt: 'Les marges du secteur énergétique explosent. Une taxe exceptionnelle rapporterait entre 6 et 12 milliards. ' +
      'Les entreprises concernées menacent de geler leurs investissements dans les renouvelables.',
    choices: [
      {
        t: 'Taxe exceptionnelle de 33 %', d: 'Fléchée sur les factures',
        g: { op: 9, fin: 7, soc: 5, eur: -3 }, s: { just: 7, comp: -4, vert: -2 },
        f: { syn: 8, pat: -12, ret: 6 }, x: { eco: -14 }, add: ['taxe_superprofits'],
        news: 'Taxe sur les superprofits énergétiques : 9 milliards, redistribués sur les factures.',
        out: 'Mesure la plus populaire de votre trimestre. Et deux projets d’éolien offshore « reportés ».',
      },
      {
        t: 'Contribution volontaire négociée', d: 'Sans loi, sans conflit',
        g: { op: 2, fin: 3 }, s: { just: 2 }, f: { pat: 2, syn: -4 },
        news: 'Accord « volontaire » avec les énergéticiens : 3 milliards pour les ménages modestes.',
        out: 'Trois milliards obtenus sans combat. La presse titre sur les neuf qui manquent.',
      },
      {
        t: 'Rien : ces profits financent le nucléaire', d: 'Vision de long terme',
        g: { op: -6, soc: -4, fin: -1 }, s: { comp: 3, vert: 2 }, f: { pat: 8, syn: -8 },
        x: { eco: 10 },
        out: 'Vous avez raison sur dix ans. Vous votez tous les cinq.',
      },
    ],
  },

  {
    id: 'eco_notation', cat: 'eco', who: 'tres', w: 10, min: 8,
    titre: 'Une agence de notation prévient',
    quote: 'Ils ne demandent pas de l’austérité. Ils demandent une trajectoire crédible. C’est pire : il faut l’écrire.',
    txt: 'Une agence place la France sous perspective négative. Le taux à dix ans a pris 40 points de base en une semaine. ' +
      'Chaque dixième de point coûte environ 3 milliards par an à terme.',
    req: (S) => S.s.dette > 112 || S.deficit > 4.5,
    choices: [
      {
        t: 'Plan d’économies de 25 milliards', d: 'Crédibilité immédiate',
        g: { fin: 14, eur: 7, op: -8, soc: -7 }, s: { serv: -7, just: -5, croi: -0.3 },
        f: { pat: 8, fon: -10, syn: -8 }, x: { eco: 14 }, add: ['austerite'],
        news: 'Vingt-cinq milliards d’économies annoncés. L’agence confirme la note.',
        out: 'Les taux refluent. Chaque ministre vous expliquera pendant trois ans ce qu’il n’a pas pu faire.',
      },
      {
        t: 'Trajectoire en sept ans, pas en trois', d: 'Lissage négocié avec Bruxelles',
        g: { fin: 5, eur: 2, op: -2 }, s: { croi: 0.1 }, then: [['eco_bruxelles_rappel', 10]],
        news: 'La France obtient un étalement de sa trajectoire budgétaire.',
        out: 'Vous avez gagné du temps. Le problème avec le temps gagné, c’est qu’il repasse.',
      },
      {
        t: 'Hausse d’impôts ciblée plutôt qu’économies', d: 'Épargner les services publics',
        g: { fin: 9, op: -5, soc: 1 }, s: { just: 3, comp: -5, croi: -0.2 },
        f: { pat: -12, syn: 5, fon: 4 }, x: { eco: -14 }, add: ['impots_hausse'],
        news: 'Douze milliards de recettes nouvelles : grandes entreprises et hauts revenus.',
        out: 'Les services publics sont sauvés ce trimestre. L’investissement privé, moins.',
      },
      {
        t: 'Ignorer. « La France paie toujours. »', d: 'Pari sur les marchés',
        g: { fin: -10, eur: -6, op: 3 }, s: { dette: 2 }, f: { pat: -6, med: -4 },
        x: { ue: -12 },
        news: 'L’Élysée balaie l’avertissement : « Nous ne gouvernons pas pour les agences. »',
        out: 'Phrase magnifique. Les taux montent encore de 20 points de base pendant qu’on l’applaudit.',
      },
    ],
  },

  {
    id: 'eco_bruxelles_rappel', cat: 'eco', who: 'ue', direct: true,
    titre: 'Bruxelles revient avec le dossier',
    quote: 'Nous avions un accord sur une trajectoire. Les chiffres transmis ne sont pas ceux de l’accord.',
    txt: 'La Commission constate un écart de 0,8 point de PIB avec la trajectoire acceptée. ' +
      'Une procédure pour déficit excessif est sur la table.',
    choices: [
      {
        t: 'Tenir l’engagement, coûte que coûte', g: { fin: 10, eur: 10, op: -7, soc: -5 }, s: { serv: -5, croi: -0.2 }, add: ['austerite'], x: { ue: 10 },
        out: 'Bruxelles vous cite en exemple. Vos députés ne vous citent plus du tout.',
      },
      {
        t: 'Renégocier en échange d’un soutien sur la défense', g: { eur: 4, fin: 2 }, s: { secu: 3 }, f: { med: 2 }, add: ['defense_effort'], x: { ue: 6 },
        out: 'Vous échangez du déficit contre des chars. Diplomatiquement, c’est très 2030.',
      },
      {
        t: 'Assumer l’écart publiquement', g: { eur: -12, fin: -6, op: 5 }, x: { ue: -18 }, f: { rur: 5, med: -3 },
        news: 'La France assume de dévier de sa trajectoire budgétaire européenne.',
        out: 'Vous devenez le président qui dit non à Bruxelles. Et celui qui emprunte plus cher.',
      },
    ],
  },

  {
    id: 'eco_chomage', cat: 'eco', who: 'trav', w: 12, min: 4,
    titre: 'Assurance chômage : le troisième round',
    quote: 'Les partenaires sociaux ont échoué à s’entendre. La main revient à l’État. Comme toujours.',
    txt: 'Les règles d’indemnisation arrivent à échéance. Durcir rapporte environ 3,5 milliards et ' +
      'fait baisser le chômage mesuré ; élargir protège mieux mais coûte.',
    choices: [
      {
        t: 'Durcir : durée réduite, conditions resserrées',
        g: { fin: 7, soc: -9, op: -4 }, s: { chom: -0.5, just: -7, comp: 3 },
        f: { pat: 10, syn: -14, jeu: -6 }, x: { eco: 16 }, add: ['assurance_chomage_dure'],
        then: [['soc_greve_menace', 2]],
        news: 'Assurance chômage : durée d’indemnisation réduite de 25 %.',
        out: 'Les chiffres du chômage baissent. Pas forcément parce que les gens travaillent.',
      },
      {
        t: 'Élargir aux parcours hachés', d: 'Intérim, saisonniers, démissions contraintes',
        g: { soc: 8, op: 4, fin: -7 }, s: { just: 8, chom: 0.2 },
        f: { syn: 12, jeu: 8, pat: -8 }, x: { eco: -14 }, add: ['assurance_chomage_elargie'],
        news: 'L’assurance chômage s’ouvre aux carrières discontinues.',
        out: 'Huit cents mille personnes vous remercient. L’Unédic vous envoie une note inquiète.',
      },
      {
        t: 'Conditionner à une formation acceptée', d: 'Donnant-donnant',
        g: { fin: 3, soc: -2 }, s: { comp: 4, chom: -0.2 }, f: { pat: 5, syn: -4 }, x: { eco: 6 },
        add: ['formation_obligatoire'],
        out: 'Sur le papier, imparable. Il manque juste 60 000 formateurs.',
      },
      {
        t: 'Renvoyer les partenaires sociaux négocier', d: 'Six mois de plus',
        g: { soc: 3, maj: -3 }, f: { syn: 5, pat: 2 }, then: [['eco_chomage_retour', 7]],
        out: 'Vous avez acheté six mois. C’est exactement ce que vos prédécesseurs faisaient.',
      },
    ],
  },

  {
    id: 'eco_chomage_retour', cat: 'eco', who: 'syn', direct: true,
    titre: 'Les partenaires sociaux rendent leur copie',
    quote: 'Nous avons un accord. Majoritaire. Il coûte deux milliards de plus que votre cadrage.',
    txt: 'Contre toute attente, syndicats et patronat ont signé un accord. Il est équilibré, intelligent, ' +
      'et hors budget.',
    choices: [
      {
        t: 'Le reprendre tel quel', g: { soc: 10, op: 3, fin: -5, maj: 3 }, s: { just: 5 }, f: { syn: 12, pat: 8 }, add: ['pacte_social'],
        news: 'L’accord des partenaires sociaux transposé sans modification.',
        out: 'Vous venez de prouver que le dialogue social fonctionne. Rare, et payant.',
      },
      {
        t: 'Le reprendre en le rabotant', g: { soc: -5, fin: 2 }, f: { syn: -10, pat: -4 },
        out: 'Signer puis raboter : la manœuvre que les syndicats n’oublient jamais.',
      },
      {
        t: 'Le refuser, reprendre la main', g: { soc: -8, maj: 2, fin: 4 }, f: { syn: -12, pat: -6 }, x: { aut: 8 },
        out: 'Vous avez reprise la main. Et perdu l’interlocuteur.',
      },
    ],
  },

  {
    id: 'eco_industrie', cat: 'eco', who: 'eco', w: 11,
    titre: 'Une usine de batteries cherche 900 millions',
    quote: 'Trois mille emplois directs dans un bassin sinistré. Et une offre américaine sur la table, deux fois mieux dotée.',
    txt: 'Un industriel européen hésite entre un site français et un site aux États-Unis. ' +
      'La subvention demandée équivaut à 300 000 euros par emploi.',
    choices: [
      {
        t: 'Payer, et verrouiller par contrat', d: 'Clause de remboursement en cas de départ',
        g: { fin: -7, op: 5, eur: 2 }, s: { comp: 8, vert: 4, chom: -0.15 },
        f: { pat: 8, rur: 6, syn: 5 }, add: ['relocalisation_plan'],
        news: 'Gigafactory : 900 millions d’aides publiques, 3 000 emplois annoncés.',
        out: 'Ruban coupé, photo réussie. La clause de remboursement, personne ne la lira jamais.',
      },
      {
        t: 'Payer moitié, exiger un partenaire européen', g: { fin: -4, eur: 5 }, s: { comp: 4 }, f: { pat: 2 }, x: { ue: 10 },
        out: 'Le projet se fait, plus petit, plus lent, plus européen. Deux mille emplois au lieu de trois mille.',
      },
      {
        t: 'Refuser la surenchère', d: 'Et mettre l’argent dans la formation',
        g: { fin: 4, op: -5 }, s: { comp: -2, serv: 3 }, f: { pat: -8, rur: -8 },
        news: 'L’usine de batteries ira aux États-Unis. L’État refuse « la course aux subventions ».',
        out: 'Décision défendable. Les images du site abandonné tourneront pendant cinq ans.',
      },
    ],
  },

  {
    id: 'eco_ia', cat: 'eco', who: 'eco', w: 10, min: 5,
    titre: 'L’intelligence artificielle arrive dans les bureaux',
    quote: 'Les banques et les assureurs annoncent 40 000 suppressions de postes « par attrition ». Le mot est joli.',
    txt: 'Les gains de productivité sont réels, les destructions d’emplois tertiaires aussi. ' +
      'Trois options circulent : taxer, former, ou laisser faire.',
    choices: [
      {
        t: 'Plan national de reconversion', d: 'Dix milliards sur cinq ans',
        g: { fin: -6, op: 5, soc: 4 }, s: { comp: 6, chom: -0.2, just: 4 },
        f: { syn: 8, jeu: 8, pat: 3 }, add: ['formation_ia'],
        news: 'Dix milliards pour reconvertir les métiers exposés à l’automatisation.',
        out: 'Vous prenez le sujet de front. Les effets arriveront après votre mandat. C’est ça, gouverner.',
      },
      {
        t: 'Souveraineté : data centers et calcul français', d: 'Et un cadre sur les modèles',
        g: { fin: -5, eur: 4, op: 2 }, s: { comp: 9, vert: -4 }, f: { pat: 8, jeu: 5 },
        add: ['ia_souveraine'], then: [['ecol_datacenter', 9]],
        news: 'Plan calcul : trois data centers souverains et un cadre national sur l’IA.',
        out: 'La filière française respire. Les écologistes découvrent la consommation électrique d’un data center.',
      },
      {
        t: 'Taxer les gains d’automatisation', g: { fin: 6, op: 4 }, s: { comp: -7, just: 5 }, f: { pat: -12, syn: 9 }, x: { eco: -14 },
        out: 'Idée populaire, appliquée nulle part. Vous découvrirez pourquoi.',
      },
      {
        t: 'Laisser le marché faire', g: { op: -3 }, s: { comp: 5, just: -5, chom: 0.2 }, f: { pat: 10, syn: -8 }, x: { eco: 14 },
        out: 'Le marché fait. Il fait aussi des gens très en colère dans trois ans.',
      },
    ],
  },

  {
    id: 'eco_logement', cat: 'eco', who: 'maire', w: 12,
    titre: 'Plus personne ne peut se loger',
    quote: 'Dans ma ville, une infirmière ne trouve pas de logement à moins de quarante minutes. Elle démissionne.',
    txt: 'La construction est au plus bas depuis trente ans, les loyers s’envolent dans les zones tendues, ' +
      'et les maires n’ont plus d’outils.',
    choices: [
      {
        t: 'Plan de 500 000 logements abordables', d: 'Foncier public cédé à l’euro symbolique',
        g: { fin: -9, op: 8, soc: 6 }, s: { just: 8, serv: 4, chom: -0.2 },
        f: { jeu: 12, syn: 7, pat: 4 }, add: ['logement_plan'], then: [['eco_logement_bilan', 24]],
        news: 'Plan logement : 500 000 logements abordables, foncier d’État mobilisé.',
        out: 'Les premières grues dans dix-huit mois, les premières clés dans quatre ans. Vous ne verrez pas les clés.',
      },
      {
        t: 'Encadrer les loyers et la location courte durée', d: 'Mesure immédiate, sans dépense',
        g: { op: 6, soc: 4, fin: 1 }, s: { just: 6, comp: -3 },
        f: { jeu: 10, pat: -8, ret: -5 }, add: ['airbnb_encadre'], x: { eco: -10 },
        news: 'Encadrement généralisé des loyers et fin des meublés touristiques en zone tendue.',
        out: 'Effet immédiat sur les loyers affichés. Et sur le nombre de biens retirés du marché.',
      },
      {
        t: 'Choc d’offre : libérer les normes et le PLU', d: 'Construire plus, plus vite, plus dense',
        g: { fin: 2, op: 2 }, s: { comp: 5, vert: -5, just: 2 },
        f: { pat: 10, rur: -6, jeu: 4 }, x: { eco: 12, ecol: -10 }, add: ['normes_logement_allegees'],
        out: 'Les promoteurs repartent. Les recours des riverains aussi.',
      },
      {
        t: 'Rien de structurel : prime aux primo-accédants', g: { fin: -3, op: 3 }, f: { jeu: 4 },
        out: 'Une prime solvabilise la demande sans créer l’offre. Autrement dit : les prix montent.',
      },
    ],
  },

  {
    id: 'eco_logement_bilan', cat: 'eco', who: 'sg', direct: true,
    titre: 'Deux ans après, le plan logement',
    quote: 'On est à 38 % de l’objectif. Soit, en langage de conférence de presse, « une dynamique engagée ».',
    txt: 'Le foncier a été cédé, les permis sont déposés, mais les taux et le coût des matériaux ont tué un tiers des projets.',
    choices: [
      {
        t: 'Garantie publique sur les prêts promoteurs', g: { fin: -6, op: 4 }, s: { just: 4, chom: -0.1 }, f: { pat: 6, jeu: 5 }, add: ['logement_debloque'],
        out: 'L’État prend le risque. Les grues repartent. Si ça casse, ce sera dans vos comptes.',
      },
      {
        t: 'Assumer le retard, publier les chiffres bruts', g: { op: -4, maj: -2 }, f: { med: 8 },
        out: 'La transparence coûte un point de popularité et rapporte une réputation. Les deux comptent.',
      },
      {
        t: 'Communiquer sur « 200 000 logements engagés »', g: { op: 2 }, f: { med: -8 },
        out: 'Le mot « engagés » fera l’objet d’une enquête de six pages. Vous y survivrez, mal.',
      },
    ],
  },

  {
    id: 'eco_fonction', cat: 'eco', who: 'eco', w: 10, min: 7,
    titre: 'Le point d’indice des fonctionnaires',
    quote: 'Un point de hausse, c’est 2,4 milliards. Zéro point, c’est 5,7 millions d’agents qui perdent encore.',
    txt: 'Le pouvoir d’achat des agents publics a reculé depuis quinze ans. Les hôpitaux ne recrutent plus, ' +
      'l’Éducation nationale non plus.',
    choices: [
      {
        t: 'Dégel et revalorisation de 4 %', g: { fin: -9, soc: 7, op: 3 }, s: { serv: 8, just: 5 }, f: { fon: 16, syn: 8, pat: -5 }, add: ['fonctionnaires_revalo'],
        news: 'Point d’indice : +4 %. Le plus fort dégel depuis 2010.',
        out: 'Les concours se remplissent à nouveau. La Cour des comptes vous écrit une lettre.',
      },
      {
        t: 'Primes au mérite plutôt que hausse générale', g: { fin: -3, soc: -3 }, s: { serv: 3, comp: 2 }, f: { fon: -4, syn: -8, pat: 5 }, x: { eco: 10 },
        out: 'Le mérite dans la fonction publique : un débat vieux de quarante ans, que vous ne trancherez pas.',
      },
      {
        t: 'Gel, et 60 000 postes en moins', g: { fin: 10, soc: -10, op: -5 }, s: { serv: -9, just: -5 }, f: { fon: -18, syn: -12, pat: 10 }, x: { eco: 16 }, add: ['fonctionnaires_gel'],
        then: [['soc_greve_menace', 3]],
        news: 'Gel du point d’indice et non-remplacement de 60 000 départs.',
        out: 'Dix milliards économisés. Et un préavis de grève dans trois ministères.',
      },
    ],
  },

  {
    id: 'eco_tva', cat: 'eco', who: 'eco', w: 9, min: 3,
    titre: 'TVA sur l’alimentaire',
    quote: 'Baisser la TVA, c’est 11 milliards. Et rien ne garantit que ça arrive dans le caddie plutôt que dans la marge.',
    txt: 'Les prix alimentaires restent 28 % au-dessus de 2021. La baisse de TVA est la mesure la plus demandée dans les sondages.',
    choices: [
      {
        t: 'TVA à 0 % sur un panier de 50 produits', d: 'Avec contrôle des marges',
        g: { op: 11, fin: -9, soc: 5 }, s: { infl: -0.6, just: 6 }, f: { ret: 10, rur: 7, pat: -4 },
        add: ['tva_baisse_alim'], then: [['eco_tva_controle', 6]],
        news: 'TVA supprimée sur cinquante produits de base. Mesure immédiatement visible en rayon.',
        out: 'Les gens voient la différence sur le ticket. C’est rare, et ça se paie cher au budget.',
      },
      {
        t: 'Chèque alimentaire ciblé', d: 'Deux fois moins cher, deux fois moins visible',
        g: { op: 4, fin: -4 }, s: { just: 7 }, f: { syn: 6, ret: 4 },
        out: 'Efficace, ciblé, invisible. Les économistes vous félicitent ; les électeurs ne le savent pas.',
      },
      {
        t: 'Négocier un blocage des prix avec la distribution', g: { op: 6, fin: 0 }, s: { infl: -0.3 }, f: { pat: -8, rur: -6 }, x: { eco: -10 },
        out: 'Les enseignes signent. Les agriculteurs comprennent qui va payer la différence.',
      },
      { t: 'Rien : l’inflation redescend d’elle-même', g: { op: -5 }, s: { },
        out: 'Vous avez raison techniquement. Politiquement, « attendez » n’a jamais été un programme.' },
    ],
  },

  {
    id: 'eco_tva_controle', cat: 'eco', who: 'eco', direct: true,
    titre: 'La baisse de TVA n’est pas arrivée en rayon',
    quote: 'Sur onze milliards, l’Insee en retrouve six dans les prix. Les cinq autres sont devenus de la marge.',
    txt: 'Vous avez financé une hausse de rentabilité de la distribution avec de l’argent public. ' +
      'Il faut une suite, et vite.',
    choices: [
      {
        t: 'Taxer les marges excessives du secteur', g: { op: 7, fin: 5 }, s: { just: 5 }, f: { pat: -12, syn: 8 }, x: { eco: -12 },
        out: 'Les enseignes crient. Les gens vous croient. Bon échange.',
      },
      {
        t: 'Publier chaque mois les prix enseigne par enseigne', g: { op: 5 }, s: { infl: -0.2 }, f: { med: 7, pat: -5 },
        out: 'La transparence fait ce que la loi n’a pas fait. Les prix baissent de 1,8 % en deux mois.',
      },
      { t: 'Supprimer la mesure, elle ne marche pas', g: { op: -8, fin: 8, soc: -4 }, f: { ret: -8 }, del: ['tva_baisse_alim'],
        out: 'Reconnaître l’échec coûte huit points. Les garder aurait coûté neuf milliards par an.' },
    ],
  },

  {
    id: 'eco_retraites_comptes', cat: 'eco', who: 'eco', w: 10, min: 10, not: ['retraites_votee', 'retraites_abandon'],
    titre: 'Le rapport sur les retraites atterrit',
    quote: 'Déficit du système : 15 milliards en 2032, 30 en 2040. Les quatre leviers sont connus, et tous détestés.',
    txt: 'Âge, durée, cotisations, niveau des pensions : il n’existe pas de cinquième levier. ' +
      'Le rapport sera public dans dix jours.',
    choices: [
      {
        t: 'Ouvrir le chantier de l’âge de départ', then: [['chain_retraites_1', 1]],
        g: { maj: 3 }, f: { pat: 8, syn: -6 },
        out: 'Vous venez de rouvrir le dossier le plus explosif de la Ve République. Bon courage.',
      },
      {
        t: 'Augmenter les cotisations patronales', g: { fin: 6, soc: 2, op: -2 }, s: { comp: -6 }, f: { pat: -14, syn: 8 }, x: { eco: -14 }, add: ['cotisations_hausse'],
        news: 'Les cotisations vieillesse augmentent de 0,6 point côté employeur.',
        out: 'Le trou est bouché. Le coût du travail aussi augmente. On s’en reparle avec le chômage.',
      },
      {
        t: 'Désindexer partiellement les pensions', g: { fin: 8, op: -7 }, s: { just: -4 }, f: { ret: -18, syn: -5 }, add: ['pensions_desindexees'],
        news: 'Sous-indexation des pensions : 0,8 point sous l’inflation pendant trois ans.',
        out: 'Discret, efficace, et seize millions de retraités qui comptent très bien.',
      },
      {
        t: 'Enterrer le rapport', g: { fin: -3, maj: -4, soc: 3 }, f: { med: -8 }, add: ['retraites_abandon'],
        news: 'Le rapport sur les retraites restera « un document de travail ».',
        out: 'Le problème ne disparaît pas : il attend votre successeur, avec cinq milliards de plus.',
      },
    ],
  },

  {
    id: 'eco_agriculteurs', cat: 'eco', who: 'agri', w: 12, min: 3,
    titre: 'Les tracteurs montent sur Paris',
    quote: 'Ils sont trois cents sur l’A6 et quatre mille sur les ronds-points. Dans quarante-huit heures, c’est dix mille.',
    txt: 'Revenus en baisse, normes qui s’empilent, concurrence sur les prix. Le mouvement est largement ' +
      'soutenu par l’opinion : 78 % de sympathie.',
    choices: [
      {
        t: 'Prix plancher garantis sur trois filières', g: { op: 7, soc: 6, fin: -6 }, s: { just: 5, comp: -3 },
        f: { rur: 18, pat: -6, syn: 4 }, x: { eco: -12 }, add: ['prix_plancher'],
        news: 'Prix plancher garantis pour le lait, la viande bovine et les céréales.',
        out: 'Les blocages lèvent en trois jours. Bruxelles ouvre un dossier sur la compatibilité du dispositif.',
      },
      {
        t: 'Moratoire sur les normes et les contrôles', g: { op: 5, soc: 5 }, s: { vert: -9, comp: 2 },
        f: { rur: 16, jeu: -8 }, x: { ecol: -16 }, add: ['pesticides_derogation'],
        news: 'Moratoire de deux ans sur les nouvelles normes environnementales agricoles.',
        out: 'Les tracteurs rentrent. Les associations environnementales déposent quatre recours.',
      },
      {
        t: 'Aides d’urgence et négociation filière par filière', g: { fin: -4, soc: 3, op: 2 }, f: { rur: 8 },
        out: 'Deux milliards, un calendrier, un comité de suivi. La méthode classique : ça tient six mois.',
      },
      {
        t: 'Évacuer les blocages, tenir la ligne', g: { soc: -12, op: -8 }, s: { secu: -3 }, f: { rur: -20, med: -4 },
        x: { aut: 14 }, then: [['crise_ruralite', 4]],
        out: 'Les gendarmes face aux agriculteurs : les images vont tourner pendant un an.',
      },
    ],
  },

  {
    id: 'eco_mercosur', cat: 'eco', who: 'ext', w: 9, min: 6,
    titre: 'L’accord commercial doit être signé',
    quote: 'Nos industriels le veulent. Nos agriculteurs n’en veulent pas. Et nous ne pouvons pas le bloquer seuls.',
    txt: 'Un grand accord commercial entre l’Union et un bloc d’Amérique du Sud arrive au vote. ' +
      'Gains estimés pour l’industrie : 4 milliards d’exportations. Perte estimée pour l’élevage : 15 % des parts de marché.',
    choices: [
      {
        t: 'Signer avec des clauses miroir contraignantes', g: { eur: 8, fin: 2, op: -3 }, s: { comp: 6, vert: -3 },
        f: { pat: 10, rur: -14 }, x: { ue: 14 }, add: ['mercosur_signe'],
        news: 'La France signe l’accord commercial, assorti de clauses miroir sur les normes sanitaires.',
        out: 'L’industrie exporte. Les clauses miroir seront contrôlées par douze inspecteurs pour trois continents.',
      },
      {
        t: 'Bloquer, quitte à s’isoler', g: { eur: -12, op: 6, soc: 3 }, s: { comp: -4 },
        f: { rur: 16, pat: -10 }, x: { ue: -16 }, add: ['mercosur_bloque'],
        news: 'La France bloque l’accord commercial. Huit États membres dénoncent « une prise en otage ».',
        out: 'Vous êtes le héros des campagnes françaises et le problème de douze capitales.',
      },
      {
        t: 'Construire une minorité de blocage', d: 'Diplomatie longue, résultat incertain',
        g: { eur: -2, op: 2 }, f: { rur: 8, pat: -3 }, then: [['eur_minorite_blocage', 5]],
        out: 'Vous jouez la montre européenne. Elle est lente, mais elle a déjà enterré des accords.',
      },
    ],
  },

  {
    id: 'eco_simplification', cat: 'eco', who: 'pat', w: 9,
    titre: 'Mille normes à supprimer',
    quote: 'Nous avons listé 1 200 obligations qui ne servent à personne. Vous en supprimez combien ?',
    txt: 'Le patronat arrive avec un catalogue. La moitié des normes visées sont effectivement absurdes, ' +
      'l’autre moitié protège des salariés, des consommateurs ou des rivières.',
    choices: [
      {
        t: 'Supprimer les 400 normes consensuelles', g: { fin: 1, op: 3 }, s: { comp: 6 }, f: { pat: 10, syn: -3 }, add: ['simplification'],
        news: 'Loi de simplification : 400 obligations administratives supprimées.',
        out: 'Personne ne défile pour défendre un formulaire. Victoire propre, rare dans ce métier.',
      },
      {
        t: 'Tout supprimer, trier plus tard', g: { op: 2, soc: -6 }, s: { comp: 9, vert: -6, just: -4 }, f: { pat: 16, syn: -12, jeu: -5 }, x: { eco: 16 },
        then: [['crise_norme_scandale', 8]],
        out: 'Audacieux. Dans huit mois, un accident rappellera à quoi servait l’une de ces normes.',
      },
      {
        t: 'Conditionner à des contreparties sur l’emploi', g: { soc: 3, maj: 2 }, s: { comp: 3 }, f: { pat: -4, syn: 6 },
        out: 'Le patronat accepte le principe. Les contreparties seront « étudiées filière par filière ».',
      },
    ],
  },

  {
    id: 'eco_sncf', cat: 'eco', who: 'pm', w: 9, min: 8,
    titre: 'Le ferroviaire demande 100 milliards',
    quote: 'Le réseau a trente ans de retard d’entretien. Soit on investit, soit on ferme des lignes. Il n’y a pas de troisième porte.',
    txt: 'Un rapport chiffre la remise à niveau du réseau à 100 milliards sur quinze ans. ' +
      'En face : 9 000 kilomètres de lignes de desserte fine menacées.',
    choices: [
      {
        t: 'Plan rail de 100 milliards', d: 'Financé par une taxe sur l’aérien et le fret routier',
        g: { fin: -8, op: 6, eur: 3 }, s: { vert: 10, serv: 6, comp: 3 },
        f: { rur: 10, jeu: 8, pat: -6 }, add: ['ferroviaire_plan'],
        news: 'Plan rail : 100 milliards sur quinze ans, financés par l’aérien et le routier.',
        out: 'Le plus gros investissement d’infrastructure depuis le TGV. Les premiers rails en 2031.',
      },
      {
        t: 'Prioriser les trains du quotidien', d: 'RER métropolitains, abandon de lignes',
        g: { fin: -3, op: 2 }, s: { vert: 5, serv: 2 }, f: { jeu: 6, rur: -10 },
        out: 'Vous choisissez les 80 % d’usagers. Les 20 % restants ont des maires et des caméras.',
      },
      {
        t: 'Ouvrir à la concurrence et laisser les régions payer', g: { fin: 5 }, s: { comp: 3, serv: -4 }, f: { fon: -8, syn: -10, pat: 6 }, x: { eco: 14 }, add: ['sncf_reforme'],
        then: [['soc_greve_menace', 3]],
        out: 'Transfert élégant du problème aux régions, qui n’ont pas l’argent. Elles le diront.',
      },
    ],
  },

  {
    id: 'eco_4jours', cat: 'eco', who: 'trav', w: 8, min: 12,
    titre: 'La semaine de quatre jours',
    quote: 'Quatre-vingts entreprises l’ont testée. Résultat : productivité stable, démissions en baisse. Échantillon non représentatif, évidemment.',
    txt: 'Le débat sort du monde militant et entre dans les négociations de branche. Vous pouvez l’encourager, ' +
      'l’encadrer, ou le laisser mourir.',
    choices: [
      {
        t: 'Droit d’option dans toutes les branches', d: 'Sans baisse de salaire',
        g: { op: 7, soc: 6, fin: -2 }, s: { just: 5, comp: -3 }, f: { syn: 10, jeu: 12, pat: -10 }, x: { eco: -12 }, add: ['semaine_4j'],
        news: 'Les branches devront négocier un droit d’option pour la semaine de quatre jours.',
        out: 'Mesure très populaire chez les moins de 40 ans. Le patronat des PME parle de « cauchemar logistique ».',
      },
      {
        t: 'Expérimentation dans la fonction publique', g: { op: 3, soc: 2 }, s: { serv: 2 }, f: { fon: 8, jeu: 6 },
        out: 'Expérimenter sur l’État : malin. Les usagers des guichets du vendredi, un peu moins ravis.',
      },
      {
        t: 'Refuser : le pays travaille déjà trop peu', g: { op: -4, soc: -4 }, s: { comp: 4 }, f: { pat: 10, syn: -8, jeu: -10 }, x: { eco: 12 },
        out: 'Vous avez les chiffres de la durée annuelle du travail avec vous. Et la jeunesse contre vous.',
      },
    ],
  },

  {
    id: 'eco_dette_bonne', cat: 'eco', who: 'tres', w: 8, min: 20,
    titre: 'Fenêtre de refinancement',
    quote: 'Les taux ont baissé de 70 points. Nous pouvons allonger la maturité de la dette. Maintenant, pas en septembre.',
    txt: 'Une opportunité technique : émettre à trente et cinquante ans pour sécuriser le coût de la dette, ' +
      'au prix d’un surcoût immédiat.',
    choices: [
      {
        t: 'Allonger massivement la maturité', g: { fin: 9, eur: 3 }, s: { dette: -2 }, f: { pat: 5 }, add: ['dette_securisee'],
        news: 'La France émet 40 milliards à cinquante ans. Opération sursouscrite.',
        out: 'Décision invisible, techniquement excellente. Votre successeur vous devra un merci qu’il ne dira pas.',
      },
      { t: 'Profiter des taux bas pour investir', g: { fin: -4, op: 4 }, s: { comp: 5, serv: 3, dette: 1 }, f: { pat: 4, syn: 4 },
        out: 'Emprunter bon marché pour investir : défendable. Les 1,5 point de dette en plus seront rappelés.' },
      { t: 'Ne rien changer', g: { fin: 1 },
        out: 'Occasion manquée. Personne ne le saura, sauf la Cour des comptes dans trois ans.' },
    ],
  },

  {
    id: 'eco_apprentissage', cat: 'eco', who: 'trav', w: 8,
    titre: 'L’apprentissage coûte 25 milliards',
    quote: 'Un million d’apprentis, c’est un succès. 25 milliards d’aides dont la moitié part dans les diplômes bac+5, c’est un problème.',
    txt: 'Les primes à l’embauche d’apprentis ont massivement bénéficié à l’enseignement supérieur privé. ' +
      'Raboter fait des économies rapides et casse une dynamique rare.',
    choices: [
      {
        t: 'Recentrer sur les niveaux infra-bac', g: { fin: 7, op: 1 }, s: { just: 5, chom: -0.1 }, f: { pat: -5, jeu: 2 },
        news: 'Les aides à l’apprentissage recentrées sur les CAP et les bacs professionnels.',
        out: 'Décision juste, techniquement irréprochable. Les écoles de commerce engagent un lobbyiste.',
      },
      { t: 'Maintenir tel quel', g: { fin: -2 }, s: { chom: -0.1 }, f: { pat: 6, jeu: 4 },
        out: 'Un million d’apprentis dans les chiffres. Vous les citerez trente-cinq fois.' },
      { t: 'Supprimer les primes au-delà du bac+2', g: { fin: 9 }, s: { chom: 0.15 }, f: { pat: -10, jeu: -6 },
        out: 'Neuf milliards récupérés et une baisse immédiate des contrats signés. Les deux sont vrais.' },
    ],
  },

  {
    id: 'eco_banques', cat: 'eco', who: 'tres', w: 7, min: 14,
    titre: 'Une banque régionale vacille',
    quote: 'Quatre milliards de pertes sur l’immobilier commercial. Si on ne dit rien ce soir, demain il y a la queue aux distributeurs.',
    txt: 'Pas systémique, mais très visible : 900 agences, 2 millions de clients, et une presse qui a déjà le mot « contagion » prêt.',
    choices: [
      {
        t: 'Garantie publique immédiate, résolution ordonnée', g: { fin: -7, eur: 4, op: 2 }, s: { comp: 2 }, f: { pat: 8, med: 3 },
        news: 'L’État garantit les dépôts et organise la reprise de la banque en difficulté.',
        out: 'La panique est évitée en une nuit. Sept milliards engagés, dont vous récupérerez peut-être cinq.',
      },
      {
        t: 'Mariage forcé avec un grand groupe', g: { fin: -2, op: -2 }, s: { comp: -2 }, f: { pat: 2, syn: -6 },
        out: 'Problème réglé sans argent public. Mille deux cents postes « rationalisés » dans l’opération.',
      },
      {
        t: 'Laisser jouer la résolution européenne', g: { eur: 6, fin: 2, op: -8, soc: -5 }, f: { pat: -5, med: -5 }, x: { ue: 10 },
        out: 'Orthodoxie respectée. Les images de guichets fermés dans quinze villes moyennes aussi.',
      },
    ],
  },

  {
    id: 'eco_filler_budget', cat: 'eco', who: 'eco', w: 6, once: false, min: 15,
    titre: 'Arbitrage de fin de mois',
    quote: 'Trois milliards à trouver avant mercredi. J’ai trois mauvaises idées, choisissez la moins mauvaise.',
    txt: 'Le genre d’arbitrage dont personne ne parlera et qui, mis bout à bout, fait un mandat.',
    choices: [
      { t: 'Raboter les niches fiscales', g: { fin: 4, op: -2 }, f: { pat: -5 }, out: 'Quatre-vingts niches, quatre-vingts lobbies. Vous en fermez six.' },
      { t: 'Sous-exécuter les crédits ministériels', g: { fin: 4, soc: -2 }, s: { serv: -3 }, f: { fon: -5 }, out: 'Le gel des crédits : l’austérité qui n’a pas besoin de loi.' },
      { t: 'Vendre des participations de l’État', g: { fin: 5 }, s: { comp: -2 }, f: { syn: -6 }, out: 'On vend un actif pour payer une dépense courante. La Cour des comptes a un paragraphe prêt.' },
    ],
  }

);
