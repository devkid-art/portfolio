'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';

/**
 * Plays the loop over the poster image once the ticket is close to the screen. Nothing is
 * downloaded before that, and reduced motion keeps the still image.
 */
export function ProjectVideo({ base, label, children }: { base: string; label: string; children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { reduced } = useMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (reduced || !box.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setMounted(true);
        const v = video.current;
        if (!v) return;
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: '200px 0px', threshold: 0.2 },
    );
    observer.observe(box.current);
    return () => observer.disconnect();
  }, [reduced, mounted]);

  return (
    <div ref={box} className="absolute inset-0">
      {children}
      {mounted && !reduced && (
        <video
          ref={video}
          aria-label={label}
          className="absolute inset-0 h-full w-full object-cover object-top"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        >
          <source src={`${base}.webm`} type="video/webm" />
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
