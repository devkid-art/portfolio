import Image from 'next/image';
import { publicFileExists } from '@/components/projects/media';
import type { Project } from '@/content/types';

/** Screenshots that exist on disk; renders nothing until captures are made. */
export function Gallery({ project, title }: { project: Project; title: string }) {
  const shots = project.media.shots.filter(publicFileExists);
  if (shots.length === 0) return null;
  return (
    <section aria-label={title} className="mt-16">
      <h2 className="font-display text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-none">{title}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {shots.map((src, i) => (
          <div key={src} className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-line">
            <Image src={src} alt={`${project.name} — ${i + 1}`} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover object-top" />
          </div>
        ))}
      </div>
    </section>
  );
}
