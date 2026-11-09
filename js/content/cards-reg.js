/* ============ RÉGALIEN : SÉCURITÉ, JUSTICE, IMMIGRATION, DÉFENSE ========= */
'use strict';

P.CARDS.push(

  {
    id: 'reg_narco', cat: 'reg', who: 'int', w: 13, min: 2,
    titre: 'Narcotrafic : une ville demande l’armée',
    quote: 'Quatorze règlements de comptes en six semaines, dont un enfant de onze ans. Le maire réclame l’armée. Les militaires n’en veulent pas.',
    txt: 'Les points de deal rapportent 3 milliards par an dans le pays. Les saisies record n’y changent rien : ' +
      'la demande est stable et les réseaux recrutent à 14 ans.',
    choices: [
      {
        t: 'Opération massive : 4 000 policiers, 6 mois', g: { op: 8, soc: -3 }, s: { secu: 8, just: -2 },
        f: { ret: 12, rur: 8, jeu: -6, med: 4 }, x: { aut: 14 }, add: ['operation_narco'], then: [['reg_narco_bilan', 8]],
        news: 'Opération d’envergure contre le narcotrafic : 4 000 policiers déployés, 1 200 interpellations.',
        out: 'Les points de deal ferment. Trois semaines après le départ des renforts, ils rouvrent.',
      },
      {
        t: 'Parquet national anti-stupéfiants et saisie des avoirs', g: { op: 4, fin: 2 }, s: { secu: 7, just: 4 },
        f: { med: 6, ret: 5 }, add: ['pnast'],
        news: 'Création d’un parquet national anti-stupéfiants doté de 200 magistrats.',
        out: 'Moins spectaculaire, plus efficace : on frappe la trésorerie. Les résultats en deux ans.',
      },
      {
        t: 'Légaliser et encadrer le cannabis', d: '2,8 milliards de recettes, le marché noir amputé',
        g: { op: -4, fin: 6, soc: 2, maj: -6 }, s: { secu: 4, just: 3 },
        f: { jeu: 12, ret: -14, med: 5 }, x: { aut: -18 }, add: ['cannabis_legal'],
        news: 'Légalisation encadrée du cannabis : monopole de distribution et fiscalité dédiée.',
        out: 'Vous divisez le pays, y compris votre camp. Et vous retirez un tiers du chiffre d’affaires aux réseaux.',
      },
      {
        t: 'Plan social et éducatif dans les quartiers concernés', g: { fin: -5, op: -2 }, s: { just: 6, secu: 2 },
        f: { jeu: 8, ret: -6 }, add: ['plan_quartiers'],
        out: 'La seule approche qui marche à dix ans, et la seule que personne ne voit à six mois.',
      },
    ],
  },

  {
    id: 'reg_narco_bilan', cat: 'reg', who: 'pref', direct: true,
    titre: 'Bilan de l’opération',
    quote: 'Mille deux cents interpellations, 90 % de petits revendeurs. Les têtes de réseau sont à Dubaï.',
    txt: 'Les prisons sont à 150 % d’occupation, les mineurs incarcérés ont doublé, et le trafic s’est déplacé de trois kilomètres.',
    choices: [
      { t: 'Cibler l’international et le blanchiment', g: { eur: 4 }, s: { secu: 6, just: 4 }, f: { med: 5 }, add: ['pnast'],
        out: 'Vous visez enfin le haut du réseau. Il faut des coopérations judiciaires et dix ans.' },
      { t: 'Construire 15 000 places de prison', g: { fin: -6, op: 4 }, s: { secu: 4 }, f: { ret: 10, jeu: -5 }, x: { aut: 12 }, add: ['prisons_plan'],
        out: 'Les places arriveront en 2034. D’ici là, 150 % d’occupation et des condamnations non exécutées.' },
      { t: 'Communiquer sur les 1 200 interpellations', g: { op: 3 }, f: { med: -7 },
        out: 'Le chiffre est vrai. Les journalistes ont déjà le détail par catégorie d’infraction.' },
    ],
  },

  {
    id: 'reg_immigration', cat: 'reg', who: 'int', w: 13, min: 4,
    titre: 'La loi immigration, encore',
    quote: 'Nous avons 125 000 demandes d’asile en attente, 14 mois de délai moyen, et 7 % des obligations de quitter le territoire exécutées.',
    txt: 'Le sujet structure le débat politique depuis vingt ans. Tous les blocs réclament une loi, ' +
      'avec des contenus exactement opposés.',
    choices: [
      {
        t: 'Loi ferme : délais réduits, expulsions facilitées, quotas', g: { op: 7, soc: -6, eur: -6, maj: 4 },
        s: { secu: 5, just: -5, comp: -2 }, f: { ret: 14, rur: 14, jeu: -10, med: -6 },
        x: { aut: 20, ue: -12 }, add: ['immigration_loi_dure'], then: [['reg_conseil_constit', 3]],
        news: 'Loi immigration adoptée : quotas par métier, délais d’asile ramenés à six mois, rétention allongée.',
        out: 'Soixante-huit pour cent d’approbation. Et le Conseil constitutionnel qui s’apprête à lire le texte.',
      },
      {
        t: 'Loi d’efficacité : trancher vite, régulariser le travail', g: { op: 2, soc: 2, eur: 4 },
        s: { comp: 4, just: 4, secu: 2 }, f: { pat: 8, syn: 4, rur: -6, ret: -6 },
        add: ['immigration_loi_souple'],
        news: 'Asile tranché en six mois, régularisation par le travail dans les métiers en tension.',
        out: 'La solution des économistes et des employeurs. Elle n’a jamais gagné une élection.',
      },
      {
        t: 'Porter le sujet au niveau européen', g: { eur: 8, op: -3 }, s: { secu: 2 }, f: { med: 3, rur: -6 }, x: { ue: 16 },
        then: [['eur_asile', 6]],
        out: 'Vous avez raison : les frontières sont européennes. Vous avez aussi vingt-six partenaires et quatre ans.',
      },
      {
        t: 'Ne pas légiférer. Appliquer le droit existant.', g: { op: -6, maj: -4 }, s: { secu: -2 },
        f: { ret: -10, rur: -10, med: -4 },
        out: 'Position défendable, inaudible. Le sujet revient dans six mois avec un fait divers.',
      },
    ],
  },

  {
    id: 'reg_conseil_constit', cat: 'inst', who: 'jus', direct: true,
    titre: 'Le Conseil constitutionnel censure',
    quote: 'Quatorze articles sur trente-huit censurés, dont les quotas. « Cavaliers législatifs » et « atteinte disproportionnée ».',
    txt: 'Le cœur de votre loi vient d’être supprimé par neuf personnes nommées. Votre majorité est furieuse, ' +
      'vos juristes ne sont pas surpris.',
    choices: [
      {
        t: 'Respecter la décision et réécrire proprement', g: { eur: 5, maj: -5, op: -4 }, s: { just: 4 }, f: { med: 5 }, x: { aut: -6 },
        out: 'L’État de droit, c’est aussi perdre. Vous le dites, et 54 % des Français ne comprennent pas.',
      },
      {
        t: 'Proposer un référendum pour passer au-dessus', g: { op: 8, eur: -8, maj: -6 }, f: { rur: 12, med: -8 },
        x: { aut: 16, ue: -10 }, then: [['inst_referendum', 2]],
        news: 'Le président annonce un référendum pour contourner la censure constitutionnelle.',
        out: 'Constitutionnellement acrobatique, politiquement puissant. Vous ouvrez une crise de régime possible.',
      },
      {
        t: 'Attaquer publiquement le Conseil', g: { op: 4, eur: -6, maj: 2 }, s: { just: -6 }, f: { med: -10, jeu: -6 }, x: { aut: 14 },
        out: 'Vous gagnez une semaine de popularité contre une institution. Elle, elle reste neuf ans.',
      },
    ],
  },

  {
    id: 'reg_police', cat: 'reg', who: 'int', w: 11,
    titre: 'Police : le contrat',
    quote: 'Les syndicats veulent des moyens et moins de contrôle. Les associations veulent plus de contrôle. Les deux ont des arguments et des avocats.',
    txt: 'Après plusieurs affaires, la confiance est au plus bas chez les jeunes des quartiers populaires, ' +
      'tandis que les policiers signalent un malaise profond et des suicides en hausse.',
    choices: [
      {
        t: '10 000 policiers de plus et équipements', g: { fin: -6, op: 6, soc: -2 }, s: { secu: 9 },
        f: { ret: 10, rur: 10, jeu: -6 }, x: { aut: 12 }, add: ['police_renforcee'],
        news: 'Dix mille recrutements dans la police et la gendarmerie sur cinq ans.',
        out: 'Les syndicats de police vous soutiennent publiquement. C’est rare, et ça se paie à gauche.',
      },
      {
        t: 'Autorité de contrôle indépendante', g: { op: 2, soc: 4, eur: 4 }, s: { just: 7, secu: -2 },
        f: { jeu: 12, med: 8, ret: -8 }, x: { aut: -16 }, add: ['police_controle'],
        news: 'Création d’une autorité indépendante de contrôle des forces de l’ordre.',
        out: 'Les associations saluent. Deux syndicats de police appellent à « la grève du zèle ».',
      },
      {
        t: 'Police de proximité dans 300 quartiers', g: { fin: -5, op: 4, soc: 3 }, s: { secu: 6, just: 5 },
        f: { jeu: 6, ret: 4, rur: 5 }, add: ['police_proximite'],
        out: 'La mesure que tous les rapports recommandent depuis 2003. Elle demande dix ans de constance.',
      },
      {
        t: 'Les deux : moyens et contrôle', g: { fin: -7, op: 3, soc: 1 }, s: { secu: 7, just: 5 },
        f: { ret: 4, jeu: 4, med: 4 }, add: ['police_renforcee', 'police_controle'],
        out: 'Tenir les deux bouts coûte cher et ne plaît qu’à ceux qui ne manifestent jamais.',
      },
    ],
  },

  {
    id: 'reg_prisons', cat: 'reg', who: 'jus', w: 9, min: 8,
    titre: 'Les prisons débordent',
    quote: '82 000 détenus pour 62 000 places. La France a été condamnée quatre fois pour ses conditions de détention.',
    txt: 'Construire coûte 400 000 euros par place et prend huit ans. Les peines alternatives sont efficaces ' +
      'sur la récidive et politiquement indéfendables après un fait divers.',
    choices: [
      {
        t: '15 000 places nouvelles', g: { fin: -7, op: 5 }, s: { secu: 5, just: 2 }, f: { ret: 10, rur: 6 }, x: { aut: 10 }, add: ['prisons_plan'],
        news: 'Programme immobilier pénitentiaire : 15 000 places et trois établissements pour courtes peines.',
        out: 'Huit ans de travaux. Trois ministres de la Justice couperont le ruban, pas vous.',
      },
      {
        t: 'Développer les peines alternatives et le bracelet', g: { fin: 3, op: -5 }, s: { just: 6, secu: -3 },
        f: { med: 4, ret: -10 }, x: { aut: -12 },
        out: 'Moins de récidive, selon toutes les études. Et un titre de presse dévastateur au premier incident.',
      },
      {
        t: 'Les deux, avec une loi pénale cohérente', g: { fin: -5, op: 1 }, s: { secu: 3, just: 5 }, f: { med: 5 },
        out: 'La seule réponse sérieuse. Elle ne tient pas dans un slogan, donc elle ne sera pas entendue.',
      },
    ],
  },

  {
    id: 'reg_attentat', cat: 'crise', who: 'int', w: 7, min: 8,
    titre: 'Attentat',
    quote: 'Sept morts, dix-neuf blessés. L’auteur était connu des services, signalé, et jamais interpellé faute de base légale.',
    txt: 'Le pays est sous le choc. La demande de réaction est immédiate et massive. Tout ce que vous direz ' +
      'dans les 48 heures vous suivra pendant cinq ans.',
    choices: [
      {
        t: 'Unité nationale, hommage, justice sans surenchère', g: { op: 10, soc: 5, eur: 4 }, s: { secu: 2, just: 4 },
        f: { med: 8, ret: 5, jeu: 5 }, add: ['unite_nationale'],
        news: 'Le président appelle à l’unité et refuse « toute loi d’émotion ».',
        out: 'Dix points de popularité et une stature. Ils fondront si rien ne suit.',
      },
      {
        t: 'Loi antiterroriste d’urgence', g: { op: 7, eur: -5, soc: -4 }, s: { secu: 8, just: -7 },
        f: { ret: 12, rur: 10, jeu: -8, med: -5 }, x: { aut: 22 }, add: ['loi_antiterro'],
        news: 'Loi antiterroriste : rétention de sûreté, surveillance administrative élargie.',
        out: 'Votée en huit jours à une écrasante majorité. Censurée pour un tiers dans six mois.',
      },
      {
        t: 'État d’urgence pour trois mois', g: { op: 6, soc: -8, eur: -8 }, s: { secu: 7, just: -9 },
        f: { ret: 12, jeu: -12, med: -8 }, x: { aut: 26 }, add: ['etat_urgence'], then: [['reg_urgence_sortie', 4]],
        news: 'État d’urgence déclaré sur l’ensemble du territoire.',
        out: 'L’état d’urgence est facile à déclarer. Personne n’a jamais réussi à en sortir vite.',
      },
      {
        t: 'Renforcer massivement les services de renseignement', g: { fin: -5, op: 5 }, s: { secu: 9 }, f: { med: 4, ret: 6 },
        add: ['renseignement_plan'],
        out: 'La réponse des professionnels : discrète, efficace, invisible dans les sondages.',
      },
    ],
  },

  {
    id: 'reg_urgence_sortie', cat: 'reg', who: 'jus', direct: true,
    titre: 'Sortir de l’état d’urgence',
    quote: 'Il expire dans trois semaines. Le proroger est facile. Le lever demande du courage et une loi.',
    txt: 'Les juristes alertent sur la banalisation des mesures administratives. L’opinion, elle, est à 71 % ' +
      'pour la prorogation.',
    choices: [
      { t: 'Lever et transposer le minimum nécessaire dans le droit commun', g: { eur: 7, soc: 5, op: -4 }, s: { just: 5, secu: -2 }, f: { med: 7, jeu: 6 }, x: { aut: -10 }, del: ['etat_urgence'],
        out: 'Vous rendez ses libertés au pays contre son avis du moment. C’est une définition de l’État de droit.' },
      { t: 'Proroger six mois', g: { op: 4, soc: -4, eur: -4 }, s: { secu: 3, just: -5 }, f: { ret: 8, jeu: -8 }, x: { aut: 12 },
        out: 'La deuxième prorogation est toujours plus facile que la première. C’est le problème.' },
      { t: 'Inscrire les mesures d’exception dans la loi permanente', g: { op: 3, eur: -8, soc: -5 }, s: { secu: 6, just: -10 }, f: { med: -10, jeu: -10 }, x: { aut: 20 }, del: ['etat_urgence'],
        out: 'L’exception devient la règle. Techniquement, l’état d’urgence est levé. Techniquement.' },
    ],
  },

  {
    id: 'reg_laicite', cat: 'reg', who: 'edu', w: 9, min: 6,
    titre: 'Laïcité à l’école',
    quote: 'Les signalements d’atteintes à la laïcité ont doublé. Les chefs d’établissement demandent une règle claire, pas un débat.',
    txt: 'Deux approches : une règle nationale stricte et uniforme, ou la confiance aux équipes avec un appui juridique.',
    choices: [
      {
        t: 'Règle nationale stricte et uniforme', g: { op: 6, soc: -4, maj: 3 }, s: { secu: 3, just: -3 },
        f: { ret: 10, rur: 8, jeu: -6 }, x: { aut: 14 }, add: ['laicite_loi'],
        news: 'Circulaire nationale : règles uniformes sur les tenues et les contestations d’enseignement.',
        out: 'Les chefs d’établissement ont enfin un texte à montrer. Les contentieux arrivent le mois suivant.',
      },
      {
        t: 'Appui juridique et équipes mobiles de soutien', g: { op: 2, soc: 2 }, s: { serv: 4, just: 3 }, f: { fon: 8, med: 4 },
        out: 'Les professeurs se sentent soutenus pour la première fois depuis longtemps. Zéro titre de presse.',
      },
      {
        t: 'Former 400 000 enseignants à la laïcité', g: { fin: -2, op: 1 }, s: { serv: 3 }, f: { fon: 5, syn: 4 },
        out: 'Trois jours de formation ne régleront pas un conflit de société. Ils aident quand même.',
      },
    ],
  },

  {
    id: 'reg_defense', cat: 'reg', who: 'def', w: 11, min: 3,
    titre: 'L’effort de défense',
    quote: 'Nos stocks de munitions tiennent trois semaines de conflit de haute intensité. Trois semaines, monsieur le Président.',
    txt: 'Les alliés demandent 3 % du PIB. Chaque demi-point, c’est 14 milliards par an, soit l’équivalent ' +
      'du budget de la justice.',
    choices: [
      {
        t: 'Porter l’effort à 3 % du PIB', g: { fin: -12, eur: 12, op: 2 }, s: { secu: 8, comp: 4 },
        f: { pat: 8, med: 4, syn: -6, fon: -4 }, add: ['defense_effort', 'armee_renforcee'],
        news: 'L’effort de défense portera à 3 % du PIB d’ici 2032. Les industriels embauchent.',
        out: 'Les alliés vous respectent, l’industrie recrute, et quatorze milliards manquent ailleurs chaque année.',
      },
      {
        t: 'Mutualiser en européen : achats et stocks communs', g: { fin: -5, eur: 10 }, s: { secu: 5, comp: 3 },
        f: { pat: 4 }, x: { ue: 16 }, add: ['defense_europeenne'],
        news: 'La France obtient un programme d’achats communs de munitions au niveau européen.',
        out: 'Moins cher, plus lent, plus solide. Et la première vraie brique d’une défense européenne.',
      },
      {
        t: 'Maintenir la trajectoire actuelle', g: { eur: -6, fin: 3 }, s: { secu: -2 }, f: { med: -3 },
        out: 'Nos partenaires notent. Ils le rappelleront au prochain sommet, et au suivant.',
      },
      {
        t: 'Rétablir un service national de six mois', g: { fin: -8, op: 7, soc: -3 }, s: { secu: 4, just: 2 },
        f: { ret: 14, rur: 10, jeu: -14 }, x: { aut: 16 }, add: ['service_national'],
        news: 'Service national de six mois rétabli pour toute une génération.',
        out: 'Populaire chez ceux qui ne le feront pas. Il faut 40 000 encadrants et 900 casernes : vous en avez 200.',
      },
    ],
  },

  {
    id: 'reg_cyber', cat: 'crise', who: 'int', w: 8, min: 6,
    titre: 'Cyberattaque sur les hôpitaux',
    quote: 'Vingt-trois établissements paralysés. Les dossiers patients sont chiffrés. Rançon demandée : 40 millions en cryptomonnaie.',
    txt: 'Les blocs opératoires fonctionnent au papier et au crayon. Les attaquants sont hébergés dans un pays non coopératif.',
    choices: [
      {
        t: 'Ne rien payer, mobiliser l’État et reconstruire', g: { fin: -5, op: 4, eur: 3 }, s: { secu: 4, serv: -3 },
        f: { med: 6, fon: 4 }, add: ['cyber_plan'],
        news: 'L’État refuse de payer et débloque 400 millions pour la cybersécurité hospitalière.',
        out: 'Trois semaines de chaos, aucune rançon versée, et une doctrine claire. C’était la bonne réponse.',
      },
      {
        t: 'Riposte offensive assumée', g: { eur: -4, op: 5 }, s: { secu: 5 }, f: { med: 3 }, x: { aut: 12 },
        out: 'Vous annoncez une riposte. Les services la faisaient déjà sans l’annoncer, et c’était mieux.',
      },
      {
        t: 'Payer discrètement pour rétablir les soins', g: { op: -3, eur: -5 }, s: { serv: 3, secu: -5 }, f: { med: -8 },
        then: [['crise_fuite_presse', 4]],
        out: 'Les dossiers sont rendus. Le jour où la presse l’apprendra, ce sera ingérable.',
      },
    ],
  },

  {
    id: 'reg_outremer', cat: 'reg', who: 'int', w: 9, min: 5,
    titre: 'Crise dans un territoire d’outre-mer',
    quote: 'La vie y coûte 40 % plus cher, le chômage des jeunes atteint 45 %, et l’eau est coupée un jour sur trois.',
    txt: 'Un mouvement contre la vie chère bloque le port et l’aéroport. Trois nuits d’émeutes, un mort.',
    choices: [
      {
        t: 'Plan d’urgence : prix encadrés, eau, emploi des jeunes', g: { fin: -6, op: 4, soc: 5 }, s: { just: 7, serv: 5 },
        f: { jeu: 8, syn: 6, med: 5 }, add: ['plan_outremer'],
        news: 'Plan d’urgence outre-mer : encadrement des prix alimentaires et 2 milliards pour l’eau.',
        out: 'Les blocages lèvent. Le fond du problème — un marché tenu par cinq groupes — reste entier.',
      },
      {
        t: 'Casser les monopoles d’import', g: { op: 5, fin: 1 }, s: { just: 8, comp: 2 }, f: { pat: -12, jeu: 8 }, x: { eco: -12 },
        news: 'Enquête et démantèlement des monopoles d’importation outre-mer.',
        out: 'Vous touchez enfin la cause. Cinq familles très puissantes ouvrent un contentieux de dix ans.',
      },
      {
        t: 'Rétablir l’ordre d’abord, négocier ensuite', g: { soc: -8, op: 1 }, s: { secu: 4, just: -5 }, f: { ret: 6, jeu: -10 }, x: { aut: 14 },
        out: 'L’ordre revient en dix jours. Le ressentiment reste trente ans.',
      },
      {
        t: 'Ouvrir un processus d’autonomie renforcée', g: { op: -3, maj: -5, soc: 4 }, s: { just: 4 }, f: { med: 4, ret: -8 }, x: { aut: -14 },
        out: 'Décision historique et risquée. Vous ouvrez un débat institutionnel que vous ne contrôlerez pas.',
      },
    ],
  },

  {
    id: 'reg_justice_moyens', cat: 'reg', who: 'jus', w: 9,
    titre: 'La justice à bout',
    quote: 'Onze magistrats pour 100 000 habitants. La moyenne européenne est à vingt-deux. Les délais civils atteignent quatorze mois.',
    txt: 'Doubler le budget de la justice coûte 5 milliards par an. C’est aussi le seul moyen de rendre ' +
      'crédibles toutes vos lois pénales.',
    choices: [
      {
        t: 'Doubler le budget sur cinq ans', g: { fin: -7, op: 4, eur: 4 }, s: { just: 9, secu: 6, serv: 5 },
        f: { fon: 10, med: 6 }, add: ['justice_plan'],
        news: 'Budget de la justice doublé : 5 000 magistrats et 8 000 greffiers recrutés.',
        out: 'La réforme la moins visible et la plus structurante possible. Les délais baissent dès la deuxième année.',
      },
      { t: 'Déjudiciariser les petits litiges', g: { fin: 2, op: 1 }, s: { just: 3, serv: 2 }, f: { med: 2 },
        out: 'Efficace et modeste. Les avocats protestent, la justice respire un peu.' },
      { t: 'Durcir les peines sans ajouter de moyens', g: { op: 4 }, s: { secu: 1, just: -7 }, f: { ret: 8, med: -6 }, x: { aut: 12 },
        out: 'Des peines plus lourdes et moins exécutées : l’illusion pénale dans sa forme la plus pure.' },
    ],
  },

  {
    id: 'reg_fait_divers', cat: 'reg', who: 'com', w: 10, min: 7, once: false,
    titre: 'Un fait divers devient national',
    quote: 'Chaînes d’info en continu depuis dix-huit heures. Trois de vos députés demandent une loi. Le garde des Sceaux dit que la loi existe déjà.',
    txt: 'Un drame terrible, un auteur déjà condamné, un dispositif qui n’a pas fonctionné. ' +
      'La demande de réponse politique est immédiate.',
    choices: [
      {
        t: 'Refuser la loi d’émotion, auditer le dispositif', g: { op: -3, maj: -3 }, s: { just: 5, secu: 3 }, f: { med: 6 }, x: { aut: -6 },
        out: 'Vous avez raison. Vous paraissez froid. Les deux resteront dans les mémoires.',
      },
      {
        t: 'Annoncer une loi dans les 48 heures', g: { op: 6, maj: 4 }, s: { just: -5, secu: 2 }, f: { ret: 8, med: -4 }, x: { aut: 14 },
        then: [['reg_loi_emotion_suite', 6]],
        out: 'Six points gagnés en trois jours. Un texte bancal voté dans un mois.',
      },
      {
        t: 'Recevoir la famille, sans annonce', g: { op: 3, soc: 2 }, f: { med: 5 },
        out: 'Geste juste, humain, et qui ne coûte rien que du temps. Rare combinaison.',
      },
    ],
  },

  {
    id: 'reg_loi_emotion_suite', cat: 'inst', who: 'jus', direct: true,
    titre: 'La loi votée dans l’émotion pose problème',
    quote: 'Le texte est inapplicable sur trois points et déjà contesté. Les magistrats l’appellent « la loi de février ».',
    txt: 'Ce que vous avez promis en 48 heures occupe maintenant quatre services juridiques.',
    choices: [
      { t: 'Corriger discrètement par décret', g: { op: -1 }, s: { just: 2 }, f: { med: -3 }, out: 'Le rattrapage administratif : efficace, et un jour documenté par un journaliste patient.' },
      { t: 'Assumer et réécrire publiquement', g: { op: -4, maj: -3 }, s: { just: 5 }, f: { med: 7 }, out: 'Reconnaître une erreur législative coûte quatre points et achète une crédibilité durable.' },
      { t: 'Ne rien faire, ça passera', g: { op: 1 }, s: { just: -5 }, f: { med: -5 }, out: 'Ça ne passe jamais. Ça revient en question prioritaire de constitutionnalité.' },
    ],
  },

  {
    id: 'reg_frontieres', cat: 'reg', who: 'int', w: 8, min: 10, prog: ['souv', 'centre', 'liberal'],
    titre: 'Rétablir les contrôles aux frontières',
    quote: 'Nous pouvons le faire six mois, renouvelables, en invoquant une menace. Au-delà, c’est un contentieux européen.',
    txt: 'Les contrôles fixes coûtent 1 500 agents et ralentissent 400 000 passages quotidiens de travailleurs frontaliers.',
    choices: [
      {
        t: 'Contrôles permanents assumés', g: { op: 7, eur: -12, fin: -4 }, s: { secu: 5, comp: -4 },
        f: { rur: 12, ret: 10, pat: -8, med: -4 }, x: { aut: 16, ue: -22 }, add: ['frontieres_nationales'],
        news: 'La France rétablit des contrôles permanents à ses frontières terrestres.',
        out: 'Symbole puissant. Les bouchons de camions à la frontière deviennent un sujet hebdomadaire.',
      },
      { t: 'Contrôles mobiles ciblés par le renseignement', g: { op: 3, eur: -2 }, s: { secu: 5 }, f: { rur: 6 }, x: { aut: 8 },
        out: 'Plus efficace, moins visible. Les interpellations augmentent de 30 % sans bloquer l’économie.' },
      { t: 'Renforcer l’agence européenne des frontières', g: { eur: 8, op: -2 }, s: { secu: 3 }, x: { ue: 14 },
        out: 'Vous financez un dispositif que vous ne commandez pas. C’est l’Europe, exactement.' },
    ],
  },

  {
    id: 'reg_fillerreg', cat: 'reg', who: 'pref', w: 6, once: false, min: 14,
    titre: 'Note blanche sur votre bureau',
    quote: 'Rien d’urgent. Juste une tendance que les préfets signalent tous, dans tous les départements.',
    txt: 'Montée des incivilités, baisse de la confiance, élus locaux agressés. Aucun fait spectaculaire, ' +
      'juste une érosion continue.',
    choices: [
      { t: 'Protéger les élus locaux : statut et accompagnement juridique', g: { op: 3 }, s: { secu: 3, serv: 2 }, f: { rur: 8, med: 2 },
        out: 'Deux mille maires ont démissionné depuis 2020. Vous venez de freiner la série.' },
      { t: 'Campagne nationale sur le civisme', g: { fin: -1, op: 1 }, f: { med: -2 }, out: 'Les campagnes de civisme sont le degré zéro de l’action publique. Elles ne font pas de mal.' },
      { t: 'Classer la note', g: { }, s: { secu: -2 }, out: 'La note est classée. La tendance continue, et vous la retrouverez dans une urne.' },
    ],
  }

);
