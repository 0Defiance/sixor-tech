# SIXOR-TECH — Site vitrine

Ce répertoire contient une version statique one-page du site SIXOR-TECH, générée depuis le cahier technique.

Arborescence attendue:

```
sixor-tech/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logosixortech.png
│   └── icons/
└── README.md
```

Remarques et actions à mener:
- Remplacer `/images/logosixortech.png` par votre image/logo principale optimisée (WebP ou PNG) pour le hero, le logo et le favicon.
- Remplacer le `action` du formulaire dans `index.html` par votre endpoint Formspree/Web3Forms/EmailJS.
- Le site utilise Bootstrap 5 CDN pour la grille et la réactivité; le CSS principal est dans `css/style.css`.

Déploiement rapide (GitHub Pages / Netlify / Vercel):

```bash
# initialiser git si nécessaire
git init
git add .
git commit -m "Initial site scaffold"
# pousser sur GitHub et activer Pages, ou déployer via Netlify/Vercel
```

Tests locaux simples:

```bash
# ouvrir index.html dans un navigateur
xdg-open index.html
```

