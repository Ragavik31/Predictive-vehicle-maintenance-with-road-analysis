export interface HeroProps {
  label: string;
  heading: string;
  subheading: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  visualContent?: React.ReactNode;
}

export function Hero({
  label,
  heading,
  subheading,
  primaryCta,
  secondaryCta,
  visualContent,
}: HeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:py-20 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
        {/* Text Content */}
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
            {label}
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-400">
            {subheading}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {primaryCta && (
              <a
                href={primaryCta.href}
                className="focus-ring inline-flex items-center justify-center rounded-xl bg-teal-300 px-6 py-3 text-base font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200"
              >
                {primaryCta.label}
              </a>
            )}
            {secondaryCta && (
              <a
                href={secondaryCta.href}
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3 text-base font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>

        {/* Visual Content */}
        {visualContent && (
          <div className="flex justify-center lg:justify-end">
            {visualContent}
          </div>
        )}
      </div>
    </section>
  );
}
