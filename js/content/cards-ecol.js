/* ================== ÉCOLOGIE, ÉNERGIE, TERRITOIRES ======================= */
'use strict';

P.CARDS.push(

  {
    id: 'ecol_nucleaire', cat: 'ecol', who: 'ecol', w: 13, max: 24,
    titre: 'Six réacteurs, ou pas',
    quote: 'Décision à prendre maintenant : les premiers béton coulés en 2032, l’électricité en 2040. Ou jamais.',
    txt: 'Le programme de nouveaux réacteurs coûte 67 milliards selon l’exploitant, 100 selon la Cour des comptes. ' +
      'Les renouvelables coûtent moins cher au MWh mais demandent un réseau et du stockage.',
    choices: [
      {
        t: 'Lancer six réacteurs, et huit en option', g: { fin: -8, eur: 3, op: 3 }, s: { vert: 6, comp: 7 },
        f: { pat: 10, rur: 5, syn: 6, jeu: -6 }, x: { ecol: -5 }, add: ['nucleaire_lance'],
        news: 'Programme nucléaire : six réacteurs lancés, mise en service annoncée pour 2040.',
        out: 'Vous engagez le pays pour soixante ans en une signature. Peu de décisions pèsent autant.',
      },
      {
        t: 'Tout sur les renouvelables et le réseau', g: { fin: -6, op: 2, eur: 5 }, s: { vert: 12, comp: 2 },
        f: { jeu: 12, rur: -8, pat: -4 }, x: { ecol: 18 }, add: ['renouvelables_massif'],
        news: 'Plan solaire et éolien offshore massif : 45 GW supplémentaires et 20 milliards de réseau.',
        out: 'Déployable en cinq ans, contestable dans chaque commune. Vous allez connaître les recours.',
      },
      {
        t: 'Les deux, avec un financement par la facture', g: { fin: -4, op: -3 }, s: { vert: 9, comp: 5 },
        f: { pat: 6, jeu: 3, ret: -6 }, add: ['nucleaire_lance', 'renouvelables_massif'],
        out: 'La stratégie la plus solide techniquement. Et une hausse de 8 % sur les factures, vite impopulaire.',
      },
      {
        t: 'Prolonger l’existant et décider plus tard', g: { fin: 4, op: -2 }, s: { vert: -4, comp: -3 }, f: { pat: -5, jeu: -4 },
        add: ['nucleaire_abandon'],
        out: 'Ne pas décider est une décision : celle de laisser le parc vieillir sans remplaçant.',
      },
    ],
  },

  {
    id: 'ecol_zfe', cat: 'ecol', who: 'ecol', w: 11, min: 3,
    titre: 'Les zones à faibles émissions',
    quote: 'Huit millions de véhicules seraient interdits en 2030. Ce sont aussi huit millions d’électeurs, et pas les plus riches.',
    txt: '40 000 décès prématurés par an liés à la pollution de l’air. Et un dispositif qui interdit d’abord ' +
      'aux ménages modestes de rouler.',
    choices: [
      {
        t: 'Maintenir, avec une aide massive au remplacement', g: { fin: -7, op: -2, eur: 4 }, s: { vert: 9, serv: 2 },
        f: { jeu: 8, rur: -10, ret: -6 }, x: { ecol: 14 }, add: ['zfe_maintenues'],
        news: 'ZFE maintenues : prime de 9 000 euros et leasing social étendu à 500 000 véhicules.',
        out: 'Vous tenez la santé publique en payant la facture sociale. C’est cher et c’est cohérent.',
      },
      {
        t: 'Supprimer les ZFE', g: { op: 6, soc: 4 }, s: { vert: -10, serv: -2 },
        f: { rur: 14, ret: 10, jeu: -12 }, x: { ecol: -18 }, add: ['zfe_supprimees'],
        news: 'Les zones à faibles émissions sont supprimées. Les métropoles dénoncent un recul sanitaire.',
        out: 'Mesure immédiatement populaire. Les 40 000 décès annuels n’ont pas de porte-parole.',
      },
      {
        t: 'Les limiter aux trois plus grandes métropoles', g: { op: 3 }, s: { vert: 2 }, f: { rur: 8, jeu: -3 },
        out: 'Le compromis qui ne fâche que ceux qui vivent dans les grandes villes. Ils y sont habitués.',
      },
      {
        t: 'Remplacer par un plan transports en commun gratuit aux heures de pointe', g: { fin: -6, op: 7 }, s: { vert: 6, just: 5 },
        f: { jeu: 10, rur: -4 }, x: { ecol: 10 },
        out: 'Interdire moins, offrir plus : la version de l’écologie qui gagne des élections.',
      },
    ],
  },

  {
    id: 'ecol_secheresse', cat: 'crise', who: 'ecol', w: 10, min: 10,
    titre: 'Sécheresse historique',
    quote: 'Soixante-huit départements en restriction, quatre cents communes alimentées par camions-citernes. En juin.',
    txt: 'L’agriculture consomme 45 % de l’eau en été, les ménages 24 %. Les arbitrages sur les retenues ' +
      'déclenchent des affrontements violents sur le terrain.',
    choices: [
      {
        t: 'Priorité absolue à l’eau potable, quotas agricoles', g: { op: 5, soc: -5 }, s: { vert: 7, just: 4 },
        f: { rur: -14, jeu: 8, med: 5 }, x: { ecol: 14 },
        news: 'Quotas agricoles stricts : l’eau potable passe avant l’irrigation.',
        out: 'Décision juste et explosive. Les irrigants bloquent trois préfectures en une semaine.',
      },
      {
        t: 'Plan de retenues d’eau et de réutilisation', g: { fin: -6, op: 3 }, s: { vert: 3, comp: 2 },
        f: { rur: 12, jeu: -6 }, add: ['retenues_eau'],
        news: 'Plan eau : 60 retenues, réutilisation des eaux usées, 6 milliards d’investissement.',
        out: 'Les agriculteurs applaudissent, les hydrologues nuancent, les opposants s’enchaînent aux pelleteuses.',
      },
      {
        t: 'Tarification progressive de l’eau', g: { op: 2, fin: 2 }, s: { vert: 6, just: 5 }, f: { ret: -5, jeu: 6 }, x: { ecol: 12 },
        news: 'Tarification progressive : les premiers mètres cubes moins chers, les piscines beaucoup plus.',
        out: 'Signal-prix efficace, socialement juste, et compris par à peu près personne en trois semaines.',
      },
      {
        t: 'Gérer en préfecture, sans arbitrage national', g: { op: -3, soc: -3 }, s: { vert: -3 }, f: { rur: -4, med: -4 },
        out: 'Les préfets arbitrent sous pression locale. Soixante-huit politiques différentes de l’eau.',
      },
    ],
  },

  {
    id: 'ecol_autoroute', cat: 'ecol', who: 'ecol', w: 9, min: 6,
    titre: 'Un projet d’autoroute contesté',
    quote: 'Quinze ans de procédures, deux cents millions déjà dépensés, un millier de militants installés sur le tracé.',
    txt: 'Le projet désenclave un territoire pauvre et artificialise 400 hectares. Les élus locaux sont pour à 80 %, ' +
      'l’autorité environnementale est contre.',
    choices: [
      {
        t: 'Poursuivre le chantier et évacuer', g: { op: -2, soc: -6 }, s: { vert: -8, comp: 3 },
        f: { rur: 12, jeu: -12, med: -4 }, x: { ecol: -16, aut: 10 }, add: ['autoroute_validee'],
        then: [['crise_zad', 3]],
        news: 'Le chantier autoroutier reprend sous protection des forces de l’ordre.',
        out: 'Vous avez tranché pour les élus locaux. Les images d’évacuation feront le tour des réseaux.',
      },
      {
        t: 'Abandonner et financer la route et le rail existants', g: { op: 2, soc: 4, fin: -3 }, s: { vert: 7 },
        f: { jeu: 10, rur: -10 }, x: { ecol: 14 },
        news: 'Projet autoroutier abandonné : 1,2 milliard redéployé vers le rail et les routes existantes.',
        out: 'Les écologistes vous célèbrent. Deux cents millions déjà dépensés deviennent un gaspillage à expliquer.',
      },
      {
        t: 'Suspendre et organiser une convention citoyenne locale', g: { op: 3, maj: -2 }, f: { med: 6, rur: -4, jeu: 4 }, x: { aut: -10 },
        out: 'Vous gagnez du temps proprement. Les deux camps vous accusent de ne pas décider, et ils ont raison.',
      },
    ],
  },

  {
    id: 'ecol_datacenter', cat: 'ecol', who: 'ecol', direct: true,
    titre: 'Les data centers mangent l’électricité',
    quote: 'Trois pour cent de la consommation nationale aujourd’hui, neuf en 2032. Et ils veulent du raccordement prioritaire.',
    txt: 'Vous avez promis la souveraineté numérique. Elle a une facture électrique et thermique.',
    choices: [
      { t: 'Conditionner les raccordements à la chaleur récupérée', g: { op: 3, fin: -1 }, s: { vert: 6, comp: 2 }, f: { jeu: 6, pat: -4 }, x: { ecol: 10 },
        out: 'Chauffer des quartiers avec des serveurs : élégant, éprouvé au Danemark, et enfin obligatoire ici.' },
      { t: 'Priorité électrique aux data centers souverains', g: { op: -3 }, s: { comp: 7, vert: -5 }, f: { pat: 8, jeu: -6 },
        out: 'La souveraineté numérique passe devant la sobriété. Choix assumé, et contesté dès le lendemain.' },
      { t: 'Moratoire sur les nouveaux projets', g: { op: 1 }, s: { comp: -6, vert: 5 }, f: { pat: -10, jeu: 5 }, x: { ecol: 12 },
        out: 'Les projets partent en Irlande et en Suède. L’électricité y est plus verte, c’est l’argument.' },
    ],
  },

  {
    id: 'ecol_pesticides', cat: 'ecol', who: 'agri', w: 10, min: 4,
    titre: 'Un pesticide très utilisé doit être réautorisé',
    quote: 'Sans dérogation, trois filières perdent 20 % de rendement. Avec dérogation, nous sommes en infraction avec notre propre plan.',
    txt: 'Les études sanitaires s’accumulent, les agriculteurs n’ont pas d’alternative immédiate, ' +
      'et les apiculteurs ont déjà porté plainte.',
    choices: [
      {
        t: 'Interdire, avec un fonds de transition de 2 milliards', g: { fin: -5, op: 3, soc: -3 }, s: { vert: 10, just: 3 },
        f: { jeu: 10, rur: -12 }, x: { ecol: 18 }, add: ['pesticides_interdits'],
        news: 'Interdiction confirmée et fonds de transition de 2 milliards pour les filières concernées.',
        out: 'Vous tenez la ligne en payant la transition. C’est la seule version qui ne finit pas en blocage.',
      },
      {
        t: 'Dérogation de trois ans', g: { op: 1, soc: 3 }, s: { vert: -8 }, f: { rur: 12, jeu: -10 }, x: { ecol: -14 },
        add: ['pesticides_derogation'],
        news: 'Dérogation de trois ans accordée. Les associations saisissent le Conseil d’État.',
        out: 'Trois ans, c’est-à-dire jusqu’à la prochaine dérogation. Tout le monde le sait.',
      },
      {
        t: 'Interdire en exigeant les mêmes règles aux importations', g: { eur: -3, op: 5 }, s: { vert: 8, comp: -2 },
        f: { rur: 4, jeu: 8 }, x: { ecol: 14, ue: -8 }, add: ['pesticides_interdits', 'clauses_miroir'],
        out: 'Les clauses miroir : la seule réponse qui tient. Bruxelles vous expliquera que c’est compliqué.',
      },
    ],
  },

  {
    id: 'ecol_renovation', cat: 'ecol', who: 'ecol', w: 10,
    titre: 'Cinq millions de passoires thermiques',
    quote: 'L’interdiction de louer arrive. Si on l’applique, 600 000 logements sortent du marché locatif en un an.',
    txt: 'Rénover coûte 40 000 euros par logement. Les aides existent, les artisans manquent, ' +
      'et les copropriétés mettent trois ans à voter.',
    choices: [
      {
        t: 'Plan de rénovation massif avec avance de l’État', g: { fin: -9, op: 5 }, s: { vert: 11, just: 5, chom: -0.2 },
        f: { syn: 6, jeu: 8, pat: 5 }, add: ['renovation_plan'],
        news: 'Rénovation énergétique : avance intégrale de l’État remboursée à la revente.',
        out: 'Le tiers-financement lève le vrai obstacle : la trésorerie des ménages. Coûteux, efficace.',
      },
      {
        t: 'Repousser l’interdiction de louer de cinq ans', g: { op: 2, fin: 1 }, s: { vert: -7 }, f: { ret: 8, jeu: -8 }, x: { ecol: -12 },
        out: 'Les locataires continuent de payer 2 400 euros de chauffage par an. Le calendrier est sauvé.',
      },
      {
        t: 'Former 80 000 artisans et simplifier les aides', g: { fin: -4, op: 3 }, s: { vert: 6, comp: 3, chom: -0.15 }, f: { pat: 6, syn: 5 },
        out: 'Le goulot d’étranglement n’était pas l’argent mais la main-d’œuvre. Vous l’avez compris.',
      },
    ],
  },

  {
    id: 'ecol_inondations', cat: 'crise', who: 'int', w: 9, min: 8,
    titre: 'Inondations majeures',
    quote: 'Onze morts, 40 000 sinistrés, deux départements sous l’eau. Les assureurs parlent de 4 milliards.',
    txt: 'Le troisième épisode « exceptionnel » en cinq ans. Le régime d’indemnisation des catastrophes ' +
      'naturelles est au bord de la rupture.',
    choices: [
      {
        t: 'Fonds d’adaptation climatique de 10 milliards', g: { fin: -9, op: 7, eur: 4 }, s: { vert: 8, serv: 4 },
        f: { rur: 10, jeu: 8, med: 6 }, add: ['adaptation_plan'],
        news: 'Création d’un fonds national d’adaptation de 10 milliards : digues, zones d’expansion, relogement.',
        out: 'Vous êtes le premier à financer l’adaptation plutôt que la réparation. Ça compte, même si ça ne se voit pas.',
      },
      {
        t: 'Indemniser vite, réformer l’assurance plus tard', g: { fin: -5, op: 6 }, f: { ret: 6, pat: -3 },
        out: 'Les chèques partent en trois semaines : exactement ce que les sinistrés attendent. Et rien ne change.',
      },
      {
        t: 'Interdire la reconstruction en zone inondable', g: { op: -5, soc: -3 }, s: { vert: 7, just: -2 }, f: { rur: -12, med: 5 }, x: { ecol: 12, aut: 10 },
        out: 'Courageux, inévitable à terme, et insupportable pour des gens qui ont tout perdu.',
      },
    ],
  },

  {
    id: 'ecol_carburant', cat: 'ecol', who: 'eco', w: 11, min: 5,
    titre: 'Le carburant repasse les 2 euros',
    quote: 'Le litre à 2,05 euros. Dans les territoires sans transport en commun, c’est 300 euros par mois pour aller travailler.',
    txt: 'Vous connaissez le précédent : le prix du carburant a déjà fait tomber un gouvernement. ' +
      'Chaque centime de ristourne coûte 500 millions.',
    choices: [
      {
        t: 'Ristourne de 20 centimes à la pompe', g: { fin: -8, op: 8, soc: 6 }, s: { vert: -5, infl: -0.3 },
        f: { rur: 14, ret: 8, jeu: -5 }, x: { ecol: -12 }, add: ['carburant_bloque'],
        news: 'Ristourne de 20 centimes sur le carburant pour six mois.',
        out: 'La rue est désamorcée pour dix milliards par an. Et la fiscalité écologique est morte pour le mandat.',
      },
      {
        t: 'Indemnité carburant ciblée sur les travailleurs', g: { fin: -4, op: 5 }, s: { just: 5 }, f: { rur: 10, syn: 6 },
        news: 'Indemnité carburant de 300 euros pour les travailleurs modestes qui roulent.',
        out: 'Deux fois moins cher, mieux ciblé, et vous aurez le débat sur les seuils pendant six mois.',
      },
      {
        t: 'Leasing social de voitures électriques à 100 euros', g: { fin: -5, op: 4 }, s: { vert: 7, comp: 3 },
        f: { jeu: 8, rur: 4, pat: 4 }, x: { ecol: 10 }, add: ['leasing_social'],
        out: 'La bonne réponse de long terme. Elle ne règle pas le plein de demain matin.',
      },
      {
        t: 'Rien : le signal-prix doit jouer', g: { op: -8, soc: -8 }, s: { vert: 4 }, f: { rur: -14, ret: -8 },
        x: { ecol: 12 }, then: [['crise_ronds_points', 3]],
        out: 'Vous avez les climatologues avec vous. Et des ronds-points qui se remplissent dans trois semaines.',
      },
    ],
  },

  {
    id: 'ecol_eolien', cat: 'ecol', who: 'ecol', w: 8, min: 8,
    titre: 'Un parc éolien bloqué par les recours',
    quote: 'Huit ans de procédure pour un parc de dix-huit mâts. Et sept recours, dont trois financés par un fonds opaque.',
    txt: 'Les délais français sont deux fois supérieurs à la moyenne européenne. Réduire les recours ' +
      'accélère la transition et rogne le droit au recours.',
    choices: [
      {
        t: 'Un seul degré de recours pour les projets d’énergie', g: { op: -2, eur: 4 }, s: { vert: 9, comp: 4 },
        f: { jeu: 6, rur: -8, pat: 6 }, x: { ecol: 12, aut: 8 },
        news: 'Les recours contre les projets énergétiques limités à un seul degré de juridiction.',
        out: 'Les projets sortent trois ans plus tôt. Les associations dénoncent un recul démocratique, pas à tort.',
      },
      {
        t: 'Intéresser financièrement les communes et les riverains', g: { fin: -3, op: 4 }, s: { vert: 7 },
        f: { rur: 10, jeu: 5 }, x: { ecol: 10 }, add: ['eolien_partage'],
        out: 'Quand les habitants touchent une part de la production, les recours tombent de 60 %. Vieille recette danoise.',
      },
      {
        t: 'Pause sur l’éolien terrestre, tout sur l’offshore', g: { fin: -4, op: 3 }, s: { vert: 4 }, f: { rur: 10, jeu: -4 },
        out: 'Le compromis des paysages. L’offshore coûte plus cher et arrive plus tard : c’est le prix.',
      },
    ],
  },

  {
    id: 'ecol_biodiv', cat: 'ecol', who: 'ecol', w: 7, min: 12,
    titre: 'L’artificialisation des sols',
    quote: 'Objectif zéro artificialisation nette. Les maires disent qu’ils ne peuvent plus construire ni une école ni une usine.',
    txt: 'Le pays perd 20 000 hectares de terres agricoles par an. La règle existe, elle est inapplicable ' +
      'telle quelle dans les communes rurales.',
    choices: [
      {
        t: 'Maintenir l’objectif avec des souplesses locales', g: { op: 2 }, s: { vert: 6 }, f: { rur: -4, jeu: 5 }, x: { ecol: 10 },
        out: 'La version applicable de la règle. Les écologistes crient à la dilution, les maires respirent.',
      },
      { t: 'Suspendre l’objectif', g: { op: 3, soc: 2 }, s: { vert: -8, comp: 3 }, f: { rur: 12, pat: 8, jeu: -10 }, x: { ecol: -14 },
        out: 'Les permis repartent. Vingt mille hectares de plus par an, et un recul difficile à rattraper.' },
      { t: 'Compensation obligatoire par renaturation', g: { fin: -2 }, s: { vert: 8 }, f: { pat: -6, rur: -4, jeu: 6 }, x: { ecol: 14 },
        out: 'Chaque hectare bétonné en rend un à la nature. Sur le papier, imparable. Sur le terrain, un marché à créer.' },
    ],
  },

  {
    id: 'ecol_mer', cat: 'ecol', who: 'agri', w: 7, min: 10,
    titre: 'La pêche et les aires protégées',
    quote: 'Bruxelles exige 10 % d’aires marines en protection forte. Les pêcheurs d’un port entier bloquent les ferries.',
    txt: 'Les stocks s’effondrent, les pêcheurs vieillissent, et chaque mesure de protection supprime des bateaux.',
    choices: [
      { t: 'Protéger et payer la sortie de flotte', g: { fin: -4, eur: 6, op: -2 }, s: { vert: 8 }, f: { rur: -8, jeu: 6 }, x: { ecol: 14 },
        out: 'Les stocks se reconstituent en huit ans. Les ports perdent 1 200 emplois en deux.' },
      { t: 'Négocier des quotas plutôt que des zones', g: { eur: 2 }, s: { vert: 3 }, f: { rur: 4 },
        out: 'Les quotas se contournent, les zones non. Vous le savez, et vous achetez la paix.' },
      { t: 'Refuser et saisir la Cour de justice', g: { eur: -8, op: 4 }, s: { vert: -5 }, f: { rur: 12 }, x: { ue: -14, ecol: -10 },
        out: 'Vous perdrez le contentieux dans quatre ans. D’ici là, les bateaux sortent.' },
    ],
  },

  {
    id: 'ecol_filler', cat: 'ecol', who: 'ecol', w: 6, once: false, min: 16,
    titre: 'Rapport annuel sur le climat',
    quote: 'Nous sommes à 58 % de la trajectoire de baisse des émissions. C’est mieux qu’avant et insuffisant.',
    txt: 'Le haut conseil pour le climat publie son rapport. Il est lu par quatre cents personnes ' +
      'et cité pendant dix ans.',
    choices: [
      { t: 'Publier un plan de rattrapage secteur par secteur', g: { fin: -3, op: 2, eur: 3 }, s: { vert: 7 }, f: { jeu: 7, med: 4 }, x: { ecol: 10 },
        out: 'Chiffré, daté, opposable. Vous venez de vous créer une obligation de résultat.' },
      { t: 'Saluer les progrès et continuer', g: { op: 1 }, s: { vert: -2 }, f: { jeu: -4 },
        out: 'La trajectoire ne se redresse pas en communiquant dessus. Elle ne se dégrade pas non plus.' },
      { t: 'Contester la méthodologie', g: { op: -2 }, s: { vert: -4 }, f: { med: -6, jeu: -8 },
        out: 'Attaquer le thermomètre : technique classique, efficacité nulle, coût réputationnel durable.' },
    ],
  }

);
