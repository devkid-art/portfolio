# Ruben — portfolio

Mon portfolio de développeur full-stack web & mobile : étudiant en génie logiciel à Nanjing Tech University, Camerounais vivant en Chine, je construis des produits qui relient l’Afrique et la Chine.

*My full-stack web & mobile developer portfolio — a software engineering student at Nanjing Tech University, Cameroonian living in China, building products that connect Africa and China.*

## Le concept — « Je construis des ponts »

- **Une route** qui se dessine au défilement, avec chaque projet comme escale.
- **Des billets de fret** : code de suivi, trajet (DLA ⟶ NKG), QR code vers le site et sceau de statut couleur cinabre.
- **Un globe 3D** dont les arcs relient le Cameroun et la Chine.
- **Une direction artistique** qui croise l’indigo du ndop (Grassfields du Cameroun) et le rouge des sceaux chinois. Voir [DESIGN.md](DESIGN.md).

## Stack

Next.js 16 (App Router, génération statique) · React 19 · TypeScript · Tailwind CSS 4 · next-intl (FR/EN) · MDX · GSAP + ScrollTrigger · Lenis · Three.js / React Three Fiber · next/og · Vitest · Playwright + axe

## Qualité

- Tests unitaires (Vitest) et de bout en bout (Playwright), y compris sans JavaScript, sans WebGL, en mouvement réduit et sur un téléphone de 375 px.
- Audit d’accessibilité axe (WCAG 2.2 AA), mode clair et sombre.
- Les animations et la 3D se chargent à la demande, après le premier affichage.

## Lancer en local

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # tests unitaires
npm run e2e          # tests de bout en bout
```

`node scripts/capture/capture.mjs` refait les captures et les vidéos des projets.
