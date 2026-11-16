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
    if (reduced || !supportsWebGL()) {
      setEnabled(false);
      setReady(false);
      return;
    }
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 400));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = idle(() => setEnabled(true));
    return () => cancel(id);
  }, [reduced]);

  useEffect(() => {
    if (!box.current) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(box.current);
    return () => observer.disconnect();
  }, []);

  const handleReady = useCallback(() => setReady(true), []);

  return (
    <div ref={box} data-globe="" role="img" aria-label={label} className="relative aspect-square w-full">
      <div aria-hidden="true" className={`transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
      {enabled && (
        <div className="absolute inset-0">
          <Globe active={onScreen} onReady={handleReady} />
        </div>
      )}
    </div>
  );
}
