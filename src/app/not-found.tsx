import Link from 'next/link';
import { fontVariables } from '@/app/fonts';

// Paths outside /fr and /en never reach the locale layout, so this page brings its own <html>.
export default function RootNotFound() {
  return (
    <html lang="fr" className={fontVariables}>
      <body>
        <main className="mx-auto max-w-[1240px] px-5 py-24 md:px-8">
          <p className="font-stencil text-2xl font-extrabold text-accent">404</p>
          <h1 className="mt-2 font-display text-5xl font-extrabold">Page introuvable — Page not found</h1>
          <p className="mt-6 flex gap-4">
            <Link href="/fr" className="font-semibold text-indigo underline">
              Accueil
            </Link>
            <Link href="/en" className="font-semibold text-indigo underline">
              Home
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
