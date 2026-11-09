/* ========================== BOUCLE DE JEU ============================== */
'use strict';

(function () {
  let S = null;            // état de la partie
  let card = null;         // carte affichée
  let pending = null;      // écran spécial à jouer après la décision
  let onSuite = null;      // que faire quand on clique « Continuer »
  let bud = null;          // arbitrage budgétaire en cours
  let lastPres = null;

  /* ------------------------------------------------------------- index --- */
  P.CARDS.forEach((c) => { P.byId[c.id] = c; });

  /* --------------------------------------------------------- démarrage --- */
  function boot(data) {
    const save = (data && data.S) || P.load();
    UI.renderHome(save);
    UI.screen('home');
    if (data && data.S && data.resume) { S = data.S; resume(); }
  }

  function startGame(prog, proms) {
    S = P.newGame(prog, proms);
    P.save(S);
    UI.screen('game');
    UI.renderTop(S); UI.renderPanels(S);
    step();
  }

  function resume() {
    UI.screen('game');
    UI.renderTop(S); UI.renderPanels(S);
    step();
  }

  /* ----------------------------------------------------------- le mois --- */
  function step() {
    const z = P.checkZero(S);
    if (z === 'over') return gameOver();
    if (z) UI.renderPanels(S);

    if (S.flags.demission_parole) { S.over = 'demission_parole'; return gameOver(); }

    if (P.BUDGET_MONTHS.indexOf(S.t) >= 0 && !S.flags['bud' + S.t]) {
      S.flags['bud' + S.t] = true;
      return openBudget();
    }
    if (S.t === P.EUROPEENNES && !S.flags.eur_done) {
      S.flags.eur_done = true;
      return showElection(P.electionIntermediaire(S, 'eur'));
    }
    if (S.t === P.MUNICIPALES && !S.flags.mun_done) {
      S.flags.mun_done = true;
      return showElection(P.electionIntermediaire(S, 'mun'));
    }
    card = P.draw(S);
    if (!card) return advance();
    onSuite = next;
    UI.renderCard(S, card);
  }

  function choose(i) {
    if (!card || !card.choices[i]) return;
    const ch = card.choices[i];
    S.seen[card.id] = true;
    S.decisions++;
    if (card.cat === 'crise') S.lastCrisis = S.t;
    S.lastCats.push(card.cat);
    if (S.lastCats.length > 2) S.lastCats.shift();

    const deltas = P.apply(S, ch, { cat: card.cat });
    const axe = P.coherence(S, ch);
    S.log.push({ t: S.t, q: card.titre, r: ch.t });
    if (ch.special) pending = { kind: ch.special, camp: ch.camp };

    const flash = {};
    deltas.forEach((d) => { if (d.type === 'g') flash['g' + d.k] = true; });
    UI.renderResult(S, card, ch, deltas, axe);
    UI.renderTop(S); UI.renderPanels(S, flash);
    card = null;
    onSuite = next;
    P.save(S);
  }

  function next() {
    if (pending) {
      const p = pending; pending = null;
      if (p.kind === 'legislatives') return showElection(P.legislatives(S, p.camp));
      if (p.kind === 'referendum') return showElection(P.referendum(S, p.camp));
    }
    advance();
  }

  function advance() {
    S.t++;
    if (S.t >= P.TOTAL) {
      S.t = P.TOTAL;
      P.save(S);
      UI.renderTop(S);
      onSuite = null;
      return UI.renderFinaleQuestion(S);
    }
    P.tick(S);
    P.save(S);
    UI.renderTop(S); UI.renderPanels(S);
    step();
  }

  /* ---------------------------------------------------------- scrutins --- */
  function showElection(res) {
    onSuite = next;
    UI.renderElection(S, res);
    UI.renderTop(S); UI.renderPanels(S);
    P.save(S);
  }

  /* ----------------------------------------------------------- budget --- */
  function openBudget() {
    bud = { recette: 'stable', alloc: {}, total: 0 };
    P.POSTES.forEach((p) => { bud.alloc[p.k] = P.POSTE_REF; });
    bud.total = P.POSTE_REF * P.POSTES.length;
    onSuite = null;
    UI.renderBudget(S, bud);
  }

  function budgetDone() {
    const res = P.budgetApply(S, bud.recette, bud.alloc);
    onSuite = next;
    UI.renderBudgetResult(S, res);
    UI.renderTop(S); UI.renderPanels(S);
    P.save(S);
  }

  /* -------------------------------------------------------------- fins --- */
  function gameOver() {
    P.save(S);
    const fin = P.FINS[S.over] || P.FINS.demission_forcee;
    onSuite = () => showBilan(null);
    UI.renderFin(S, fin);
    UI.renderTop(S); UI.renderPanels(S);
  }

  function presidentielle(kind) {
    const pres = P.presidentielle(S, kind);
    lastPres = pres;
    if (pres.renonce) return showBilan(pres);
    pres.deltas = [];
    if (pres.elimine) {
      pres.verdict = pres.verdict + ' Le second tour se jouera sans vous, entre deux adversaires ' +
        'dont vous avez combattu les programmes pendant cinq ans.';
    } else if (pres.gagne) {
      pres.verdict = 'Réélu avec ' + pres.t2[0].pct.toFixed(1).replace('.', ',') +
        ' % des voix face au ' + pres.adversaire.n.toLowerCase() + '. Cinq années de plus, ' +
        'avec le bilan des cinq premières sur le dos.';
    } else {
      pres.verdict = 'Battu avec ' + pres.t2[0].pct.toFixed(1).replace('.', ',') +
        ' % des voix. Vous quittez l’Élysée en mai, après avoir reçu votre successeur pendant quarante minutes.';
    }
    onSuite = () => showBilan(pres);
    UI.renderElection(S, pres);
  }

  function showBilan(pres) {
    const b = P.bilan(S, pres);
    const txt = P.partageTexte(S, b, pres);
    const pr = P.PROGRAMS.find((p) => p.id === S.prog);
    P.addPalmares({ etiq: pr ? pr.etiq : '', rang: b.rang, score: b.score });
    P.clearSave();
    onSuite = null;
    UI.renderBilan(S, b, pres, txt);
    UI.renderTop(S); UI.renderPanels(S);
  }

  /* ------------------------------------------------------- événements --- */
  document.addEventListener('click', (e) => {
    const t = e.target.closest('button, [data-prog], [data-prom], [data-rec], [data-fin]');
    if (!t) return;

    if (t.id === 'home-start' || t.id === 'again') {
      UI.screen('setup'); UI.renderSetup(); return;
    }
    if (t.id === 'home-resume') {
      S = P.load(); if (S) resume(); return;
    }
    if (t.id === 'home-back' || t.id === 'setup-back') { UI.renderHome(P.load()); UI.screen('home'); return; }
    if (t.dataset.prog) { UI.setupPickProg(t.dataset.prog); return; }
    if (t.dataset.prom) { UI.setupPickProm(t.dataset.prom); return; }
    if (t.id === 'setup-go') { const v = UI.setupValues(); startGame(v.prog, v.proms); return; }
    if (t.classList.contains('ch') && t.dataset.i != null) { choose(+t.dataset.i); return; }
    if (t.id === 'suite') { if (onSuite) onSuite(); return; }
    if (t.dataset.rec) { bud.recette = t.dataset.rec; UI.renderBudget(S, bud); return; }
    if (t.id === 'bud-go') { budgetDone(); return; }
    if (t.dataset.fin) { presidentielle(t.dataset.fin); return; }
    if (t.id === 'theme' || t.id === 'theme2') {
      const cur = document.documentElement.getAttribute('data-theme');
      const dark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', dark ? 'light' : 'dark');
      try { localStorage.setItem('presidence2027.theme', dark ? 'light' : 'dark'); } catch (err) { }
      return;
    }
    if (t.id === 'restart') {
      if (t.dataset.sure) { P.clearSave(); UI.renderHome(null); UI.screen('home'); }
      else { t.dataset.sure = '1'; t.textContent = 'Confirmer l’abandon'; }
      return;
    }
    if (t.id === 'copy') {
      const txt = $('share-txt').textContent;
      try {
        navigator.clipboard.writeText(txt).then(() => {
          $('copy-ok').hidden = false;
        }, () => select($('share-txt')));
      } catch (err) { select($('share-txt')); }
      return;
    }
  });

  function select(el) {
    try {
      const r = document.createRange(); r.selectNodeContents(el);
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    } catch (e) { }
  }

  document.addEventListener('input', (e) => {
    const k = e.target.dataset && e.target.dataset.k;
    if (!k || !bud) return;
    bud.alloc[k] = +e.target.value;
    let tot = 0; P.POSTES.forEach((p) => { tot += bud.alloc[p.k]; });
    bud.total = tot;
    const lab = document.querySelector('[data-v="' + k + '"]');
    if (lab) lab.textContent = bud.alloc[k] + ' pts';
    UI.budgetBar(S, bud);
  });

  document.addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^[1-9]$/.test(e.key)) {
      const btn = document.querySelector('.ch[data-i="' + (+e.key - 1) + '"]') ||
        document.querySelector('.ch[data-fin]:nth-of-type(' + e.key + ')');
      if (btn) { e.preventDefault(); btn.click(); }
      return;
    }
    if (e.key === 'Enter' || e.key === ' ') {
      const s = $('suite');
      if (s && document.activeElement !== s && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) {
        e.preventDefault(); s.click();
      }
    }
  });

  /* --------------------------------------- thème mémorisé + hot reload --- */
  try {
    const th = localStorage.getItem('presidence2027.theme');
    if (th) document.documentElement.setAttribute('data-theme', th);
  } catch (e) { }

  if (window.claude && window.claude.hot) {
    window.claude.hot.snapshot(() => ({ S: S, resume: !!(S && !S.over && S.t < P.TOTAL) }));
  }
  if (window.claude && window.claude.hot && window.claude.hot.ready) {
    window.claude.hot.ready(boot);
  } else {
    boot((window.claude && window.claude.hot && window.claude.hot.data) || {});
  }
})();
