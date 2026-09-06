import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { StatsOverview } from '../components/StatsOverview';
import { PredictionResult } from '../components/PredictionResult';
import { FeatureContribution } from '../components/FeatureContribution';
import { RiskBadge } from '../components/RiskBadge';

export default function Dashboard() {
  const recentPredictions = [
    { id: 1, vehicleId: 'VH-2841', status: 'Maintenance likely', risk: 'high', confidence: 0.91 },
    { id: 2, vehicleId: 'VH-2839', status: 'No immediate maintenance', risk: 'low', confidence: 0.94 },
    { id: 3, vehicleId: 'VH-2838', status: 'Maintenance likely', risk: 'medium', confidence: 0.82 },
  ];

  return (
    <div>
      <Section eyebrow="Welcome Back" title="Fleet Health Dashboard">
        <div className="space-y-6">
          {/* Key Stats */}
          <StatsOverview
            stats={[
              { label: 'Total Vehicles', value: '1,247', detail: 'In fleet' },
              { label: 'Requiring Maintenance', value: '187', detail: '15% of fleet' },
              { label: 'Healthy Status', value: '1,060', detail: '85% of fleet' },
              { label: 'Avg. Risk Level', value: 'Low', detail: 'Fleet-wide' },
            ]}
            columns={4}
          />

          {/* Quick Action */}
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">Analyze a Vehicle</h3>
                <p className="mt-1 text-sm text-slate-400">Get instant maintenance predictions</p>
              </div>
              <Link
                to="/vehicle-analysis"
                className="focus-ring inline-flex items-center rounded-lg bg-teal-300 px-4 py-2 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200"
              >
                Analyze →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Recent Predictions */}
      <Section eyebrow="Recent Activity" title="Latest Predictions">
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900/50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-300">Vehicle ID</th>
                  <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                  <th className="px-6 py-4 font-semibold text-slate-300">Risk</th>
                  <th className="px-6 py-4 font-semibold text-slate-300">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {recentPredictions.map((pred) => (
                  <tr key={pred.id} className="border-b border-slate-800/50 hover:bg-slate-900/50">
                    <td className="px-6 py-4 font-medium text-white">{pred.vehicleId}</td>
                    <td className="px-6 py-4 text-slate-300">{pred.status}</td>
                    <td className="px-6 py-4">
                      <RiskBadge level={pred.risk as any} size="sm" />
                    </td>
                    <td className="px-6 py-4 text-slate-300">{(pred.confidence * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* Example Prediction */}
      <Section eyebrow="Example Analysis" title="Sample Vehicle Prediction">
        <PredictionResult
          result="maintenance-likely"
          probability={0.82}
          riskLevel="high"
        />
      </Section>

      {/* Example Contributions */}
      <Section eyebrow="AI Explainability" title="Feature Contributions">
        <FeatureContribution
          contributions={[
            { feature: 'Engine Temperature', value: 94, contribution: 0.82 },
            { feature: 'Vibration', value: 4.8, contribution: 0.67 },
            { feature: 'Road Roughness', value: 0.82, contribution: 0.51 },
            { feature: 'Braking Events', value: 14, contribution: 0.43 },
            { feature: 'Oil Pressure', value: 31, contribution: 0.12 },
            { feature: 'Mileage', value: 112000, contribution: -0.08 },
          ]}
        />
      </Section>

      {/* Navigation Links */}
      <Section eyebrow="Explore" title="Available Tools">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: 'Vehicle Analysis',
              description: 'Run predictions for a specific vehicle',
              link: '/vehicle-analysis',
            },
            {
              title: 'Maintenance',
              description: 'Review recommended maintenance actions',
              link: '/maintenance',
            },
            {
              title: 'About & How It Works',
              description: 'Learn how RoadMind AI supports decisions',
              link: '/about',
            },
          ].map((tool) => (
            <Link
              key={tool.link}
              to={tool.link}
              className="card group p-6 transition-all duration-200 hover:border-teal-400/30 hover:-translate-y-1"
            >
              <h3 className="font-semibold text-white">{tool.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{tool.description}</p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-teal-300">
                Explore
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </div>
  );
}
