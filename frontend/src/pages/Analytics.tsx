import { Section } from '../components/Section';
import { StatsOverview } from '../components/StatsOverview';
import { TempHistogram, TempVibrationScatter } from '../components/Charts';

export default function Analytics() {
  return (
    <div>
      <Section
        eyebrow="FLEET ANALYTICS"
        title="Vehicle Health & Performance Metrics"
        description="Analyze fleet-wide patterns, trends, and vehicle condition distributions."
      >
        <StatsOverview
          stats={[
            { label: 'Total Vehicles', value: '1,247', icon: '🚗' },
            { label: 'Healthy Vehicles', value: '1,060', icon: '✓' },
            { label: 'Needing Maintenance', value: '187', icon: '⚠️' },
            { label: 'Avg Prediction Confidence', value: '91.2%', icon: '🎯' },
          ]}
          columns={4}
        />
      </Section>

      {/* Vehicle Distribution */}
      <Section eyebrow="VEHICLE CONDITION" title="Fleet Health Distribution">
        <div className="card p-6">
          <h3 className="font-semibold text-white">Vehicles by Condition</h3>
          <div className="mt-6 space-y-4">
            {[
              { label: 'Excellent (90-100)', count: 342, percentage: 27.4, color: 'bg-emerald-400' },
              { label: 'Good (80-90)', count: 456, percentage: 36.6, color: 'bg-teal-400' },
              { label: 'Fair (70-80)', count: 262, percentage: 21.0, color: 'bg-yellow-400' },
              { label: 'Poor (60-70)', count: 149, percentage: 11.9, color: 'bg-orange-400' },
              { label: 'Critical (<60)', count: 38, percentage: 3.1, color: 'bg-rose-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex items-end justify-between gap-4 mb-2">
                  <span className="font-medium text-white">{item.label}</span>
                  <span className="text-sm text-slate-400">{item.count} vehicles • {item.percentage}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div className={`h-full transition-all ${item.color}`} style={{ width: `${item.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Time Series */}
      <Section eyebrow="TRENDS" title="Maintenance Predictions Over Time">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="font-semibold text-white mb-4">Monthly Predictions</h3>
            <div className="space-y-3">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
                const values = [145, 152, 168, 174, 187, 195];
                const percentage = (values[idx] / 250) * 100;
                return (
                  <div key={month}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-400">{month}</span>
                      <span className="text-sm font-medium text-white">{values[idx]}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="font-semibold text-white mb-4">Prediction Confidence</h3>
            <div className="space-y-3">
              {[
                { label: '95-100%', count: 542, color: 'bg-emerald-400' },
                { label: '90-95%', count: 438, color: 'bg-teal-400' },
                { label: '85-90%', count: 201, color: 'bg-yellow-400' },
                { label: '<85%', count: 66, color: 'bg-orange-400' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-400">{item.label}</span>
                    <span className="text-sm font-medium text-white">{item.count} vehicles</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${(item.count / 1247) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Feature Distributions */}
      <Section eyebrow="FEATURE DISTRIBUTIONS" title="Sensor Data Analysis">
        <div className="grid gap-6 lg:grid-cols-2">
          <TempHistogram />
          <TempVibrationScatter />
        </div>
      </Section>

      {/* Feature Impact */}
      <Section eyebrow="FEATURE IMPORTANCE" title="Top Factors Affecting Maintenance Predictions">
        <div className="card p-6">
          <div className="space-y-4">
            {[
              { name: 'Engine Temperature', importance: 0.28 },
              { name: 'Vibration Level', importance: 0.22 },
              { name: 'Road Roughness', importance: 0.19 },
              { name: 'Braking Events', importance: 0.15 },
              { name: 'Oil Pressure', importance: 0.10 },
              { name: 'Mileage', importance: 0.06 },
            ].map((feature) => (
              <div key={feature.name}>
                <div className="flex items-end justify-between mb-2">
                  <span className="font-medium text-white">{feature.name}</span>
                  <span className="text-sm text-teal-300">{(feature.importance * 100).toFixed(1)}%</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-teal-400 to-cyan-400"
                    style={{ width: `${feature.importance * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
            <p className="text-sm text-slate-400">
              💡 Engine temperature and vibration are the strongest predictors of maintenance need, accounting for 50% of the model's decision-making.
            </p>
          </div>
        </div>
      </Section>

      {/* Summary Stats */}
      <Section eyebrow="SUMMARY" title="Key Performance Indicators">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsOverview
            stats={[
              { label: 'Fleet Accuracy', value: '94.05%', detail: 'Model performance' },
              { label: 'False Positive Rate', value: '6.01%', detail: 'Unnecessary alarms' },
              { label: 'False Negative Rate', value: '12.82%', detail: 'Missed maintenance' },
              { label: 'Maintenance Savings', value: '~28%', detail: 'Potential cost reduction' },
            ]}
            columns={4}
          />
        </div>
      </Section>
    </div>
  );
}
