'use client';

import { useRef } from 'react';
import { useScrollMotion } from '@/lib/motion';

/**
 * From 768 px with full motion, the tickets scroll sideways while the section is pinned.
 * Otherwise (phones, reduced motion, no JS) they simply stack.
 */
export function HorizontalPin({ header, children }: { header: React.ReactNode; children: React.ReactNode }) {
  const section = useRef<HTMLDivElement>(null);

  useScrollMotion(section, ({ gsap }, root) => {
    const track = root.querySelector<HTMLElement>('.pin-track')!;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 48rem)', () => {
      const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
    return () => mm.revert();
  });

  return (
    <div ref={section} className="overflow-hidden py-16 md:py-20">
      {header}
      <div className="pin-track mx-auto mt-10 flex max-w-[1240px] flex-col gap-8 px-5 md:px-8">{children}</div>
    </div>
  );
}
