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
  
  const maxContribution = Math.max(...sorted.map(c => Math.abs(c.contribution)), 0.01);

  return (
    <div className="card p-6 bg-white border border-slate-200 shadow-sm">
      <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Telemetry & Road Impact Factors (SHAP XAI)</h3>
          <p className="mt-1 text-xs text-slate-500">
            Key operational telemetry and road surface variables driving the maintenance risk probability.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-1.5 text-red-600">
            <span className="h-2.5 w-2.5 rounded-xs bg-red-500"></span>
            <span>Increases Risk</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600">
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500"></span>
            <span>Reduces Risk</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.map(({ feature, value, contribution }) => {
          const isRiskIncr = contribution > 0;
          return (
            <div key={feature} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 text-sm">{feature}</span>
                  <span className="ml-2.5 text-xs text-slate-400 font-mono">
                    Observed: {typeof value === 'number' ? value.toFixed(2) : value}
                  </span>
                </div>
                <div
                  className={`font-mono text-xs font-bold ${isRiskIncr ? 'text-red-600' : 'text-emerald-600'}`}
                >
                  {isRiskIncr ? '+' : ''}{contribution.toFixed(3)} SHAP
                </div>
              </div>

              {/* Visual Bar */}
              <div className="relative h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`absolute top-0 h-full rounded-full transition-all duration-500 ${
                    isRiskIncr ? 'bg-red-500' : 'bg-emerald-500'
                  }`}
                  style={{
                    width: `${Math.min((Math.abs(contribution) / maxContribution) * 100, 100)}%`,
                    left: 0,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/50 p-3.5 flex items-start gap-2.5">
        <span className="text-base">💡</span>
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Explainable AI Insight:</span> Features with positive SHAP values are actively accelerating component wear for this vehicle. Priorities should focus on top-contributing telemetry alerts.
        </p>
      </div>
    </div>
  );
}
