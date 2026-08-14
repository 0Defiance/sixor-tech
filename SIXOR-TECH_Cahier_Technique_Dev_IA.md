# Cahier technique — Site vitrine SIXOR-TECH
*Document destiné à être soumis à un assistant IA de développement (Claude, Copilot, ChatGPT, Cursor, etc.) pour générer le site de A à Z.*

## 0. Instruction à donner à l'IA

> Tu es un développeur front-end expert. À partir des spécifications ci-dessous, génère un site vitrine **one-page** complet en **HTML5 / CSS3 / JavaScript vanilla (ES6)**, **sans aucun backend ni base de données**. Respecte strictement l'arborescence de fichiers, les `id`/classes indiqués, le contenu textuel fourni, la palette de couleurs et le responsive. Livre un code commenté, propre, sémantique et prêt à être déployé sur Netlify, Vercel ou GitHub Pages.

## 1. Présentation du projet

- **Nom** : SIXOR-TECH
- **Structure** : start-up
- **Type de site** : vitrine one-page (une seule page HTML, navigation par ancres)
- **Activité** : développement web/mobile, design graphique, solutions informatiques, marketing digital
- **Cible** : entreprises, commerces, particuliers

## 2. Contraintes techniques impératives

- Aucun backend, aucune base de données
- HTML5 + CSS3 + JavaScript ES6 vanilla uniquement
- Un seul framework CSS autorisé : **Tailwind CSS (CDN)** *ou* **Bootstrap 5** — choisir l'un des deux, pas les deux
- 100 % responsive (mobile / tablette / desktop)
- Compatible hébergement statique gratuit (Netlify, Vercel, GitHub Pages)
- Formulaire de contact fonctionnel sans backend, via **Formspree**, **Web3Forms** ou **EmailJS**
- Code sémantique, commenté, accessible (`alt`, `aria-*`)

## 3. Arborescence de fichiers imposée

```
sixor-tech/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── logo.svg
│   ├── hero-bg.jpg
│   └── icons/
├── favicon.ico
└── README.md
```

## 4. Palette de couleurs — variables CSS

```css
:root {
  --color-white: #FFFFFF;   /* fond général, cartes */
  --color-black: #1A1A1A;   /* header, footer, titres, textes importants */
  --color-accent: #E8B000;  /* jaune du logo — À REMPLACER par le code exact extrait du logo */
  --color-gray-text: #444444; /* texte courant / sous-titres */
}
```

**Règle de contraste** : le jaune (`--color-accent`) s'utilise sur boutons, liens actifs, icônes et survol (hover) — jamais en texte fin sur fond blanc (problème de contraste WCAG).

## 5. Typographie

- Google Fonts : **Poppins** (titres, gras) + **Inter** (texte courant)
- Échelle : H1 ≈ 40–48px · H2 ≈ 28–32px · texte courant ≈ 16px · sous-titres ≈ 18–20px

## 6. Breakpoints responsive (mobile-first)

| Breakpoint | Largeur |
|---|---|
| Mobile (défaut) | < 640px |
| Tablette | ≥ 768px |
| Desktop | ≥ 1024px |
| Large desktop | ≥ 1280px |

## 7. Structure détaillée des sections (contenu exact à intégrer)

### 7.1 En-tête — `<header id="header">`
- Logo SIXOR-TECH à gauche (lien vers `#header`)
- Nav à droite (desktop), menu burger (mobile), ancres : Accueil `#header`, À propos `#about`, Services `#services`, Contact `#contact`
- *(évolution future : ajouter "Réalisations & témoignages")*
- JS : toggle menu burger mobile (classe `.is-open` + `aria-expanded`)

### 7.2 Hero — `<section id="hero">`
- Fond : image informatique en `background-image` CSS (+ overlay sombre optionnel pour la lisibilité)
- H1 : *« SIXOR-TECH, votre partenaire en solutions numériques innovantes »*
- Sous-titre : *« Nous accompagnons les entreprises, commerces et particuliers dans leur transformation digitale grâce à des solutions technologiques modernes et performantes. »*
- 3 boutons alignés horizontalement (flex, `wrap` sur mobile) : « À propos de nous » → `#about` · « Découvrir nos services » → `#services` · « Nous contacter » → `#contact`

### 7.3 À propos — `<section id="about">`
- H2 : *« Qui sommes-nous ? »*
- Texte : *« SIXOR-TECH est une entreprise spécialisée dans le développement de solutions numériques adaptées aux besoins des entreprises et des particuliers. Notre mission est d'aider nos clients à améliorer leur productivité et leur visibilité grâce à la technologie. »*
- 4 valeurs (badges ou liste à puces) : Innovation, Professionnalisme, Qualité, Satisfaction client

### 7.4 Services — `<section id="services">`
- H2 : *« Nos Services »*
- Grille de cartes : 1 colonne mobile / 2 colonnes tablette / 3 colonnes desktop
- 5 cartes (icône + titre + description) :
  1. **Développement Web** — Création de sites vitrines, plateformes web et applications sur mesure
  2. **Développement Mobile** — Applications Android et iOS adaptées aux besoins de votre activité
  3. **Design Graphique** — Conception de logos, affiches, flyers, identités visuelles et supports de communication
  4. **Solutions Informatiques** — Installation, maintenance et accompagnement informatique
  5. **Marketing Digital** *(à confirmer)* — Gestion des réseaux sociaux et stratégies de visibilité en ligne

### 7.5 Contact — `<section id="contact">`
- H2 : *« Contactez-nous »*
- Formulaire (`method="POST"`, `action` = endpoint Formspree/Web3Forms/EmailJS) :
  - Nom complet — `input type="text" required`
  - Email — `input type="email" required`
  - Téléphone — `input type="tel"`
  - Sujet — `input type="text"`
  - Message — `textarea required`
  - Bouton « Envoyer » — `type="submit"`
  - JS : envoi via `fetch()` vers le endpoint (sans rechargement de page) + message de confirmation/erreur
- Infos de contact : adresse, téléphone, email, réseaux sociaux (Facebook, LinkedIn, Instagram, WhatsApp — icônes Font Awesome + liens)
- Carte Google Maps intégrée en `<iframe>` (embed standard, sans clé API)

### 7.6 Pied de page — `<footer>`
- Logo SIXOR-TECH
- Liens rapides (ancres) : Accueil, Services, Contact
- Copyright : *« © 2026 SIXOR-TECH. Tous droits réservés. »*

## 8. SEO & métadonnées (`<head>`)

- `<html lang="fr">`
- `<title>SIXOR-TECH | Solutions numériques innovantes</title>`
- `<meta name="description">` reprenant le sous-titre du hero (adapté SEO, ~155 caractères)
- Balises Open Graph : `og:title`, `og:description`, `og:image`
- Favicon

## 9. Accessibilité & performance

- Balises sémantiques : `header`, `nav`, `main`, `section`, `footer`
- `alt` sur toutes les images
- Contraste conforme WCAG AA
- Images optimisées (WebP si possible), `loading="lazy"` sur les visuels hors écran initial
- Un seul fichier CSS + un seul fichier JS, aucune dépendance lourde inutile

## 10. Déploiement

1. `git init` puis push sur un dépôt GitHub


## 11. Livrables attendus de l'IA

- `index.html` complet
- `css/style.css` complet (variables CSS de la charte incluses)
- `js/main.js` (menu burger + gestion du formulaire de contact)
- Code commenté, prêt à l'emploi, sans erreur console
