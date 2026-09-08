import { Link } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
import { RiskBadge } from '../components/RiskBadge';
import { PredictionResult } from '../components/PredictionResult';

export default function Dashboard() {
  // Top 5 High Risk Vehicles strictly ranked by risk score
  const topHighRiskVehicles = [
    { id: 'VH-2855', status: 'Immediate Maintenance Halt', risk: 'high' as const, confidence: 0.94, route: 'Quarry Access Road', spec: 'Isuzu Giga (Dump Truck)' },
    { id: 'VH-2841', status: 'Maintenance Protocol Flagged', risk: 'high' as const, confidence: 0.91, route: 'Trans-Mountain Pass', spec: 'Volvo FH16 (Heavy Hauler)' },
    { id: 'VH-2850', status: 'Maintenance Protocol Flagged', risk: 'high' as const, confidence: 0.88, route: 'Coastal Hwy 101', spec: 'MAN TGX (Refrigerated)' },
    { id: 'VH-2868', status: 'High Priority Inspection', risk: 'high' as const, confidence: 0.84, route: 'Alpine Pass Route', spec: 'Kenworth T680 (Semi)' },
    { id: 'VH-2872', status: 'High Priority Inspection', risk: 'high' as const, confidence: 0.79, route: 'Northern Corridor', spec: 'Mack Anthem (Hauler)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Operations Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time fleet health overview, maintenance alert dispatch, and risk probability scoring.</p>
        </div>

        <Link
          to="/vehicle-analysis"
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <span>⚡ Analyze Vehicle</span>
        </Link>
      </div>

      {/* Fleet KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Active Fleet" value="1,247" detail="Tracked in logistics routes" icon="🚚" />
        <StatCard label="Flagged for Maintenance" value="187" detail="15% of total fleet" icon="⚠️" trend="High risk tier" />
        <StatCard label="Optimal Operational" value="1,060" detail="85% healthy baseline" icon="✅" trendUp={true} trend="Normal parameters" />
        <StatCard label="Avg Fleet Risk Score" value="18.4%" detail="Fleet-wide risk index" icon="📊" trendUp={true} trend="-2.1% this week" />
      </div>

      {/* Top 5 High-Risk Vehicles Table */}
      <div className="card overflow-hidden bg-white border border-slate-200 shadow-sm">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Top 5 High-Risk Vehicles</h2>
            <p className="text-xs text-slate-500 mt-0.5">Vehicles requiring immediate maintenance review ranked by priority risk score.</p>
          </div>
          <Link to="/fleet" className="text-xs font-bold text-blue-600 hover:text-blue-700">
            View All Fleet →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3">Vehicle ID & Spec</th>
                <th className="px-5 py-3">Logistics Route</th>
                <th className="px-5 py-3">Maintenance Assessment</th>
                <th className="px-5 py-3">Risk Tier</th>
                <th className="px-5 py-3">Risk Score</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topHighRiskVehicles.map((pred) => (
                <tr key={pred.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-bold text-slate-900">{pred.id}</div>
                    <div className="text-[11px] text-slate-500">{pred.spec}</div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-slate-700">{pred.route}</td>
                  <td className="px-5 py-3.5 font-medium text-slate-800">{pred.status}</td>
                  <td className="px-5 py-3.5">
                    <RiskBadge level={pred.risk} size="sm" />
                  </td>
                  <td className="px-5 py-3.5 font-mono font-bold text-slate-800">
                    {(pred.confidence * 100).toFixed(0)}%
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      to="/vehicle-analysis"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <span>Diagnose</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Fleet Risk Summary */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Active High-Risk Vehicle Case Analysis</h2>
          <p className="text-xs text-slate-500 mt-0.5">Sample live telemetry evaluation output from vehicle VH-2855.</p>
        </div>

        <PredictionResult
          result="maintenance-likely"
          probability={0.94}
          riskLevel="high"
        />
      </div>
    </div>
  );
}
