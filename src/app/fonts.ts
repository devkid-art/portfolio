import { Archivo, Big_Shoulders, Big_Shoulders_Stencil } from 'next/font/google';

export const display = Big_Shoulders({
  subsets: ['latin', 'latin-ext'],
  axes: ['opsz'],
  variable: '--font-display',
  adjustFontFallback: false,
  display: 'swap',
});

export const stencil = Big_Shoulders_Stencil({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-stencil',
  adjustFontFallback: false,
  display: 'swap',
});

export const body = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-body',
  display: 'swap',
});

export const fontVariables = `${display.variable} ${stencil.variable} ${body.variable}`;
