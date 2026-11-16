'use client';

import { useRef } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';
import { gsap, useGSAP } from '@/lib/gsap';

/** Counts up once when visible, like a departure board settling. The real value is in the HTML. */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduced } = useMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.1,
        ease: 'power2.out',
        snap: { n: 1 },
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = String(counter.n);
        },
        onStart: () => {
          if (ref.current) ref.current.textContent = '0';
        },
      });
    },
    { dependencies: [reduced, value] },
  );

  return <span ref={ref}>{value}</span>;
}
