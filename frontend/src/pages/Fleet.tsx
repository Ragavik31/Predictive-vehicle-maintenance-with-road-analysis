import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { RiskBadge } from '../components/RiskBadge';
import { StatCard } from '../components/StatCard';
import { fetchFleetVehicles, type FleetVehicle } from '../lib/api';

export default function Fleet() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadFleetData = (signal?: AbortSignal) => {
    setLoading(true);
    setError(null);

    fetchFleetVehicles(signal)
      .then((data) => {
        if (Array.isArray(data)) {
          setVehicles(data);
        } else {
          setVehicles([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err instanceof Error ? err.message : 'Unable to connect to backend telemetry service.');
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    const controller = new AbortController();
    loadFleetData(controller.signal);
    return () => controller.abort();
  }, []);

  const stats = useMemo(() => {
    const total = vehicles.length;
    const high = vehicles.filter((v) => v.riskLevel === 'high').length;
    const medium = vehicles.filter((v) => v.riskLevel === 'medium').length;
    const low = vehicles.filter((v) => v.riskLevel === 'low').length;
    const avgScore = total > 0
      ? ((vehicles.reduce((sum, v) => sum + (v.riskScore || 0), 0) / total) * 100).toFixed(0) + '%'
      : '0%';
    return { total, high, medium, low, avgScore };
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesRisk = filterRisk === 'all' || v.riskLevel === filterRisk;
      const matchesSearch =
        v.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.makeModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.route.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRisk && matchesSearch;
    });
  }, [vehicles, filterRisk, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-slate-900">Fleet Operations Matrix</h1>
            {!loading && vehicles.length > 0 && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>{vehicles.length} Commercial Vehicles Monitored</span>
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time fleet registry with continuous risk scoring, telemetry monitoring, and vehicle inspection triggers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => loadFleetData()}
            className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
            title="Refresh Fleet Telemetry"
          >
            <span>🔄</span>
            <span>Refresh</span>
          </button>
          <Link
            to="/vehicle-analysis"
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <span>⚡ Run Diagnostic</span>
          </Link>
        </div>
      </div>

      {/* Fleet KPI Summary Cards (100% Dynamically calculated from live vehicle telemetry) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Monitored Fleet"
          value={stats.total.toString()}
          detail="Active commercial vehicles"
          icon="🚚"
        />
        <StatCard
          label="High-Risk Flagged"
          value={stats.high.toString()}
          detail="Urgent maintenance required"
          icon="⚠️"
          trend={stats.high > 0 ? "Immediate Attention" : "All Clear"}
          trendUp={stats.high === 0}
        />
        <StatCard
          label="Optimal Operational"
          value={stats.low.toString()}
          detail="Within normal baselines"
          icon="✅"
          trendUp={true}
          trend="Healthy Status"
        />
        <StatCard
          label="Average Fleet Risk"
          value={stats.avgScore}
          detail="Fleet-wide risk index"
          icon="📊"
          trendUp={true}
        />
      </div>

      {/* Filter & Search Bar */}
      <div className="card p-4 bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Filter Risk:</span>
          {[
            { key: 'all', label: `All (${vehicles.length})` },
            { key: 'high', label: `High (${stats.high})` },
            { key: 'medium', label: `Medium (${stats.medium})` },
            { key: 'low', label: `Low (${stats.low})` },
          ].map((tier) => (
            <button
              key={tier.key}
              onClick={() => setFilterRisk(tier.key)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all ${
                filterRisk === tier.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tier.label}
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

      {/* Error state */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => loadFleetData()}
            className="font-bold underline hover:text-red-950"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="card p-8 bg-white border border-slate-200 shadow-sm text-center">
          <div className="inline-block animate-spin text-2xl mb-3">⚙️</div>
          <div className="text-sm font-bold text-slate-900">Loading live fleet records...</div>
          <div className="text-xs text-slate-500 mt-1">Retrieving real-time telemetry and component wear factors</div>
        </div>
      )}

      {/* Vehicles Table */}
      {!loading && (
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
                  <th className="px-5 py-3.5">Last Service</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-8 text-center text-slate-500">
                      No vehicles matching the selected risk tier or search query.
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-bold text-slate-900 text-sm">{v.id}</div>
                        <div className="text-slate-500 font-medium">{v.makeModel} • {v.type}</div>
                      </td>
                      <td className="px-5 py-4 font-medium text-slate-700">{v.route}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <RiskBadge level={v.riskLevel} size="sm" />
                          <span className="font-mono text-slate-700 font-semibold">
                            {(v.riskScore * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-mono font-medium text-slate-700">{v.engineTemp}</td>
                      <td className="px-5 py-4 font-mono font-medium text-slate-700">{v.vibration}</td>
                      <td className="px-5 py-4 text-slate-600">{v.roadStress}</td>
                      <td className="px-5 py-4 text-slate-500">{v.lastService || 'Recently inspected'}</td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          to="/vehicle-analysis"
                          state={{ selectedVehicleId: v.id }}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-blue-600 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                        >
                          <span>Analyze</span>
                          <span>→</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}