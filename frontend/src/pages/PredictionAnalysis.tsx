import { Link, useLocation } from 'react-router-dom';
import type { Prediction } from '../types';

const failureMap: Record<string, string> = {
  Engine_Temperature: 'Engine overheating or cooling-system stress',
  Fuel_Consumption: 'Fuel-system inefficiency or increased engine load',
  Battery_Status: 'Battery degradation or charging-system weakness',
  Oil_Quality: 'Lubrication degradation or overdue oil service',
  Vibration_Levels: 'Mechanical imbalance, bearing wear, or drivetrain stress',
  Tire_Pressure: 'Tire pressure imbalance or tire wear',
  Failure_History: 'Repeat failure risk based on historical events',
  Anomalies_Detected: 'Sensor-detected abnormal vehicle behavior',
  Diagnostic_Trouble_Code_Count: 'Active diagnostic or electrical fault codes',
  Sensor_Packet_Loss_Rate: 'Unreliable sensor telemetry affecting confidence',
};

export default function PredictionAnalysis() {
  const location = useLocation();
  const result = (location.state as { result?: Prediction } | null)?.result;

  if (!result) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16">
        <h1 className="text-3xl font-semibold text-white">Prediction Analysis</h1>
        <p className="mt-4 text-slate-400">Run a Vehicle Analysis first to open its SHAP analysis.</p>
        <Link to="/vehicle-analysis" className="focus-ring mt-6 inline-flex rounded-lg bg-teal-300 px-4 py-2.5 text-sm font-semibold text-slate-950">Open Vehicle Analysis</Link>
      </section>
    );
  }

  const contributions = [...result.contributions].sort((first, second) => Math.abs(second.contribution) - Math.abs(first.contribution));
  const possibleFailures = contributions.filter(
    (contribution) => contribution.contribution > 0 && failureMap[contribution.feature],
  ).slice(0, 5);

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:py-16">
      <Link to="/vehicle-analysis" className="focus-ring text-sm text-teal-300 hover:text-teal-200">Back to Vehicle Analysis</Link>
      <div className="mt-6 max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-[.18em] text-teal-300">SHAP Analysis</div>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Prediction details</h1>
        <p className="mt-4 text-slate-400">The trained model predicts <strong className="text-white">{result.label.toLowerCase()}</strong> with a maintenance probability of <strong className="text-white">{Math.round(result.probability * 100)}%</strong>.</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="card p-6">
          <div className="text-xs uppercase tracking-widest text-slate-500">Possible failure areas</div>
          <div className="mt-4 space-y-3">
            {possibleFailures.length ? possibleFailures.map((contribution) => (
              <div key={contribution.feature} className="border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                <div className="font-medium text-white">{failureMap[contribution.feature] ?? contribution.feature}</div>
                <div className="mt-1 text-xs text-slate-500">Driven by {contribution.feature}</div>
              </div>
            )) : <p className="text-sm text-slate-400">No strong positive failure signals were identified.</p>}
          </div>
        </div>

        <div className="card p-6">
          <div className="text-xs uppercase tracking-widest text-slate-500">Model contribution</div>
          <div className="mt-4 space-y-3">
            {contributions.map((contribution) => (
              <div key={contribution.feature}>
                <div className="mb-1 flex justify-between text-xs"><span className="text-slate-300">{contribution.feature}</span><span className={contribution.contribution >= 0 ? 'text-amber-200' : 'text-teal-200'}>{contribution.contribution >= 0 ? '+' : ''}{contribution.contribution.toFixed(2)}</span></div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full ${contribution.contribution >= 0 ? 'bg-amber-300' : 'bg-teal-300'}`} style={{ width: `${Math.min(100, Math.abs(contribution.contribution) * 22)}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}