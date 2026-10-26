/* VYBE Geschenke: Bild-Symbole für 1–20 Coins, Zeus ab 4.000, Sportwagen ab 7.500 Coins
   Einbinden: <script src="gift-effects.js"></script> direkt vor </body>
   Videos zeus.mp4 und auto.mp4 liegen im selben Ordner wie die HTML-Datei. */
(function () {
  var FX = [
    { min: 7500, src: 'auto.mp4' },
    { min: 4000, src: 'zeus.mp4' }
  ];

  /* 1. Neue Geschenke und Bild-Symbole (Schlüssel = Emoji des Geschenks) */
  var ICONS = {
    '🌹': '<svg viewBox="0 0 64 64"><path d="M32 36V60" stroke="#2f9e44" stroke-width="4" stroke-linecap="round"/><path d="M32 53c8-2 12-8 12-8s-8-1-12 8z" fill="#37b24d"/><path d="M32 47c-7-1-11-6-11-6s7-2 11 6z" fill="#2f9e44"/><circle cx="32" cy="22" r="15" fill="#e03131"/><path d="M32 10c-8 2-10 12-3 15 5 2 9-2 8-6-1-3-5-3-5 0" fill="none" stroke="#a61e4d" stroke-width="3" stroke-linecap="round"/><path d="M20 20c0-5 4-9 9-10" fill="none" stroke="#ff8787" stroke-width="3" stroke-linecap="round"/></svg>',
    '👍': '<svg viewBox="0 0 64 64"><rect x="8" y="28" width="12" height="28" rx="3" fill="#339af0"/><path d="M24 30l9-20c5-1 8 3 7 8l-2 8h14c4 0 6 3 5 7l-4 17c-1 4-4 6-8 6H24z" fill="#fcc419" stroke="#f08c00" stroke-width="2" stroke-linejoin="round"/></svg>',
    '💗': '<svg viewBox="0 0 64 64"><path d="M32 57C10 42 5 26 15 16c6-6 15-3 17 4 2-7 11-10 17-4 10 10 5 26-17 41z" fill="#f03e6e"/><path d="M16 22c1-4 5-7 9-6" fill="none" stroke="#ffc9d6" stroke-width="3.5" stroke-linecap="round"/></svg>',
    '🍩': '<svg viewBox="0 0 64 64"><path fill-rule="evenodd" fill="#e8a45c" d="M32 8a24 24 0 1 0 .01 0zM32 25a7 7 0 1 1-.01 0z"/><path fill-rule="evenodd" fill="#ff77b0" d="M32 13a19 19 0 1 0 .01 0zM32 24a8 8 0 1 1-.01 0z"/><rect x="17" y="27" width="7" height="3" rx="1.5" fill="#fff" transform="rotate(-35 20 28)"/><rect x="38" y="16" width="7" height="3" rx="1.5" fill="#ffd43b" transform="rotate(30 41 17)"/><rect x="42" y="35" width="7" height="3" rx="1.5" fill="#74c0fc" transform="rotate(-20 45 36)"/><rect x="27" y="42" width="7" height="3" rx="1.5" fill="#8ce99a" transform="rotate(35 30 43)"/><rect x="16" y="38" width="6" height="3" rx="1.5" fill="#ffd43b" transform="rotate(10 19 39)"/><rect x="28" y="15" width="6" height="3" rx="1.5" fill="#74c0fc" transform="rotate(-10 31 16)"/></svg>',
    '🍪': '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="25" fill="#d9a05b" stroke="#b9772e" stroke-width="3"/><ellipse cx="22" cy="24" rx="4.5" ry="3.5" fill="#5f3b1e"/><ellipse cx="40" cy="22" rx="4" ry="3" fill="#5f3b1e"/><ellipse cx="44" cy="38" rx="4.5" ry="3.5" fill="#5f3b1e"/><ellipse cx="28" cy="41" rx="4" ry="3" fill="#5f3b1e"/><ellipse cx="17" cy="38" rx="3" ry="2.5" fill="#5f3b1e"/><ellipse cx="34" cy="31" rx="3" ry="2.5" fill="#5f3b1e"/></svg>',
    '⭐': '<svg viewBox="0 0 64 64"><polygon points="32,5 40,24 60,25 44,38 50,58 32,46 14,58 20,38 4,25 24,24" fill="#ffd43b" stroke="#f59f00" stroke-width="3" stroke-linejoin="round"/><path d="M32 14l4 10" stroke="#fff3bf" stroke-width="3" stroke-linecap="round"/></svg>',
    '🍦': '<svg viewBox="0 0 64 64"><path d="M20 30h24L32 61z" fill="#e8a45c" stroke="#c97d2a" stroke-width="2" stroke-linejoin="round"/><path d="M27 38l10 10M37 38L27 48M24 33l14 14M40 33L26 47" stroke="#c97d2a" stroke-width="1.5"/><circle cx="32" cy="25" r="14" fill="#ff8fb8"/><circle cx="26" cy="22" r="3" fill="#ffd0e1"/><circle cx="32" cy="10" r="5" fill="#e03131"/><path d="M32 6c1-3 4-4 6-3" stroke="#2f9e44" stroke-width="2" fill="none" stroke-linecap="round"/></svg>',
    '👑': '<svg viewBox="0 0 64 64"><path d="M8 48L6 20l15 14 11-22 11 22 15-14-2 28z" fill="#ffd43b" stroke="#f59f00" stroke-width="3" stroke-linejoin="round"/><rect x="8" y="48" width="48" height="8" rx="3" fill="#f59f00"/><circle cx="6" cy="19" r="4" fill="#f03e3e"/><circle cx="32" cy="11" r="4" fill="#339af0"/><circle cx="58" cy="19" r="4" fill="#f03e3e"/><circle cx="32" cy="52" r="2.5" fill="#fff3bf"/></svg>'
  };
  var CHEAP = [
    ['🌹 Rose', 1, '🌹'], ['👍 Daumen', 2, '👍'], ['💗 Herz', 5, '💗'],
    ['🍩 Donut', 8, '🍩'], ['🍪 Keks', 10, '🍪'], ['⭐ Stern', 12, '⭐'],
    ['🍦 Eis', 15, '🍦'], ['👑 Krone', 20, '👑']
  ];
  try {
    CHEAP.forEach(function (c) {
      if (!CFG.gifts.some(function (g) { return g[2] === c[2]; })) CFG.gifts.push(c);
    });
    if (!CFG.gifts.some(function (g) { return g[1] === 4000; })) {
      CFG.gifts.push(['🌩️ Zeus', 4000, '🌩️'], ['🏎️ Sportwagen', 7500, '🏎️']);
    }
    CFG.gifts.sort(function (a, b) { return a[1] - b[1]; });
    EN_MAP.push(['👍 Daumen', '👍 Thumbs Up'], ['💗 Herz', '💗 Heart'], ['⭐ Stern', '⭐ Star'],
      ['🍦 Eis', '🍦 Ice Cream'], ['👑 Krone', '👑 Crown'], ['Sportwagen', 'Sports Car']);
  } catch (e) { return; }

  /* 2. Abdunkelung und EIN gemeinsames Video (Schwarz im Video wird unsichtbar) */
  var st = document.createElement('style');
  st.textContent =
    '#gfxDim{position:fixed;inset:0;z-index:254;background:rgba(5,5,25,.6);opacity:0;transition:opacity .4s;pointer-events:none}' +
    '#gfxDim.on{opacity:1}' +
    '.gfxV{display:none;position:fixed;inset:0;width:100%;height:100%;object-fit:cover;z-index:255;mix-blend-mode:screen;pointer-events:none}' +
    '.gfxV.on{display:block;animation:gfxIn .3s}' +
    '@keyframes gfxIn{from{opacity:0}to{opacity:1}}' +
    '.btn.gfxGift{display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;font-size:.68rem}' +
    '.gfxIc{width:40px;height:40px;display:flex;align-items:center;justify-content:center}' +
    '.gfxIc svg{width:100%;height:100%}.gfxEm{font-size:1.9rem}' +
    '.gfxGift small{color:#ffd700;font-weight:900;font-size:.66rem}' +
    '.gfxSm{display:inline-block;width:18px;height:18px;vertical-align:middle}.gfxSm svg{width:100%;height:100%}' +
    '.gfxFly{position:fixed;left:0;top:0;width:44px;height:44px;z-index:256;pointer-events:none;will-change:transform}' +
    '.gfxFly svg{width:100%;height:100%;filter:drop-shadow(0 2px 6px rgba(0,0,0,.5))}' +
    '.gfxRing{position:fixed;width:40px;height:40px;margin:-20px 0 0 -20px;border:3px solid #ffd700;border-radius:50%;z-index:256;pointer-events:none}' +
    '.gfxToT{font-size:.68rem;font-weight:800;color:var(--mut);margin-bottom:5px}' +
    '.gfxToRow{display:flex;gap:6px;overflow-x:auto;padding-bottom:6px;margin-bottom:6px;scrollbar-width:none}' +
    '.gfxToRow::-webkit-scrollbar{display:none}' +
    '.gfxTo{flex:0 0 auto;min-width:58px;max-width:78px;display:flex;flex-direction:column;align-items:center;gap:1px;padding:6px;border-radius:12px;background:rgba(255,255,255,.1);border:2px solid transparent;cursor:pointer}' +
    '.gfxTo span{font-size:1.25rem}' +
    '.gfxTo b{font-size:.55rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%}' +
    '.gfxTo.on{border-color:var(--acc);background:rgba(184,255,1,.16)}';
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

  /* Videos beim Live-Start komplett in den Speicher laden, damit sie
     beim Geschenk sofort und ruckelfrei starten (kein Nachladen im Netz) */
  var blobs = {}, warmed = false;
  function warm() {
    if (warmed) return;
    warmed = true;
    FX.forEach(function (f) {
      try {
        fetch(f.src).then(function (r) { return r.blob(); }).then(function (b) {
          blobs[f.src] = URL.createObjectURL(b);
        }).catch(function () {});
      } catch (e) {}
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
    vid.src = blobs[it.f.src] || it.f.src;
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
      if (still >= (last < 0 ? 20 : 10) || ticks > 40) end(last < 0);
    }, 500);
  }

  /* Wer bekommt das Geschenk? Host oder einer der Gäste im Live */
  var giftTo = { k: 'host', i: 0 };
  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function peopleList() {
    var n = Math.max(1, state.slots) - 1;
    var out = [{ k: 'host', i: 0, e: '👑', n: state.liveHostLabel || 'Host' }];
    for (var i = 0; i < n && i < state.guests.length; i++) {
      out.push({ k: 'guest', i: i, e: state.guests[i].e, n: state.guests[i].n });
    }
    return out;
  }
  function currentTo() {
    if (giftTo.k === 'guest' && giftTo.i < Math.max(1, state.slots) - 1 && state.guests[giftTo.i]) return giftTo;
    return { k: 'host', i: 0 };
  }
  function renderTo() {
    var box = document.getElementById('giftBtnsGrid');
    if (!box) return;
    var wrap = document.getElementById('gfxTo');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'gfxTo';
      box.parentNode.insertBefore(wrap, box);
      wrap.onclick = function (e) {
        var c = e.target.closest('.gfxTo');
        if (!c) return;
        giftTo = { k: c.getAttribute('data-k'), i: +c.getAttribute('data-i') };
        renderTo();
      };
    }
    var ppl = peopleList();
    if (ppl.length < 2) { wrap.style.display = 'none'; return; }
    var cur = currentTo();
    wrap.style.display = 'block';
    wrap.innerHTML = '<div class="gfxToT">' + L('🎯 Geschenk an:', '🎯 Gift to:') + '</div><div class="gfxToRow">' +
      ppl.map(function (p) {
        var on = p.k === cur.k && p.i === cur.i;
        return '<div class="gfxTo' + (on ? ' on' : '') + '" data-k="' + p.k + '" data-i="' + p.i + '"><span>' +
          p.e + '</span><b>' + esc(p.n) + '</b></div>';
      }).join('') + '</div>';
  }

  /* Kleine Geschenke: Bild fliegt vom angetippten Geschenk ins Fenster des Empfängers */
  var fromPt = null;
  function targetEl() {
    var g = document.getElementById('lrStageGrid');
    if (!g) return null;
    var t = currentTo();
    var sel = t.k === 'host'
      ? '[onclick="openLiveUserSheet(\'host\')"]'
      : '[onclick="openLiveUserSheet(\'guest\',' + t.i + ')"]';
    return g.querySelector(sel) || g.querySelector('.lr-main-box');
  }
  function flyGift(svg) {
    var w = window.innerWidth, h = window.innerHeight;
    var s = fromPt || { x: w / 2, y: h - 90 };
    fromPt = null;
    var te = targetEl(), t;
    if (te) {
      var r = te.getBoundingClientRect();
      t = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    } else {
      var g = document.getElementById('lrStageGrid'), gr = g && g.getBoundingClientRect();
      t = (gr && gr.width) ? { x: gr.right - 36, y: gr.top + 36 } : { x: w - 60, y: 120 };
    }
    var el = document.createElement('div');
    el.className = 'gfxFly';
    el.innerHTML = svg;
    document.body.appendChild(el);
    if (!el.animate) { el.remove(); return; }
    var mx = (s.x + t.x) / 2, my = Math.max(40, Math.min(s.y, t.y) - 70);
    var a = el.animate([
      { transform: 'translate(' + (s.x - 22) + 'px,' + (s.y - 22) + 'px) scale(.6)', opacity: 0, offset: 0 },
      { transform: 'translate(' + (s.x - 22) + 'px,' + (s.y - 40) + 'px) scale(1.3)', opacity: 1, offset: .15 },
      { transform: 'translate(' + (mx - 22) + 'px,' + (my - 22) + 'px) scale(1.1)', opacity: 1, offset: .55 },
      { transform: 'translate(' + (t.x - 22) + 'px,' + (t.y - 22) + 'px) scale(.5)', opacity: 1, offset: 1 }
    ], { duration: 1000, easing: 'ease-in-out', fill: 'forwards' });
    a.onfinish = function () {
      el.remove();
      var tgt = targetEl();
      if (tgt && tgt.animate) tgt.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.1)' }, { transform: 'scale(1)' }], { duration: 300 });
      var ring = document.createElement('div');
      ring.className = 'gfxRing';
      ring.style.left = t.x + 'px';
      ring.style.top = t.y + 'px';
      document.body.appendChild(ring);
      var ra = ring.animate([{ transform: 'scale(.4)', opacity: 1 }, { transform: 'scale(2.2)', opacity: 0 }], { duration: 500, easing: 'ease-out' });
      ra.onfinish = function () { ring.remove(); };
    };
  }

  /* 4. Geschenk senden: kleine Geschenke mit Bild, große mit Video */
  var oldSend = window.sendGift;
  window.sendGift = function (name, cost, emo) {
    var f = FX.find(function (x) { return cost >= x.min; });
    var ic = ICONS[emo];
    if (!f && !ic) return oldSend.apply(this, arguments);
    if (state.coins < cost) { toast('⚠️ ' + cost + ' 🪙!'); return; }
    state.coins -= cost;
    addGiftToLiveChest(cost);
    var clean = name.replace(/^\S+\s*/, '');
    var ppl = peopleList(), cur = currentTo(), rec = null;
    ppl.forEach(function (p) { if (p.k === cur.k && p.i === cur.i) rec = p; });
    var toTxt = (ppl.length > 1 && rec) ? ' ' + L('an', 'to') + ' <strong>' + esc(rec.n) + '</strong>' : '';
    appendLiveChatRow('🎁', state.liveHostLabel, state.mLvl,
      L('hat', 'sent') + ' <strong>' + clean + '</strong> ' +
      (ic ? '<span class="gfxSm">' + ic + '</span>' : emo) + toTxt);
    showEl('liveGiftModal', false);
    if (f) {
      toast('🎁 ' + clean + ' · ' + cost.toLocaleString('de-DE') + ' 🪙');
      addMXp(cost);
      q.push({ f: f, emo: emo, name: name });
      run();
    } else {
      flyGift(ic);
      addMXp(cost);
    }
  };

  /* 5. Geschenk-Fenster mit Bild, Name und Preis zeichnen */
  var list = [];
  function renderGifts() {
    var box = document.getElementById('giftBtnsGrid');
    if (!box) return;
    list = CFG.gifts.slice().sort(function (a, b) { return a[1] - b[1]; });
    box.innerHTML = list.map(function (g, i) {
      var ic = ICONS[g[2]];
      var pic = ic ? '<span class="gfxIc">' + ic + '</span>' : '<span class="gfxIc gfxEm">' + g[2] + '</span>';
      return '<button class="btn sec gfxGift" data-i="' + i + '">' + pic +
        '<span>' + trStr(g[0]).replace(/^\S+\s*/, '') + '</span><small>🪙 ' +
        g[1].toLocaleString('de-DE') + '</small></button>';
    }).join('');
    box.onclick = function (e) {
      var b = e.target.closest('.gfxGift');
      if (!b) return;
      var g = list[+b.getAttribute('data-i')];
      var pic = b.querySelector('.gfxIc') || b, pr = pic.getBoundingClientRect();
      fromPt = { x: pr.left + pr.width / 2, y: pr.top + pr.height / 2 };
      if (g) window.sendGift(trStr(g[0]), g[1], g[2]);
    };
    renderTo();
  }
  var oldInit = window.initStaticUI;
  window.initStaticUI = function () {
    oldInit.apply(this, arguments);
    renderGifts();
  };
  var modal = document.getElementById('liveGiftModal');
  if (modal && window.MutationObserver) {
    new MutationObserver(function () {
      if (modal.style.display === 'flex') { renderTo(); warm(); }
    }).observe(modal, { attributes: true, attributeFilter: ['style'] });
  }
  try { window.initStaticUI(); } catch (e) {}
})();
