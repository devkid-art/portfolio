'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { whenIdle } from '@/lib/idle';

const REDUCE = '(prefers-reduced-motion: reduce)';
const MotionContext = createContext({ reduced: true });

/** One switch for every animation: data-motion on <html>, smooth scrolling only in full mode. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  // Server render and first paint assume reduced motion: nothing is hidden before JS decides.
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const query = matchMedia(REDUCE);
    const apply = () => {
      document.documentElement.dataset.motion = query.matches ? 'reduced' : 'full';
      setReduced(query.matches);
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let cancelled = false;
    let teardown: (() => void) | undefined;
    // Lenis and GSAP are loaded when the page is idle, off the first-load path.
    const cancelIdle = whenIdle(() => {
      Promise.all([import('lenis'), import('@/lib/motion').then((m) => m.loadMotionKit())]).then(
        ([{ default: Lenis }, { gsap, ScrollTrigger }]) => {
          if (cancelled) return;
          const lenis = new Lenis({ lerp: 0.12 });
          lenis.on('scroll', ScrollTrigger.update);
          const tick = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          teardown = () => {
            gsap.ticker.remove(tick);
            lenis.destroy();
          };
        },
      );
    });
    return () => {
      cancelled = true;
      cancelIdle();
      teardown?.();
    };
  }, [reduced]);

  return <MotionContext.Provider value={{ reduced }}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
