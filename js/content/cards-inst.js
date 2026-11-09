/* ============== VIE POLITIQUE, INSTITUTIONS, COMMUNICATION =============== */
'use strict';

P.CARDS.push(

  {
    id: 'inst_remaniement', cat: 'inst', who: 'sg', direct: true,
    titre: 'Changer de Premier ministre',
    quote: 'Matignon est un fusible. Il vient de sauter. Le choix du suivant dira ce que vous voulez faire des années qui restent.',
    txt: 'Quatre profils, quatre mandats implicites. Vous ne pourrez pas en changer tous les six mois.',
    choices: [
      {
        t: 'Un parlementaire chevronné', d: 'Pour reconstruire une majorité',
        pm: 'Gilles Monteil', g: { maj: 16, op: -3 }, f: { med: 3 },
        news: 'Nomination d’un Premier ministre issu du Parlement, chargé de « retisser une majorité ».',
        out: 'Il connaît chaque député et chaque dette. L’Assemblée redevient praticable.',
      },
      {
        t: 'Une figure populaire', d: 'Pour remonter dans l’opinion',
        pm: 'Samir Kassab', g: { op: 11, soc: 5, fin: -4 }, f: { jeu: 8, pat: -5 },
        news: 'Un maire très populaire nommé à Matignon. Surprise générale.',
        out: 'Huit points de popularité en quinze jours. Il faudra qu’il tienne la distance budgétaire.',
      },
      {
        t: 'Une technicienne de Bercy', d: 'Pour tenir les comptes',
        pm: 'Hélène Vasseur', g: { fin: 10, maj: 3, soc: -5 }, f: { pat: 7, syn: -7 },
        news: 'Une haute fonctionnaire des finances nommée Première ministre.',
        out: 'Les marchés respirent. Les députés de votre camp ne savent même pas prononcer son nom.',
      },
      {
        t: 'Un profil d’autorité', d: 'Pour tenir la rue et les frontières',
        pm: 'Victor Delcourt', g: { maj: 7, soc: -9 }, s: { secu: 6 }, f: { ret: 8, rur: 8, syn: -10, jeu: -8 }, x: { aut: 12 },
        news: 'Nomination d’un Premier ministre à la ligne régalienne assumée.',
        out: 'Le message est clair : l’ordre d’abord. La rue a reçu le message, elle aussi.',
      },
    ],
  },

  {
    id: 'inst_censure', cat: 'inst', who: 'pm', direct: true,
    titre: 'Motion de censure',
    quote: 'Il leur manque onze voix. Mais deux groupes hésitent, et l’un d’eux veut juste être reçu.',
    txt: 'La motion sera votée dans trois jours. Un gouvernement censuré, c’est un Premier ministre ' +
      'et dix-huit mois de travail à refaire.',
    choices: [
      {
        t: 'Recevoir le groupe charnière et payer son prix', g: { maj: 8, fin: -4, op: -2 }, f: { med: -3 },
        add: ['zero_censure'],
        out: 'La motion est rejetée de six voix. Le prix sera payé dans le prochain budget.',
      },
      {
        t: 'Affronter le vote sans rien céder', g: { maj: -6, op: 4 }, f: { med: 5 },
        then: [['inst_censure_resultat', 1]],
        out: 'Vous jouez la dignité. Le décompte aura lieu jeudi à 18 h.',
      },
      {
        t: 'Dissoudre avant le vote', g: { maj: -3, op: -2, soc: -3 }, add: ['dissolution'],
        then: [['inst_legislatives', 1]],
        news: 'Dissolution annoncée avant le vote de la motion de censure.',
        out: 'Vous coupez court en remettant tout en jeu. Les pronostiqueurs s’emballent.',
      },
      {
        t: 'Sacrifier le Premier ministre pour éteindre la crise', g: { maj: 5, op: -4 }, f: { med: -4 },
        then: [['inst_remaniement', 1]],
        out: 'Matignon paie pour l’Élysée. C’est le contrat, il le savait.',
      },
    ],
  },

  {
    id: 'inst_censure_resultat', cat: 'inst', who: 'pm', direct: true,
    titre: 'Le décompte',
    quote: 'Deux cent quatre-vingt-neuf voix. Il en fallait deux cent quatre-vingt-neuf.',
    txt: 'Le gouvernement est censuré. Vous devez nommer, et vous n’avez pas de majorité nouvelle.',
    choices: [
      { t: 'Nommer un gouvernement technique', g: { maj: 6, op: -3, fin: 4 }, pm: 'Hélène Vasseur', add: ['gouv_technique'], f: { pat: 5 },
        out: 'Un gouvernement de techniciens pour passer le budget. La politique reprendra plus tard, ou pas.' },
      { t: 'Nommer un Premier ministre issu de l’opposition', g: { maj: 14, op: 2 }, s: { just: -2 }, add: ['cohabitation'], pm: 'Gilles Monteil',
        news: 'Cohabitation : le président nomme un Premier ministre issu de l’opposition.',
        out: 'Vous gardez la défense et la diplomatie. Vous perdez le reste. La Ve République prévoit ça.' },
      { t: 'Dissoudre', g: { maj: -2, soc: -3 }, add: ['dissolution'], then: [['inst_legislatives', 1]],
        out: 'Deuxième tentative devant les électeurs. Ils n’aiment pas être convoqués deux fois.' },
    ],
  },

  {
    id: 'inst_legislatives', cat: 'inst', who: 'com', direct: true,
    titre: 'Campagne des législatives',
    quote: 'Trois semaines. Un seul message. Tout le reste est du bruit.',
    txt: 'Vous dissolvez : il faut choisir l’axe de campagne. Le résultat décidera si vous gouvernez ' +
      'ou si vous inaugurez des chrysanthèmes pendant quatre ans.',
    choices: [
      { t: '« Le chaos ou nous »', d: 'Dramatiser le scrutin', special: 'legislatives', camp: 'peur', g: { op: 2 }, f: { med: -3 },
        out: 'La dramatisation mobilise votre socle et le camp d’en face à la fois.' },
      { t: '« Le bilan, rien que le bilan »', d: 'Assumer votre action', special: 'legislatives', camp: 'bilan', f: { med: 3 },
        out: 'Campagne honnête. Elle marche si le bilan est bon, et seulement dans ce cas.' },
      { t: '« Une nouvelle étape »', d: 'Promettre un cap différent', special: 'legislatives', camp: 'espoir', g: { op: 3 }, f: { jeu: 4 },
        out: 'Promettre du neuf après cinq ans au pouvoir : exercice difficile, parfois payant.' },
      { t: 'Alliance large avec le centre', d: 'Désistements réciproques', special: 'legislatives', camp: 'alliance', g: { maj: 4, op: -2 },
        out: 'Les appareils négocient 180 circonscriptions en six jours. Les militants détestent, ça marche.' },
    ],
  },

  {
    id: 'inst_referendum', cat: 'inst', who: 'sg', direct: true,
    titre: 'Le référendum',
    quote: 'La question décide du résultat. Et un référendum devient toujours un vote sur vous.',
    txt: 'Vous avez annoncé un référendum. Reste à écrire la question et à choisir la posture de campagne.',
    choices: [
      { t: 'Question simple et technique', d: 'Limiter le vote sanction', special: 'referendum', camp: 'technique', f: { med: 3 },
        out: 'Une question courte et claire. L’opposition parlera de vous quand même.' },
      { t: 'Question large, engagement personnel', d: 'Vous mettez votre mandat en jeu', special: 'referendum', camp: 'perso', g: { op: 4 }, f: { med: 5 },
        out: 'Dire « si vous votez non, je partirai » double la participation et le risque.' },
      { t: 'Coupler avec une mesure très populaire', d: 'Question à tiroirs', special: 'referendum', camp: 'tiroir', g: { op: 2 }, f: { med: -6 },
        out: 'Deux sujets dans une question : la presse appellera ça un piège, et elle aura raison.' },
    ],
  },

  {
    id: 'inst_scandale', cat: 'inst', who: 'com', w: 10, min: 5,
    titre: 'Un ministre dans la tourmente',
    quote: 'Facture de 68 000 euros de travaux dans son appartement de fonction. Et un marché passé sans appel d’offres.',
    txt: 'Le ministre est compétent, loyal, et indéfendable en l’état. Une enquête préliminaire est ouverte.',
    choices: [
      {
        t: 'Démission immédiate', g: { op: 4, maj: -4 }, f: { med: 8 }, add: ['ministre_demission'],
        news: 'Démission du ministre mis en cause. L’Élysée invoque « l’exemplarité ».',
        out: 'L’affaire s’éteint en quatre jours. Vous perdez un ministre qui travaillait.',
      },
      {
        t: 'Le maintenir jusqu’à l’enquête', g: { op: -6, maj: 2 }, f: { med: -8 }, then: [['inst_scandale_suite', 4]],
        out: 'La présomption d’innocence est un principe. Ce n’est pas une stratégie de communication.',
      },
      {
        t: 'Le déplacer dans un autre ministère', g: { op: -3 }, f: { med: -5 },
        out: 'Le remaniement latéral : personne n’est dupe, tout le monde fait semblant.',
      },
      {
        t: 'Saisir vous-même la justice et rendre les comptes publics', g: { op: 2, maj: -2 }, s: { just: 4 }, f: { med: 10 },
        add: ['transparence'],
        out: 'Transparence totale : la presse est désarmée. Vos ministres, eux, sont terrifiés.',
      },
    ],
  },

  {
    id: 'inst_scandale_suite', cat: 'inst', who: 'jus', direct: true,
    titre: 'Mise en examen',
    quote: 'Il est mis en examen ce matin. Les images de son arrivée au tribunal passent en boucle.',
    txt: 'Vous l’avez maintenu. Il faut maintenant trancher dans des conditions bien pires.',
    choices: [
      { t: 'Démission', g: { op: -3, maj: -3 }, f: { med: 3 }, add: ['ministre_demission'],
        out: 'La démission qui arrive trop tard coûte deux fois : le ministre et la crédibilité.' },
      { t: 'Le maintenir : la justice doit passer', g: { op: -8, maj: -4 }, f: { med: -10 },
        out: 'Vous tenez un principe. Les sondages mesureront le prix tous les quinze jours.' },
      { t: 'Règle générale : plus aucun ministre mis en examen ne reste', g: { op: 5 }, s: { just: 5 }, f: { med: 8 }, add: ['transparence'],
        out: 'Vous transformez une affaire en doctrine. Vos successeurs vous la devront.' },
    ],
  },

  {
    id: 'inst_sondage_bas', cat: 'inst', who: 'sond', w: 11, min: 8, once: false,
    req: (S) => S.g.op < 38,
    titre: 'Le plus bas niveau depuis 1958',
    quote: 'Vous êtes le président le moins populaire à ce stade du mandat depuis 1958. Techniquement, c’est un record.',
    txt: 'Deux écoles : se replier sur le régalien et le symbolique, ou tenter un geste économique massif. ' +
      'Les deux ont déjà été essayés, avec des résultats inverses selon les mandats.',
    choices: [
      {
        t: 'Grand geste redistributif', g: { fin: -9, op: 9, soc: 5 }, s: { just: 6, infl: 0.2 },
        f: { syn: 8, ret: 8, pat: -8 }, x: { eco: -10 },
        news: 'Chèque exceptionnel de 400 euros pour douze millions de ménages.',
        out: 'Neuf points gagnés, cinq milliards dépensés. Le ratio est connu et il n’est pas scandaleux.',
      },
      {
        t: 'Repli sur l’autorité et le régalien', g: { op: 5, soc: -5 }, s: { secu: 5, just: -3 },
        f: { ret: 10, rur: 8, jeu: -8 }, x: { aut: 14 },
        out: 'Le réflexe classique. Il marche sur une partie de l’électorat, et seulement celle-là.',
      },
      {
        t: 'Aller au contact : trois mois de terrain', g: { op: 6, soc: 4 }, f: { med: 6, rur: 8 },
        add: ['tour_de_france'],
        out: 'Quatre-vingts déplacements, zéro annonce. Et un président qui redevient physique.',
      },
      {
        t: 'Ne rien faire : gouverner, pas séduire', g: { op: -3, maj: -3 }, f: { med: 3 },
        out: 'Noble. À condition d’avoir un bilan qui parlera à votre place. Ce n’est pas garanti.',
      },
    ],
  },

  {
    id: 'inst_popularite_haute', cat: 'inst', who: 'com', w: 10, min: 6, once: false,
    req: (S) => S.g.op > 64,
    titre: 'Vous avez du capital politique',
    quote: 'Soixante-six pour cent. Ça ne durera pas. Dépensez-le avant qu’il ne fonde.',
    txt: 'Le moment rare où vous pouvez faire passer ce qui est impossible le reste du temps.',
    choices: [
      {
        t: 'Lancer la réforme la plus difficile maintenant', g: { op: -6, maj: 4 }, s: { comp: 4 },
        then: [['eco_retraites_comptes', 1]], f: { pat: 6 },
        out: 'Utiliser sa popularité pour la dépenser : c’est la définition même du courage politique.',
      },
      {
        t: 'Investir dans le long terme : école, recherche, santé', g: { fin: -8, op: 2 }, s: { serv: 7, comp: 5, just: 4 },
        f: { fon: 8, jeu: 6 }, add: ['investissement_avenir'],
        out: 'Les effets arriveront après 2035. Vous ne couperez aucun ruban. C’est très bien.',
      },
      {
        t: 'Verrouiller la majorité et préparer la suite', g: { maj: 10, op: -2 }, f: { med: -4 },
        out: 'Les appareils vous adorent. L’électorat sent très bien ce genre de calcul.',
      },
    ],
  },

  {
    id: 'inst_interview', cat: 'inst', who: 'com', w: 9, min: 4, once: false,
    titre: 'Grande interview, 20 heures',
    quote: 'Trente-cinq minutes. Deux journalistes. Ils ont tous les chiffres et ils vont parler de la dette.',
    txt: 'Huit millions de téléspectateurs. L’exercice peut faire gagner cinq points ou en perdre huit.',
    choices: [
      { t: 'Pédagogie : expliquer les arbitrages', g: { op: 3 }, f: { med: 6 }, out: 'Un peu long, un peu austère, globalement respecté. Vous gagnez en crédibilité.' },
      { t: 'Annoncer une mesure forte en direct', g: { op: 6, fin: -4, maj: -4 }, f: { med: -3 },
        out: 'Votre Premier ministre l’apprend en même temps que le pays. Il appelle pendant la pub.' },
      { t: 'Attaquer l’opposition et la presse', g: { op: -2 }, f: { med: -10, ret: 4 }, x: { aut: 8 },
        out: 'Le clash fait l’audience du lendemain et le sondage de la semaine suivante. Pas dans le bon sens.' },
      { t: 'Parler de vous, de votre fatigue, du pays', g: { op: 5, soc: 3 }, f: { med: 4 },
        out: 'L’authenticité, bien dosée, est l’arme la plus efficace et la plus difficile à simuler.' },
    ],
  },

  {
    id: 'inst_49_3', cat: 'inst', who: 'pm', w: 9, min: 10, once: false,
    req: (S) => S.g.maj < 45,
    titre: 'Un texte important est bloqué',
    quote: 'Six cents amendements d’obstruction. À ce rythme, le texte n’est pas voté avant l’été 2031.',
    txt: 'Le texte est utile et sans majorité. Vous avez trois outils, et chacun a un prix.',
    choices: [
      {
        t: 'Engager le 49.3', g: { maj: -7, soc: -6, op: -5 }, f: { med: -7, syn: -6 }, x: { aut: 14 },
        add: ['49_3_utilise'], then: [['inst_censure', 1]],
        out: 'Le texte est adopté. Une motion de censure sera déposée dans l’heure.',
      },
      {
        t: 'Négocier article par article', g: { maj: 4, fin: -3, op: 2 }, f: { med: 4 },
        out: 'Trois semaines de couloirs, un texte amputé de 30 %, et zéro crise. Le vrai parlementarisme.',
      },
      {
        t: 'Retirer le texte', g: { maj: -2, op: -4, soc: 3 }, f: { med: -3 },
        out: 'Un texte retiré est un texte mort. Il reviendra sous un autre nom dans deux ans.',
      },
      {
        t: 'Passer par ordonnance après une loi d’habilitation', g: { maj: -4, op: -3 }, s: { just: -4 }, f: { med: -6 }, x: { aut: 12 },
        out: 'Techniquement légal, politiquement coûteux : vous légiférez sans le Parlement.',
      },
    ],
  },

  {
    id: 'inst_senatoriales', cat: 'inst', who: 'sg', w: 8, min: 24, max: 40,
    titre: 'Élections sénatoriales',
    quote: 'Les grands électeurs sont des élus locaux. Et les élus locaux n’ont pas aimé la baisse des dotations.',
    txt: 'Un tiers du Sénat se renouvelle. Vous ne pouvez pas gagner, vous pouvez limiter la casse.',
    choices: [
      { t: 'Annoncer une hausse des dotations locales', g: { fin: -5, maj: 6 }, f: { rur: 10 }, add: ['dotations_hausse'],
        out: 'Les maires apprécient. Le Sénat vous censurera un peu moins souvent.' },
      { t: 'Recevoir tous les présidents de département', g: { maj: 3 }, f: { rur: 6, med: 2 },
        out: 'Quatre jours de rendez-vous. Ennuyeux, et plus efficace que n’importe quel discours.' },
      { t: 'Ignorer : le Sénat est perdu de toute façon', g: { maj: -5 }, f: { rur: -6 },
        out: 'Le Sénat vous rendra la monnaie à chaque révision constitutionnelle.' },
    ],
  },

  {
    id: 'inst_sante_pres', cat: 'inst', who: 'moi', w: 7, min: 20,
    titre: 'Vous ne dormez plus',
    quote: 'Quatre heures par nuit depuis des mois. Le médecin de l’Élysée est formel : ça se verra bientôt à l’image.',
    txt: 'Personne ne vous plaindra, et c’est normal. Mais les décisions mal prises à 2 h du matin ' +
      'coûtent des milliards.',
    choices: [
      { t: 'Réorganiser : déléguer davantage à Matignon', g: { maj: 4, op: 1, fin: 2 }, f: { med: 2 }, add: ['delegation'],
        out: 'Vous gouvernez moins et mieux. Votre entourage découvre que c’était possible.' },
      { t: 'Tenir, et ne rien dire', g: { op: -2 }, then: [['crise_malaise', 8]],
        out: 'Vous tenez. Le corps tient moins bien, et il a son propre calendrier.' },
      { t: 'Rendre public votre bulletin de santé', g: { op: 3 }, f: { med: 7 }, add: ['transparence_sante'],
        out: 'Transparence inhabituelle et saluée. Elle sera réclamée à tous vos successeurs.' },
    ],
  },

  {
    id: 'inst_opposant', cat: 'inst', who: 'sond', w: 8, min: 18,
    titre: 'Une figure d’opposition décolle',
    quote: 'Trente-huit pour cent d’intentions de vote au premier tour. Dans un pays où vous êtes à 31 %.',
    txt: 'Un adversaire structure le camp d’en face. Il sera votre interlocuteur pendant trois ans ' +
      'et peut-être votre successeur.',
    choices: [
      { t: 'L’affronter sur le fond, en débat public', g: { op: 4, maj: 2 }, f: { med: 7 },
        out: 'Vous le traitez comme un adversaire sérieux. Vous le crédibilisez et vous vous respectez.' },
      { t: 'L’ignorer totalement', g: { op: -3 }, f: { med: -3 },
        out: 'L’ignorer ne le fait pas disparaître. Ça le fait grandir sans contradiction.' },
      { t: 'Chercher à le diviser de son camp', g: { op: 1, maj: 3 }, f: { med: -6 }, s: { just: -2 },
        out: 'Les manœuvres finissent toujours par se savoir. Elles laissent une odeur.' },
      { t: 'Le nommer à une mission d’intérêt national', g: { op: 5, maj: -4 }, f: { med: 8 }, x: { aut: -6 },
        out: 'Manœuvre magistrale : soit il refuse et paraît partisan, soit il accepte et devient votre débiteur.' },
    ],
  },

  {
    id: 'crise_fuite_presse', cat: 'inst', who: 'com', direct: true,
    titre: 'Une fuite dans la presse',
    quote: 'Ils ont le document. En entier. Avec vos annotations manuscrites dans la marge.',
    txt: 'Le document révèle un arbitrage que vous avez publiquement démenti. La publication est prévue demain.',
    choices: [
      { t: 'Tout assumer publiquement avant la parution', g: { op: -4 }, f: { med: 8 }, s: { just: 3 },
        out: 'Prendre les devants retire à l’article sa raison d’être. Vieille technique, toujours valable.' },
      { t: 'Démentir', g: { op: 2 }, f: { med: -12 }, then: [['inst_fuite_2', 3]],
        out: 'Le démenti tiendra jusqu’à la publication du deuxième document. Il y a toujours un deuxième document.' },
      { t: 'Ouvrir une enquête interne sur la fuite', g: { op: -2, maj: 2 }, f: { med: -8, fon: -6 }, x: { aut: 10 },
        out: 'Chercher la source plutôt que répondre au fond : la presse en fera son titre de la semaine.' },
    ],
  },

  {
    id: 'inst_fuite_2', cat: 'inst', who: 'com', direct: true,
    titre: 'Le deuxième document',
    quote: 'Ils publient l’enregistrement. Treize minutes. On vous entend très bien.',
    txt: 'Votre démenti est contredit par votre propre voix. L’opposition demande une commission d’enquête.',
    choices: [
      { t: 'Reconnaître, s’expliquer longuement', g: { op: -6, maj: -3 }, f: { med: 5 }, s: { just: 2 },
        out: 'Six points perdus et la crise s’arrête là. C’était la sortie la moins chère.' },
      { t: 'Accepter la commission d’enquête', g: { op: -3, maj: -5 }, f: { med: 8 }, s: { just: 5 },
        out: 'Six mois d’auditions télévisées. Douloureux, et vous en sortirez lavé ou cuit.' },
      { t: 'Contre-attaquer sur les méthodes des journalistes', g: { op: -5 }, f: { med: -16, jeu: -5 }, x: { aut: 12 },
        out: 'Vous transformez une affaire en conflit avec la presse. Elle a plus de temps que vous.' },
    ],
  },

  {
    id: 'inst_conseil', cat: 'inst', who: 'pm', w: 6, once: false, min: 8,
    titre: 'Conseil des ministres de rentrée',
    quote: 'Tout le monde veut une mesure dans son portefeuille. Et il n’y a de l’argent que pour une.',
    txt: 'Trois ministres défendent trois priorités. Celle que vous choisissez devient la séquence du trimestre.',
    choices: [
      { t: 'La séquence pouvoir d’achat', g: { op: 4, fin: -4 }, s: { just: 3 }, f: { syn: 4, ret: 5 }, out: 'Le pouvoir d’achat gagne toujours les séquences. Et coûte toujours cher.' },
      { t: 'La séquence sécurité du quotidien', g: { op: 3 }, s: { secu: 4 }, f: { ret: 6, rur: 5 }, x: { aut: 8 }, out: 'Sujet inépuisable, résultats lents, bénéfice immédiat.' },
      { t: 'La séquence industrie et emploi', g: { op: 2, fin: -3 }, s: { comp: 5, chom: -0.1 }, f: { pat: 7 }, out: 'Trois usines inaugurées en six semaines. Les images sont excellentes.' },
      { t: 'La séquence école', g: { op: 2, fin: -3 }, s: { serv: 5 }, f: { fon: 6, jeu: 4 }, out: 'L’école ne fait pas gagner d’élection. Elle fait gagner des générations.' },
    ],
  }

);
