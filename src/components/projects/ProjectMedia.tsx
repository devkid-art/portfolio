import Image from 'next/image';
import type { Project } from '@/content/types';
import { publicFileExists } from './media';
import { ProjectVideo } from './ProjectVideo';

/**
 * Poster as a responsive, lazy image (the video only arrives near the screen), or a
 * typographic watermark when nothing was captured — never a broken image.
 * `priority` is for the case-study header, where the poster is the largest paint.
 */
export function ProjectMedia({ project, label, priority = false }: { project: Project; label: string; priority?: boolean }) {
  const { poster, video } = project.media;
  const hasPoster = publicFileExists(poster);
  const hasVideo = Boolean(video && publicFileExists(`${video}.mp4`));

  const image = hasPoster ? (
    <Image
      src={poster}
      alt={label}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
      className="object-cover object-top"
    />
  ) : null;

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-line bg-bg">
      {hasPoster && hasVideo ? (
        <ProjectVideo base={video!} label={label}>
          {image}
        </ProjectVideo>
      ) : hasPoster ? (
        image
      ) : (
        // Decorative watermark (SVG, not text): the code already appears on the ticket stub.
        <svg aria-hidden="true" viewBox="0 0 400 250" className="h-full w-full">
          <text x="200" y="140" textAnchor="middle" className="fill-line font-stencil text-[56px] font-extrabold">
            {project.code}
          </text>
        </svg>
      )}
    </div>
  );
}
