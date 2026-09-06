interface Contribution {
  feature: string;
  value: number;
  contribution: number;
}

interface FeatureContributionProps {
  contributions: Contribution[];
}

export function FeatureContribution({ contributions }: FeatureContributionProps) {
  // Sort by absolute contribution value
  const sorted = [...contributions].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  
  const maxContribution = Math.max(...sorted.map(c => Math.abs(c.contribution)));

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-white">Why did the model make this prediction?</h3>
        <p className="mt-2 text-sm text-slate-400">
          These are the features that influenced the prediction, shown as contributions. Positive values increase maintenance risk; negative values decrease it.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map(({ feature, value, contribution }) => (
          <div key={feature}>
            <div className="mb-1 flex items-end justify-between">
              <div>
                <div className="font-medium text-white">{feature}</div>
                <div className="text-xs text-slate-500">{value.toFixed(2)}</div>
              </div>
              <div
                className={`font-semibold ${contribution > 0 ? 'text-orange-300' : 'text-emerald-300'}`}
              >
                {contribution > 0 ? '+' : ''}{contribution.toFixed(2)}
              </div>
            </div>

            {/* Bar */}
            <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className={`absolute left-1/2 top-0 h-full transition-all duration-500 ${
                  contribution > 0 ? 'bg-orange-400' : 'bg-emerald-400'
                }`}
                style={{
                  width: `${(Math.abs(contribution) / maxContribution) * 50}%`,
                  transform: contribution < 0 ? 'translateX(-100%)' : 'translateX(0)',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <p className="text-xs text-slate-400">
          💡 <span className="font-medium">Tip:</span> These contributions are based on the model's learned patterns from the training data. They help explain the prediction but should be combined with domain expertise for maintenance decisions.
        </p>
      </div>
    </div>
  );
}
