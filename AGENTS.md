# AGENTS.md

## Project

Hindi, fully static first-birthday invitation for Artika Tripathi. Plain HTML/CSS/JS — **no Node, no build step** — deployed on GitHub Pages (`.github/workflows/pages.yml` just copies the files).

## Files

- `index.html` — the invitation page (envelope → Ganesha → details → countdown → programme → gallery → poem → RSVP → hosts).
- `admin.html` + `js/admin.js` — link generator (no password; `to`/`f` link, copy, WhatsApp share, history in localStorage).
- `js/invitation.js` — **single source of truth**: names, date (`eventStartISO`), venue, maps link, programme, hosts, photos, poem, `whatsappNumber`. Edit here, not in HTML.
- `js/app.js` — rendering, personalisation, countdown, gallery lightbox, petals, WhatsApp RSVP/share.
- `css/style.css` — baby-girl pastel pink theme.
- `img/` — `bal-ganesh.jpg`, `hero.jpg`, `photo1-5.jpg`, `icons/` (Lucide SVGs). `archive/` holds the original unused photos and is not deployed.

## Link format

`index.html?to=Naam-Surname&f=1` — `to` (hyphen/underscore = space) is shown as "आदरणीय … जी"; `f=1` or `f=true` adds "सपरिवार सादर आमंत्रित", otherwise only the name. Guest text is inserted with `textContent` (never innerHTML).

## Rules

- All asset paths must stay **relative** (site is served from `user.github.io/<repo>/`).
- All user-facing copy is Hindi; `<html lang="hi">`.
- RSVP is WhatsApp-based (`wa.me/<whatsappNumber>`); the form is hidden while `whatsappNumber` is empty.
- Test locally: `python3 -m http.server 8000`, then open `http://localhost:8000/`.
