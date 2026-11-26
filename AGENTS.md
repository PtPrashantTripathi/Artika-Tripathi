# AGENTS.md

## Project

Hindi, fully static first-birthday invitation for Artika Tripathi. Plain HTML/CSS/JS — **no Node, no build step** — deployed on GitHub Pages (`.github/workflows/pages.yml` just copies the files).

## Files

- `index.html` — the invitation page (envelope → Ganesha → details → countdown → programme → gallery → poem → RSVP → hosts).
- `admin.html` + `js/admin.js` — link generator (password gate, `to`/`f` link, copy, WhatsApp share, history in localStorage).
- `js/invitation.js` — **single source of truth**: names, date (`eventStartISO`), venue, maps link, programme, hosts, photos, poem, `whatsappNumber`, admin password hash. Edit here, not in HTML.
- `js/app.js` — rendering, personalisation, countdown, gallery lightbox, petals, WhatsApp RSVP/share.
- `css/style.css` — kumkum maroon / gold / ivory theme.
- `img/` — `ganesha.jpg`, `hero.jpg`, `photo1-4.jpg` (currently AI samples; replace with real photos keeping names, ~900px wide JPEG).

## Link format

`index.html?to=Naam-Surname&f=1` — `to` (hyphen/underscore = space) is shown as "आदरणीय … जी"; `f=1` or `f=true` adds "सपरिवार सादर आमंत्रित", otherwise only the name. Guest text is inserted with `textContent` (never innerHTML).

## Rules

- All asset paths must stay **relative** (site is served from `user.github.io/<repo>/`).
- All user-facing copy is Hindi; `<html lang="hi">`.
- RSVP is WhatsApp-based (`wa.me/<whatsappNumber>`); the form is hidden while `whatsappNumber` is empty.
- Admin password is only a client-side SHA-256 check — not real security.
- Test locally: `python3 -m http.server 8000`, then open `http://localhost:8000/` (admin needs https or localhost for `crypto.subtle`).
