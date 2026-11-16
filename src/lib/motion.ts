'use client';

import { useEffect, type DependencyList, type RefObject } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { whenIdle } from './idle';

type Gsap = typeof import('gsap').gsap;
type ScrollTriggerType = typeof import('gsap/ScrollTrigger').ScrollTrigger;
export type MotionKit = { gsap: Gsap; ScrollTrigger: ScrollTriggerType };

let kit: Promise<MotionKit> | null = null;

/** GSAP and ScrollTrigger are fetched on demand, never in the first-load bundle. */
export function loadMotionKit(): Promise<MotionKit> {
  kit ??= Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  });
  return kit;
}

/**
 * Runs a GSAP setup once the page is idle and GSAP has loaded — only with full motion.
 * Everything created inside is scoped to `scope` and reverted on unmount or when motion changes.
 */
export function useScrollMotion(
  scope: RefObject<HTMLElement | null>,
  setup: (kit: MotionKit, root: HTMLElement) => void | (() => void),
  deps: DependencyList = [],
) {
  const { reduced } = useMotion();

  useEffect(() => {
    if (reduced || !scope.current) return;
    let cancelled = false;
    let ctx: ReturnType<Gsap['context']> | undefined;
    let extra: void | (() => void);
    const cancelIdle = whenIdle(() => {
      loadMotionKit().then((k) => {
        const root = scope.current;
        if (cancelled || !root) return;
        ctx = k.gsap.context(() => {
          extra = setup(k, root);
        }, root);
      });
    });
    return () => {
      cancelled = true;
      cancelIdle();
      if (typeof extra === 'function') extra();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup is re-created each render by design
  }, [reduced, ...deps]);
}
