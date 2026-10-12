import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function ModelXAI() {
  const [selectedRoad] = useState<string>('Rough');
  const [currentRoad, setCurrentRoad] = useState<string>('Rough');

  // SECTION 1: Ablation Study Comparison Data
  const ablationData = [
    { metric: 'Accuracy', withoutRoad: 94.12, withRoad: 94.12, delta: '0.00%' },
    { metric: 'Precision', withoutRoad: 94.24, withRoad: 94.24, delta: '0.00%' },
    { metric: 'Recall', withoutRoad: 87.15, withRoad: 87.16, delta: '+0.01%' },
    { metric: 'F1-Score', withoutRoad: 90.56, withRoad: 90.56, delta: '0.00%' },
    { metric: 'ROC-AUC', withoutRoad: 92.45, withRoad: 92.47, delta: '+0.02%' },
  ];

  // SECTION 2: TOP 8 Features from the finalized 20-feature model
  const top8ShapFeatures = [
    { feature: 'Vibration Levels', score: 0.1296 },
    { feature: 'Battery Status', score: 0.0851 },
    { feature: 'Fuel Consumption', score: 0.0661 },
    { feature: 'Engine Temperature', score: 0.0546 },
    { feature: 'Sensor Loss Rate', score: 0.0546 },
    { feature: 'Oil Quality', score: 0.0271 },
    { feature: 'CAN Message Rate', score: 0.0258 },
    { feature: 'Anomalies Detected', score: 0.0182 },
  ];

  // SECTION 3: Road-Specific Contributing Features & Engineering Interpretations
  const roadSpecificData: Record<string, { top: string[]; interpretation: string }> = {
    'Rough': {
      top: ['1. Vibration Levels', '2. Engine Temperature', '3. Sensor Packet Loss Rate'],
      interpretation: 'Predictions under rough-road conditions are more strongly associated with vibration and sensor-related signals, reflecting mechanical shock and in-vehicle harness disruption.',
    },
    'Mountainous': {
      top: ['1. Engine Temperature', '2. Vibration Levels', '3. Fuel Consumption'],
      interpretation: 'Predictions under mountainous conditions show higher sensitivity to thermal strain and powertrain torque generated during sustained uphill elevation gradients.',
    },
    'Congested': {
      top: ['1. Battery Status', '2. Engine Temperature', '3. CAN Message Rate Hz'],
      interpretation: 'Predictions under congested conditions reflect continuous electrical draw from prolonged idling, low battery replenishment, and stop-and-go thermal cycles.',
    },
    'Moderate': {
      top: ['1. Oil Quality', '2. Vibration Levels', '3. Engine Temperature'],
      interpretation: 'Predictions on moderate roads align with baseline lubrication breakdown, regular scheduled wear-and-tear, and nominal operational cycles.',
    },
    'Smooth': {
      top: ['1. Fuel Consumption', '2. Vibration Levels', '3. Oil Quality'],
      interpretation: 'Predictions on smooth highways reflect long-distance cruising fuel efficiency variances and baseline maintenance intervals under minimal road surface shock.',
    },
  };

  const currentRoadDetails = roadSpecificData[currentRoad] || roadSpecificData['Rough'];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-slate-900">Model & XAI</h1>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
            FleetGuard AI
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          “How good is the model and why does it decide this?” — Controlled ablation benchmark on 50,000 test vehicles and global Shapley feature attribution analysis.
        </p>
      </div>

      {/* SECTION 1: MODEL PERFORMANCE (ROAD ABLATION) */}
      <div className="card p-6 space-y-6 border border-slate-200/90 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Model Performance & Road Context Ablation</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparing Model A (Without Road Context, 17 features) vs. Model B (With Road Context, 20 features) on the same test set.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200 font-semibold">
            Soft Voting Ensemble • 50,000 Test Records
          </span>
        </div>

        {/* ONE COMPARISON CHART AND ONE COMPACT TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Chart (7 cols) */}
          <div className="lg:col-span-7 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ablationData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="metric" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} domain={[80, 100]} unit="%" tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', fontSize: '12px', color: '#0f172a' }}
                  formatter={(val: any) => [`${val}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="withoutRoad" name="Without Road (17 Feats)" fill="#94a3b8" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="withRoad" name="With Road (20 Feats)" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Compact Comparison Table (5 cols) */}
          <div className="lg:col-span-5 overflow-hidden rounded-xl border border-slate-200 bg-slate-50/60">
            <table className="w-full text-xs">
              <thead className="border-b border-slate-200 bg-white text-slate-500">
                <tr>
                  <th className="py-2.5 px-3 text-left font-semibold">Metric</th>
                  <th className="py-2.5 px-2 text-center font-semibold">Without Road</th>
                  <th className="py-2.5 px-2 text-center font-semibold">With Road</th>
                  <th className="py-2.5 px-2 text-right font-semibold">Delta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {ablationData.map((row) => (
                  <tr key={row.metric} className="hover:bg-white/80 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">{row.metric}</td>
                    <td className="py-2.5 px-2 text-center text-slate-500">{row.withoutRoad}%</td>
                    <td className="py-2.5 px-2 text-center text-slate-900 font-bold">{row.withRoad}%</td>
                    <td className="py-2.5 px-2 text-right">
                      <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {row.delta}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ONE COMPACT RESEARCH INSIGHT CARD */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4 text-xs text-slate-700">
          <div className="flex items-center gap-2 font-bold text-indigo-700 mb-1">
            <span>🔬</span> Research Insight
          </div>
          <p className="leading-relaxed">
            Road context produced almost identical predictive performance in the controlled ablation study. This
            suggests that internal vehicle telemetry already captures much of the physical stress associated with road
            conditions.
          </p>
        </div>
      </div>

      {/* SECTION 2 & 3: SHAP EXPLAINABILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SECTION 2: GLOBAL SHAP (TOP 8 FEATURES) (7 cols) */}
        <div className="lg:col-span-7 card p-6 space-y-4 border border-slate-200/90 bg-white">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Explainable AI — Feature Contributions</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Top 8 contributing features in the finalized 20-feature model by mean absolute SHAP value.
            </p>
          </div>

          {/* Horizontal Bar Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[...top8ShapFeatures].reverse()}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 75, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis type="number" stroke="#64748b" fontSize={11} domain={[0, 0.15]} tickLine={false} />
                <YAxis dataKey="feature" type="category" stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '10px', fontSize: '12px', color: '#0f172a' }}
                  formatter={(val: any) => [`${val}`, 'Mean |SHAP Value|']}
                />
                <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} maxBarSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-[11px] text-slate-400 italic">
            *Excludes removed historical target leakage features; displays active 20-feature operational telemetry.
          </div>
        </div>

        {/* SECTION 3: ROAD-SPECIFIC SHAP (ONE DROPDOWN + PANEL) (5 cols) */}
        <div className="lg:col-span-5 card p-6 space-y-4 border border-slate-200/90 bg-white">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-sm font-bold text-slate-900">Road-Specific SHAP Explorer</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Inspect how local feature contributions shift across distinct road terrains.
            </p>
          </div>

          {/* Dropdown: Road Condition */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Select Road Condition:</label>
            <select
              value={currentRoad}
              onChange={(e) => setCurrentRoad(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="Rough">Rough</option>
              <option value="Mountainous">Mountainous</option>
              <option value="Congested">Congested</option>
              <option value="Moderate">Moderate</option>
              <option value="Smooth">Smooth</option>
            </select>
          </div>

          {/* Top 3 Contributing Features */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Top 3 Contributing Features
            </div>
            <div className="space-y-2 text-xs font-medium">
              {currentRoadDetails.top.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-800 bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Interpretation */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs text-slate-700">
            <div className="font-bold text-blue-700 mb-1">
              Engineering Context ({currentRoad} Roads)
            </div>
            <p className="leading-relaxed text-slate-600">
              {currentRoadDetails.interpretation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
