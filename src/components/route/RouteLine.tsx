'use client';

import { useRef } from 'react';
import { useScrollMotion } from '@/lib/motion';

/**
 * The route: a dashed track in the left margin that fills in indigo as you scroll,
 * with a cinnabar dot travelling along it. Decorative only.
 */
export function RouteLine() {
  const root = useRef<HTMLDivElement>(null);

  useScrollMotion(root, ({ gsap }, el) => {
    const scrollTrigger = { trigger: el.parentElement, start: 'top 60%', end: 'bottom 80%', scrub: 0.4 };
    gsap.fromTo(el.querySelector('[data-fill]'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger });
    gsap.fromTo(el.querySelector('[data-dot]'), { top: '0%' }, { top: '100%', ease: 'none', scrollTrigger });
  });

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[max(6px,calc((100vw-1240px)/2-22px))] w-3"
    >
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-line" />
      <div data-fill="" className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 origin-top scale-y-0 bg-indigo" />
      <span data-dot="" className="absolute left-1/2 top-0 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-bg" />
    </div>
  );
}
