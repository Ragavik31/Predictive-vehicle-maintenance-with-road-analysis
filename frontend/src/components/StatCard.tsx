interface StatCardProps {
  label: string;
  value: string;
  detail: string;
  icon?: string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ label, value, detail, icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="card p-5 bg-white border border-slate-200 shadow-xs hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">{label}</span>
        {icon && <span className="text-lg">{icon}</span>}
      </div>
      <div className="mt-2 flex items-baseline justify-between">
        <div className="text-2xl font-bold tracking-tight text-slate-900">{value}</div>
        {trend && (
          <span className={`text-xs font-semibold ${trendUp ? 'text-emerald-600' : 'text-slate-500'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="mt-1 text-xs text-slate-500 font-medium">{detail}</div>
    </div>
  );
}
