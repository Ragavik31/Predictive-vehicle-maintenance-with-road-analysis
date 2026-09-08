interface MaintenanceRecommendationProps {
  priority: 'low' | 'medium' | 'high' | 'critical';
  inspectionAreas: string[];
}

const priorityConfig = {
  low: {
    label: 'Routine Monitoring',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    icon: '✅',
  },
  medium: {
    label: 'Standard Inspection',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-900',
    icon: '⚡',
  },
  high: {
    label: 'High Priority Inspection',
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-900',
    icon: '⚠️',
  },
  critical: {
    label: 'Immediate Maintenance Halt',
    bg: 'bg-rose-100',
    border: 'border-rose-300',
    text: 'text-rose-950',
    icon: '🚨',
  },
};

export function MaintenanceRecommendation({
  priority,
  inspectionAreas,
}: MaintenanceRecommendationProps) {
  const config = priorityConfig[priority] || priorityConfig.medium;

  return (
    <div className="card p-6 bg-white border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-900 text-base">Target Component Maintenance Action</h3>
          <p className="text-xs text-slate-500 mt-0.5">Recommended maintenance checklist derived from SHAP factor impacts.</p>
        </div>
      </div>

      <div className={`mt-4 rounded-lg border ${config.border} ${config.bg} p-4`}>
        <div className={`flex items-center gap-2.5 ${config.text}`}>
          <span className="text-xl">{config.icon}</span>
          <div>
            <span className="font-bold text-sm block">{config.label}</span>
            <span className="text-xs opacity-90">Dispatch technician for targeted subsystem verification</span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Priority System Inspection Checklist:
        </div>
        <div className="grid gap-2">
          {inspectionAreas.map((area, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-lg border border-slate-200/80 bg-slate-50/60 p-3 text-xs text-slate-800 font-medium hover:bg-slate-50 transition-colors">
              <span className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded bg-blue-100 text-[10px] font-bold text-blue-700">
                {idx + 1}
              </span>
              <span className="leading-snug">{area}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3.5 flex items-start gap-2 text-xs text-slate-600">
        <span>🔧</span>
        <p className="leading-relaxed">
          <span className="font-bold text-slate-800">Technician Directive:</span> Perform localized physical diagnostic before replacing full vehicle assemblies. Update maintenance log upon inspection completion.
        </p>
      </div>
    </div>
  );
}
