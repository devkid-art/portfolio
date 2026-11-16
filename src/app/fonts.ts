import { Archivo, Big_Shoulders, Big_Shoulders_Stencil } from 'next/font/google';

// Kept lean for slow mobile networks: the 'latin' subset covers French and English accents,
// the variable files carry only the weight axis, and the stencil face (used below the fold
// for codes and stamps) is not preloaded.

export const display = Big_Shoulders({
  subsets: ['latin'],
  variable: '--font-display',
  adjustFontFallback: false,
  display: 'swap',
});

export const stencil = Big_Shoulders_Stencil({
  subsets: ['latin'],
  weight: '800',
  variable: '--font-stencil',
  adjustFontFallback: false,
  display: 'swap',
  preload: false,
});

export const body = Archivo({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const fontVariables = `${display.variable} ${stencil.variable} ${body.variable}`;
