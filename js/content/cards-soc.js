/* ============== SOCIAL, SANTÉ, ÉCOLE, FAMILLE, CONFLITS SOCIAUX ========== */
'use strict';

P.CARDS.push(

  {
    id: 'soc_hopital', cat: 'soc', who: 'san', w: 14, max: 20,
    titre: 'L’hôpital ne tient plus',
    quote: 'Dix-huit services d’urgences fermés la nuit cet été. Ce n’est plus une alerte, c’est un état des lieux.',
    txt: 'Il manque 15 000 infirmiers et 6 000 médecins hospitaliers. Les démissions sont le premier poste de perte. ' +
      'Un plan crédible, c’est 8 à 12 milliards par an.',
    choices: [
      {
        t: 'Plan massif : 30 000 recrutements, salaires revalorisés',
        g: { fin: -12, op: 10, soc: 8 }, s: { serv: 14, just: 7 },
        f: { fon: 16, syn: 12, pat: -4, ret: 8 }, add: ['hopital_plan'], then: [['soc_hopital_bilan', 26]],
        news: 'Plan hôpital : 30 000 recrutements et +9 % sur les salaires soignants.',
        out: 'Le plan le plus attendu depuis dix ans. Et douze milliards par an que Bercy vous facturera chaque mois.',
      },
      {
        t: 'Réorganiser sans dépenser', d: 'Fermer les petits services, concentrer les plateaux',
        g: { fin: 3, op: -6, soc: -5 }, s: { serv: -4, secu: 0 },
        f: { rur: -14, fon: -8 }, add: ['hopital_restructure'],
        news: 'Carte hospitalière : regroupement des plateaux techniques, 40 maternités fermées.',
        out: 'Médicalement défendable, politiquement mortel. Chaque fermeture a un maire, un comité et une pétition.',
      },
      {
        t: 'Ouvrir en grand aux cliniques privées', g: { fin: 4, op: -3 }, s: { serv: 3, just: -7 },
        f: { pat: 10, syn: -12, fon: -12 }, x: { eco: 16 },
        news: 'Les cliniques privées autorisées à reprendre des activités hospitalières publiques.',
        out: 'Les délais d’attente baissent là où il y a des cliniques. C’est-à-dire pas là où il y a des déserts.',
      },
      {
        t: 'Commission et rapport dans six mois', g: { op: -4, soc: -3 }, f: { fon: -6, med: -5 }, add: ['hopital_abandon'],
        then: [['soc_hopital_colere', 8]],
        out: 'Vous avez créé la 14e commission sur l’hôpital. Les soignants connaissent le genre.',
      },
    ],
  },

  {
    id: 'soc_hopital_colere', cat: 'soc', who: 'san', direct: true,
    titre: 'Les soignants ne veulent plus de commissions',
    quote: 'Quatre-vingt-dix chefs de service démissionnent de leurs fonctions administratives. Ensemble. Ce soir.',
    txt: 'La démission collective est symbolique mais massive : elle paralyse la gouvernance de vingt CHU.',
    choices: [
      { t: 'Recevoir et annoncer un plan en urgence', g: { fin: -9, op: 5, soc: 5 }, s: { serv: 10 }, f: { fon: 12 }, add: ['hopital_plan'], del: ['hopital_abandon'],
        out: 'Il a fallu une humiliation publique pour débloquer douze milliards. C’est souvent comme ça.' },
      { t: 'Tenir : « l’hôpital n’est pas qu’une question d’argent »', g: { op: -9, soc: -8 }, s: { serv: -6 }, f: { fon: -16, med: -8 },
        out: 'La phrase est vraie et impossible à prononcer sans passer pour un comptable.' },
      { t: 'Nommer un médiateur reconnu du monde hospitalier', g: { op: 2, soc: 3 }, f: { fon: 5, med: 3 }, then: [['soc_hopital_mediateur', 5]],
        out: 'Un nom respecté achète trois mois de calme. À condition de lui donner quelque chose à signer.' },
    ],
  },

  {
    id: 'soc_hopital_mediateur', cat: 'soc', who: 'san', direct: true,
    titre: 'Le médiateur rend ses conclusions',
    quote: 'Il propose un accord en trois volets. Il coûte sept milliards. Il est signé par six syndicats sur huit.',
    txt: 'Un accord à portée de main, chiffré, accepté par la profession. Il ne manque que votre signature et l’argent.',
    choices: [
      { t: 'Signer', g: { fin: -8, op: 7, soc: 7 }, s: { serv: 12, just: 4 }, f: { fon: 14, syn: 10 }, add: ['hopital_plan', 'pacte_social'], del: ['hopital_abandon'],
        out: 'Sept milliards, un conflit éteint, une profession qui respire. Le meilleur ratio de votre mandat.' },
      { t: 'Signer la moitié', g: { fin: -4, op: 2, soc: -2 }, s: { serv: 5 }, f: { fon: 2, syn: -6 },
        out: 'La moitié d’un accord n’est pas un accord. On vous le fera remarquer en bloc opératoire.' },
      { t: 'Refuser', g: { op: -7, soc: -9 }, s: { serv: -5 }, f: { fon: -18, med: -6 }, then: [['soc_greve_menace', 2]],
        out: 'Vous avez commandé une médiation pour la refuser. Plus personne ne viendra à la table.' },
    ],
  },

  {
    id: 'soc_hopital_bilan', cat: 'soc', who: 'san', direct: true,
    titre: 'Deux ans de plan hôpital',
    quote: 'Les délais aux urgences ont baissé de 22 %. Et on n’a recruté que 17 000 des 30 000 promis : il n’y a pas les diplômés.',
    txt: 'Le plan marche là où il y a des candidats. Ailleurs, l’argent est voté et les postes restent vides.',
    choices: [
      { t: 'Doubler les places en formation initiale', g: { fin: -4, op: 4 }, s: { serv: 6 }, f: { jeu: 8, fon: 6 }, add: ['hopital_sauve'],
        out: 'Les effets arriveront en 2034. Vous investissez pour quelqu’un d’autre : c’est le métier.' },
      { t: 'Recruter à l’étranger avec un statut dédié', g: { op: -2, fin: -2 }, s: { serv: 8 }, f: { rur: -5, med: -2 }, add: ['hopital_sauve'],
        out: 'Les services rouvrent en six mois. Le débat sur « l’immigration choisie » rouvre en six jours.' },
      { t: 'Communiquer sur les 22 % et passer à autre chose', g: { op: 3 }, f: { med: -5, fon: -5 },
        out: 'Les 22 % sont réels. Les 13 000 postes vides aussi, et ils ont des noms de villes.' },
    ],
  },

  {
    id: 'soc_deserts', cat: 'soc', who: 'san', w: 12, min: 4,
    titre: 'Six millions de Français sans médecin',
    quote: 'Les maires veulent la régulation de l’installation. Les internes menacent de partir à l’étranger. Les deux sont sérieux.',
    txt: 'Obliger les jeunes médecins à s’installer dans les zones sous-dotées est la mesure la plus demandée par les élus ' +
      'et la plus combattue par la profession.',
    choices: [
      {
        t: 'Réguler l’installation pendant trois ans', g: { op: 8, soc: -5 }, s: { serv: 9, just: 6 },
        f: { rur: 16, jeu: -8, fon: 4 }, x: { eco: -10, aut: 10 }, add: ['medecins_regulation'],
        then: [['soc_internes_greve', 3]],
        news: 'Les jeunes médecins devront exercer trois ans en zone sous-dotée.',
        out: 'Les maires ruraux vous portent en triomphe. Les internes bloquent les facultés.',
      },
      {
        t: 'Incitations massives : primes, logement, conjoint', g: { fin: -5, op: 4 }, s: { serv: 5 },
        f: { rur: 8, jeu: 3 }, add: ['deserts_incitations'],
        news: 'Prime de 100 000 euros et logement de fonction pour les installations en désert médical.',
        out: 'Ça marche à 40 %. Les 60 % restants sont les zones où personne ne veut vivre, prime ou pas.',
      },
      {
        t: 'Déléguer aux infirmiers et pharmaciens', g: { op: 5, soc: -2 }, s: { serv: 7 }, f: { fon: 6, rur: 8, jeu: -4 },
        news: 'Les infirmiers en pratique avancée pourront prescrire et renouveler les traitements chroniques.',
        out: 'Réforme peu coûteuse, très efficace, et combattue par trois ordres professionnels.',
      },
      {
        t: 'Supprimer le numerus apertus et attendre', g: { fin: -2, op: -3 }, s: { serv: 3 }, f: { jeu: 5, rur: -6 },
        out: 'Décision correcte à horizon dix ans. On vous demande ce que vous faites pour l’hiver prochain.',
      },
    ],
  },

  {
    id: 'soc_internes_greve', cat: 'soc', who: 'san', direct: true,
    titre: 'Les internes bloquent les hôpitaux',
    quote: 'Ils assurent les urgences et rien d’autre. Les blocs programmés sont à l’arrêt dans trente CHU.',
    txt: 'Grève illimitée des internes contre la régulation d’installation. L’opinion est partagée : ' +
      '52 % soutiennent la mesure, 61 % soutiennent les internes.',
    choices: [
      { t: 'Maintenir, avec un paquet d’accompagnement', g: { soc: -4, op: 2, fin: -3 }, s: { serv: 4 }, f: { jeu: -4, rur: 8 },
        out: 'La mesure passe. Les internes n’oublieront pas, et ils seront médecins pendant quarante ans.' },
      { t: 'Reculer sur l’obligation', g: { op: -6, soc: 4 }, s: { serv: -4 }, f: { rur: -14, jeu: 8 }, del: ['medecins_regulation'],
        out: 'Vous reculez devant 12 000 internes après avoir promis six millions de patients. Ça se verra.' },
      { t: 'Référendum local dans les départements concernés', g: { op: 4, maj: -3 }, f: { rur: 10, med: 4 }, x: { aut: -8 },
        out: 'Innovation démocratique astucieuse. Juridiquement, le Conseil d’État fronce les sourcils.' },
    ],
  },

  {
    id: 'soc_profs', cat: 'soc', who: 'edu', w: 12,
    titre: 'Deux mille classes sans professeur',
    quote: 'À la rentrée, il manquera 2 100 enseignants. On recrutera des contractuels en quatre jours de formation.',
    txt: 'Le métier n’attire plus : 30 % des postes aux concours non pourvus en mathématiques et en lettres classiques.',
    choices: [
      {
        t: 'Revaloriser de 20 % en début de carrière', g: { fin: -8, op: 6, soc: 5 }, s: { serv: 8, just: 4 },
        f: { fon: 16, syn: 10, jeu: 5 }, add: ['prof_revalorises'],
        news: 'Les enseignants débutants revalorisés de 20 %. Les concours se remplissent à nouveau.',
        out: 'Huit milliards par an, un métier qui redevient attractif. Les effets dans trois rentrées.',
      },
      {
        t: 'Revaloriser contre des missions supplémentaires', d: 'Le « pacte »',
        g: { fin: -4, soc: -3 }, s: { serv: 3 }, f: { fon: -4, syn: -8 }, x: { eco: 8 },
        out: 'Les syndicats parlent de « travailler plus pour gagner autant ». La formule va rester.',
      },
      {
        t: 'Recruter massivement des contractuels', g: { fin: -2, op: -3 }, s: { serv: -5 }, f: { fon: -10, syn: -10 },
        out: 'Les classes ont un adulte devant elles. C’est le minimum, et ça se verra dans les évaluations.',
      },
      {
        t: 'Fusionner les académies et redéployer', g: { fin: 5, soc: -4 }, s: { serv: -3 }, f: { fon: -8, rur: -6 },
        out: 'La réforme administrative qui règle tout sur l’organigramme et rien dans la salle de classe.',
      },
    ],
  },

  {
    id: 'soc_ecole_niveau', cat: 'soc', who: 'edu', w: 10, min: 10,
    titre: 'Les évaluations internationales tombent',
    quote: 'Nous perdons encore quatre points en mathématiques. Et nous sommes le pays où l’origine sociale pèse le plus.',
    txt: 'Deux diagnostics s’opposent : trop d’hétérogénéité dans les classes, ou trop peu de moyens dans les quartiers.',
    choices: [
      {
        t: 'Groupes de niveau en français et maths', g: { op: 4, soc: -4 }, s: { serv: 3, just: -5 },
        f: { ret: 8, fon: -8, syn: -8 }, x: { eco: 6, aut: 8 },
        news: 'Généralisation des groupes de niveau au collège.',
        out: 'Mesure populaire chez les parents, contestée par la recherche. Vous verrez les résultats en 2031.',
      },
      {
        t: 'Dédoubler les classes dans les quartiers', g: { fin: -6, op: 4 }, s: { serv: 7, just: 8 }, f: { fon: 8, jeu: 6 },
        news: 'Classes à douze élèves dans 1 200 écoles des quartiers prioritaires.',
        out: 'L’investissement éducatif le mieux documenté qui existe. Et le plus lent à se voir.',
      },
      {
        t: 'Retour aux fondamentaux et aux évaluations nationales', g: { op: 5, fin: 1 }, s: { serv: 2 }, f: { ret: 8, fon: -4 }, x: { aut: 6 },
        out: 'Le dictée-calcul-lecture plaît à 78 % des parents. Les professeurs vous disent qu’ils le font déjà.',
      },
      {
        t: 'Autonomie des établissements et recrutement par le chef', g: { soc: -6 }, s: { serv: 4, comp: 3 }, f: { fon: -14, syn: -10, pat: 6 }, x: { eco: 14 },
        out: 'Réforme qui marche dans les pays où elle existe depuis trente ans. Ici, elle commence par une grève.',
      },
    ],
  },

  {
    id: 'soc_smartphone', cat: 'soc', who: 'edu', w: 9,
    titre: 'Les écrans au collège',
    quote: 'Les études convergent : attention, sommeil, résultats. Et l’interdiction est soutenue par 82 % des parents.',
    txt: 'Interdire le smartphone au collège est peu coûteux, très populaire, et pose un vrai problème pratique : qui fouille les sacs ?',
    choices: [
      {
        t: 'Interdiction totale, casiers financés par l’État', g: { op: 7, fin: -1 }, s: { serv: 3 }, f: { ret: 8, fon: 4, jeu: -6 },
        x: { aut: 8 }, add: ['smartphone_interdit'],
        news: 'Smartphone interdit au collège, casiers sécurisés financés par l’État.',
        out: 'Sept points de popularité pour 180 millions d’euros. Le meilleur rendement politique du mandat.',
      },
      {
        t: 'Interdire les réseaux sociaux aux moins de 15 ans', g: { op: 6, eur: -2 }, s: { secu: 3 }, f: { ret: 8, jeu: -10, med: -4 },
        x: { aut: 12 }, add: ['reseaux_mineurs'], then: [['eur_plateformes', 6]],
        news: 'La France interdit les réseaux sociaux aux moins de quinze ans. Les plateformes contestent.',
        out: 'Vous entrez en guerre avec des entreprises plus riches que votre budget de la Défense. Bon.',
      },
      {
        t: 'Éducation au numérique plutôt qu’interdiction', g: { op: 1, fin: -2 }, s: { serv: 2 }, f: { jeu: 6, fon: 4 },
        out: 'Approche intelligente, résultats modestes, aucun titre de presse. Gouverner, c’est parfois ça.',
      },
    ],
  },

  {
    id: 'soc_rsa', cat: 'soc', who: 'trav', w: 10, min: 6,
    titre: 'Conditionner le RSA',
    quote: 'Quinze heures d’activité par semaine. Dans les départements qui l’ont testé, le retour à l’emploi gagne 6 points.',
    txt: 'Généraliser suppose d’accompagner deux millions de personnes. France Travail estime qu’il manque 12 000 conseillers.',
    choices: [
      {
        t: 'Généraliser avec les moyens d’accompagnement', g: { fin: -5, op: 5, soc: -3 }, s: { chom: -0.3, just: 2, comp: 3 },
        f: { pat: 8, ret: 6, syn: -8 }, x: { eco: 10 }, add: ['rsa_conditionne'],
        news: 'RSA conditionné à quinze heures d’activité, 12 000 conseillers recrutés.',
        out: 'La seule version de cette réforme qui fonctionne est aussi la seule qui coûte de l’argent.',
      },
      {
        t: 'Généraliser sans moyens supplémentaires', g: { fin: 3, op: 2, soc: -7 }, s: { just: -7, chom: -0.1 },
        f: { syn: -14, pat: 8, ret: 6 }, x: { eco: 14, aut: 10 }, add: ['rsa_conditionne'],
        out: 'Les radiations montent plus vite que les reprises d’emploi. Les chiffres du chômage s’améliorent quand même.',
      },
      {
        t: 'Abandonner et augmenter le RSA de 10 %', g: { fin: -4, op: -2, soc: 5 }, s: { just: 7 },
        f: { syn: 10, pat: -8, ret: -4 }, x: { eco: -12 },
        out: 'Décision assumée, impopulaire, défendable. Vous allez beaucoup l’expliquer.',
      },
    ],
  },

  {
    id: 'soc_fin_de_vie', cat: 'soc', who: 'jus', w: 9, min: 8,
    titre: 'L’aide à mourir revient au Parlement',
    quote: 'La convention citoyenne a conclu, le texte est prêt. Votre majorité est coupée en deux, pas selon les lignes habituelles.',
    txt: 'Sujet intime, transpartisan, suivi par toutes les religions et par 72 % de l’opinion favorable à un cadre légal. ' +
      'Les soins palliatifs manquent dans 21 départements.',
    choices: [
      {
        t: 'Porter la loi, avec un plan palliatif adossé', g: { op: 6, maj: -5, fin: -3 }, s: { just: 5, serv: 4 },
        f: { jeu: 8, ret: -4, med: 6 }, x: { aut: -12 }, add: ['aide_a_mourir'],
        news: 'Loi sur l’aide à mourir adoptée, assortie d’un milliard pour les soins palliatifs.',
        out: 'Vous laissez une loi de société dans l’histoire. Et une partie de votre majorité en travers.',
      },
      {
        t: 'Laisser une proposition de loi transpartisane', d: 'Sans engager le gouvernement',
        g: { maj: 2, op: 2 }, f: { med: 2 }, add: ['aide_a_mourir'],
        out: 'La loi passe sans vous. Vous ne portez ni la gloire ni le reproche : parfois c’est l’objectif.',
      },
      {
        t: 'Reporter : d’abord les soins palliatifs partout', g: { fin: -4, op: -2 }, s: { serv: 5 }, f: { ret: 6, jeu: -6 },
        out: 'Argument sérieux et souvent sincère. Il tient aussi lieu de report indéfini depuis vingt ans.',
      },
    ],
  },

  {
    id: 'soc_natalite', cat: 'soc', who: 'pm', w: 8, min: 10,
    titre: 'La natalité au plus bas depuis 1945',
    quote: '1,58 enfant par femme. Dans vingt ans, c’est votre système de retraites qui le sent.',
    txt: 'Les causes sont connues : logement, garde d’enfants, carrières. Les mesures efficaces sont lentes et coûteuses.',
    choices: [
      {
        t: 'Service public de la petite enfance', d: '200 000 places de crèche',
        g: { fin: -7, op: 6 }, s: { just: 6, serv: 6, chom: -0.15 }, f: { jeu: 10, syn: 6, fon: 5 }, add: ['creches_plan'],
        news: 'Deux cents mille places de crèche créées en cinq ans.',
        out: 'La mesure la plus efficace sur l’emploi des femmes et la natalité. Et la plus chère.',
      },
      {
        t: 'Congé parental mieux payé et partagé', g: { fin: -5, op: 5 }, s: { just: 5 }, f: { jeu: 8, pat: -6 },
        out: 'Les pays nordiques le font depuis trente ans et ça marche. Il faut juste tenir dix ans.',
      },
      {
        t: 'Avantages fiscaux au troisième enfant', g: { fin: -3, op: 2 }, s: { just: -3 }, f: { ret: 6, rur: 5, jeu: -3 }, x: { eco: 6 },
        out: 'Bénéficie surtout à ceux qui auraient eu un troisième enfant de toute façon.',
      },
    ],
  },

  {
    id: 'soc_greve_menace', cat: 'soc', who: 'syn', direct: true,
    titre: 'L’intersyndicale pose un ultimatum',
    quote: 'Huit organisations ensemble. C’est arrivé quatre fois en vingt ans. Chaque fois, le gouvernement a reculé.',
    txt: 'Préavis de grève reconductible dans les transports, l’énergie, les raffineries et la fonction publique. ' +
      'Début dans dix jours.',
    choices: [
      {
        t: 'Recevoir, négocier, lâcher 30 %', g: { soc: 10, op: 3, fin: -5, maj: -3 }, f: { syn: 12, pat: -6 }, add: ['pacte_social'],
        news: 'Accord de dernière minute : le préavis de grève est levé.',
        out: 'Vous avez payé pour la paix sociale. C’est généralement le meilleur achat d’un gouvernement.',
      },
      {
        t: 'Tenir et préparer le service minimum', g: { soc: -10, maj: 4, op: -3 }, s: { comp: 2 },
        f: { syn: -14, pat: 10 }, x: { aut: 12 }, add: ['greve_generale'], then: [['soc_greve_jour10', 2]],
        out: 'La grève aura lieu. Vous jouez l’usure : ça marche une fois sur deux, et ça se voit de loin.',
      },
      {
        t: 'Référendum sur la mesure contestée', g: { soc: 2, op: 5, maj: -6 }, f: { med: 6, syn: -4 }, x: { aut: -14 },
        then: [['inst_referendum', 2]],
        out: 'Vous transformez un conflit social en campagne nationale. Audacieux. Et irréversible.',
      },
    ],
  },

  {
    id: 'soc_greve_jour10', cat: 'soc', who: 'int', direct: true,
    titre: 'Dixième jour de grève',
    quote: 'Trente pour cent des stations-service à sec, les trains à 40 %, et 1,1 million de personnes dans la rue samedi.',
    txt: 'Le mouvement est populaire : 64 % de soutien. Les caisses de grève ont collecté 9 millions d’euros. ' +
      'Les raffineries sont le point de bascule.',
    choices: [
      {
        t: 'Réquisitionner les dépôts de carburant', g: { soc: -12, op: -6, maj: 3 }, s: { secu: -3 },
        f: { syn: -16, pat: 12 }, x: { aut: 18 }, then: [['crise_emeute', 3]],
        out: 'Les stations se remplissent. Les images de CRS devant les raffineries font le tour du monde.',
      },
      {
        t: 'Retirer la mesure contestée', g: { soc: 14, op: 2, maj: -10, fin: -4 }, f: { syn: 10, pat: -12, med: -5 },
        del: ['greve_generale'],
        news: 'Le gouvernement retire sa réforme. L’intersyndicale lève le mouvement.',
        out: 'Le pays redémarre. Votre autorité, pas encore. Vous ne ferez plus passer grand-chose.',
      },
      {
        t: 'Suspendre six mois et ouvrir une conférence sociale', g: { soc: 8, maj: -4, op: 1 }, f: { syn: 6 }, del: ['greve_generale'],
        add: ['conference_sociale'],
        out: 'La suspension est le recul des gens élégants. Tout le monde a compris, personne ne le dit.',
      },
      {
        t: 'Attendre encore. Ils vont s’épuiser.', g: { soc: -8, op: -8 }, s: { croi: -0.4, comp: -3 }, f: { syn: -8, pat: -6 },
        then: [['soc_greve_jour25', 3]],
        out: 'Peut-être. L’économie s’épuise aussi, et elle vote.',
      },
    ],
  },

  {
    id: 'soc_greve_jour25', cat: 'soc', who: 'pm', direct: true,
    titre: 'Vingt-cinquième jour',
    quote: 'Le pays perd 0,2 point de PIB par semaine. Et la grève tient. Il faut sortir par le haut ou par le bas, mais sortir.',
    txt: 'Le conflit le plus long depuis 1995. Votre popularité est en chute libre, celle des syndicats aussi.',
    choices: [
      { t: 'Médiation d’une personnalité indépendante', g: { soc: 8, op: 4, fin: -3 }, f: { syn: 6, med: 5 }, del: ['greve_generale'], add: ['pacte_social'],
        out: 'Il fallait un tiers pour que personne ne perde la face. Vieux truc, toujours efficace.' },
      { t: 'Retirer tout et remanier le gouvernement', g: { soc: 12, op: -2, maj: -8 }, f: { syn: 8 }, del: ['greve_generale'], then: [['inst_remaniement', 1]],
        out: 'Un Premier ministre sacrifié pour solde de tout compte. La tradition républicaine.' },
      { t: 'Passer en force avec le 49.3', g: { soc: -10, maj: -8, op: -7 }, add: ['49_3_utilise', 'greve_generale'], x: { aut: 16 }, then: [['inst_censure', 1]],
        out: 'Vous avez la loi. Vous aurez aussi une motion de censure et des casseroles pendant trois ans.' },
    ],
  },

  {
    id: 'soc_banlieues', cat: 'soc', who: 'maire', w: 9, min: 6,
    titre: 'Les maires des quartiers demandent un plan',
    quote: 'Trois cents maires, toutes étiquettes confondues. Ils ne demandent pas de l’argent : ils demandent des agents de l’État.',
    txt: 'Services publics en recul, trafic installé, écoles dégradées. Le dernier plan banlieue a été annoncé puis réduit de 70 %.',
    choices: [
      {
        t: 'Plan de reconquête républicaine : école, police, santé', g: { fin: -8, op: 5, soc: 6 }, s: { serv: 7, secu: 5, just: 7 },
        f: { jeu: 10, fon: 6, med: 4 }, add: ['plan_quartiers'],
        news: 'Plan quartiers : 1 500 postes d’enseignants, 4 000 policiers de proximité, 60 maisons de santé.',
        out: 'Le genre de plan dont on mesure l’effet en huit ans. Tenez-le, ou il ne vaut rien.',
      },
      {
        t: 'Priorité à la sécurité d’abord', g: { op: 4, soc: -3 }, s: { secu: 7, just: -3 }, f: { ret: 8, jeu: -8, rur: 6 }, x: { aut: 12 }, add: ['police_renforcee'],
        out: 'Les saisies augmentent. Les écoles attendent toujours leurs enseignants.',
      },
      {
        t: 'Décentraliser aux maires avec une dotation libre', g: { fin: -4, op: 2 }, s: { serv: 3 }, f: { med: 2, fon: -4 },
        out: 'Les bons maires font des miracles. Les autres font des gymnases. C’est le pari de la confiance.',
      },
      { t: 'Rien de nouveau : les crédits existent déjà', g: { op: -4, soc: -4 }, s: { just: -4 }, f: { jeu: -8, med: -4 }, then: [['crise_emeute', 6]],
        out: 'Techniquement vrai. Le prochain été vous expliquera pourquoi ce n’était pas suffisant.' },
    ],
  },

  {
    id: 'soc_jeunes_precarite', cat: 'soc', who: 'sond', w: 9,
    titre: 'Un étudiant sur cinq saute des repas',
    quote: 'Les files aux distributions alimentaires sur les campus sont devenues une image de campagne. Pour vos adversaires.',
    txt: 'Bourses, logement étudiant, repas à un euro : trois leviers, trois coûts, trois symboles.',
    choices: [
      {
        t: 'Repas à un euro pour tous les étudiants', g: { fin: -3, op: 6 }, s: { just: 6 }, f: { jeu: 16, syn: 6 }, add: ['repas_etudiant'],
        news: 'Repas universitaire à un euro généralisé à tous les étudiants.',
        out: 'Six cents millions par an, une mesure visible tous les midis. Le rapport qualité-prix politique est excellent.',
      },
      {
        t: 'Revenu d’autonomie sous conditions', g: { fin: -9, op: 4, soc: 4 }, s: { just: 9 }, f: { jeu: 18, pat: -8, ret: -6 }, x: { eco: -16 },
        out: 'Réforme structurelle majeure. Neuf milliards, et un débat sans fin sur « l’assistanat ».',
      },
      {
        t: '40 000 logements étudiants', g: { fin: -5, op: 3 }, s: { just: 4 }, f: { jeu: 10 },
        out: 'Les premières résidences dans quatre ans. Les étudiants d’aujourd’hui n’en verront rien.',
      },
    ],
  },

  {
    id: 'soc_handicap', cat: 'soc', who: 'san', w: 8,
    titre: 'Cinquante mille enfants sans accompagnant',
    quote: 'La loi dit « école inclusive ». La réalité dit « 12 heures par semaine pour trois enfants à la fois ».',
    txt: 'Les AESH sont payés 850 euros par mois en moyenne. Titulariser et augmenter coûte 2,4 milliards.',
    choices: [
      {
        t: 'Créer un statut et titulariser', g: { fin: -4, op: 6, soc: 5 }, s: { serv: 6, just: 8 }, f: { fon: 10, syn: 8 },
        news: 'Les accompagnants d’élèves handicapés obtiennent un statut de fonctionnaire.',
        out: 'Deux milliards et quarante mille personnes qui sortent de la précarité. Peu médiatique, très juste.',
      },
      { t: 'Augmenter le temps de travail proposé', g: { fin: -2, op: 3 }, s: { just: 4 }, f: { fon: 5 },
        out: 'Un pas réel, insuffisant, et qui coûte quand même. Le pire des deux mondes, en version douce.' },
      { t: 'Déléguer aux collectivités', g: { fin: 3, op: -4 }, s: { just: -4, serv: -3 }, f: { fon: -6, med: -4 },
        out: 'Le transfert sans les moyens : les départements vous répondront par voie de presse.' },
    ],
  },

  {
    id: 'soc_canicule_ehpad', cat: 'soc', who: 'san', w: 8, min: 12,
    titre: 'Le grand âge, enfin',
    quote: 'Il manque 100 000 soignants en Ehpad. Et la génération du baby-boom entre en dépendance maintenant.',
    txt: 'Une loi grand âge est promise depuis 2018 par tous les gouvernements. Elle coûte 9 milliards par an.',
    choices: [
      {
        t: 'Loi grand âge financée par une contribution dédiée', g: { fin: -5, op: 5, soc: 4 }, s: { serv: 9, just: 6 },
        f: { ret: 14, fon: 8, pat: -5 }, add: ['grand_age'],
        news: 'Loi grand âge : 50 000 recrutements en Ehpad, financés par une contribution sur les successions.',
        out: 'Vous réglez un problème que six gouvernements ont reporté. Et vous taxez les héritages pour le faire.',
      },
      { t: 'Virage domiciliaire sans loi nouvelle', g: { fin: -2, op: 2 }, s: { serv: 4 }, f: { ret: 6 },
        out: 'Soigner à domicile coûte moins cher et plaît davantage. À condition qu’il y ait quelqu’un pour venir.' },
      { t: 'Reporter encore', g: { op: -3 }, s: { serv: -4 }, f: { ret: -10, med: -4 },
        out: 'Le septième report consécutif. Les familles comptent, elles aussi.' },
    ],
  },

  {
    id: 'soc_femmes', cat: 'soc', who: 'jus', w: 8,
    titre: 'Violences faites aux femmes',
    quote: 'Cent vingt-deux féminicides l’an dernier. Les ordonnances de protection prennent encore six semaines.',
    txt: 'Les associations demandent 2,6 milliards, des juridictions spécialisées et 3 000 places d’hébergement.',
    choices: [
      {
        t: 'Juridictions spécialisées et plan de 2 milliards', g: { fin: -4, op: 7, soc: 4 }, s: { secu: 7, just: 7 },
        f: { jeu: 10, fon: 6, med: 8 }, add: ['plan_violences'],
        news: 'Création de pôles judiciaires spécialisés et 3 000 places d’hébergement d’urgence.',
        out: 'Les délais d’ordonnance tombent à huit jours en un an. Un des rares résultats visibles et rapides.',
      },
      { t: 'Renforcer les moyens existants', g: { fin: -2, op: 3 }, s: { secu: 3, just: 3 }, f: { med: 3 },
        out: 'Utile, modeste, et les associations publieront le tableau des engagements non tenus.' },
      { t: 'Durcir les peines sans moyens nouveaux', g: { op: 3 }, s: { secu: 2 }, f: { ret: 6, med: -4 }, x: { aut: 10 },
        out: 'Les peines augmentent. Les plaintes classées sans suite aussi. Les deux figurent dans le même rapport.' },
    ],
  },

  {
    id: 'soc_filler', cat: 'soc', who: 'com', w: 6, once: false, min: 12,
    titre: 'Une photo circule',
    quote: 'Une file d’attente de quatre heures devant une préfecture. Deux millions de vues. Ce n’est pas une crise, c’est une ambiance.',
    txt: 'Ni scandale ni réforme : juste l’État qui ne répond plus assez vite, et une image qui le dit mieux qu’un rapport.',
    choices: [
      { t: 'Plan guichets : rouvrir 500 points d’accueil', g: { fin: -3, op: 4 }, s: { serv: 5 }, f: { rur: 6, fon: 4 },
        out: 'Rouvrir des guichets en 2030 : l’innovation la plus populaire de la décennie.' },
      { t: 'Tout numériser, et un médiateur par département', g: { fin: -1, op: 1 }, s: { serv: 2 }, f: { ret: -5 },
        out: 'Pour ceux qui savent s’en servir, c’est mieux. Pour les autres, c’est la même file, en ligne.' },
      { t: 'Ignorer : ce n’est pas un sujet national', g: { op: -3 }, f: { med: -4 },
        out: 'Les ambiances ne font pas la une. Elles font les résultats du premier tour.' },
    ],
  }

);
