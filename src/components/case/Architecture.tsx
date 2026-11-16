/**
 * A route-style architecture diagram: each layer is a stop, joined by the dashed route.
 * Usage in MDX: <Architecture layers={[{ name: 'Next.js', detail: 'web' }, …]} />
 */
export function Architecture({ layers }: { layers: { name: string; detail?: string }[] }) {
  return (
    <ol className="mt-6 flex flex-col gap-0 md:flex-row md:flex-wrap md:items-stretch">
      {layers.map((layer, i) => (
        <li key={layer.name} className="flex flex-col md:flex-row md:items-center">
          <div className="rounded-[10px] border-2 border-fg bg-surface px-4 py-3">
            <p className="font-display text-xl font-bold leading-tight">{layer.name}</p>
            {layer.detail && <p className="text-sm text-muted">{layer.detail}</p>}
          </div>
          {i < layers.length - 1 && (
            <span
              aria-hidden="true"
              className="mx-auto h-6 border-l-2 border-dashed border-indigo md:mx-0 md:h-0 md:w-8 md:border-l-0 md:border-t-2"
            />
          )}
        </li>
      ))}
    </ol>
  );
}
