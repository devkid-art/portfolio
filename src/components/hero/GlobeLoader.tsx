'use client';

import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';

const Globe = dynamic(() => import('./Globe'), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl');
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

/**
 * Shows the server-rendered globe first, then swaps in the 3D one once the page is idle —
 * only with full motion and working WebGL. The 3D loop pauses when the globe is off-screen.
 */
export function GlobeLoader({ label, children }: { label: string; children: React.ReactNode }) {
  const { reduced } = useMotion();
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced || !supportsWebGL()) return;
    // three.js only loads on the visitor's first gesture (or after a long pause), so it never
    // competes with the first paint; until then the SVG globe looks the same.
    const GESTURES = ['pointermove', 'pointerdown', 'wheel', 'touchstart', 'keydown', 'scroll'] as const;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      cleanup();
      idle(() => setEnabled(true));
    };
    const timer = window.setTimeout(start, 9000);
    const cleanup = () => {
      window.clearTimeout(timer);
      GESTURES.forEach((g) => window.removeEventListener(g, start));
    };
    GESTURES.forEach((g) => window.addEventListener(g, start, { once: true, passive: true }));
    return cleanup;
  }, [reduced]);

  useEffect(() => {
    if (!box.current) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(box.current);
    return () => observer.disconnect();
  }, []);

  const handleReady = useCallback(() => setReady(true), []);
  // Switching to reduced motion mid-visit drops the 3D globe and shows the static one again.
  const show3d = enabled && !reduced;
  const covered = ready && show3d;

  return (
    <div ref={box} data-globe="" role="img" aria-label={label} className="relative aspect-square w-full">
      <div aria-hidden="true" className={`transition-opacity duration-700 ${covered ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      {show3d && (
        <div className="absolute inset-0">
          <Globe active={onScreen} onReady={handleReady} />
        </div>
      )}
    </div>
  );
}
