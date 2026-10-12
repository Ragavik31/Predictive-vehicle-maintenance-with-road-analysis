import { useState } from 'react';

interface Contribution {
  feature: string;
  value: number;
  contribution: number;
}

interface FeatureContributionProps {
  contributions: Contribution[];
}

export function FeatureContribution({ contributions }: FeatureContributionProps) {
  const [showAll, setShowAll] = useState(false);

  // Sort by absolute contribution value
  const sorted = [...contributions].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  const displayed = showAll ? sorted : sorted.slice(0, 8);
  const maxContribution = Math.max(...sorted.map(c => Math.abs(c.contribution)), 0.01);

  return (
    <div className="card p-6 bg-white border border-slate-200 shadow-sm">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">Telemetry & Road Impact Factors (SHAP XAI)</h3>
            <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-700">
              Explainable AI
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Shapley Additive Explanations (SHAP) quantifying exact marginal impact of each CAN sensor & road terrain parameter on maintenance risk.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-red-600">
            <span className="h-2.5 w-2.5 rounded-xs bg-red-500"></span>
            <span>+ Increases Risk</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600">
            <span className="h-2.5 w-2.5 rounded-xs bg-emerald-500"></span>
            <span>- Reduces Risk</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {displayed.map(({ feature, value, contribution }) => {
          const isRiskIncr = contribution > 0;
          const formattedName = feature.replace(/_/g, ' ');
          return (
            <div key={feature} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 hover:bg-slate-50 transition-colors">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm">{formattedName}</span>
                  <span className="ml-2.5 text-[11px] text-slate-400 font-mono">
                    Observed: {typeof value === 'number' ? (Number.isInteger(value) ? value : value.toFixed(2)) : value}
                  </span>
                </div>
                <div
                  className={`font-mono text-xs font-bold ${isRiskIncr ? 'text-red-600' : 'text-emerald-600'}`}
                >
                  {isRiskIncr ? '+' : ''}{contribution.toFixed(4)} SHAP
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

      {sorted.length > 8 && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {showAll ? '↑ Show Top 8 Most Influential Factors' : `↓ Show All ${sorted.length} Evaluated Telemetry Factors`}
          </button>
        </div>
      )}

      <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/50 p-3.5 flex items-start gap-2.5">
        <span className="text-base">💡</span>
        <p className="text-xs text-slate-600 leading-relaxed">
          <span className="font-bold text-slate-800">Explainable AI (SHAP) Mechanism:</span> Positive SHAP scores (<span className="text-red-600 font-semibold">+</span>) indicate variables actively accelerating wear or driving anomaly flags for this vehicle. Targeted service tasks directly align with the highest positive contributors above.
        </p>
      </div>
    </div>
  );
}
