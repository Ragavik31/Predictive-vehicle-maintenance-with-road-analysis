import { StatCard } from '../components/StatCard';

export default function RoadInsights() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Road & Terrain Stress Analysis</h1>
        <p className="text-sm text-slate-500 mt-1">Correlating road surface roughness, pothole frequency, and route weather with component wear.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Avg Road Roughness Index" value="3.42 IRI" detail="International Roughness Index" icon="🛣️" trend="+0.12 vs last month" />
        <StatCard label="Severe Terrain Routes" value="14 Routes" detail="Exceeding stress thresholds" icon="⚠️" trend="Action recommended" />
        <StatCard label="Pothole Impact Events" value="1,840/day" detail="Recorded via chassis sensors" icon="📉" />
        <StatCard label="Suspension Fatigue Acceleration" value="+28.4%" detail="On mountain & unpaved passes" icon="⚙️" />
      </div>

      {/* Route Stress Breakdown */}
      <div className="card p-6 bg-white border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-1">Route Surface Severity Rankings</h2>
        <p className="text-xs text-slate-500 mb-4">Routes generating highest structural vibration and suspension strain across the fleet.</p>

        <div className="space-y-4">
          {[
            { route: 'Quarry Access Road (Route Q-4)', type: 'Unpaved Heavy Industrial', roughness: 8.8, impact: 'Critical Component Strain', inspectArea: 'Suspension, Wheel Bearings, Oil Sump' },
            { route: 'Trans-Mountain Pass (Hwy 12)', type: 'Steep Incline / Frost Heave', roughness: 7.2, impact: 'High Engine & Brake Strain', inspectArea: 'Brake Linings, Engine Temp, Transmission' },
            { route: 'Coastal Highway 101', type: 'Salt Air / Pothole Patches', roughness: 5.4, impact: 'Corrosion & Sensor Loss', inspectArea: 'CAN Wiring Harness, Sensor Packets' },
            { route: 'Interstate 95 Express', type: 'Smooth Paved Asphalt', roughness: 1.8, impact: 'Baseline Operational Wear', inspectArea: 'Routine Fluid & Tire Pressure' },
          ].map((r, i) => (
            <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div>
                  <span className="font-bold text-slate-900 text-sm">{r.route}</span>
                  <span className="ml-2 text-xs font-medium text-slate-500">({r.type})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Roughness Rating:</span>
                  <span className={`rounded-md px-2 py-0.5 text-xs font-mono font-bold ${
                    r.roughness > 7 ? 'bg-red-100 text-red-700' : r.roughness > 4 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {r.roughness} IRI
                  </span>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 text-xs text-slate-600 mt-2 pt-2 border-t border-slate-200/60">
                <div>
                  <span className="font-semibold text-slate-800">Primary Stress Factor: </span>
                  <span>{r.impact}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-800">Target Inspection Area: </span>
                  <span className="text-blue-700 font-medium">{r.inspectArea}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}