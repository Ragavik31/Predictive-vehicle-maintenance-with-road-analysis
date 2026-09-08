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
    <div className="card p-6 bg-white border border-slate-200 shadow-sm">
      <div className="grid gap-6 md:grid-cols-3 items-center">
        {/* Prediction Circle */}
        <div className="flex flex-col items-center justify-center p-4 border-r-0 md:border-r border-slate-100">
          <div className="relative h-28 w-28">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={maintenanceRequired ? (percentageScore > 75 ? '#dc2626' : '#d97706') : '#059669'}
                strokeWidth="10"
                strokeDasharray={`${(percentageScore / 100) * 326.72} 326.72`}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-slate-900">{percentageScore}%</div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Risk Score</div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center space-y-4 md:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Maintenance Assessment
              </div>
              <div className="mt-1 flex items-center gap-2.5">
                <span
                  className={`h-3 w-3 rounded-full ${
                    maintenanceRequired ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'
                  }`}
                />
                <h3 className="text-lg font-bold text-slate-900">
                  {maintenanceRequired ? 'Maintenance Protocol Flagged' : 'Vehicle Healthy & Clear'}
                </h3>
              </div>
            </div>
            <div>
              <RiskBadge level={riskLevel} size="lg" />
            </div>
          </div>

          {maintenanceRequired ? (
            <div className="rounded-lg border border-red-200 bg-red-50/80 p-3.5 text-xs text-red-800">
              <div className="font-semibold text-red-900 flex items-center gap-1.5 mb-0.5">
                <span>⚠️ Inspection Protocol Required</span>
              </div>
              Telemetry data and road condition analysis indicate elevated stress on vehicle systems. Review component maintenance checklists below.
            </div>
          ) : (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-800">
              <div className="font-semibold text-emerald-900 flex items-center gap-1.5 mb-0.5">
                <span>✅ Optimal Vehicle Status</span>
              </div>
              All CAN telemetry metrics, sensor health, and road impact indicators are operating within baseline tolerance levels.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
