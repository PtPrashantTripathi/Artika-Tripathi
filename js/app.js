(function () {
  var inv = window.INVITATION
  var $ = function (id) { return document.getElementById(id) }
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function el(tag, cls, text) {
    var e = document.createElement(tag)
    if (cls) e.className = cls
    if (text != null) e.textContent = text
    return e
  }

  /* ---------- Personalisation: ?to=Name-Surname&f=1 ---------- */
  var params = new URLSearchParams(location.search)
  var guest = (params.get('to') || '').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60)
  var withFamily = ['1', 'true'].indexOf((params.get('f') || '').toLowerCase()) !== -1

  if (guest) {
    $('greeting').hidden = false
    $('greet-name').textContent = guest + ' जी'
    $('greet-family').textContent = withFamily ? 'सपरिवार सादर आमंत्रित हैं' : 'सादर आमंत्रित हैं'
    $('env-to').textContent = guest + (withFamily ? ' एवं परिवार के लिए' : ' के लिए')
    $('r-name').value = guest
    if (withFamily) $('r-guests').value = 4
  }

  /* ---------- Static content from invitation.js ---------- */
  document.title = inv.childNameHindi + ' का ' + inv.occasion + ' — सादर आमंत्रण'
  $('env-name').textContent = inv.childNameHindi
  $('child-hi').textContent = inv.childNameHindi
  $('child-en').textContent = inv.childNameEnglish
  $('date').textContent = inv.dateHindi
  $('time').textContent = inv.timeHindi
  $('venue').textContent = inv.venueName
  $('venue-addr').textContent = inv.venueAddress
  $('maps').href = inv.mapsUrl
  var hero = $('hero-img')
  hero.src = 'img/' + inv.heroPhoto.file
  hero.alt = inv.heroPhoto.alt

  inv.programme.forEach(function (p) {
    var li = el('li')
    li.appendChild(el('div', 't', p.time))
    li.appendChild(el('div', 'n', p.title))
    $('programme').appendChild(li)
  })
  $('poem-by').textContent = inv.poemBy
  inv.poem.forEach(function (line) { $('poem').appendChild(el('p', null, line)) })
  inv.hosts.forEach(function (h) {
    var d = el('div', 'host')
    d.appendChild(el('div', 'rel', h.relation))
    d.appendChild(el('div', 'nm', h.names))
    $('hosts').appendChild(d)
  })
  if (!inv.whatsappNumber) $('rsvp-section').classList.add('hidden')

  /* ---------- Balloons ---------- */
  var colors = ['#ff9ebb', '#ffd36e', '#cdb4ff', '#9fe0c4', '#ff7aa8', '#ffb98a']
  colors.forEach(function (c, i) {
    var b = el('span', 'balloon')
    b.style.left = 8 + i * 16 + '%'
    b.style.background = c
    b.style.animationDelay = i * 1.3 + 's'
    b.style.animationDuration = 9 + (i % 3) * 2 + 's'
    $('balloons').appendChild(b)
  })

  /* ---------- Petals + envelope ---------- */
  var petalColors = ['#ff9ebb', '#ffc4d8', '#ff7aa8', '#e6d9ff', '#ffe08a']
  function shower() {
    if (reduceMotion) return
    for (var i = 0; i < 40; i++) {
      var p = el('span', 'petal')
      p.style.left = Math.random() * 100 + 'vw'
      p.style.background = petalColors[i % petalColors.length]
      p.style.animationDelay = Math.random() * 2.5 + 's'
      p.style.transform = 'scale(' + (0.7 + Math.random() * 0.8) + ')'
      document.body.appendChild(p)
      setTimeout(function (n) { n.remove() }.bind(null, p), 9000)
    }
  }
  /* ---------- Sparkles in hero ---------- */
  var heroEl = document.querySelector('header.hero')
  for (var s = 0; s < 28; s++) {
    var sp = el('span', 'sparkle')
    sp.style.left = Math.random() * 100 + '%'
    sp.style.top = Math.random() * 100 + '%'
    sp.style.animationDelay = Math.random() * 3 + 's'
    sp.style.animationDuration = 2 + Math.random() * 3 + 's'
    heroEl.appendChild(sp)
  }

  /* ---------- Floating hearts / stars in hero ---------- */
  var shapes = ['♥', '✦', '★', '❀', '♥']
  for (var h = 0; h < 14; h++) {
    var ht = el('span', 'heart', shapes[h % shapes.length])
    ht.style.left = Math.random() * 94 + '%'
    ht.style.bottom = Math.random() * 25 + '%'
    ht.style.fontSize = 14 + Math.random() * 18 + 'px'
    ht.style.animationDelay = Math.random() * 8 + 's'
    ht.style.animationDuration = 7 + Math.random() * 6 + 's'
    heroEl.appendChild(ht)
  }

  /* ---------- Scroll reveal ---------- */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('main section').forEach(function (n) { n.classList.add('rv'); io.observe(n) })
  }

  /* ---------- Background music (needs a tap, so it starts on "open") ---------- */
  var bgm = $('bgm')
  var musicBtn = $('music-btn')
  var wantMusic = true
  function setMusicUi(on) {
    musicBtn.textContent = on ? '🔊' : '🔇'
    musicBtn.setAttribute('aria-pressed', String(on))
  }
  bgm.volume = 0.6
  bgm.addEventListener('error', function () { musicBtn.classList.add('hidden') })
  musicBtn.addEventListener('click', function () {
    if (bgm.paused) { wantMusic = true; bgm.play().catch(function () {}); setMusicUi(true) }
    else { wantMusic = false; bgm.pause(); setMusicUi(false) }
  })
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) bgm.pause()
    else if (wantMusic && !musicBtn.classList.contains('hidden') && !$('envelope')) bgm.play().catch(function () {})
  })

  document.body.style.overflow = 'hidden'
  $('open-btn').addEventListener('click', function () {
    var env = $('envelope')
    env.classList.add('closing')
    document.body.style.overflow = ''
    setTimeout(function () { env.remove() }, 650)
    shower()
    bgm.play().then(function () {
      musicBtn.classList.remove('hidden'); setMusicUi(true)
    }, function () { /* missing/blocked file: stay silent */ })
  })

  /* ---------- Countdown ---------- */
  var target = new Date(inv.eventStartISO).getTime()
  function pad(n) { return String(n).padStart(2, '0') }
  function tick() {
    var diff = target - Date.now()
    if (diff <= 0) {
      $('countdown').hidden = true
      $('cd-done').hidden = false
      return false
    }
    var s = Math.floor(diff / 1000)
    $('cd-d').textContent = pad(Math.floor(s / 86400))
    $('cd-h').textContent = pad(Math.floor((s % 86400) / 3600))
    $('cd-m').textContent = pad(Math.floor((s % 3600) / 60))
    $('cd-s').textContent = pad(s % 60)
    return true
  }
  if (tick()) {
    var timer = setInterval(function () { if (!tick()) clearInterval(timer) }, 1000)
  }

  /* ---------- Gallery + lightbox ---------- */
  var lb = $('lightbox')
  inv.photos.forEach(function (p) {
    var b = el('button')
    b.type = 'button'
    var im = el('img')
    im.src = 'img/' + p.file
    im.alt = p.alt
    im.loading = 'lazy'
    im.width = 400
    im.height = 400
    b.appendChild(im)
    b.appendChild(el('span', 'cap', p.caption))
    b.addEventListener('click', function () {
      $('lb-img').src = 'img/' + p.file
      $('lb-img').alt = p.alt
      $('lb-cap').textContent = p.caption
      lb.showModal()
    })
    $('gallery').appendChild(b)
  })
  $('lb-close').addEventListener('click', function () { lb.close() })
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close() })

  /* ---------- Share + RSVP (both via WhatsApp) ---------- */
  var pageUrl = location.href
  $('share').addEventListener('click', function () {
    var text = inv.childNameHindi + ' के ' + inv.occasion + ' पर आप सादर आमंत्रित हैं। ' + pageUrl
    if (navigator.share) {
      navigator.share({ title: document.title, text: text }).catch(function () {})
    } else {
      window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener')
    }
  })

  $('rsvp').addEventListener('submit', function (e) {
    e.preventDefault()
    var name = $('r-name').value.trim()
    $('rsvp-err').classList.toggle('hidden', !!name)
    if (!name) return
    var yes = document.querySelector('input[name=attending]:checked').value === 'yes'
    var lines = ['नमस्ते 🙏', name + (yes ? ' — हम आर्तिका के जन्मदिवस पर अवश्य आएँगे।' : ' — क्षमा करें, हम नहीं आ पाएँगे।')]
    if (yes) lines.push('कुल लोग: ' + ($('r-guests').value || 1))
    if ($('r-msg').value.trim()) lines.push('संदेश: ' + $('r-msg').value.trim())
    window.open('https://wa.me/' + inv.whatsappNumber + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener')
    if (yes) shower()
  })
})()
