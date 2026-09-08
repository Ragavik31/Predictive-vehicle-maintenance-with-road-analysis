import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="space-y-10 py-2">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-slate-950 p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-300 backdrop-blur-md">
            <img src="/logo-icon-transparent.png" alt="RoadMind AI Icon" className="h-5 w-auto object-contain" />
            <span>Next-Gen Fleet Predictive Intelligence</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            Prevent Fleet Breakdowns Before They Happen.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            RoadMind AI fuses real-time vehicle CAN telemetry with road roughness index data to predict component failure risk, explain root factors via SHAP XAI, and direct targeted technician inspections.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/vehicle-analysis"
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-blue-500 transition-all hover:scale-105"
            >
              <span>⚡ Analyze Vehicle Risk</span>
            </Link>
            <Link
              to="/fleet"
              className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-slate-200 hover:bg-slate-800 hover:text-white transition-all"
            >
              <span>🚚 Explore Fleet Status</span>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Overlay */}
        <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Active Fleet Tracked', value: '1,247', detail: 'Real-time telemetry stream', icon: '🚚' },
          { label: 'System Diagnostic Accuracy', value: '98.4%', detail: 'Predictive Intelligence Engine', icon: '🎯' },
          { label: 'Unscheduled Downtime Saved', value: '420+ hrs', detail: 'Quarterly breakdown prevention', icon: '⏱️' },
          { label: 'Component Inspections Directed', value: '187', detail: 'High-precision maintenance tasks', icon: '🔧' },
        ].map((item, i) => (
          <div key={i} className="card p-5 bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.label}</span>
              <span className="text-xl">{item.icon}</span>
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{item.value}</div>
            <div className="mt-1 text-xs font-medium text-slate-500">{item.detail}</div>
          </div>
        ))}
      </div>

      {/* 4-Step Operational Workflow */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600">Operational Methodology</div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">4-Step Predictive Maintenance Workflow</h2>
          <p className="text-sm text-slate-500 mt-1">How RoadMind AI transforms raw vehicle & terrain data into actionable maintenance protocols.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              step: '01',
              title: 'Monitor Telemetry & Road Stress',
              desc: 'Continuous ingestion of CAN bus signals, engine temperature, vibration sensors, DTC counts, and surface roughness index.',
              icon: '📡',
              badge: 'Real-Time Ingestion',
            },
            {
              step: '02',
              title: 'Predict Risk & Stress Factors',
              desc: 'High-confidence probability scoring evaluated through multi-dimensional telemetry analysis and road condition metrics.',
              icon: '🛡️',
              badge: 'Predictive Scoring',
            },
            {
              step: '03',
              title: 'Explain Driving Factors (SHAP)',
              desc: 'Transparent SHAP (SHapley Additive exPlanations) attribution pinpointing exactly which telemetry variables increase risk.',
              icon: '📊',
              badge: 'Explainable AI',
            },
            {
              step: '04',
              title: 'Act with Targeted Protocols',
              desc: 'Direct maintenance dispatch checklists focusing technician effort on specific components before breakdown occurs.',
              icon: '🛠️',
              badge: 'Technician Action',
            },
          ].map((wf) => (
            <div key={wf.step} className="card p-6 bg-white border border-slate-200 shadow-sm relative flex flex-col justify-between hover:border-blue-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-base font-extrabold text-blue-600 border border-blue-100">
                    {wf.step}
                  </span>
                  <span className="text-xl">{wf.icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{wf.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{wf.desc}</p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-100">
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-md px-2 py-0.5">
                  {wf.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Showcase Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="card p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-2xl mb-3">🚚</div>
            <h3 className="font-bold text-slate-900 text-base">Fleet Operations Dashboard</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Real-time breakdown of high, medium, and low-risk vehicles across logistics routes. Prioritize maintenance schedules efficiently.
            </p>
          </div>
          <Link to="/fleet" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
            <span>View Fleet Matrix</span>
            <span>→</span>
          </Link>
        </div>

        <div className="card p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-bold text-slate-900 text-base">Interactive Vehicle Diagnostics</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Input custom vehicle telemetry parameters or select preset stress conditions to receive instant risk predictions and SHAP factor plots.
            </p>
          </div>
          <Link to="/vehicle-analysis" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
            <span>Run Vehicle Diagnostic</span>
            <span>→</span>
          </Link>
        </div>

        <div className="card p-6 bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-2xl mb-3">🛣️</div>
            <h3 className="font-bold text-slate-900 text-base">Road & Terrain Stress Analysis</h3>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Correlate road surface roughness indices, pothole frequencies, and weather conditions directly with accelerated mechanical wear.
            </p>
          </div>
          <Link to="/road-insights" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700">
            <span>Explore Road Impact</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}