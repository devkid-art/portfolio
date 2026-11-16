'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { useMotion } from './MotionProvider';

type Variant = 'rise' | 'stamp';

const FROM: Record<Variant, gsap.TweenVars> = {
  rise: { y: 24, opacity: 0, duration: 0.6, ease: 'power3.out' },
  // The seal "hits" the ticket: oversized and tilted, then settles.
  stamp: { scale: 1.4, rotate: -14, opacity: 0, duration: 0.28, ease: 'back.out(2.2)' },
};

/**
 * Plays once when scrolled into view. Rendered fully visible on the server and in reduced
 * motion: the hidden state only exists while GSAP is animating.
 */
export function Reveal({
  as: Tag = 'div',
  variant = 'rise',
  delay = 0,
  className,
  children,
}: {
  as?: 'div' | 'span' | 'li' | 'section';
  variant?: Variant;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, {
        ...FROM[variant],
        delay,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { dependencies: [reduced, variant, delay] },
  );

  return (
    // @ts-expect-error — polymorphic ref on a union of intrinsic elements
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
