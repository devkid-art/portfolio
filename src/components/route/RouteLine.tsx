'use client';

import { useRef } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * The route: a dashed track in the left margin that fills in indigo as you scroll,
 * with a cinnabar dot travelling along it. Decorative only.
 */
export function RouteLine() {
  const root = useRef<HTMLDivElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const trigger = root.current.parentElement;
      const scrollTrigger = { trigger, start: 'top 60%', end: 'bottom 80%', scrub: 0.4 };
      gsap.fromTo(fill.current, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger });
      gsap.fromTo(dot.current, { top: '0%' }, { top: '100%', ease: 'none', scrollTrigger });
    },
    { dependencies: [reduced], scope: root },
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[max(6px,calc((100vw-1240px)/2-22px))] w-3"
    >
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-line" />
      <div ref={fill} className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 origin-top scale-y-0 bg-indigo" />
      <span ref={dot} className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-bg" />
    </div>
  );
}
