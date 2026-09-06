interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="card group p-6 transition-all duration-300 hover:border-teal-400/30">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-3xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
