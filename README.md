# Vision Glow — Deploy

## Pousser sur GitHub

```bash
cd vision-glow
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<ton-user>/vision-glow.git
git push -u origin main
```

(Crée le repo vide sur github.com d'abord, sans README ni .gitignore.)

## Déploiement sur Vercel via GitHub (recommandé)

1. [vercel.com](https://vercel.com) → connecte ton compte GitHub
2. **Add New Project** → sélectionne le repo `vision-glow`
3. Framework Preset : **Other** (laisse tel quel)
4. **Deploy** → ~30 secondes, URL générée
5. Chaque `git push` redéploie automatiquement

## Alternative : drag & drop sans Git

1. [vercel.com](https://vercel.com) → **Add New Project** → **Deploy**
2. Drag & drop le dossier décompressé
3. ~30 secondes → URL `https://vision-glow-xxx.vercel.app`

## Déploiement sur Netlify (alternative)

1. Va sur [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop le dossier décompressé
3. URL générée immédiatement

## Connecter ton domaine custom

1. Achète ton domaine (Gandi, OVH, Namecheap → ~12€/an)
2. Dans Vercel : **Project Settings → Domains → Add Domain**
3. Vercel te donne les DNS à configurer chez ton registrar
4. Propagation 5min à quelques heures

## Structure

- `index.html` — page d'accueil
- `projects.html` — liste des projets (accessible sur `/projects`)
- `project.html` — détail projet (accessible sur `/project?id=01`)
- `sections/` — les sections React (hero, services, pricing…)
- `app.jsx`, `hooks.jsx`, etc. — code partagé
- `styles.css` — styles globaux
- `vercel.json` — config URLs propres

## Avant de mettre en prod, à faire idéalement

- [ ] Ajouter un favicon (PNG 32x32 + SVG)
- [ ] Compléter les mentions légales (obligatoires en France)
- [ ] Connecter le formulaire de contact à un vrai service (Formspree, Resend)
- [ ] Ajouter des meta tags OpenGraph (preview LinkedIn/Twitter)
- [ ] Précompiler le JSX (perfs) — me demander pour un setup Vite si besoin
