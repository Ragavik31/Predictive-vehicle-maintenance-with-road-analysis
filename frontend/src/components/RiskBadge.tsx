type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const riskConfig = {
  low: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    label: 'Low Risk',
  },
  medium: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    dot: 'bg-amber-500',
    label: 'Medium Risk',
  },
  high: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-700',
    dot: 'bg-red-500',
    label: 'High Risk',
  },
  critical: {
    bg: 'bg-rose-100',
    border: 'border-rose-300',
    text: 'text-rose-800',
    dot: 'bg-rose-600',
    label: 'Critical Risk',
  },
};

export function RiskBadge({ level, size = 'md', showLabel = true }: RiskBadgeProps) {
  const config = riskConfig[level] || riskConfig.low;
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs font-semibold',
    lg: 'px-3.5 py-1.5 text-sm font-bold',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-2xs ${config.bg} ${config.border} ${config.text} ${sizeClasses[size]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`}></span>
      {showLabel && config.label}
    </span>
  );
}
