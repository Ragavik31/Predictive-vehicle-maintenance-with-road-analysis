export function Section({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <div className="mb-8 max-w-3xl">
        {eyebrow && <div className="mb-2 text-xs font-semibold uppercase tracking-[.18em] text-teal-300">{eyebrow}</div>}
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        {description && <p className="mt-4 text-base leading-7 text-slate-400">{description}</p>}
      </div>
      {children}
    </section>
  );
}
