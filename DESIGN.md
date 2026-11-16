# DESIGN.md — « Je construis des ponts »

## Sujet

Le portfolio d'un développeur camerounais qui étudie et construit en Chine. Ses produits relient l'Afrique francophone et la Chine : des étudiants, des colis, des engins, des commerces. Le site emprunte le vocabulaire **du fret** (lettres de transport, codes de suivi, tampons, routes) et celui des **deux cultures** :

- le **ndop**, tissu royal indigo et blanc des Grassfields du Cameroun ;
- le **sceau cinabre** (印章) chinois.

## Couleurs

| Rôle | Clair | Sombre | Origine |
|---|---|---|---|
| `--color-bg` papier de lettre de transport | `#F1F3F7` | `#0D1436` | papier avion bleuté / nuit indigo |
| `--color-surface` billet | `#FFFFFF` | `#141C45` | |
| `--color-fg` encre | `#141A3D` | `#EDF0F8` | encre indigo |
| `--color-muted` | `#545C80` | `#A5ADCC` | |
| `--color-indigo` ndop | `#1F2C78` | `#8C9BFF` | teinture indigo du ndop |
| `--color-accent` cinabre | `#C8281E` | `#FF6B5E` | 朱砂, le rouge des sceaux |
| `--color-line` | `#C9CFDF` | `#2B3566` | |

Règles :
- L'indigo porte la structure : la ligne de route, les liens et les titres secondaires.
- Le cinabre est réservé aux **tampons de statut**, au **point en mouvement sur la route** et à l'**action principale**. Jamais en aplat décoratif.
- Aucun dégradé décoratif.

## Typographie

- **Big Shoulders** (titres) : grotesque condensée industrielle, la famille des marquages de conteneurs. Le nom en très grand (opsz 72, graisse 800), resserré.
- **Big Shoulders Stencil** : uniquement pour les codes de suivi (`PRJ-SNC-001`) et les tampons. Le pochoir rappelle les caisses de fret.
- **Archivo** (texte) : grotesque lisible, accents français soignés. Corps de 17 px sur mobile et 18 px au-delà, interligne 1,6, lignes de 70 caractères au plus.
- Pas de capitales sur les étiquettes et pas de mono pour la décoration. Les sinogrammes (南京工业大学) tombent sur la police système.

Échelle : 14 / 17 / 21 / 28 / 40 / 64 / 112 / 168 px (approximativement ×1,333, avec un saut pour l'affiche).

## Mise en page

Alignement à gauche et grille de 12 colonnes, contenu sur 1 240 px au plus. La **ligne de route** court dans la marge gauche, comme une piqûre de ndop ou un trajet sur une carte, et relie les sections.

```
┌ Ruben ───────────────────────────── FR | EN  ◐ ┐
│ RUBEN                         ·  globe 3D  ·   │
│ Développeur full-stack                          │
│ web & mobile         Douala ⟶ Nankin (arc)     │
│ [Voir mes projets] [GitHub]                     │
├─┬───────────────────────────────────────────────┤
│ │  Billet  ┊ talon : code, QR, tampon           │  ← défilement horizontal épinglé
│ ●  Billet  ┊                                    │     (pile verticale sur mobile)
│ │                                               │
│ ●  Compétences avec preuves                     │
│ ●  Comment je travaille (vraie séquence)        │
│ ●  Contact — bande ndop indigo                  │
└─────────────────────────────────────────────────┘
```

## Composants signature

- **Le billet de projet.** Corps et talon séparés par une perforation (deux encoches rondes et des tirets). Le talon porte le code, le QR et le tampon. Rayon de 14 px sur le billet ; les éléments internes sont droits.
- **Le tampon.** Un rectangle ou cercle cinabre légèrement tourné (−6° à 4°), texte en Big Shoulders Stencil, contour irrégulier en SVG. C'est **la seule fantaisie** du site.
- **La ligne de route.** Un tracé indigo en tirets, avec un point cinabre qui avance au défilement.
- **La bande ndop.** Un motif géométrique blanc sur indigo (lignes, losanges, cercles), uniquement derrière la section contact.

## Mouvement

- **Un moment orchestré au chargement.** L'arc Douala → Nankin se trace sur le globe pendant que le nom apparaît.
- **Au défilement.** La ligne de route se dessine et chaque tampon « frappe » son billet (échelle 1,4 → 1 avec une rotation, 280 ms). Rien d'autre n'entre en fondu.
- **En réponse à l'utilisateur.** Survol d'un billet (léger soulèvement), activation d'une compétence (les billets concernés s'allument).
- **Mouvement réduit.** Ni globe, ni Lenis, ni ScrollTrigger. Tout est visible et à sa place.

## Écriture

Phrases simples à la première personne, des faits plutôt que des superlatifs. Des boutons qui disent ce qu'ils font : « Voir mes projets », « Voir l'étude de cas », « Ouvrir le site ». Pas de « → » ajouté aux liens.
