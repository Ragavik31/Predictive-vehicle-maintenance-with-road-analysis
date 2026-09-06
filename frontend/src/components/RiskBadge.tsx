type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

interface RiskBadgeProps {
  level: RiskLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const riskConfig = {
  low: {
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    text: 'text-emerald-300',
    label: 'Low',
  },
  medium: {
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/30',
    text: 'text-yellow-300',
    label: 'Medium',
  },
  high: {
    bg: 'bg-orange-400/10',
    border: 'border-orange-400/30',
    text: 'text-orange-300',
    label: 'High',
  },
  critical: {
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/30',
    text: 'text-rose-300',
    label: 'Critical',
  },
};

export function RiskBadge({ level, size = 'md', showLabel = true }: RiskBadgeProps) {
  const config = riskConfig[level];
  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={`inline-flex rounded-full border font-semibold ${config.bg} ${config.border} ${config.text} ${sizeClasses[size]}`}>
      {showLabel && config.label}
    </span>
  );
}
