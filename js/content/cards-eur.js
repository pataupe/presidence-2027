/* ================== EUROPE, DIPLOMATIE, DÉFENSE EXTÉRIEURE =============== */
'use strict';

P.CARDS.push(

  {
    id: 'eur_sommet', cat: 'eur', who: 'ue', w: 11, min: 2,
    titre: 'Premier Conseil européen',
    quote: 'Vous avez douze minutes de parole et un rapport de force à établir. Les vingt-six vous jaugent.',
    txt: 'Trois dossiers sur la table : la dette commune pour la défense, les règles budgétaires, ' +
      'et la politique commerciale. Vous ne pouvez pas gagner sur les trois.',
    choices: [
      {
        t: 'Tout miser sur la dette commune de défense', g: { eur: 10, fin: 4 }, s: { secu: 5, comp: 3 },
        f: { pat: 5, med: 4 }, x: { ue: 16 }, add: ['ue_relancee', 'defense_europeenne'],
        news: 'La France obtient l’ouverture de négociations sur un emprunt commun pour la défense.',
        out: 'Vous repartez avec un mandat de négociation. C’est peu, et c’est beaucoup : le reste suivra.',
      },
      {
        t: 'Obtenir de la souplesse budgétaire', g: { eur: 3, fin: 8 }, f: { fon: 4, syn: 3 }, x: { ue: 6 },
        out: 'Vous avez échangé votre capital politique contre 0,4 point de déficit. Bercy vous embrasse.',
      },
      {
        t: 'Exiger la préférence européenne dans les marchés publics', g: { eur: -2 }, s: { comp: 7 },
        f: { pat: 10, rur: 6 }, x: { ue: 4 }, add: ['preference_europeenne'],
        news: 'Un acte de préférence européenne dans les marchés publics est mis à l’agenda.',
        out: 'Les industriels français vous doivent une fière chandelle. Quatre pays du Nord bloquent déjà.',
      },
      {
        t: 'Poser un rapport de force frontal', g: { eur: -10, op: 6 }, f: { rur: 8, med: -4 }, x: { ue: -18 },
        news: 'Passe d’armes au Conseil européen : la France menace de bloquer le budget.',
        out: 'Les images sont excellentes pour vous en France. Vous venez de vous isoler pour dix-huit mois.',
      },
    ],
  },

  {
    id: 'eur_asile', cat: 'eur', who: 'ext', direct: true,
    titre: 'Le pacte asile européen',
    quote: 'Solidarité obligatoire ou contribution financière. Six pays refusent les deux. Il faut un compromis en quarante-huit heures.',
    txt: 'Vous avez promis de traiter la question au niveau européen. Le moment est arrivé, ' +
      'et le compromis possible est très en-dessous de vos annonces.',
    choices: [
      { t: 'Signer le compromis, même imparfait', g: { eur: 9, op: -3 }, s: { secu: 3 }, f: { med: 3, rur: -6 }, x: { ue: 14 }, add: ['pacte_asile'],
        out: 'L’Europe avance de trois centimètres. C’est trois centimètres de plus qu’en vingt ans.' },
      { t: 'Bloquer pour obtenir des quotas contraignants', g: { eur: -6, op: 3 }, f: { rur: 6 }, x: { ue: -8 },
        out: 'Vous bloquez au nom d’un idéal. Le résultat est : rien, pendant deux ans de plus.' },
      { t: 'Accord bilatéral avec les pays de première entrée', g: { eur: 2, fin: -3 }, s: { secu: 4 }, f: { rur: 4 },
        out: 'Vous payez pour que le problème reste au sud. Ça fonctionne, et ça se sait.' },
    ],
  },

  {
    id: 'eur_plateformes', cat: 'eur', who: 'ext', direct: true,
    titre: 'Bras de fer avec les plateformes',
    quote: 'Elles menacent de couper un service pour les utilisateurs français. Et un allié parle de rétorsions commerciales.',
    txt: 'Votre loi sur les mineurs est appliquée. Deux plateformes refusent la vérification d’âge ' +
      'et portent l’affaire devant la justice européenne.',
    choices: [
      { t: 'Tenir, amendes journalières et portage européen', g: { eur: 4, op: 6 }, s: { secu: 3 }, f: { ret: 8, med: 4, jeu: -6 }, x: { ue: 10, aut: 10 },
        news: 'La France inflige des amendes journalières et obtient le soutien de six États membres.',
        out: 'Les plateformes cèdent au bout de onze semaines. L’Europe découvre qu’elle peut gagner.' },
      { t: 'Suspendre l’application le temps du contentieux', g: { op: -4, eur: 2 }, f: { ret: -8, jeu: 4 },
        out: 'La loi existe et ne s’applique pas. Le pire état possible pour une loi.' },
      { t: 'Négocier un accord technique discret', g: { op: 1, eur: 2 }, s: { secu: 2 }, f: { med: -3 },
        out: 'Un accord qui marche à 70 % sans communiqué. Les parents ne sauront pas que vous avez gagné.' },
    ],
  },

  {
    id: 'eur_minorite_blocage', cat: 'eur', who: 'ext', direct: true,
    titre: 'La minorité de blocage',
    quote: 'Nous avons trois pays. Il en faut quatre, et le quatrième veut quelque chose en échange.',
    txt: 'Un partenaire accepte de rejoindre votre coalition si vous soutenez sa candidature à un grand poste européen.',
    choices: [
      { t: 'Accepter le marché', g: { eur: 4, op: 4 }, f: { rur: 8 }, x: { ue: 6 }, add: ['mercosur_bloque'],
        out: 'L’accord est bloqué. Vous venez de dépenser une faveur majeure : il n’en reste pas beaucoup.' },
      { t: 'Refuser le marchandage', g: { eur: 3, op: -4 }, f: { rur: -8, med: 4 },
        out: 'Vous gardez votre crédit et perdez le vote. Les deux comptent, pas au même moment.' },
      { t: 'Faire fuiter la demande dans la presse', g: { eur: -8, op: 3 }, f: { med: 6 },
        out: 'La manœuvre est révélée, le partenaire humilié. Il siégera à vos côtés pendant encore sept ans.' },
    ],
  },

  {
    id: 'eur_conflit_est', cat: 'crise', who: 'gen', w: 10, min: 4,
    titre: 'Escalade à l’est de l’Europe',
    quote: 'Nos alliés demandent un engagement matériel supplémentaire. Nos stocks ne le permettent pas sans arbitrage.',
    txt: 'Le conflit s’intensifie. Les alliés attendent la France sur les munitions, la défense sol-air ' +
      'et éventuellement une présence de formation.',
    choices: [
      {
        t: 'Effort militaire majeur et économie de guerre', g: { fin: -10, eur: 12, op: -3 }, s: { secu: 7, comp: 5 },
        f: { pat: 8, med: 5, jeu: -5 }, x: { ue: 12 }, add: ['economie_guerre', 'armee_renforcee'],
        news: 'La France passe ses industries d’armement en production accélérée.',
        out: 'Vous devenez un pilier de l’alliance. Et vous décalez trois plans sociaux à cause du budget.',
      },
      {
        t: 'Soutien politique, engagement matériel limité', g: { eur: 2, fin: -3 }, s: { secu: 2 },
        out: 'La position médiane : personne ne vous reproche rien, personne ne vous doit rien.',
      },
      {
        t: 'Pousser une initiative diplomatique française', g: { eur: 4, op: 5 }, f: { med: 6 }, x: { ue: 4 },
        then: [['eur_negociation', 6]],
        news: 'La France propose un format de négociation. Trois capitales saluent, deux s’agacent.',
        out: 'La diplomatie française dans son élément : une initiative, beaucoup d’attention, un résultat incertain.',
      },
      {
        t: 'Refuser tout engagement supplémentaire', g: { eur: -12, op: 6 }, s: { secu: -3 },
        f: { rur: 8, med: -5 }, x: { ue: -16 },
        out: 'Soixante pour cent des Français approuvent. Vos alliés révisent leur plan en cas de crise.',
      },
    ],
  },

  {
    id: 'eur_negociation', cat: 'eur', who: 'ext', direct: true,
    titre: 'Votre initiative diplomatique prend',
    quote: 'Les deux parties acceptent de se parler à Genève. Si ça marche, c’est historique. Si ça échoue, c’est vous.',
    txt: 'Vous avez une fenêtre de trois semaines et aucune garantie.',
    choices: [
      { t: 'Y aller personnellement', g: { eur: 8, op: 7 }, f: { med: 8 }, add: ['sommet_geneve'], then: [['eur_geneve_resultat', 4]],
        out: 'Vous jouez votre stature sur un pari. C’est exactement pour ça qu’on fait ce métier.' },
      { t: 'Envoyer votre ministre', g: { eur: 4, op: 2 }, out: 'Prudent. Si ça réussit, le mérite sera partagé ; si ça échoue, le coût aussi.' },
      { t: 'Laisser les grandes puissances s’en charger', g: { eur: -5, op: -2 }, x: { ue: -6 },
        out: 'La France se retire du jeu. Elle y reviendra avec moins de cartes.' },
    ],
  },

  {
    id: 'eur_geneve_resultat', cat: 'eur', who: 'ext', direct: true,
    titre: 'Genève : le résultat',
    quote: 'Un cessez-le-feu partiel et un mécanisme de vérification. Ce n’est pas la paix. C’est la première chose qui marche depuis des années.',
    txt: 'Le texte est fragile, contesté sur les deux rives, et porte votre nom.',
    choices: [
      { t: 'L’assumer pleinement, conférence de presse mondiale', g: { op: 12, eur: 10 }, f: { med: 10 }, add: ['accord_geneve'],
        news: 'Accord de Genève : cessez-le-feu partiel obtenu sous médiation française.',
        out: 'Le moment le plus haut de votre mandat. Il tiendra ce qu’il tiendra, mais il a eu lieu.' },
      { t: 'Rester prudent sur l’annonce', g: { op: 6, eur: 8 }, f: { med: 5 }, add: ['accord_geneve'],
        out: 'La prudence protège de la rechute. Et vous prive de la photo du siècle.' },
    ],
  },

  {
    id: 'eur_douane', cat: 'eur', who: 'eco', w: 9, min: 6,
    titre: 'Droits de douane de notre premier allié',
    quote: 'Vingt-cinq pour cent sur l’acier, l’automobile et le luxe. Quatorze milliards d’exportations françaises touchées.',
    txt: 'Riposter est légitime et coûteux : la moitié de nos entreprises exportatrices dépendent aussi ' +
      'de composants importés de ce pays.',
    choices: [
      {
        t: 'Riposte européenne coordonnée et ciblée', g: { eur: 8, op: 5 }, s: { comp: -2, infl: 0.3 },
        f: { pat: 2, rur: 6 }, x: { ue: 12 }, add: ['guerre_commerciale'],
        news: 'L’Union riposte sur une liste ciblée. Les négociations reprennent trois semaines plus tard.',
        out: 'La coordination a marché : l’escalade s’arrête à la deuxième salve. Le commerce mondial a vieilli d’un an.',
      },
      {
        t: 'Négocier des exemptions sectorielles', g: { eur: -2, fin: 1 }, s: { comp: 2 }, f: { pat: 8 },
        out: 'Vous sauvez le luxe et l’aéronautique. L’acier et l’agro restent sur le carreau.',
      },
      {
        t: 'Soutenir les secteurs touchés par la dépense publique', g: { fin: -6, op: 4 }, s: { comp: 1, chom: -0.1 }, f: { pat: 6, syn: 6 },
        out: 'Six milliards pour amortir un choc extérieur. C’est le rôle de l’État, et ça se voit dans le déficit.',
      },
    ],
  },

  {
    id: 'eur_sahel', cat: 'eur', who: 'ext', w: 8, min: 8,
    titre: 'Ressortissants à évacuer',
    quote: 'Un coup d’État, 3 200 Français sur place, un aéroport fermé et une junte qui ne répond plus.',
    txt: 'Une opération d’évacuation est prête. Elle est risquée, visible, et peut dégénérer.',
    choices: [
      {
        t: 'Lancer l’évacuation militaire', g: { eur: 4, op: 6 }, s: { secu: 3 }, f: { med: 6, ret: 6 },
        news: 'Opération d’évacuation réussie : 3 200 ressortissants rapatriés en quatre jours.',
        out: 'Réussite nette, saluée partout. Si un avion avait été touché, on parlerait d’autre chose.',
      },
      { t: 'Négocier un couloir avec les nouvelles autorités', g: { eur: 2, op: 2 }, x: { ue: 2 },
        out: 'Lent, humiliant, efficace. Trois semaines, zéro blessé, zéro photo.' },
      { t: 'Coordonner une opération européenne', g: { eur: 7, op: 3 }, x: { ue: 12 }, add: ['defense_europeenne'],
        out: 'Première évacuation européenne conjointe. Un précédent qui vaut un traité.' },
    ],
  },

  {
    id: 'eur_elargissement', cat: 'eur', who: 'ue', w: 7, min: 14,
    titre: 'Élargissement de l’Union',
    quote: 'Trois candidats, 60 millions d’habitants, et une politique agricole commune qui ne tiendra pas le choc.',
    txt: 'L’élargissement est un engagement géopolitique majeur. Il bouleverse les aides agricoles ' +
      'et les règles de vote.',
    choices: [
      {
        t: 'Oui, à condition de réformer le vote et la PAC d’abord', g: { eur: 6 }, f: { rur: 6, pat: 2 }, x: { ue: 10 },
        out: 'Position française classique et solide : oui, mais après les réformes. Donc dans quinze ans.',
      },
      { t: 'Oui sans conditions, c’est géopolitique', g: { eur: 10, op: -4 }, f: { rur: -12 }, x: { ue: 18 },
        out: 'Historiquement courageux. Les agriculteurs français calculent déjà ce qu’ils vont perdre.' },
      { t: 'Non, l’Union doit d’abord s’approfondir', g: { eur: -8, op: 3 }, f: { rur: 8 }, x: { ue: -10 },
        out: 'Vous bloquez une promesse faite par vingt-sept chefs d’État. On s’en souviendra.' },
    ],
  },

  {
    id: 'eur_euro_num', cat: 'eur', who: 'tres', w: 7, min: 16,
    titre: 'L’euro numérique',
    quote: 'La banque centrale veut le lancer. Les banques françaises y sont hostiles. Les citoyens n’en ont pas entendu parler.',
    txt: 'Un moyen de paiement public, souverain, et une inquiétude réelle sur la traçabilité des paiements.',
    choices: [
      { t: 'Soutenir, avec une garantie d’anonymat sous un seuil', g: { eur: 6, op: 2 }, s: { comp: 4 }, f: { pat: -4, jeu: 4 }, x: { ue: 10 },
        out: 'Souveraineté des paiements plus respect de la vie privée : la seule version acceptable.' },
      { t: 'Soutenir sans réserve', g: { eur: 7 }, s: { comp: 3 }, f: { jeu: -5, med: -4 }, x: { ue: 12, aut: 8 },
        out: 'Les associations de libertés publiques publient une tribune sévère. Elles n’ont pas tort.' },
      { t: 'Bloquer au nom du secteur bancaire', g: { eur: -5 }, s: { comp: -2 }, f: { pat: 8 }, x: { ue: -8 },
        out: 'Vous protégez trois banques contre une infrastructure publique. Assumez-le, c’est un choix.' },
    ],
  },

  {
    id: 'eur_g7', cat: 'eur', who: 'ext', w: 7, min: 10, once: false,
    titre: 'Sommet international',
    quote: 'Trois jours, douze bilatérales, une photo de famille et un communiqué final déjà écrit.',
    txt: 'Le genre de séquence qui ne change rien et où tout se joue dans les marges.',
    choices: [
      { t: 'Porter une initiative sur la dette des pays pauvres', g: { eur: 6, op: 2 }, f: { med: 5, jeu: 5 }, x: { ue: 6 },
        out: 'Vous obtenez un paragraphe et un groupe de travail. En diplomatie, c’est une victoire.' },
      { t: 'Négocier des contrats pour l’industrie française', g: { eur: 1 }, s: { comp: 5 }, f: { pat: 10 },
        out: 'Quatre milliards de contrats signés dans l’avion du retour. Zéro ligne dans la presse.' },
      { t: 'Soigner la relation bilatérale la plus difficile', g: { eur: 5 }, x: { ue: 2 },
        out: 'Deux heures en tête à tête valent parfois dix sommets. Vous le saurez dans un an.' },
    ],
  },

  {
    id: 'eur_francophonie', cat: 'eur', who: 'ext', w: 6, min: 12,
    titre: 'Relation avec le continent africain',
    quote: 'Notre image s’est effondrée dans six pays. Nos entreprises perdent des marchés qu’elles tenaient depuis soixante ans.',
    txt: 'Une refondation est possible : visas, mémoire, investissements, et moins de présence militaire.',
    choices: [
      {
        t: 'Refondation complète : visas, mémoire, partenariats', g: { eur: 6, op: -3 }, s: { comp: 3 },
        f: { jeu: 8, med: 5, ret: -8, rur: -5 }, x: { ue: 4 }, add: ['refondation_afrique'],
        news: 'Nouvelle doctrine africaine : visas facilités, restitutions, retrait militaire achevé.',
        out: 'Vous prenez un risque politique intérieur pour une relation de trente ans. Rare, et probablement juste.',
      },
      { t: 'Approche économique seulement', g: { eur: 2 }, s: { comp: 4 }, f: { pat: 8 },
        out: 'Le commerce sans le politique : ça marche jusqu’au prochain coup d’État.' },
      { t: 'Maintenir le statu quo', g: { eur: -4 }, s: { comp: -3 }, f: { med: -3 },
        out: 'Le statu quo n’est pas stable : il se dégrade, lentement, et on vous le dira dans trois ans.' },
    ],
  }

);
