interface StatItem {
  label: string;
  value: string | number;
  detail?: string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface StatsOverviewProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
}

export function StatsOverview({ stats, columns = 4 }: StatsOverviewProps) {
  const gridClass = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${gridClass[columns]}`}>
      {stats.map((stat, idx) => (
        <div key={idx} className="card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {stat.label}
              </div>
              <div className="mt-2 text-2xl font-bold text-white">{stat.value}</div>
              {stat.detail && <div className="mt-1 text-sm text-slate-400">{stat.detail}</div>}
            </div>
            {stat.icon && <div className="text-2xl opacity-30">{stat.icon}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
