import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiskBadge } from '../components/RiskBadge';

interface FleetVehicle {
  id: string;
  makeModel: string;
  type: string;
  route: string;
  riskLevel: 'high' | 'medium' | 'low';
  riskScore: number;
  engineTemp: string;
  vibration: string;
  roadStress: string;
  lastService: string;
}

const mockFleetData: FleetVehicle[] = [
  { id: 'VH-2841', makeModel: 'Volvo FH16', type: 'Heavy Hauler', route: 'Trans-Mountain Pass', riskLevel: 'high', riskScore: 0.91, engineTemp: '104°C', vibration: '4.8 m/s²', roadStress: 'High Roughness', lastService: '45 days ago' },
  { id: 'VH-2838', makeModel: 'Scania R500', type: 'Long Haul Semi', route: 'Northern Logistics Corridor', riskLevel: 'medium', riskScore: 0.68, engineTemp: '94°C', vibration: '3.2 m/s²', roadStress: 'Moderate', lastService: '22 days ago' },
  { id: 'VH-2839', makeModel: 'Mercedes Actros', type: 'Freight Liner', route: 'Interstate Highway 95', riskLevel: 'low', riskScore: 0.12, engineTemp: '84°C', vibration: '1.4 m/s²', roadStress: 'Smooth Surface', lastService: '10 days ago' },
  { id: 'VH-2850', makeModel: 'MAN TGX', type: 'Refrigerated Transport', route: 'Coastal Highway 101', riskLevel: 'high', riskScore: 0.88, engineTemp: '101°C', vibration: '4.2 m/s²', roadStress: 'Severe Potholes', lastService: '60 days ago' },
  { id: 'VH-2852', makeModel: 'DAF XF', type: 'Container Truck', route: 'Central Express Bypass', riskLevel: 'low', riskScore: 0.18, engineTemp: '86°C', vibration: '1.8 m/s²', roadStress: 'Standard Asphalt', lastService: '14 days ago' },
  { id: 'VH-2855', makeModel: 'Isuzu Giga', type: 'Heavy Dump Truck', route: 'Quarry Access Road', riskLevel: 'high', riskScore: 0.94, engineTemp: '108°C', vibration: '5.6 m/s²', roadStress: 'Unpaved Off-Road', lastService: '30 days ago' },
  { id: 'VH-2860', makeModel: 'Freightliner Cascadia', type: 'Long Haul Semi', route: 'Southern Cargo Route', riskLevel: 'medium', riskScore: 0.54, engineTemp: '91°C', vibration: '2.8 m/s²', roadStress: 'Moderate', lastService: '18 days ago' },
  { id: 'VH-2864', makeModel: 'Volvo FM', type: 'Distribution Truck', route: 'Urban Ring Corridor', riskLevel: 'low', riskScore: 0.22, engineTemp: '87°C', vibration: '1.9 m/s²', roadStress: 'Paved Urban', lastService: '5 days ago' },
];

export default function Fleet() {
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredVehicles = mockFleetData.filter((v) => {
    const matchesRisk = filterRisk === 'all' || v.riskLevel === filterRisk;
    const matchesSearch = v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.makeModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          v.route.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Fleet Operations Matrix</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time risk scoring, telemetry telemetry status, and vehicle inspection triggers.</p>
        </div>
        <Link
          to="/vehicle-analysis"
          className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <span>⚡ Run New Diagnostic</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="card p-4 bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Filter Risk:</span>
          {['all', 'high', 'medium', 'low'].map((tier) => (
            <button
              key={tier}
              onClick={() => setFilterRisk(tier)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
                filterRisk === tier
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vehicle ID, model, route..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
          />
        </div>
      </div>

      {/* Vehicles Table */}
      <div className="card overflow-hidden bg-white border border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Vehicle ID & Spec</th>
                <th className="px-5 py-3.5">Logistics Route</th>
                <th className="px-5 py-3.5">Risk Score</th>
                <th className="px-5 py-3.5">Engine Temp</th>
                <th className="px-5 py-3.5">Vibration</th>
                <th className="px-5 py-3.5">Terrain Impact</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900 text-sm">{v.id}</div>
                    <div className="text-slate-500 font-medium">{v.makeModel} • {v.type}</div>
                  </td>
                  <td className="px-5 py-4 font-medium text-slate-700">{v.route}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <RiskBadge level={v.riskLevel} size="sm" />
                      <span className="font-mono text-slate-700 font-semibold">{(v.riskScore * 100).toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono font-medium text-slate-700">{v.engineTemp}</td>
                  <td className="px-5 py-4 font-mono font-medium text-slate-700">{v.vibration}</td>
                  <td className="px-5 py-4 text-slate-600">{v.roadStress}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to="/vehicle-analysis"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                    >
                      <span>Analyze</span>
                      <span>→</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}