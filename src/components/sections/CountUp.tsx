'use client';

import { useRef } from 'react';
import { useScrollMotion } from '@/lib/motion';

/** Counts up once when visible, like a departure board settling. The real value is in the HTML. */
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useScrollMotion(
    ref,
    ({ gsap }, root) => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.1,
        ease: 'power2.out',
        snap: { n: 1 },
        scrollTrigger: { trigger: root, start: 'top 90%', once: true },
        onStart: () => {
          root.textContent = '0';
        },
        onUpdate: () => {
          root.textContent = String(counter.n);
        },
        onComplete: () => {
          root.textContent = String(value);
        },
      });
      return () => {
        root.textContent = String(value);
      };
    },
    [value],
  );

  return <span ref={ref}>{value}</span>;
}
