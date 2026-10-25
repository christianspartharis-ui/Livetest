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

  /* 2. Abdunkelung und Video-Ebenen (Schwarz im Video wird unsichtbar) */
  var st = document.createElement('style');
  st.textContent =
    '#gfxDim{position:fixed;inset:0;z-index:254;background:rgba(5,5,25,.6);opacity:0;transition:opacity .4s;pointer-events:none}' +
    '#gfxDim.on{opacity:1}' +
    '.gfxV{position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:255;mix-blend-mode:screen;opacity:0;pointer-events:none;transition:opacity .3s}' +
    '.gfxV.on{opacity:1}';
  document.head.appendChild(st);

  var dim = document.createElement('div');
  dim.id = 'gfxDim';
  document.body.appendChild(dim);

  var vids = {};
  FX.forEach(function (f) {
    var v = document.createElement('video');
    v.className = 'gfxV';
    v.src = f.src;
    v.preload = 'none';
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    document.body.appendChild(v);
    vids[f.src] = v;
  });

  /* Videos erst beim Live-Start laden, damit der Feed schnell bleibt */
  function warm() {
    Object.keys(vids).forEach(function (k) {
      var v = vids[k];
      if (v.preload !== 'auto') { v.preload = 'auto'; v.load(); }
    });
  }
  var oldLive = window.launchCleanLiveStream;
  if (typeof oldLive === 'function') {
    window.launchCleanLiveStream = function () {
      warm();
      return oldLive.apply(this, arguments);
    };
  }

  /* 3. Abspielen mit Warteschlange (mehrere Geschenke nacheinander) */
  var busy = false, q = [];
  function run() {
    if (busy || !q.length) return;
    busy = true;
    var it = q.shift(), v = vids[it.f.src], done = false, tm;
    function end(bad) {
      if (done) return;
      done = true;
      clearTimeout(tm);
      v.onended = v.onerror = null;
      try { v.pause(); } catch (e) {}
      v.classList.remove('on');
      dim.classList.remove('on');
      if (bad) { try { fx(it.emo, it.name); } catch (e) {} }
      busy = false;
      setTimeout(run, 300);
    }
    tm = setTimeout(function () { end(false); }, 10000);
    v.onended = function () { end(false); };
    v.onerror = function () { end(true); };
    dim.classList.add('on');
    v.classList.add('on');
    try { v.currentTime = 0; } catch (e) {}
    v.muted = false;
    var p = v.play();
    if (p && p.catch) {
      p.catch(function () {
        v.muted = true;
        var p2 = v.play();
        if (p2 && p2.catch) p2.catch(function () { end(true); });
      });
    }
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
