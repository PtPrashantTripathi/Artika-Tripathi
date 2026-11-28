# अर्तिका का प्रथम जन्मदिवस — निमंत्रण वेबसाइट

Static site (कोई server/Node नहीं)। GitHub Pages पर चलती है।

## Deploy
1. Repo को GitHub पर push करें।
2. Settings → Pages → **Source: GitHub Actions**।
3. `main` पर push होते ही site live: `https://<username>.github.io/<repo>/`

## लिंक बनाना
`https://<username>.github.io/<repo>/admin.html` खोलें (कोई password नहीं), नाम लिखें, सपरिवार चुनें, लिंक कॉपी/WhatsApp करें।

## बदलाव
- सारी जानकारी, WhatsApp नंबर: `js/invitation.js`
- असली फ़ोटो: `img/` में उसी नाम से (`hero.jpg`, `photo1.jpg` … `photo4.jpg`) बदलें
- Local चलाने के लिए: `python3 -m http.server 8000`

नोट: WhatsApp link-preview में फ़ोटो दिखाने के लिए `index.html` में `og:image` को पूरा URL (`https://…/img/hero.jpg`) कर दें।
