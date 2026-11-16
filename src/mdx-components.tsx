import type { MDXComponents } from 'mdx/types';
import { Architecture } from '@/components/case/Architecture';

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 font-display text-[clamp(1.9rem,4vw,2.6rem)] font-extrabold leading-none" {...props} />,
  h3: (props) => <h3 className="mt-8 font-display text-2xl font-bold text-indigo" {...props} />,
  p: (props) => <p className="mt-4 max-w-[68ch]" {...props} />,
  ul: (props) => <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-6 marker:text-accent" {...props} />,
  ol: (props) => <ol className="mt-4 max-w-[68ch] list-decimal space-y-2 pl-6 marker:font-semibold" {...props} />,
  strong: (props) => <strong className="font-semibold text-fg" {...props} />,
  code: (props) => <code className="rounded bg-surface px-1.5 py-0.5 text-[0.9em]" {...props} />,
  a: (props) => <a className="font-semibold text-indigo underline decoration-2 underline-offset-4" {...props} />,
  Architecture,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
