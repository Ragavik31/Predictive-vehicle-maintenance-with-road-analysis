interface MaintenanceRecommendationProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
  inspectionAreas: string[];
}

const priorityConfig = {
  low: {
    label: 'Low',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    text: 'text-emerald-300',
    icon: '✓',
  },
  medium: {
    label: 'Medium',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    text: 'text-yellow-300',
    icon: '!',
  },
  high: {
    label: 'High',
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    text: 'text-orange-300',
    icon: '⚠',
  },
  critical: {
    label: 'Critical',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/30',
    text: 'text-rose-300',
    icon: '🚨',
  },
};

export function MaintenanceRecommendation({
  priority,
  inspectionAreas,
}: MaintenanceRecommendationProps) {
  const config = priorityConfig[priority];

  return (
    <div className="card p-6">
      <h3 className="font-semibold text-white">Recommended Inspection</h3>

      <div className={`mt-4 rounded-lg border ${config.border} ${config.bg} p-4`}>
        <div className={`flex items-center gap-2 ${config.text}`}>
          <span className="text-lg">{config.icon}</span>
          <span className="font-semibold">{config.label} Priority</span>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-sm font-medium text-slate-300">Inspection areas:</div>
        <ul className="mt-3 space-y-2">
          {inspectionAreas.map((area, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
              <span className="mt-1 flex-shrink-0 text-teal-300">•</span>
              <span>{area}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
        <p className="text-xs text-slate-400">
          ℹ️ <span className="font-medium">Important:</span> This recommendation is based on the ML model's prediction and should be reviewed by a qualified technician. It indicates areas worth investigating, not confirmed failures.
        </p>
      </div>
    </div>
  );
}
