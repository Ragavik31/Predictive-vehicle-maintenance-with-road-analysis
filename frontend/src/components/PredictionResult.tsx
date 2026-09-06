import { RiskBadge } from './RiskBadge';

interface PredictionResultProps {
  result: 'maintenance-likely' | 'no-maintenance';
  probability: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

export function PredictionResult({ result, probability, riskLevel }: PredictionResultProps) {
  const percentageScore = Math.round(probability * 100);
  const maintenanceRequired = result === 'maintenance-likely';

  return (
    <div className="card p-8">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Prediction Circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-32 w-32">
            <svg className="h-full w-full" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="rgba(148, 163, 184, 0.1)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="55"
                fill="none"
                stroke="rgb(45, 212, 191)"
                strokeWidth="8"
                strokeDasharray={`${(percentageScore / 100) * 345.575} 345.575`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-white">{percentageScore}%</div>
              <div className="text-xs text-slate-400">Probability</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center space-y-6 lg:col-span-2">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Maintenance Status
            </div>
            <div className="mt-2 flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  maintenanceRequired ? 'bg-orange-400' : 'bg-emerald-400'
                }`}
              />
              <div className="text-xl font-semibold text-white">
                {maintenanceRequired ? 'Maintenance Required' : 'No Immediate Maintenance'}
              </div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Risk Level
            </div>
            <div className="mt-2">
              <RiskBadge level={riskLevel} size="lg" />
            </div>
          </div>

          {maintenanceRequired && (
            <div className="rounded-lg border border-orange-400/20 bg-orange-400/5 p-4">
              <p className="text-sm text-orange-200">
                ⚠️ This vehicle shows signs that warrant a maintenance inspection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
