(function () {
  var inv = window.INVITATION
  var $ = function (id) { return document.getElementById(id) }
  var KEY = 'artika-admin-links'
  var UNLOCK = 'artika-admin-unlocked'

  function sha256(text) {
    if (!window.crypto || !crypto.subtle) return Promise.reject(new Error('insecure'))
    return crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, '0') }).join('')
    })
  }

  /* ---------- Password gate ---------- */
  function unlock() {
    sessionStorage.setItem(UNLOCK, inv.adminPasswordSha256)
    $('gate').classList.add('hidden')
    $('app').classList.remove('hidden')
    renderHistory()
    $('to').focus()
  }
  if (sessionStorage.getItem(UNLOCK) === inv.adminPasswordSha256) unlock()

  $('gate-form').addEventListener('submit', function (e) {
    e.preventDefault()
    var err = $('gate-err')
    sha256($('pw').value).then(function (h) {
      if (h === inv.adminPasswordSha256) {
        unlock()
      } else {
        err.textContent = 'गलत पासवर्ड।'
        err.classList.remove('hidden')
      }
    }, function () {
      err.textContent = 'यह पेज https या localhost पर खोलें (GitHub Pages पर ठीक चलेगा)।'
      err.classList.remove('hidden')
    })
  })

  /* ---------- Link generation ---------- */
  function baseUrl() {
    return location.origin + location.pathname.replace(/[^/]*$/, '') + 'index.html'
  }
  function buildLink(name, family) {
    var slug = name.trim().replace(/\s+/g, '-')
    return baseUrl() + '?to=' + encodeURIComponent(slug) + '&f=' + (family ? '1' : '0')
  }
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] } catch (e) { return [] }
  }
  function save(list) { localStorage.setItem(KEY, JSON.stringify(list.slice(0, 200))) }

  function waLink(name, link, phone) {
    var text = 'नमस्ते ' + name + ' जी 🙏\n' + inv.eventTitleHindi + ' पर आप सादर आमंत्रित हैं।\n' +
      '📅 ' + inv.dateHindi + ' · ' + inv.timeHindi + '\n📍 ' + inv.venueName + ', ' + inv.venueAddress + '\n\nनिमंत्रण देखें: ' + link
    var digits = (phone || '').replace(/\D/g, '')
    return 'https://wa.me/' + digits + '?text=' + encodeURIComponent(text)
  }

  function renderHistory() {
    var list = load()
    var ul = $('history')
    ul.textContent = ''
    $('history-box').classList.toggle('hidden', !list.length)
    list.forEach(function (it) {
      var li = document.createElement('li')
      var span = document.createElement('span')
      span.textContent = it.name + (it.family ? ' (सपरिवार)' : '')
      var a = document.createElement('a')
      a.textContent = 'WhatsApp'
      a.href = waLink(it.name, it.link, '')
      a.target = '_blank'
      a.rel = 'noopener'
      li.appendChild(span)
      li.appendChild(a)
      ul.appendChild(li)
    })
  }

  $('gen').addEventListener('submit', function (e) {
    e.preventDefault()
    var name = $('to').value.trim()
    $('gen-err').classList.toggle('hidden', !!name)
    if (!name) return
    var family = document.querySelector('input[name=fam]:checked').value === '1'
    var link = buildLink(name, family)
    $('link').textContent = link
    $('preview').href = link
    $('wa').href = waLink(name, link, $('phone').value)
    $('result').classList.remove('hidden')
    $('copied').classList.add('hidden')
    var list = load().filter(function (x) { return x.link !== link })
    list.unshift({ name: name, family: family, link: link })
    save(list)
    renderHistory()
  })

  $('copy').addEventListener('click', function () {
    var text = $('link').textContent
    var done = function () { $('copied').classList.remove('hidden') }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done)
    } else {
      var r = document.createRange()
      r.selectNodeContents($('link'))
      var s = getSelection()
      s.removeAllRanges()
      s.addRange(r)
      document.execCommand('copy')
      done()
    }
  })

  $('clear').addEventListener('click', function () {
    localStorage.removeItem(KEY)
    renderHistory()
  })

  $('hashbtn').addEventListener('click', function () {
    var v = $('newpw').value
    if (!v) return
    sha256(v).then(function (h) {
      $('hashout').textContent = h
      $('hashout').classList.remove('hidden')
    })
  })
})()
