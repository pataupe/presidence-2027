# Présidence 2027

**▶ Jouer : https://pataupe.github.io/presidence-2027/**

Simulateur politique en une page. Vous êtes président de la République de juin 2027 à mai 2032 :
soixante mois, une décision par mois, cinq jauges qui peuvent toutes vous faire tomber,
un budget de l'État à arbitrer cinq fois, deux élections intermédiaires, puis la présidentielle.

## Lancer le jeu

Ouvrir `index.html` dans un navigateur. Ou, pour servir le dossier :

```bash
python -m http.server 8137
```

La configuration `.claude/launch.json` fait la même chose depuis Claude Code (`preview_start`).

## Comment c'est construit

| Fichier | Rôle |
| --- | --- |
| `js/state.js` | État de la partie, modèle macroéconomique mensuel, tirage des cartes, sauvegarde |
| `js/content/programs.js` | Les 5 programmes de départ, leurs promesses, les conseillers, les Premiers ministres |
| `js/content/cards-*.js` | Les cartes de décision par domaine (éco, social, régalien, écologie, Europe, institutions) |
| `js/content/chains.js` | Les grandes réformes à étapes (retraites, institutions, grande consultation) |
| `js/content/crises.js` | Crises aléatoires et crises terminales (jauge à zéro) |
| `js/budget.js` | Le projet de loi de finances : recettes, enveloppe, six postes de dépense |
| `js/elections.js` | Européennes, municipales, législatives, référendum, présidentielle |
| `js/endings.js` | Fins de mandat, portrait politique, revue de presse, score /1000 |
| `js/ui.js` | Rendu (tableau de bord, note de décision, scrutins, bilan) |
| `js/main.js` | Boucle de jeu et événements |

Zéro dépendance, zéro build. Les polices viennent de Google Fonts, tout le reste est local.

## Ajouter une carte

Dans n'importe quel `js/content/cards-*.js` :

```js
P.CARDS.push({
  id: 'eco_ma_carte',          // unique
  cat: 'eco',                  // eco | soc | reg | ecol | eur | pol | inst | crise
  who: 'eco',                  // clé dans P.ADVISORS
  w: 10,                       // poids de tirage
  min: 6, max: 40,             // fenêtre en mois (facultatif)
  not: ['retraites_votee'],    // drapeaux interdits (facultatif)
  req: (S) => S.s.chom > 9,    // condition libre (facultatif)
  titre: 'Le titre de la note',
  quote: 'Ce que dit le conseiller.',
  txt: 'Le briefing : les faits, les chiffres, l’arbitrage.',
  choices: [
    {
      t: 'Le choix',
      d: 'Précision facultative',
      g: { op: 5, fin: -4 },         // jauges : op, maj, soc, fin, eur
      s: { chom: -0.2, dette: 1 },   // indicateurs : croi chom infl dette serv just secu vert comp
      f: { syn: 8, pat: -6 },        // forces : pat syn ret jeu rur fon med
      x: { eco: -10 },               // axes idéologiques : eco aut ecol ue
      add: ['mon_drapeau'],          // drapeaux posés
      then: [['autre_carte', 6]],    // carte déclenchée dans 6 mois
      news: 'La dépêche qui tombe.',
      out: 'La conséquence, affichée après le choix.',
    },
  ],
});
```

Une carte `direct: true` n'est jamais tirée au hasard : elle n'arrive que par un `then`.

## Équilibrage

```bash
node tools/sim.js . 500
```

Le harnais charge le moteur sans navigateur, vérifie le contenu (identifiants en double, clés
d'effet inconnues, cartes `then` introuvables, promesses impossibles à tenir) puis simule des
centaines de mandats avec des choix aléatoires. Sur 500 mandats : score moyen 430/1000, 3 % de
mandats « entrés dans l'histoire », 17 % interrompus avant terme. Avec des choix aléatoires, un
mandat doit majoritairement mal finir : c'est le réglage recherché.
