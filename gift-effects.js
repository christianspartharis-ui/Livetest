/* VYBE Geschenk-Effekte (Zeus ab 4.000, Sportwagen ab 7.500 Coins)
   Einbinden: <script src="gift-effects.js"></script> direkt vor </body>
   Videos zeus.mp4 und auto.mp4 liegen im selben Ordner wie die HTML-Datei. */
(function () {
  var FX = [
    { min: 7500, src: 'auto.mp4' },
    { min: 4000, src: 'zeus.mp4' }
  ];

  /* 1. Neue Geschenke in die Liste eintragen */
  try {
    if (!CFG.gifts.some(function (g) { return g[1] === 4000; })) {
      CFG.gifts.push(['⚡ Zeus', 4000, '⚡'], ['🏎️ Sportwagen', 7500, '🏎️']);
    }
    EN_MAP.push(['Sportwagen', 'Sports Car']);
  } catch (e) { return; }

  /* 2. Abdunkelung und EIN gemeinsames Video (Schwarz im Video wird unsichtbar) */
  var st = document.createElement('style');
  st.textContent =
    '#gfxDim{position:fixed;inset:0;z-index:254;background:rgba(5,5,25,.6);opacity:0;transition:opacity .4s;pointer-events:none}' +
    '#gfxDim.on{opacity:1}' +
    '.gfxV{display:none;position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:255;mix-blend-mode:screen;pointer-events:none}' +
    '.gfxV.on{display:block;animation:gfxIn .3s}' +
    '@keyframes gfxIn{from{opacity:0}to{opacity:1}}';
  document.head.appendChild(st);

  var dim = document.createElement('div');
  dim.id = 'gfxDim';
  document.body.appendChild(dim);

  var vid = document.createElement('video');
  vid.className = 'gfxV';
  vid.preload = 'auto';
  vid.playsInline = true;
  vid.setAttribute('playsinline', '');
  document.body.appendChild(vid);

  /* Videos beim Live-Start schon in den Zwischenspeicher laden */
  var warmed = false;
  function warm() {
    if (warmed) return;
    warmed = true;
    FX.forEach(function (f) {
      try { fetch(f.src, { cache: 'force-cache' }).catch(function () {}); } catch (e) {}
    });
  }
  var oldLive = window.launchCleanLiveStream;
  if (typeof oldLive === 'function') {
    window.launchCleanLiveStream = function () {
      warm();
      return oldLive.apply(this, arguments);
    };
  }

  /* 3. Abspielen mit Warteschlange. Nach jedem Video wird der Player
        komplett freigegeben, damit das zweite Geschenk nicht hängt. */
  var busy = false, q = [];
  function release() {
    vid.onended = vid.onerror = null;
    try { vid.pause(); } catch (e) {}
    vid.removeAttribute('src');
    try { vid.load(); } catch (e) {}
    vid.classList.remove('on');
    dim.classList.remove('on');
  }
  function run() {
    if (busy || !q.length) return;
    busy = true;
    var it = q.shift(), done = false, last = -1, still = 0, ticks = 0, tm;
    function end(bad) {
      if (done) return;
      done = true;
      clearInterval(tm);
      release();
      if (bad) { try { fx(it.emo, it.name); } catch (e) {} }
      busy = false;
      setTimeout(run, 400);
    }
    vid.onended = function () { end(false); };
    vid.onerror = function () { end(true); };
    dim.classList.add('on');
    vid.src = it.f.src;
    vid.classList.add('on');
    vid.muted = false;
    var p = vid.play();
    if (p && p.catch) {
      p.catch(function () {
        if (done) return;
        vid.muted = true;
        var p2 = vid.play();
        if (p2 && p2.catch) p2.catch(function () { end(true); });
      });
    }
    /* Wächter: bleibt das Bild stehen, wird der Effekt sauber beendet */
    tm = setInterval(function () {
      ticks++;
      var t = vid.currentTime || 0;
      if (t > last + 0.01) { last = t; still = 0; } else { still++; }
      if (still >= (last < 0 ? 16 : 6) || ticks > 30) end(last < 0);
    }, 500);
  }

  /* 4. Geschenk senden: kleine Geschenke wie bisher, große mit Video */
  var oldSend = window.sendGift;
  window.sendGift = function (name, cost, emo) {
    var f = FX.find(function (x) { return cost >= x.min; });
    if (!f) return oldSend.apply(this, arguments);
    if (state.coins < cost) { toast('⚠️ ' + cost + ' 🪙!'); return; }
    state.coins -= cost;
    addGiftToLiveChest(cost);
    appendLiveChatRow('🎁', state.liveHostLabel, state.mLvl,
      L('hat', 'sent') + ' <strong>' + name + ' ' + emo + '</strong>');
    showEl('liveGiftModal', false);
    toast('🎁 ' + name + ' · ' + cost.toLocaleString('de-DE') + ' 🪙');
    addMXp(cost);
    q.push({ f: f, emo: emo, name: name });
    run();
  };

  /* 5. Geschenk-Liste neu zeichnen, damit Zeus und Sportwagen erscheinen */
  try { initStaticUI(); } catch (e) {}
})();
