(function () {
  'use strict';

  var COLORS = { living: '#8ad16b', water: '#4fb0ff', people: '#ffb347' };
  var MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MONTHS_EN_LONG = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var T = {
    en: {
      title: 'The 100 Soundscapes of Japan',
      subtitle: 'a sound calendar',
      lead: 'In 1996 Japan’s Environment Agency chose 100 sounds that communities wanted to keep. Pick a month to see which ones you can hear.',
      cat_living: 'Living things', cat_water: 'Water', cat_people: 'People',
      lg_season: 'In season this month', lg_year: 'Year-round', lg_off: 'Other months',
      about: 'About & notes',
      countUnit: 'sounds',
      play: 'Play months', pause: 'Pause',
      filterLabel: 'Sound type',
      monthLabel: 'Month',
      breakdown: function (s, y) { return s + ' in season · ' + y + ' year-round'; },
      yearRound: 'Year-round',
      estimated: 'estimated',
      when: 'When',
      spot: 'Where to listen',
      pointNote: 'Point at the site',
      areaNote: 'Representative point of a wider area',
      officialType: 'Type in the 1996 list',
      monthName: function (m) { return MONTHS_EN_LONG[m - 1]; },
      monthShort: function (m) { return MONTHS_EN[m - 1]; },
      monthsText: function (it) {
        if (it.all_year) return 'Year-round';
        return compressMonths(it.months).map(function (r) {
          return r[0] === r[1] ? MONTHS_EN_LONG[r[0] - 1] : MONTHS_EN[r[0] - 1] + '–' + MONTHS_EN[r[1] - 1];
        }).join(', ');
      },
      about_html:
        '<h3>About this map</h3>' +
        '<p>On 1 July 1996, Japan’s Environment Agency (now the Ministry of the Environment) selected the <b>100 Soundscapes of Japan</b> from 738 entries sent in from across the country: sounds that local people value and want to pass on. 2026 marks 30 years since the selection.</p>' +
        '<p>Each sound is placed on the map and sorted into three types: living things (birds, insects, frogs, deer, wind in trees), water (waves, falls, rivers, drift ice, singing sand) and people (bells, festivals, trains, crafts and work). Move the slider to see which sounds are in season. Sounds that can be heard all year are always shown.</p>' +
        '<h3>Notes</h3><ul>' +
        '<li>The list was selected in 1996. Some sounds may no longer be heard in the same way today.</li>' +
        '<li>Points are representative locations. Rivers, coasts, wetlands and towns are shown with one point.</li>' +
        '<li>The months are a guide, based on the descriptions in the official pamphlet. Months marked “estimated” were inferred from wording such as “autumn” or “early summer”.</li>' +
        '<li>Descriptions are short summaries written for this map, not quotations.</li>' +
        '</ul>' +
        '<h3>Sources</h3><ul>' +
        '<li>Ministry of the Environment, Japan: <a href="https://www.env.go.jp/air/life/nihon_no_oto/index.html" target="_blank" rel="noopener">Nokoshitai “Nihon no Oto Fukei 100-sen”</a> (overview and pamphlet PDFs)</li>' +
        '<li>English names refer to Wikipedia “100 Soundscapes of Japan”.</li>' +
        '<li>Base map: land outline from <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>; detail from <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">GSI Tiles (blank map)</a>, Geospatial Information Authority of Japan.</li>' +
        '</ul>' +
        '<p>#30DayMapChallenge 2026 · Day 11 · Senses: Sound · <a href="https://github.com/shinyanakashima/30daymapchallenge-2026day11-100soundscapes" target="_blank" rel="noopener">Data &amp; code</a></p>' +
        '<p>Keyboard: ← / → change month, Space plays or pauses.</p>'
    },
    ja: {
      title: '日本の音風景100選',
      subtitle: '音の暦',
      lead: '1996年、環境庁が「残したい日本の音風景100選」を選びました。月を選ぶと、その月に聞ける音が浮かび上がります。',
      cat_living: '生き物', cat_water: '水', cat_people: '人の営み',
      lg_season: 'この月に聞ける', lg_year: '通年', lg_off: 'ほかの月',
      about: 'この地図について・注記',
      countUnit: '件',
      play: '月を再生', pause: '一時停止',
      filterLabel: '音の種類',
      monthLabel: '月',
      breakdown: function (s, y) { return '季節の音 ' + s + '件・通年 ' + y + '件'; },
      yearRound: '通年',
      estimated: '推定',
      when: '聞ける時期',
      spot: 'よく聞けるところ',
      pointNote: '地点',
      areaNote: '範囲が広いため代表点',
      officialType: '100選での音風景の種類',
      monthName: function (m) { return m + '月'; },
      monthShort: function (m) { return String(m); },
      monthsText: function (it) {
        if (it.all_year) return '通年';
        return compressMonths(it.months).map(function (r) {
          return r[0] === r[1] ? r[0] + '月' : r[0] + '〜' + r[1] + '月';
        }).join('、');
      },
      about_html:
        '<h3>この地図について</h3>' +
        '<p>1996年7月1日、環境庁（現・環境省）は全国から寄せられた738件の応募の中から「残したい日本の音風景100選」を選びました。地域の人々が大切にし、将来に残したいと願う音のある風景です。2026年で選定から30年になります。</p>' +
        '<p>100の音を地図に置き、生き物（鳥・虫・蛙・鹿・木々の音）、水（波・滝・川・流氷・鳴き砂）、人の営み（鐘・祭り・乗り物・仕事の音）の3つに分けました。スライダーで月を切り替えると、その月に聞ける音が脈打ちます。通年の音は常に表示しています。</p>' +
        '<h3>注記</h3><ul>' +
        '<li>100選は1996年の選定です。今も同じように聞けるとは限りません。</li>' +
        '<li>地点は代表点です。川・海岸・湿原・町並みなど範囲の広いものも1点で示しています。</li>' +
        '<li>聞ける月は、パンフレットの説明文などから判断した目安です。「推定」は「秋」「初夏」などの表現から月を読み替えたものです。</li>' +
        '<li>説明文はこの地図のために書いた短い要約で、パンフレットからの転載ではありません。</li>' +
        '</ul>' +
        '<h3>出典</h3><ul>' +
        '<li>環境省「<a href="https://www.env.go.jp/air/life/nihon_no_oto/index.html" target="_blank" rel="noopener">残したい“日本の音風景100選”</a>」（概要・パンフレット）</li>' +
        '<li>英語名は英語版Wikipedia「100 Soundscapes of Japan」を参考にしました。</li>' +
        '<li>背景地図：陸域の輪郭 <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a>、詳細 <a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル（白地図）</a>（国土地理院）</li>' +
        '</ul>' +
        '<p>#30DayMapChallenge 2026・Day 11・Senses: Sound・<a href="https://github.com/shinyanakashima/30daymapchallenge-2026day11-100soundscapes" target="_blank" rel="noopener">データとコード</a></p>' +
        '<p>キーボード：← / → で月を切り替え、スペースで再生・停止。</p>'
    }
  };

  function compressMonths(ms) {
    // ranges that may wrap around the year end (e.g. Oct–Mar)
    var set = {}; ms.forEach(function (m) { set[m] = true; });
    var starts = ms.filter(function (m) { return !set[m === 1 ? 12 : m - 1]; }).sort(function (a, b) { return a - b; });
    if (!starts.length) return [[1, 12]];
    return starts.map(function (s) {
      var e = s;
      while (set[e === 12 ? 1 : e + 1] && (e === 12 ? 1 : e + 1) !== s) e = e === 12 ? 1 : e + 1;
      return [s, e];
    });
  }

  // ---------- state ----------
  var params = new URLSearchParams(location.search);
  var state = {
    lang: 'en',
    month: 11,
    cats: { living: true, water: true, people: true },
    playing: false,
    selected: null
  };
  try {
    var saved = localStorage.getItem('soundscapes-lang');
    if (saved === 'ja' || saved === 'en') state.lang = saved;
  } catch (e) { /* storage unavailable */ }
  if (params.get('lang') === 'ja' || params.get('lang') === 'en') state.lang = params.get('lang');
  var pm = parseInt(params.get('month'), 10);
  if (pm >= 1 && pm <= 12) state.month = pm;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
  var items = [];
  var byId = {};
  var map;

  var $ = function (id) { return document.getElementById(id); };
  var slider = $('month');
  slider.value = state.month;

  // ---------- map ----------
  map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {
        land: { type: 'geojson', data: 'data/japan-land.geojson' },
        gsi: {
          type: 'raster',
          tiles: ['https://cyberjapandata.gsi.go.jp/xyz/blank/{z}/{x}/{y}.png'],
          tileSize: 256, minzoom: 5, maxzoom: 14
        }
      },
      layers: [
        { id: 'bg', type: 'background', paint: { 'background-color': '#0f141b' } },
        { id: 'land', type: 'fill', source: 'land', paint: { 'fill-color': '#262c35', 'fill-opacity': ['interpolate', ['linear'], ['zoom'], 5, 1, 6, 0] } },
        {
          id: 'gsi', type: 'raster', source: 'gsi', minzoom: 5,
          paint: {
            'raster-opacity': ['interpolate', ['linear'], ['zoom'], 5, 0, 6, 1],
            'raster-brightness-max': 0.16,
            'raster-brightness-min': 0.04,
            'raster-saturation': -1,
            'raster-contrast': 0
          }
        }
      ]
    },
    bounds: [[122.6, 24.0], [146.2, 45.6]],
    fitBoundsOptions: { padding: fitPadding() },
    minZoom: 3,
    maxZoom: 11,
    attributionControl: false,
    dragRotate: false,
    pitchWithRotate: false,
    keyboard: false
  });
  map.touchZoomRotate.disableRotation();
  window.soundscapeMap = map;
  map.addControl(new maplibregl.AttributionControl({
    compact: true,
    customAttribution: '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">地理院タイル (GSI)</a> | <a href="https://www.naturalearthdata.com/" target="_blank" rel="noopener">Natural Earth</a> | Data: <a href="https://www.env.go.jp/air/life/nihon_no_oto/index.html" target="_blank" rel="noopener">環境省 Ministry of the Environment</a>'
  }), 'bottom-right');
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

  function fitPadding() {
    var w = window.innerWidth;
    if (w <= 720) return { top: 120, bottom: 120, left: 16, right: 16 };
    return { top: 50, bottom: 110, left: 240, right: 200 };
  }

  function catColor() {
    return ['match', ['get', 'category'], 'living', COLORS.living, 'water', COLORS.water, COLORS.people];
  }
  // feature-state "s": 2 = in season this month, 1 = year-round, 0 = other months; "h": hidden by filter
  var S = ['coalesce', ['feature-state', 's'], 0];
  var H = ['coalesce', ['feature-state', 'h'], false];

  map.on('load', function () {
    fetch('data/soundscapes.json')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        items = data.items;
        items.forEach(function (it) { byId[it.id] = it; });
        var fc = {
          type: 'FeatureCollection',
          features: items.map(function (it) {
            return {
              type: 'Feature', id: it.id,
              properties: { id: it.id, category: it.category },
              geometry: { type: 'Point', coordinates: [it.lon, it.lat] }
            };
          })
        };
        map.addSource('pts', { type: 'geojson', data: fc });

        // year-round halo (static)
        map.addLayer({
          id: 'halo', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'], 4, 7, 8, 11],
            'circle-color': catColor(),
            'circle-opacity': ['case', H, 0, ['==', S, 1], 0.14, ['==', S, 2], 0.22, 0],
            'circle-blur': 0.6
          }
        });
        // ripples (3 rings, animated)
        for (var k = 0; k < 3; k++) {
          map.addLayer({
            id: 'ripple' + k, type: 'circle', source: 'pts',
            paint: {
              'circle-radius': 6,
              'circle-color': 'rgba(0,0,0,0)',
              'circle-stroke-color': catColor(),
              'circle-stroke-width': 1.4,
              'circle-stroke-opacity': 0
            }
          });
        }
        map.addLayer({
          id: 'dot', type: 'circle', source: 'pts',
          paint: {
            'circle-radius': ['interpolate', ['linear'], ['zoom'],
              4, ['case', ['==', S, 2], 4.2, ['==', S, 1], 3.2, 2.4],
              8, ['case', ['==', S, 2], 6.5, ['==', S, 1], 5, 3.6]],
            'circle-color': catColor(),
            'circle-opacity': ['case', H, 0, ['==', S, 2], 1, ['==', S, 1], 0.72, 0.22],
            'circle-stroke-width': ['case', ['boolean', ['feature-state', 'sel'], false], 2, 0],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-opacity': ['case', H, 0, 1]
          }
        });

        map.on('click', function (e) {
          // pick the nearest visible point within a finger-sized box
          var pad = window.innerWidth <= 720 ? 16 : 10;
          var hits = map.queryRenderedFeatures([[e.point.x - pad, e.point.y - pad], [e.point.x + pad, e.point.y + pad]], { layers: ['dot'] });
          var best = null, bd = Infinity;
          hits.forEach(function (f) {
            if (!state.cats[byId[f.properties.id].category]) return;
            var p = map.project(f.geometry.coordinates);
            var d = Math.hypot(p.x - e.point.x, p.y - e.point.y);
            if (d < bd) { bd = d; best = f; }
          });
          select(best ? best.properties.id : null);
        });
        map.on('mousemove', function (e) {
          var hits = map.queryRenderedFeatures([[e.point.x - 8, e.point.y - 8], [e.point.x + 8, e.point.y + 8]], { layers: ['dot'] })
            .filter(function (f) { return state.cats[byId[f.properties.id].category]; });
          map.getCanvas().style.cursor = hits.length ? 'pointer' : '';
        });

        if (window.innerWidth <= 720) {
          var attrib = document.querySelector('.maplibregl-ctrl-attrib');
          if (attrib) { attrib.classList.remove('maplibregl-compact-show'); attrib.removeAttribute('open'); }
        }
        updateCounts();
        applyMonth();
        startAnimation();
      });
  });

  // ---------- month ----------
  function stateOf(it, m) {
    if (it.all_year) return 1;
    return it.months.indexOf(m) >= 0 ? 2 : 0;
  }

  function applyMonth() {
    var m = state.month;
    slider.value = m;
    var nSeason = 0, nYear = 0;
    items.forEach(function (it) {
      var s = stateOf(it, m);
      var hidden = !state.cats[it.category];
      if (map.getSource('pts')) map.setFeatureState({ source: 'pts', id: it.id }, { s: s, h: hidden });
      if (!hidden) { if (s === 2) nSeason++; else if (s === 1) nYear++; }
    });
    var t = T[state.lang];
    $('countMonth').textContent = t.monthName(m);
    $('countTotal').textContent = nSeason + nYear;
    $('countBreak').textContent = t.breakdown(nSeason, nYear);
    slider.setAttribute('aria-valuetext', t.monthName(m) + ': ' + (nSeason + nYear) + ' ' + t.countUnit);
    Array.prototype.forEach.call($('ticks').children, function (b, i) { b.classList.toggle('on', i + 1 === m); });
    if (state.selected) renderCard();
    if (reduceMotion && reduceMotion.matches) drawStatic();
  }

  function setMonth(m) {
    state.month = ((m - 1 + 12) % 12) + 1;
    applyMonth();
  }

  function buildTicks() {
    var wrap = $('ticks');
    wrap.innerHTML = '';
    var t = T[state.lang];
    for (var m = 1; m <= 12; m++) {
      var b = document.createElement('button');
      b.type = 'button';
      b.tabIndex = -1;
      b.textContent = t.monthShort(m);
      b.setAttribute('aria-label', t.monthName(m));
      b.addEventListener('click', (function (mm) { return function () { stopPlay(); setMonth(mm); }; })(m));
      wrap.appendChild(b);
    }
  }

  slider.addEventListener('input', function () { stopPlay(); setMonth(parseInt(slider.value, 10)); });

  // ---------- play ----------
  var playTimer = null;
  function startPlay() {
    if (state.playing) return;
    state.playing = true;
    $('play').setAttribute('aria-pressed', 'true');
    $('play').querySelector('.sr').textContent = T[state.lang].pause;
    if (state.month === 12) setMonth(1);
    playTimer = setInterval(function () {
      if (state.month >= 12) { stopPlay(); return; }
      setMonth(state.month + 1);
    }, 1600);
  }
  function stopPlay() {
    if (!state.playing) return;
    state.playing = false;
    clearInterval(playTimer);
    $('play').setAttribute('aria-pressed', 'false');
    $('play').querySelector('.sr').textContent = T[state.lang].play;
  }
  $('play').addEventListener('click', function () {
    if (state.playing) { stopPlay(); return; }
    // play always runs January to December
    setMonth(1);
    startPlay();
  });

  // ---------- keyboard ----------
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName) || '';
    if (e.key === 'Escape') { select(null); closeAbout(); return; }
    if (e.target === slider) return; // native range handles arrows
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (e.key === 'ArrowRight') { stopPlay(); setMonth(state.month + 1); e.preventDefault(); }
    else if (e.key === 'ArrowLeft') { stopPlay(); setMonth(state.month - 1); e.preventDefault(); }
    else if ((e.key === ' ' || e.key === 'Spacebar') && tag !== 'BUTTON') { $('play').click(); e.preventDefault(); }
  });

  // ---------- filters ----------
  Array.prototype.forEach.call(document.querySelectorAll('.chip'), function (b) {
    b.addEventListener('click', function () {
      var c = b.getAttribute('data-cat');
      state.cats[c] = !state.cats[c];
      b.setAttribute('aria-pressed', state.cats[c] ? 'true' : 'false');
      if (state.selected && !state.cats[byId[state.selected].category]) select(null);
      applyMonth();
    });
  });
  function updateCounts() {
    ['living', 'water', 'people'].forEach(function (c) {
      var n = items.filter(function (it) { return it.category === c; }).length;
      document.querySelector('[data-n="' + c + '"]').textContent = n;
    });
  }

  // ---------- card ----------
  function select(id) {
    if (state.selected && map.getSource('pts')) map.setFeatureState({ source: 'pts', id: state.selected }, { sel: false });
    state.selected = id;
    if (!id) { $('card').hidden = true; return; }
    map.setFeatureState({ source: 'pts', id: id }, { sel: true });
    renderCard();
    $('card').hidden = false;
  }

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function renderCard() {
    var it = byId[state.selected];
    if (!it) return;
    var t = T[state.lang];
    var ja = state.lang === 'ja';
    var col = COLORS[it.category];
    $('cardCat').innerHTML = '<i class="sw ' + it.category + '"></i>' + esc(t['cat_' + it.category]) + ' · No. ' + it.id;
    $('cardName').textContent = ja ? it.name_ja : it.name_en;
    $('cardAlt').textContent = ja ? it.name_en : it.name_ja;
    $('cardPlace').textContent = ja
      ? it.prefecture_ja + '・' + it.municipality_ja
      : it.municipality_en + ', ' + it.prefecture_en;
    var cells = '';
    for (var m = 1; m <= 12; m++) {
      var on = it.months.indexOf(m) >= 0;
      cells += '<span class="' + (on ? 'on' : '') + (m === state.month ? ' cur' : '') + '"' +
        (on ? ' style="background:' + col + '"' : '') + '>' + (ja ? m : MONTHS_EN[m - 1].charAt(0)) + '</span>';
    }
    $('cardMonths').innerHTML = cells;
    var whenHtml = '<b>' + esc(t.when) + ':</b> ' + esc(t.monthsText(it)) + (it.months_estimated ? '<span class="est">' + esc(t.estimated) + '</span>' : '');
    if (ja) whenHtml += '<br><span style="color:var(--ink-3)">' + esc(it.months_basis_ja) + '</span>';
    $('cardWhen').innerHTML = whenHtml;
    $('cardDesc').textContent = ja ? it.description_ja : it.description_en;
    var loc = (it.location_type === 'area' ? t.areaNote : t.pointNote);
    if (ja) loc += '：' + esc(it.location_note_ja) + '<br>' + esc(t.spot) + '：' + esc(it.listening_spot_ja) + '<br>' + esc(t.officialType) + '：' + esc(it.source_category_ja);
    $('cardLoc').innerHTML = ja ? loc : esc(loc);
  }
  $('cardClose').addEventListener('click', function () { select(null); });

  // ---------- about ----------
  function openAbout() {
    $('aboutBody').innerHTML = T[state.lang].about_html;
    $('about').hidden = false;
    document.querySelector('.about-btn').setAttribute('aria-expanded', 'true');
    $('aboutClose').focus();
  }
  function closeAbout() {
    if ($('about').hidden) return;
    $('about').hidden = true;
    document.querySelector('.about-btn').setAttribute('aria-expanded', 'false');
  }
  document.querySelector('.about-btn').addEventListener('click', function () { if ($('about').hidden) openAbout(); else closeAbout(); });
  $('aboutClose').addEventListener('click', closeAbout);

  // ---------- language ----------
  function applyLang() {
    var t = T[state.lang];
    document.documentElement.lang = state.lang;
    document.title = state.lang === 'ja' ? '日本の音風景100選 音の暦' : 'The 100 Soundscapes of Japan: a sound calendar';
    Array.prototype.forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var v = t[el.getAttribute('data-i18n')];
      if (typeof v === 'string') el.textContent = v;
    });
    document.querySelector('.filters').setAttribute('aria-label', t.filterLabel);
    slider.setAttribute('aria-label', t.monthLabel);
    $('play').querySelector('.sr').textContent = state.playing ? t.pause : t.play;
    Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === state.lang ? 'true' : 'false');
    });
    buildTicks();
    if (!$('about').hidden) $('aboutBody').innerHTML = t.about_html;
    if (items.length) applyMonth();
  }
  Array.prototype.forEach.call(document.querySelectorAll('.lang button'), function (b) {
    b.addEventListener('click', function () {
      state.lang = b.getAttribute('data-lang');
      try { localStorage.setItem('soundscapes-lang', state.lang); } catch (e) { /* ignore */ }
      applyLang();
    });
  });

  // ---------- ripple animation ----------
  var rafId = null;
  var PERIOD = 2400;
  function ringPaint(phase) {
    // radius grows, opacity fades
    var r = 5 + phase * 20;
    var o = Math.pow(1 - phase, 1.6) * 0.9;
    return { r: r, o: o };
  }
  function setRing(k, r, o) {
    var vis = ['all', ['==', S, 2], ['!', H]];
    map.setPaintProperty('ripple' + k, 'circle-radius', r);
    map.setPaintProperty('ripple' + k, 'circle-stroke-opacity', ['case', vis, o, 0]);
  }
  function frame(ts) {
    for (var k = 0; k < 3; k++) {
      var phase = ((ts / PERIOD) + k / 3) % 1;
      var p = ringPaint(phase);
      setRing(k, p.r, p.o);
    }
    rafId = requestAnimationFrame(frame);
  }
  function drawStatic() {
    if (!map.getLayer('ripple0')) return;
    setRing(0, 9, 0.6);
    setRing(1, 14, 0.3);
    setRing(2, 0, 0);
  }
  function startAnimation() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    if (reduceMotion && reduceMotion.matches) { drawStatic(); return; }
    rafId = requestAnimationFrame(frame);
  }
  if (reduceMotion && reduceMotion.addEventListener) {
    reduceMotion.addEventListener('change', function () { if (map.getLayer('ripple0')) startAnimation(); });
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && rafId) { cancelAnimationFrame(rafId); rafId = null; }
    else if (!document.hidden && map.getLayer && map.getLayer('ripple0')) startAnimation();
  });

  window.addEventListener('resize', function () { /* keep current view */ });

  applyLang();
})();
