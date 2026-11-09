/* ========== GRANDES RÉFORMES À ÉTAPES (chaînes de cartes liées) ========== */
'use strict';

P.CARDS.push(

  /* ---------------------------------------------------- LES RETRAITES --- */
  {
    id: 'chain_retraites_1', cat: 'soc', who: 'pm', direct: true,
    titre: 'Retraites : ce que vous annoncez',
    quote: 'Le format de l’annonce décide de tout. Une allocution, et vous êtes seul face à soixante-huit millions de personnes.',
    txt: 'Quatre scénarios sont sur la table de Matignon. Chacun comble le déficit du système ' +
      'et chacun fâche une partie différente du pays.',
    choices: [
      {
        t: '64 ans, sans conditions', d: 'Le scénario de Bercy. 17 milliards gagnés.',
        g: { fin: 10, soc: -12, op: -9, maj: 2 }, s: { comp: 5, just: -6, chom: -0.2 },
        f: { pat: 14, syn: -18, ret: -6, jeu: -8 }, x: { eco: 18 },
        add: ['retraites_annonce', 'retraites_64'], then: [['chain_retraites_2', 2]],
        news: 'Le président annonce le report de l’âge légal à 64 ans.',
        out: 'Soixante-douze pour cent des Français contre. Les syndicats se réunissent le soir même.',
      },
      {
        t: '63 ans et allongement de la durée', d: 'Moins brutal, moins rentable',
        g: { fin: 6, soc: -8, op: -5 }, s: { comp: 3, just: -3 },
        f: { pat: 6, syn: -12, ret: -3 }, x: { eco: 10 },
        add: ['retraites_annonce', 'retraites_63'], then: [['chain_retraites_2', 2]],
        news: 'Report à 63 ans assorti d’un allongement de la durée de cotisation.',
        out: 'Le compromis ne désarme personne mais divise l’opposition. C’est déjà un résultat.',
      },
      {
        t: 'Réforme systémique par points', d: 'Universelle, juste, illisible',
        g: { fin: 3, soc: -9, op: -4, maj: -4 }, s: { just: 4, comp: 2 },
        f: { syn: -10, fon: -10, pat: 4, jeu: 6 },
        add: ['retraites_annonce', 'retraites_points'], then: [['chain_retraites_2', 2]],
        news: 'Vers un système universel par points : fin des 42 régimes.',
        out: 'Intellectuellement supérieur, politiquement incompréhensible. Vous allez l’expliquer mille fois.',
      },
      {
        t: 'Pénibilité, carrières longues, et cotisations', d: 'Sans toucher à l’âge',
        g: { fin: 4, soc: 6, op: 5 }, s: { just: 7, comp: -4 },
        f: { syn: 12, pat: -12, ret: 5 }, x: { eco: -14 },
        add: ['retraites_abandon'],
        news: 'Pas de report de l’âge : hausse des cotisations et nouveaux droits pénibilité.',
        out: 'Vous avez évité la guerre sociale. Et le déficit du système revient dans quatre ans, plus gros.',
      },
    ],
  },

  {
    id: 'chain_retraites_2', cat: 'soc', who: 'syn', direct: true,
    titre: 'La concertation',
    quote: 'Nous venons, nous écoutons, nous repartons. Si le texte ne bouge pas, vous aurez huit millions de personnes dans la rue.',
    txt: 'Six semaines de concertation. Les syndicats réclament trois choses : la pénibilité, ' +
      'les carrières longues, et un index senior contraignant pour les entreprises.',
    choices: [
      {
        t: 'Céder sur les trois demandes', g: { fin: -5, soc: 8, maj: -5, op: 3 }, s: { just: 5 },
        f: { syn: 10, pat: -10 }, add: ['retraites_nego'], then: [['chain_retraites_4', 3]],
        news: 'Le gouvernement intègre pénibilité, carrières longues et index senior.',
        out: 'Vous avez acheté la modération d’une partie des syndicats. Deux centrales restent mobilisées.',
      },
      {
        t: 'Céder sur la pénibilité uniquement', g: { fin: -2, soc: 2, maj: -2 }, f: { syn: 2, pat: -3 },
        add: ['retraites_nego'], then: [['chain_retraites_3', 2]],
        out: 'Un geste suffisant pour dire qu’il y a eu négociation. Insuffisant pour éviter la rue.',
      },
      {
        t: 'Ne rien lâcher', g: { soc: -10, maj: 3, fin: 2 }, f: { syn: -14, pat: 10 }, x: { aut: 12 },
        then: [['chain_retraites_3', 1]],
        out: 'La concertation sans concession s’appelle une consultation. Les syndicats l’ont dit avant vous.',
      },
      {
        t: 'Tout retirer. L’affaire est trop coûteuse.', g: { soc: 12, op: 2, maj: -12, fin: -6 },
        f: { syn: 12, pat: -16, med: -8 }, add: ['retraites_retiree', 'retraites_abandon'],
        news: 'Retrait de la réforme des retraites avant même son examen parlementaire.',
        out: 'Vous êtes le président qui a reculé avant le premier défilé. Ça vous suivra jusqu’en 2032.',
      },
    ],
  },

  {
    id: 'chain_retraites_3', cat: 'crise', who: 'int', direct: true,
    titre: 'Un million et demi de personnes dans la rue',
    quote: 'Deux cent soixante villes, des cortèges dans des communes qui n’avaient jamais manifesté. Et c’est la quatrième journée.',
    txt: 'Soixante-huit pour cent de soutien au mouvement. Les raffineries entrent dans la grève, ' +
      'les éboueurs aussi. Les lycées se bloquent.',
    choices: [
      {
        t: 'Tenir. Le texte va au Parlement.', g: { soc: -10, op: -6, maj: 2 }, s: { croi: -0.2 },
        f: { syn: -10, pat: 10 }, x: { aut: 10 }, add: ['greve_generale'], then: [['chain_retraites_4', 2]],
        out: 'Vous pariez sur l’essoufflement. Historiquement, c’est un pari à 50 %.',
      },
      {
        t: 'Suspendre et ouvrir un sommet social', g: { soc: 8, maj: -6, op: 2, fin: -3 },
        f: { syn: 6, pat: -8 }, add: ['conference_sociale'], then: [['chain_retraites_4', 6]],
        out: 'La suspension calme la rue et affaiblit votre majorité. Les deux étaient prévisibles.',
      },
      {
        t: 'Soumettre la réforme à référendum', g: { op: 8, soc: 6, maj: -10 }, f: { med: 6, syn: 4 },
        x: { aut: -16 }, then: [['inst_referendum', 2]],
        news: 'Le président annonce un référendum sur la réforme des retraites.',
        out: 'Coup de théâtre. Vous reprenez l’initiative et vous jouez votre mandat sur un scrutin.',
      },
      {
        t: 'Réquisitions et service minimum', g: { soc: -14, op: -7, maj: 4 }, s: { secu: -2 },
        f: { syn: -18, pat: 12 }, x: { aut: 20 }, then: [['crise_emeute', 2], ['chain_retraites_4', 3]],
        out: 'Le carburant circule. Les violences en marge des cortèges commencent le week-end suivant.',
      },
    ],
  },

  {
    id: 'chain_retraites_4', cat: 'inst', who: 'pm', direct: true,
    titre: 'Le vote. Il manque trois voix.',
    quote: 'Nous avons compté dix fois. Trois voix. Soit on négocie avec un groupe charnière, soit c’est le 49.3.',
    txt: 'L’Assemblée est à l’os. Un groupe de vingt-sept députés demande le retrait de l’article 7 ' +
      'et une revalorisation des petites pensions à 1 300 euros.',
    choices: [
      {
        t: 'Payer le groupe charnière', d: 'Petites pensions à 1 300 euros',
        g: { fin: -5, maj: 8, op: 4, soc: 3 }, s: { just: 5 }, f: { ret: 10, syn: 2 },
        add: ['retraites_votee', 'retraites_min_1300'], then: [['chain_retraites_5', 4]],
        news: 'La réforme des retraites est adoptée par 291 voix contre 288.',
        out: 'Adoptée par le Parlement, de trois voix. Personne ne pourra dire qu’elle a été imposée.',
      },
      {
        t: 'Engager le 49.3', g: { maj: -10, soc: -10, op: -8 }, s: { comp: 3 },
        f: { syn: -12, med: -8, jeu: -8 }, x: { aut: 16 },
        add: ['retraites_votee', '49_3_utilise'], then: [['inst_censure', 1], ['chain_retraites_5', 4]],
        news: 'Le gouvernement engage sa responsabilité : la réforme passe sans vote.',
        out: 'La réforme est adoptée. Et votre légitimité sur le sujet, définitivement contestée.',
      },
      {
        t: 'Retirer l’article sur l’âge et sauver le reste', g: { fin: -6, maj: 4, soc: 6, op: 3 },
        f: { syn: 8, pat: -12 }, add: ['retraites_abandon'],
        news: 'L’article sur l’âge légal est retiré. Le reste du texte est adopté.',
        out: 'Vous sauvez la face et perdez la réforme. Bercy vous enverra la facture tous les ans.',
      },
      {
        t: 'Dissoudre l’Assemblée', g: { maj: -4, op: -3, soc: -4 }, x: { aut: 8 },
        add: ['dissolution'], then: [['inst_legislatives', 1]],
        news: 'Dissolution de l’Assemblée nationale. Législatives dans trente jours.',
        out: 'Vous remettez les cartes sur la table. Vous pouvez tout gagner ou tout perdre en trois semaines.',
      },
    ],
  },

  {
    id: 'chain_retraites_5', cat: 'soc', who: 'sond', direct: true,
    titre: 'Un an après la réforme',
    quote: 'Le déficit du système est comblé aux deux tiers. Et 61 % des Français la désapprouvent toujours.',
    txt: 'Les comptes vont mieux, les carrières longues se plaignent des décrets d’application, ' +
      'et l’opposition promet l’abrogation.',
    choices: [
      { t: 'Corriger les décrets sur les carrières longues', g: { fin: -3, op: 4, soc: 4 }, s: { just: 5 }, f: { syn: 6, ret: 5 }, add: ['retraites_corrigee'],
        out: 'Vous réparez l’injustice la plus visible. Trois cents mille personnes vous le devront.' },
      { t: 'Ne rien changer, les comptes parlent', g: { fin: 3, op: -3 }, f: { pat: 6, syn: -6 },
        out: 'Les comptes parlent. Les gens aussi, et ils votent plus souvent que la Cour des comptes.' },
      { t: 'Ouvrir une clause de revoyure en 2031', g: { maj: 2, op: 2, soc: 2 }, f: { syn: 4 },
        out: 'Promettre de rouvrir le dossier : élégant moyen de ne pas le fermer.' },
    ],
  },

  /* ----------------------------------------- RÉFORME DES INSTITUTIONS --- */
  {
    id: 'chain_inst_1', cat: 'inst', who: 'sg', w: 8, min: 14, not: ['reforme_inst_lancee'],
    titre: 'Réformer les institutions',
    quote: 'Trois Assemblées sans majorité en dix ans. Soit on change le mode de scrutin, soit on gouverne par la censure.',
    txt: 'La proportionnelle rendrait l’Assemblée représentative et ingouvernable, ou l’inverse, ' +
      'selon les experts que vous écoutez.',
    choices: [
      {
        t: 'Proportionnelle avec prime majoritaire', g: { maj: -4, op: 6 }, s: { just: 4 },
        f: { med: 8, jeu: 6 }, x: { aut: -12 }, add: ['reforme_inst_lancee', 'proportionnelle'],
        then: [['chain_inst_2', 4]],
        news: 'Projet de loi : scrutin proportionnel avec prime majoritaire de 25 % des sièges.',
        out: 'Soixante-dix pour cent des Français y sont favorables. Et 60 % des députés sortants, contre.',
      },
      {
        t: 'Référendum d’initiative citoyenne', d: 'Un million de signatures, un vote',
        g: { op: 8, maj: -6 }, f: { med: 6, syn: 6, rur: 8 }, x: { aut: -16 },
        add: ['reforme_inst_lancee', 'referendum_initiative'], then: [['chain_inst_2', 4]],
        news: 'Vers un référendum d’initiative citoyenne à partir d’un million de signatures.',
        out: 'Vous donnez une arme au pays. Elle peut servir contre vous dans deux ans.',
      },
      {
        t: 'Renforcer l’exécutif : 49.3 élargi, Sénat réduit', g: { maj: 6, op: -6 }, s: { just: -5 },
        f: { med: -10, fon: -6 }, x: { aut: 18 }, add: ['reforme_inst_lancee', 'executif_renforce'],
        then: [['chain_inst_2', 4]],
        out: 'Gouvernable, oui. Et chacune de vos lois sera réputée imposée, y compris les bonnes.',
      },
      {
        t: 'Rien. La Constitution a tenu soixante-dix ans.', g: { maj: 2 }, f: { med: -3 },
        out: 'Elle a tenu. Elle tient de moins en moins bien, et vous le constaterez vous-même.',
      },
    ],
  },

  {
    id: 'chain_inst_2', cat: 'inst', who: 'pm', direct: true,
    titre: 'Le Sénat bloque la réforme',
    quote: 'Pour une révision constitutionnelle, il faut le Sénat. Il ne votera pas. Il nous reste l’article 11, et c’est très contesté.',
    txt: 'Deux voies : le congrès des deux chambres, qui refusera, ou le référendum direct, ' +
      'juridiquement audacieux et politiquement risqué.',
    choices: [
      { t: 'Passer par référendum', g: { op: 6, maj: -6, eur: -2 }, f: { med: 4 }, x: { aut: -8 }, then: [['inst_referendum', 2]],
        out: 'Vous jouez la carte du peuple contre les chambres. De Gaulle l’a fait. Il a aussi perdu, une fois.' },
      { t: 'Négocier avec le Sénat : moins de réforme, un accord', g: { maj: 4, op: -3 }, f: { med: 2 },
        out: 'Une réforme à 40 %, votée, appliquée. L’art du possible, en version décevante.' },
      { t: 'Abandonner la réforme', g: { op: -5, maj: 2 }, f: { med: -5, jeu: -6 }, del: ['proportionnelle', 'referendum_initiative'],
        out: 'La huitième tentative de réforme institutionnelle enterrée depuis 2008. La série continue.' },
    ],
  },

  /* ------------------------------------------ GRANDE CONSULTATION --- */
  {
    id: 'chain_debat_1', cat: 'inst', who: 'com', w: 8, min: 10, not: ['grand_debat'],
    titre: 'Une grande consultation nationale',
    quote: 'Deux mois de réunions publiques, une plateforme en ligne, et vous en sortez avec un mandat ou avec une liste de reproches.',
    txt: 'Le pays est tendu, les corps intermédiaires affaiblis. Une consultation massive peut ' +
      'reconstruire un lien direct, ou créer des attentes impossibles à satisfaire.',
    choices: [
      {
        t: 'La lancer et y participer personnellement', g: { op: 7, soc: 6, fin: -2 }, f: { med: 6, rur: 8, syn: 4 },
        x: { aut: -8 }, add: ['grand_debat'], then: [['chain_debat_2', 5]],
        news: 'Grande consultation nationale lancée : 10 000 réunions publiques annoncées.',
        out: 'Vous passez quatre heures par semaine en salle des fêtes. Les images sont excellentes.',
      },
      {
        t: 'La confier à une convention citoyenne tirée au sort', g: { op: 4, soc: 3 }, f: { med: 5, jeu: 6 }, x: { aut: -10 },
        add: ['grand_debat', 'convention_citoyenne'], then: [['chain_debat_2', 6]],
        out: 'Cent cinquante citoyens vont vous remettre des propositions courageuses. Il faudra les tenir.',
      },
      { t: 'Non : gouverner, ce n’est pas discuter', g: { op: -4, soc: -4 }, f: { med: -5 }, x: { aut: 10 },
        out: 'Position défendable. Elle laisse la colère sans exutoire institutionnel.' },
    ],
  },

  {
    id: 'chain_debat_2', cat: 'inst', who: 'sg', direct: true,
    titre: 'Les conclusions de la consultation',
    quote: 'Deux millions de contributions. Trois demandes dominent : justice fiscale, services publics de proximité, et écoute.',
    txt: 'Les demandes sont claires, chiffrables, et coûtent 18 milliards. Ne rien en faire serait pire ' +
      'que ne pas avoir consulté.',
    choices: [
      {
        t: 'Reprendre les trois demandes principales', g: { fin: -10, op: 10, soc: 8 }, s: { just: 8, serv: 7 },
        f: { syn: 8, rur: 10, med: 6, pat: -8 }, add: ['suite_grand_debat', 'pacte_social'],
        news: 'Le président annonce la reprise des trois priorités issues de la consultation.',
        out: 'Dix-huit milliards, mais vous venez de prouver qu’une consultation peut servir à quelque chose.',
      },
      {
        t: 'Reprendre la moins coûteuse et communiquer sur le reste', g: { fin: -3, op: 2 }, f: { med: -6, rur: -5 },
        out: 'Le « en marche vers » et le « nous avons entendu ». Les gens connaissent la formule.',
      },
      { t: 'Classer le rapport', g: { op: -8, soc: -7 }, f: { med: -10, rur: -10, jeu: -8 },
        out: 'Deux millions de contributions dans un classeur. Vous venez de fabriquer du cynisme pour dix ans.' },
    ],
  }

);
