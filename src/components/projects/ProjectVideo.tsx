'use client';

import { useEffect, useRef } from 'react';
import { useMotion } from '@/components/motion/MotionProvider';

/** Muted loop that only loads and plays while visible; reduced motion shows the poster only. */
export function ProjectVideo({ base, poster, label }: { base: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const { reduced } = useMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <video
      ref={ref}
      aria-label={label}
      className="h-full w-full object-cover object-top"
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={`${base}.webm`} type="video/webm" />
      <source src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}
