export function Section({ eyebrow, title, description, children }: { eyebrow?: string; title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <div className="mb-5 max-w-3xl">
        {eyebrow && <div className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-600">{eyebrow}</div>}
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
        {description && <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{description}</p>}
      </div>
      {children}
    </section>
  );
}
