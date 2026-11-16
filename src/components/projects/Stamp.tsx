import { Reveal } from '@/components/motion/Reveal';

/** The cinnabar seal: the one playful element of the site (see DESIGN.md). */
export function Stamp({ children, tilt = -6 }: { children: React.ReactNode; tilt?: number }) {
  return (
    <Reveal as="span" variant="stamp" className="inline-block">
      <span
        data-stamp=""
        style={{ rotate: `${tilt}deg` }}
        className="inline-block rounded-[6px] border-[3px] border-accent px-3 py-1 font-stencil text-[1.6rem] font-extrabold leading-none text-accent outline outline-1 outline-offset-2 outline-accent/70"
      >
        {children}
      </span>
    </Reveal>
  );
}
