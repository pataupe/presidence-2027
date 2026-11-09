/* ====================== CRISES ET POINTS DE RUPTURE ====================== */
'use strict';

P.CARDS.push(

  /* ------------------------------------------------- crises aléatoires --- */
  {
    id: 'crise_pandemie', cat: 'crise', who: 'san', w: 7, min: 10,
    titre: 'Alerte sanitaire',
    quote: 'Un virus respiratoire à transmission rapide. Quatre cents cas, deux foyers, et une réunion de cellule de crise dans vingt minutes.',
    txt: 'Vous avez douze jours pour décider, avec des données incomplètes, et le souvenir collectif ' +
      'de la dernière fois qui pèse sur chaque mot.',
    choices: [
      {
        t: 'Mesures précoces et ciblées', d: 'Masques, dépistage, écoles ouvertes',
        g: { op: 5, fin: -4, eur: 3 }, s: { serv: 3, croi: -0.2 }, f: { med: 6, fon: 4 },
        add: ['pandemie_geree'],
        news: 'Plan sanitaire : dépistage massif, masques gratuits, écoles maintenues ouvertes.',
        out: 'Vous agissez tôt et sans fermer le pays. Si ça marche, personne ne saura ce que vous avez évité.',
      },
      {
        t: 'Confinement régional immédiat', g: { op: -3, fin: -8, soc: -6 }, s: { croi: -0.9, serv: 2, chom: 0.3 },
        f: { pat: -10, jeu: -8 }, x: { aut: 16 }, add: ['confinement'],
        news: 'Confinement de deux régions pour trois semaines.',
        out: 'L’épidémie est freinée. Le mot « confinement » vient de rentrer dans le débat pour cinq ans.',
      },
      {
        t: 'Attendre des données solides', g: { op: 2, fin: 1 }, then: [['crise_pandemie_2', 2]],
        out: 'La prudence scientifique est respectable. Elle coûte dix jours, et dix jours comptent beaucoup.',
      },
    ],
  },

  {
    id: 'crise_pandemie_2', cat: 'crise', who: 'san', direct: true,
    titre: 'L’épidémie s’installe',
    quote: 'Quatre mille cas par jour, les réanimations à 80 %. Il n’y a plus d’option indolore.',
    txt: 'Les dix jours d’attente ont coûté. Il faut maintenant des mesures lourdes.',
    choices: [
      { t: 'Confinement national de trois semaines', g: { op: -6, fin: -12, soc: -8 }, s: { croi: -1.6, chom: 0.5, serv: 3 }, f: { pat: -12, jeu: -10 }, x: { aut: 18 }, add: ['confinement', 'recession'],
        out: 'Le pays s’arrête. Vous avez sauvé des vies et cassé la croissance. Les deux sont vrais.' },
      { t: 'Jauges, masques, télétravail obligatoire', g: { op: -2, fin: -5, soc: -3 }, s: { croi: -0.6, serv: 2 }, f: { pat: -6 }, x: { aut: 10 },
        out: 'Le compromis sanitaire. Il fonctionne à 70 % et ne satisfait personne, comme tous les compromis.' },
      { t: 'Protéger les vulnérables, laisser circuler', g: { op: -5, soc: -4 }, s: { serv: -6, just: -5 }, f: { med: -8, ret: -12 },
        out: 'Stratégie défendue par une minorité de scientifiques. Les Ehpad paieront la facture.' },
    ],
  },

  {
    id: 'crise_krach', cat: 'crise', who: 'tres', w: 7, min: 8,
    titre: 'Krach sur les marchés',
    quote: 'Moins 14 % en trois séances. Deux fonds de pension étrangers liquident leurs positions sur notre dette.',
    txt: 'Pas de banque française en cause, mais un effet richesse immédiat, une épargne qui se contracte, ' +
      'et des taux qui s’envolent.',
    choices: [
      {
        t: 'Plan de soutien à l’économie réelle', g: { fin: -8, op: 5 }, s: { croi: 0.4, chom: -0.1 },
        f: { pat: 6, syn: 5 }, add: ['relance_massive'],
        news: 'Plan d’urgence de 30 milliards pour soutenir l’activité et l’emploi.',
        out: 'Vous amortissez le choc à crédit. C’est ce que font tous les États, et la dette s’en souvient.',
      },
      {
        t: 'Sang-froid, aucune annonce', g: { fin: 4, op: -4 }, s: { croi: -0.3, chom: 0.15 }, f: { pat: -4, med: 3 },
        out: 'Le marché se stabilise seul en quatre semaines. Entre-temps, on vous a reproché l’inaction.',
      },
      {
        t: 'Coordination européenne et appel à la banque centrale', g: { eur: 8, fin: 3 }, s: { croi: 0.1 }, x: { ue: 12 },
        out: 'La bonne échelle. La banque centrale rappelle poliment qu’elle est indépendante, puis agit.',
      },
    ],
  },

  {
    id: 'crise_blackout', cat: 'crise', who: 'ecol', w: 7, min: 12,
    titre: 'Tension sur le réseau électrique',
    quote: 'Vague de froid, quatre réacteurs à l’arrêt, pas de vent. Nous sommes à 2 GW de la coupure organisée.',
    txt: 'Des délestages de deux heures sur des zones tournantes sont techniquement prêts. ' +
      'Politiquement, c’est une image dont on ne se relève pas vite.',
    choices: [
      {
        t: 'Appel national à la sobriété et importation', g: { fin: -4, op: 3, eur: -2 }, s: { comp: -2 },
        f: { med: 5 }, add: ['choc_energie'],
        news: 'Appel national à la sobriété électrique : la consommation baisse de 9 % en trois jours.',
        out: 'Le pays répond. La coupure est évitée. Le mot « sobriété » restera attaché à votre mandat.',
      },
      {
        t: 'Redémarrer les centrales à gaz et au charbon', g: { fin: -3, op: 2 }, s: { vert: -8 }, f: { jeu: -8, pat: 4 }, x: { ecol: -12 },
        add: ['choc_energie'],
        out: 'Les lumières restent allumées. Vos engagements climatiques prennent un an de retard.',
      },
      {
        t: 'Délestages tournants assumés et expliqués', g: { op: -7, soc: -5 }, s: { serv: -3 }, f: { med: -5, pat: -8 },
        add: ['choc_energie', 'delestage'],
        news: 'Délestages tournants de deux heures dans huit départements.',
        out: 'Deux millions de personnes sans électricité en plein hiver. L’image fera campagne contre vous.',
      },
    ],
  },

  {
    id: 'crise_emeute', cat: 'crise', who: 'int', w: 8, min: 6,
    titre: 'Trois nuits d’émeutes',
    quote: 'Quatre cents bâtiments publics touchés, dont soixante écoles. Et l’âge moyen des interpellés est de seize ans.',
    txt: 'Un drame impliquant la police a déclenché un embrasement dans une centaine de quartiers. ' +
      'Les maires sont débordés, les parents dépassés.',
    choices: [
      {
        t: 'Moyens maximaux, couvre-feu local, fermeté', g: { op: 5, soc: -8 }, s: { secu: 6, just: -4 },
        f: { ret: 12, rur: 10, jeu: -14 }, x: { aut: 20 },
        news: 'Quarante-cinq mille policiers déployés, couvre-feu dans 120 communes.',
        out: 'Le calme revient en quatre nuits. Le fossé avec une génération entière s’est creusé.',
      },
      {
        t: 'Fermeté et vérité sur le drame initial', g: { op: 3, soc: -2 }, s: { secu: 4, just: 4 },
        f: { ret: 5, jeu: -3, med: 7 },
        out: 'Tenir les deux bouts est la position la plus difficile et la seule qui reconstruit quelque chose.',
      },
      {
        t: 'Aller sur place, parler aux familles et aux maires', g: { op: 2, soc: 4 }, s: { just: 5 },
        f: { jeu: 8, med: 6, ret: -8 }, x: { aut: -8 },
        out: 'Geste risqué, hué par une partie du pays, et qui change quelque chose dans trois quartiers.',
      },
      {
        t: 'État d’urgence', g: { op: 4, soc: -10, eur: -6 }, s: { secu: 7, just: -8 },
        f: { ret: 12, jeu: -16, med: -8 }, x: { aut: 24 }, add: ['etat_urgence'], then: [['reg_urgence_sortie', 4]],
        out: 'L’outil le plus lourd pour une crise de quatre nuits. Vous l’aurez sur les épaules des mois.',
      },
    ],
  },

  {
    id: 'crise_ronds_points', cat: 'crise', who: 'int', direct: true,
    titre: 'Les ronds-points se remplissent',
    quote: 'Deux mille huit cents points de blocage. Aucun syndicat, aucun porte-parole, aucune revendication unique.',
    txt: 'Un mouvement spontané, soutenu par 72 % de la population, sans interlocuteur identifiable. ' +
      'Les précédents sont connus et aucun n’a bien fini.',
    choices: [
      {
        t: 'Annuler la mesure déclencheuse immédiatement', g: { op: 4, soc: 8, fin: -7 }, s: { vert: -5 },
        f: { rur: 10, ret: 6, med: -4 }, add: ['carburant_bloque'],
        news: 'La hausse est annulée. Le mouvement s’essouffle en deux semaines.',
        out: 'Reculer vite coûte moins cher que reculer tard. Tous vos prédécesseurs l’ont appris trop tard.',
      },
      {
        t: 'Grand débat national', g: { op: 5, soc: 5, fin: -3 }, f: { med: 6, rur: 8 }, x: { aut: -10 },
        add: ['grand_debat'], then: [['chain_debat_2', 5]],
        out: 'Vous transformez une colère en consultation. Il faudra en faire quelque chose, cette fois.',
      },
      {
        t: 'Mesures de pouvoir d’achat ciblées', g: { fin: -8, op: 6, soc: 6 }, s: { just: 6 }, f: { rur: 8, syn: 5 },
        out: 'Dix milliards, un mouvement éteint, et une leçon : la fiscalité écologique a besoin de justice.',
      },
      {
        t: 'Fermeté : évacuer tous les blocages', g: { soc: -14, op: -8 }, s: { secu: -4, croi: -0.3 },
        f: { rur: -16, med: -6 }, x: { aut: 18 }, then: [['crise_samedi_noir', 2]],
        out: 'Les blocages sautent. Le samedi suivant, les cortèges arrivent dans les centres-villes.',
      },
    ],
  },

  {
    id: 'crise_samedi_noir', cat: 'crise', who: 'pref', direct: true,
    titre: 'Samedi, dans la capitale',
    quote: 'Trois cents interpellations, quatre-vingts blessés, des commerces pillés sur une avenue entière. Les images sont partout dans le monde.',
    txt: 'Le mouvement a basculé. Votre crédibilité intérieure et extérieure est en jeu dans les prochaines heures.',
    choices: [
      { t: 'Allocution solennelle et mesures immédiates', g: { op: 6, soc: 8, fin: -9 }, s: { just: 6 }, f: { med: 5, rur: 6 },
        news: 'Allocution présidentielle : 10 milliards de mesures d’urgence annoncées.',
        out: 'Il a fallu une avenue saccagée pour débloquer dix milliards. Le pays le retiendra.' },
      { t: 'Interdire les manifestations dans les centres-villes', g: { soc: -8, op: -4, eur: -5 }, s: { just: -7, secu: 3 }, f: { med: -10 }, x: { aut: 20 },
        out: 'Les interdictions générales sont annulées par la justice administrative en huit jours.' },
      { t: 'Tenir sans rien céder', g: { op: -9, soc: -10 }, s: { croi: -0.4, secu: -5 }, f: { rur: -10, pat: -8 },
        out: 'Semaine après semaine, l’usure s’installe. Dans les deux camps, et surtout dans l’économie.' },
    ],
  },

  {
    id: 'crise_ruralite', cat: 'crise', who: 'maire', direct: true,
    titre: 'La France rurale se braque',
    quote: 'Deux mille maires de communes rurales menacent de démissionner collectivement. Ce serait sans précédent.',
    txt: 'Fermetures de classes, de bureaux de poste, de trésoreries ; et la perception, exacte, ' +
      'que les décisions se prennent ailleurs.',
    choices: [
      {
        t: 'Moratoire sur toutes les fermetures de services publics', g: { fin: -6, op: 6, soc: 5 }, s: { serv: 6 },
        f: { rur: 18, fon: 6, med: 4 }, add: ['moratoire_services'],
        news: 'Moratoire de cinq ans sur les fermetures de services publics en zone rurale.',
        out: 'Promesse puissante et coûteuse. Chaque fermeture future deviendra un reniement.',
      },
      { t: 'Donner aux maires un pouvoir de veto local', g: { op: 4, maj: -3 }, f: { rur: 14, fon: -6 }, x: { aut: -10 },
        out: 'Décentralisation réelle. L’administration centrale vous expliquera que c’est ingérable.' },
      { t: 'Plan France ruralité : santé, école, mobilité', g: { fin: -7, op: 5 }, s: { serv: 7, just: 4 }, f: { rur: 12 },
        out: 'Un plan d’investissement plutôt qu’un moratoire : plus utile, moins lisible.' },
      { t: 'Expliquer que l’État ne peut pas tout', g: { op: -6, soc: -4 }, f: { rur: -14, med: -4 },
        out: 'C’est vrai. C’est aussi la phrase que l’on retient contre un président.' },
    ],
  },

  {
    id: 'crise_zad', cat: 'crise', who: 'int', direct: true,
    titre: 'Occupation sur le chantier',
    quote: 'Huit cents personnes, des cabanes dans les arbres, et une mobilisation nationale annoncée samedi.',
    txt: 'L’évacuation est prête : 1 900 gendarmes. Le risque de blessé grave est réel, ' +
      'et une image de trop peut faire basculer l’opinion.',
    choices: [
      { t: 'Évacuer à l’aube, sans journalistes', g: { soc: -8, op: -2 }, s: { secu: 2, just: -4 }, f: { jeu: -10, med: -8, rur: 8 }, x: { aut: 16 },
        out: 'Deux cents blessés légers et une vidéo de dix secondes qui tournera pendant des années.' },
      { t: 'Médiation et calendrier négocié', g: { soc: 5, op: 2 }, f: { jeu: 6, med: 5, rur: -4 }, x: { aut: -8 },
        out: 'Six mois de négociations, un départ volontaire, zéro blessé. Personne n’en parlera.' },
      { t: 'Suspendre le projet', g: { op: 2, soc: 6, fin: -3 }, s: { vert: 6 }, f: { jeu: 10, rur: -12 }, x: { ecol: 12 }, del: ['autoroute_validee'],
        out: 'Vous cédez à l’occupation. Chaque futur projet contesté s’en souviendra.' },
    ],
  },

  {
    id: 'crise_norme_scandale', cat: 'crise', who: 'jus', direct: true,
    titre: 'Un accident industriel',
    quote: 'Sept morts dans un entrepôt. Le contrôle de sécurité supprimé dans votre loi de simplification est dans tous les titres.',
    txt: 'Le lien de causalité est contesté par vos juristes et établi par la presse. ' +
      'Une commission d’enquête parlementaire est demandée.',
    choices: [
      { t: 'Rétablir les contrôles et reconnaître l’erreur', g: { op: -3, maj: -3 }, s: { just: 5, secu: 3, comp: -3 }, f: { med: 8, syn: 8 },
        out: 'Trois points perdus, une erreur réparée. C’est la version la moins pire de cette histoire.' },
      { t: 'Défendre la loi, attendre l’enquête', g: { op: -7 }, s: { just: -5 }, f: { med: -10, syn: -8 },
        out: 'L’enquête durera dix-huit mois. Les familles parleront chaque semaine.' },
      { t: 'Doubler les effectifs d’inspection du travail', g: { fin: -3, op: 2 }, s: { secu: 5, just: 6 }, f: { syn: 10, pat: -8 },
        out: 'Deux mille inspecteurs de plus. Il en manquait trois mille depuis quinze ans.' },
    ],
  },

  {
    id: 'crise_malaise', cat: 'crise', who: 'moi', direct: true,
    titre: 'Un malaise en public',
    quote: 'Vingt secondes. Caméras présentes. Le communiqué médical doit partir dans l’heure, et il doit être vrai.',
    txt: 'Rien de grave selon les médecins : épuisement, tension. Mais la question de votre capacité ' +
      'à gouverner est désormais posée publiquement.',
    choices: [
      { t: 'Bulletin de santé complet et public', g: { op: 4 }, f: { med: 8 }, add: ['transparence_sante'],
        out: 'La transparence coupe court aux rumeurs en quarante-huit heures. Rien d’autre ne le fait.' },
      { t: 'Minimiser', g: { op: -5 }, f: { med: -10 },
        out: 'Les rumeurs occupent le vide. Elles l’occupent très bien, et très longtemps.' },
      { t: 'Prendre une semaine de repos complet', g: { op: 2, maj: -2 }, f: { med: 4 }, add: ['delegation'],
        out: 'Humain, et plus intelligent qu’il n’y paraît. L’intérim se passe sans incident.' },
    ],
  },

  {
    id: 'crise_usine', cat: 'crise', who: 'eco', w: 8, min: 10,
    titre: 'Un site de 1 800 salariés ferme',
    quote: 'Décision prise au siège, à l’étranger, pour des raisons de « rationalisation du portefeuille industriel ».',
    txt: 'L’entreprise est rentable. Le site est le premier employeur d’un bassin de 40 000 habitants.',
    choices: [
      {
        t: 'Nationalisation temporaire et recherche d’un repreneur', g: { fin: -7, op: 7, soc: 6 },
        s: { comp: -2, chom: -0.1, just: 6 }, f: { syn: 14, pat: -12 }, x: { eco: -16 }, add: ['nationalisation'],
        news: 'L’État prend le contrôle temporaire du site et cherche un repreneur.',
        out: 'Geste fort, apprécié, risqué : si aucun repreneur n’apparaît, l’État reste propriétaire.',
      },
      { t: 'Négocier un plan social exemplaire', g: { fin: -3, op: 2 }, s: { just: 3 }, f: { syn: 5, pat: -3 },
        out: 'Deux ans de reclassement payés par l’entreprise. Le mieux qu’on puisse obtenir sans nationaliser.' },
      { t: 'Conditionner les aides publiques passées à un remboursement', g: { fin: 4, op: 5 }, s: { comp: -3 }, f: { pat: -14, syn: 8 },
        news: 'L’État réclame le remboursement de 90 millions d’aides publiques.',
        out: 'Vous créez un précédent utile. Le patronat parle de « risque pays » dans tous les journaux.' },
      { t: 'Accompagner la reconversion du territoire', g: { fin: -4, op: -2 }, s: { comp: 3, chom: 0.1 }, f: { rur: -6, syn: -8 },
        out: 'Réaliste et froid. Les salariés veulent leur usine, pas une maison de l’emploi.' },
    ],
  },

  /* --------------------------------------- crises terminales (jauge à 0) -- */
  {
    id: 'fin_op', cat: 'crise', who: 'sond', direct: true,
    titre: 'Dix-huit pour cent',
    quote: 'Vous êtes au plus bas niveau jamais mesuré sous la Ve République. Soixante-dix pour cent des Français demandent votre départ.',
    txt: 'Ce n’est plus une mauvaise passe. C’est un problème de légitimité, et il se règle d’une des trois façons suivantes.',
    choices: [
      {
        t: 'Remaniement total et changement de cap', g: { op: 16, maj: -8, fin: -5 }, f: { med: 5 },
        then: [['inst_remaniement', 1]],
        out: 'Un gouvernement neuf, un discours neuf. Vous achetez douze mois. Utilisez-les.',
      },
      {
        t: 'Référendum pour reprendre une légitimité', g: { op: 8, maj: -10 }, x: { aut: -8 }, then: [['inst_referendum', 1]],
        out: 'Retourner devant le pays quand tout va mal : courageux, et parfois fatal.',
      },
      {
        t: 'Tenir jusqu’au bout, sans rien changer', g: { op: 6, maj: -4 }, f: { med: -5 },
        out: 'Vous tenez. Le mandat se terminera sans vous, politiquement, bien avant la fin.',
      },
    ],
  },

  {
    id: 'fin_maj', cat: 'inst', who: 'pm', direct: true,
    titre: 'Plus aucune majorité',
    quote: 'Nous ne faisons plus voter le moindre texte. Le budget passera par ordonnances ou ne passera pas.',
    txt: 'L’Assemblée est ingouvernable. Trois issues, aucune confortable.',
    choices: [
      {
        t: 'Dissoudre', g: { maj: -2, soc: -3 }, add: ['dissolution'], then: [['inst_legislatives', 1]],
        out: 'La dissolution est l’arme du président. Elle se retourne une fois sur deux.',
      },
      {
        t: 'Cohabitation : nommer l’opposition à Matignon', g: { maj: 24, op: -4 }, s: { just: -2 },
        add: ['cohabitation'], pm: 'Gilles Monteil',
        news: 'Cohabitation : un Premier ministre d’opposition entre à Matignon.',
        out: 'Vous gardez le domaine réservé. L’intérieur du pays ne vous appartient plus.',
      },
      {
        t: 'Gouvernement technique et budget par ordonnances', g: { maj: 10, op: -7 }, s: { just: -5 }, f: { med: -8 },
        x: { aut: 14 }, add: ['gouv_technique'], pm: 'Hélène Vasseur',
        out: 'La France gouvernée par décret : légal, inédit, et très coûteux en légitimité.',
      },
    ],
  },

  {
    id: 'fin_soc', cat: 'crise', who: 'int', direct: true,
    titre: 'Le pays est bloqué',
    quote: 'Raffineries, ports, transports, écoles, éboueurs. Quatre millions de personnes dans la rue samedi. Nous n’avons plus de marge.',
    txt: 'Le mouvement social dépasse tout ce que le pays a connu depuis 1968. ' +
      'Il n’y a pas de sortie technique : il faut un geste politique majeur.',
    choices: [
      {
        t: 'Retirer la réforme contestée et demander pardon', g: { soc: 22, op: 4, maj: -12, fin: -6 },
        f: { syn: 14, pat: -14 }, del: ['greve_generale'], add: ['recul_majeur'],
        news: 'Le président retire sa réforme et reconnaît « une erreur de méthode ».',
        out: 'Le pays redémarre lundi. Votre autorité ne redémarrera pas.',
      },
      {
        t: 'Conférence sociale avec tout le pays', g: { soc: 14, op: 6, fin: -8, maj: -5 },
        s: { just: 6 }, f: { syn: 10, med: 6 }, add: ['pacte_social'], del: ['greve_generale'],
        out: 'Trois semaines de négociation, quinze milliards, un accord. Le prix de la paix sociale.',
      },
      {
        t: 'État d’urgence et réquisitions générales', g: { soc: 10, op: -10, eur: -10 }, s: { just: -12, secu: 4 },
        f: { syn: -20, med: -14, jeu: -14 }, x: { aut: 28 }, add: ['etat_urgence'],
        out: 'Vous rétablissez l’ordre par la force. Ce qui vient après n’est plus de la politique ordinaire.',
      },
    ],
  },

  {
    id: 'fin_fin', cat: 'crise', who: 'tres', direct: true,
    titre: 'Les marchés ne veulent plus de notre dette',
    quote: 'Adjudication non couverte ce matin. Taux à 6,2 %. Nous avons quatre semaines de trésorerie.',
    txt: 'La situation n’a pas de précédent récent dans un grand pays européen. ' +
      'Trois portes, toutes étroites.',
    choices: [
      {
        t: 'Plan d’austérité négocié avec Bruxelles et la BCE', g: { fin: 24, eur: 10, op: -14, soc: -12 },
        s: { serv: -12, just: -10, croi: -1.2, chom: 0.6 }, f: { fon: -16, syn: -16, pat: 6 },
        x: { eco: 20, ue: 12 }, add: ['austerite', 'plan_aide'],
        news: 'Accord avec la Commission et la banque centrale : 60 milliards d’économies sur trois ans.',
        out: 'Les taux refluent en dix jours. Le pays paiera pendant dix ans, et il saura qui a signé.',
      },
      {
        t: 'Impôt exceptionnel sur les patrimoines et les banques', g: { fin: 16, op: -4, eur: -6 },
        s: { just: 8, comp: -8, croi: -0.6 }, f: { pat: -20, syn: 8 }, x: { eco: -20 },
        news: 'Prélèvement exceptionnel de 3 % sur les patrimoines supérieurs à 2 millions d’euros.',
        out: 'Vous financez sans couper. Les capitaux partent, et le débat durera une génération.',
      },
      {
        t: 'Suspendre le remboursement et renégocier', g: { fin: 8, eur: -24, op: 6 },
        s: { croi: -2.2, chom: 1.0, comp: -12, dette: -10 }, f: { med: -10, pat: -20 },
        x: { ue: -30 }, add: ['defaut_partiel', 'recession'],
        news: 'La France demande un réaménagement de sa dette. Séisme sur les marchés européens.',
        out: 'Vous entrez dans l’histoire économique. Pas dans le chapitre que vous espériez.',
      },
    ],
  },

  {
    id: 'fin_eur', cat: 'eur', who: 'ext', direct: true,
    titre: 'La France est isolée',
    quote: 'Nous ne sommes plus invités aux réunions de préparation. Vingt-six capitales se parlent sans nous.',
    txt: 'Plus aucune alliance, plus aucun relais. Une sortie de crise est encore possible, ' +
      'mais elle demande un geste coûteux.',
    choices: [
      {
        t: 'Tournée des capitales et concessions majeures', g: { eur: 22, op: -8, fin: -4 }, x: { ue: 20 },
        f: { rur: -8, med: 4 }, add: ['retour_europe'],
        news: 'Après une tournée de dix capitales, la France revient dans le jeu européen.',
        out: 'Vous avez payé cher pour redevenir fréquentable. En diplomatie, ça s’appelle une bonne affaire.',
      },
      {
        t: 'Assumer la rupture et chercher d’autres alliances', g: { eur: 10, op: 5, fin: -8 },
        s: { comp: -8, croi: -0.8 }, f: { rur: 10, pat: -14 }, x: { ue: -24 }, add: ['axe_alternatif'],
        out: 'Un axe alternatif se dessine. Il représente 4 % de nos échanges commerciaux.',
      },
      {
        t: 'Référendum sur notre place dans l’Union', g: { eur: 6, op: 7, maj: -10 }, x: { ue: -16 },
        then: [['inst_referendum', 1]], add: ['frexit_flirt'],
        news: 'Le président annonce un référendum sur la place de la France dans l’Union.',
        out: 'Vous mettez soixante-dix ans de construction européenne dans une urne. Le monde regarde.',
      },
    ],
  },

  /* --------------------------------------------------------- bouche-trou -- */
  {
    id: 'filler_01', cat: 'pol', who: 'sg', w: 1, once: false,
    titre: 'Semaine calme',
    quote: 'Rien de majeur. Profitez-en, ça n’arrive pas deux fois par an.',
    txt: 'Pas de crise, pas d’arbitrage urgent. Juste du temps, et une question : ' +
      'qu’est-ce qu’on fait d’une semaine calme ?',
    choices: [
      { t: 'Déplacement de terrain, trois départements', g: { op: 3 }, f: { rur: 5, med: 3 }, out: 'Trois marchés, deux usines, une école. Le métier de base, et il paie.' },
      { t: 'Travailler les dossiers avec les administrations', g: { fin: 2 }, s: { serv: 2, comp: 2 }, out: 'Quatre réunions techniques. Zéro photo, et deux décisions qui serviront.' },
      { t: 'Recevoir l’opposition et les syndicats', g: { maj: 4, soc: 4 }, f: { syn: 4 }, out: 'Le dialogue en temps calme coûte deux heures et sauve des semaines de crise.' },
      { t: 'Prendre trois jours de repos', g: { op: -1 }, f: { med: -2 }, out: 'Vous dormez. Une chaîne d’info compte les jours d’absence.' },
    ],
  }

);
