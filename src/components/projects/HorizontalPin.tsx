'use client';

import { useRef } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';

/**
 * From 768 px with full motion, the tickets scroll sideways while the section is pinned.
 * Otherwise (phones, reduced motion, no JS) they simply stack.
 */
export function HorizontalPin({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const section = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add('(min-width: 48rem)', () => {
        const el = track.current!;
        const distance = () => Math.max(0, el.scrollWidth - document.documentElement.clientWidth);
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { dependencies: [reduced], scope: section },
  );

  return (
    <div ref={section} className="overflow-hidden py-16 md:py-20">
      {header}
      <div ref={track} className="pin-track mx-auto mt-10 flex max-w-[1240px] flex-col gap-8 px-5 md:px-8">
        {children}
      </div>
    </div>
  );
}
