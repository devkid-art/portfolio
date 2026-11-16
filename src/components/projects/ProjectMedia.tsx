import Image from 'next/image';
import type { Project } from '@/content/types';
import { publicFileExists } from './media';
import { ProjectVideo } from './ProjectVideo';

/** Video if recorded, else poster, else a typographic placeholder — never a broken image. */
export function ProjectMedia({ project, label }: { project: Project; label: string }) {
  const { poster, video } = project.media;
  const hasPoster = publicFileExists(poster);
  const hasVideo = Boolean(video && publicFileExists(`${video}.mp4`));

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] border border-line bg-bg">
      {hasPoster && hasVideo ? (
        <ProjectVideo base={video!} poster={poster} label={label} />
      ) : hasPoster ? (
        <Image src={poster} alt={label} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover object-top" />
      ) : (
        // Decorative watermark (SVG, not text): the code already appears on the ticket stub.
        <svg aria-hidden="true" viewBox="0 0 400 250" className="h-full w-full">
          <text
            x="200"
            y="140"
            textAnchor="middle"
            className="fill-line font-stencil text-[56px] font-extrabold"
          >
            {project.code}
          </text>
        </svg>
      )}
    </div>
  );
}
