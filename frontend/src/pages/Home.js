import { Link } from 'react-router-dom';
import { StatCard } from '../components/StatCard';
var workflowSteps = [
    {
        number: '01',
        title: 'Vehicle Data',
        description: 'Ingest telemetry, engine indicators, and operating signals from the vehicle.',
        icon: 'vehicle'
    },
    {
        number: '02',
        title: 'Road Condition Analysis',
        description: 'Assess road roughness, driving intensity, and route context to estimate mechanical stress.',
        icon: 'road'
    },
    {
        number: '03',
        title: 'Feature Selection & Processing',
        description: 'Normalize, validate, and prepare the most relevant vehicle and road features for prediction.',
        icon: 'process'
    },
    {
        number: '04',
        title: 'Machine Learning Prediction',
        description: 'Run the trained model to estimate maintenance risk before failure occurs.',
        icon: 'model'
    },
    {
        number: '05',
        title: 'Explainable AI & Recommendation',
        description: 'Surface the strongest contributors and translate them into practical maintenance actions.',
        icon: 'insight'
    }
];
var featureCards = [
    {
        title: 'Predictive Maintenance',
        description: 'Predict whether a vehicle requires maintenance before a potential failure.',
        icon: 'shield'
    },
    {
        title: 'Road-Aware Analysis',
        description: 'Consider road conditions and their potential impact on vehicle maintenance.',
        icon: 'map'
    },
    {
        title: 'Explainable AI',
        description: 'Understand which vehicle and road factors contributed to a prediction.',
        icon: 'spark'
    },
    {
        title: 'Maintenance Recommendations',
        description: 'Translate prediction results into practical inspection areas.',
        icon: 'bolt'
    }
];
var modelComparison = [
    { name: 'Logistic Regression', value: '94.05%' },
    { name: 'Random Forest', value: '93.99%' },
    { name: 'XGBoost', value: '93.97%' },
    { name: 'LightGBM', value: '93.83%' },
    { name: 'Easy Ensemble', value: '93.81%' },
    { name: 'Stacking Ensemble', value: '93.68%' },
    { name: 'Decision Tree', value: '93.46%' }
];
function StepIcon(_a) {
    var type = _a.type;
    var common = 'h-10 w-10 rounded-2xl border border-teal-400/20 bg-teal-400/10 text-teal-200';
    if (type === 'vehicle') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 13.5h16l-1.2 4.8A2 2 0 0 1 16.8 20H7.2a2 2 0 0 1-2-1.7L4 13.5Z"/>
        <path d="M7 13.5V9.8A2.8 2.8 0 0 1 9.8 7h4.4A2.8 2.8 0 0 1 17 9.8v3.7"/>
        <circle cx="8" cy="17.5" r="1.3"/>
        <circle cx="16" cy="17.5" r="1.3"/>
      </svg>);
    }
    if (type === 'road') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M4 18.5h16"/>
        <path d="M6 18.5V10l4-3 4 3v8.5"/>
        <path d="M10 10h4"/>
        <path d="M8 14h8"/>
      </svg>);
    }
    if (type === 'process') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M7 7h10v10H7z"/>
        <path d="M7 12h10"/>
        <path d="M12 7v10"/>
      </svg>);
    }
    if (type === 'model') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M5 18V8m7 10V5m7 13v-8"/>
        <path d="M3 18h18"/>
      </svg>);
    }
    return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
      <path d="M12 3v8"/>
      <path d="M12 15v6"/>
      <path d="M7 8.5 12 3l5 5.5"/>
      <path d="M5 15.5 12 21l7-5.5"/>
    </svg>);
}
function FeatureIcon(_a) {
    var type = _a.type;
    var common = 'h-12 w-12 rounded-2xl border border-slate-700 bg-slate-900/80 p-3 text-teal-300';
    if (type === 'shield') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 3.5 18.5 6v5.2c0 4.2-2.7 7.9-6.5 9.3-3.8-1.4-6.5-5.1-6.5-9.3V6L12 3.5Z"/>
        <path d="M9.5 12.2 11.1 13.8 14.8 10"/>
      </svg>);
    }
    if (type === 'map') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M9 18 3.5 20V6L9 4l6 2 5.5-2v14L15 18l-6 2Z"/>
        <path d="M9 4v14M15 6v14"/>
      </svg>);
    }
    if (type === 'spark') {
        return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
        <path d="M12 2.8v6.8M12 14.4v6.8M4.5 12h6.8M12.7 12h6.8M7.2 7.2l4.8 4.8M12 12l4.8 4.8M7.2 16.8l4.8-4.8M12 12l4.8-4.8"/>
      </svg>);
    }
    return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={common}>
      <path d="M5 13.5 9 17l10-10"/>
      <path d="M5 8.5h4m6 0h4"/>
    </svg>);
}
export default function Home() {
    return (<div className="pb-20 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(45,212,191,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.12),transparent_28%)]"/>
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-12 sm:pt-16 lg:px-8 lg:pb-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-slate-900/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-200">
                <span className="h-2 w-2 rounded-full bg-teal-300"/>
                AI-powered vehicle intelligence
              </div>

              <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                Predict Vehicle Maintenance
                <span className="mt-2 block text-teal-300">Before Failure Happens.</span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
                RoadMind AI combines vehicle condition, operational data, and road conditions to predict maintenance requirements and explain the factors behind every prediction.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/demo" className="focus-ring inline-flex items-center justify-center rounded-xl bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200">
                  Analyze Vehicle →
                </Link>
                <Link to="/data" className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-slate-600 hover:bg-slate-800">
                  Explore Dashboard
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                <span>Machine Learning</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:inline-block"/>
                <span>Road-Aware Analysis</span>
                <span className="hidden h-1 w-1 rounded-full bg-slate-500 sm:inline-block"/>
                <span>Explainable AI</span>
              </div>
            </div>

            <div className="relative animate-fade-up">
              <div className="rounded-[28px] border border-slate-800/80 bg-slate-950/80 p-4 shadow-[0_25px_90px_rgba(2,6,23,0.8)] backdrop-blur-sm">
                <div className="rounded-[22px] border border-slate-800 bg-[linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,0.98))] p-6">
                  <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    <span>Fleet status</span>
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2 py-1 text-emerald-300">Operational</span>
                  </div>

                  <div className="relative flex min-h-[280px] items-center justify-center">
                    <div className="absolute inset-x-12 top-8 h-20 rounded-full border border-cyan-400/20 bg-cyan-400/5 blur-2xl"/>
                    <div className="absolute inset-y-6 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-600 to-transparent"/>

                    <div className="relative h-48 w-full max-w-[320px]">
                      <div className="absolute left-8 top-10 h-20 w-20 rounded-full border border-slate-700 bg-slate-900/80"/>
                      <div className="absolute right-8 top-10 h-20 w-20 rounded-full border border-slate-700 bg-slate-900/80"/>
                      <div className="absolute left-10 top-0 h-16 w-44 rounded-[2rem] border border-teal-400/30 bg-teal-400/10 shadow-[inset_0_0_18px_rgba(45,212,191,0.12)]"/>
                      <div className="absolute left-14 top-10 h-10 w-28 rounded-full border border-slate-600 bg-slate-800/90"/>
                      <div className="absolute left-24 top-16 h-9 w-20 rounded-lg border border-slate-700 bg-slate-900/90"/>
                      <div className="absolute left-8 top-12 h-6 w-12 rounded-full border border-slate-600 bg-slate-900"/>
                      <div className="absolute right-8 top-12 h-6 w-12 rounded-full border border-slate-600 bg-slate-900"/>
                      <div className="absolute left-1/2 top-24 h-2 w-24 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-400/70 to-cyan-500/0"/>
                      <div className="absolute left-12 top-16 h-3 w-3 rounded-full bg-teal-300 shadow-[0_0_18px_rgba(94,234,212,0.8)]"/>
                      <div className="absolute right-12 top-16 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(125,211,252,0.8)]"/>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Vehicle Health</div>
                      <div className="mt-2 flex items-end justify-between gap-2">
                        <span className="text-xl font-semibold text-white">94</span>
                        <span className="text-[10px] text-slate-400">/ 100</span>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Maintenance Risk</div>
                      <div className="mt-2 text-lg font-semibold text-emerald-300">LOW</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Road Condition</div>
                      <div className="mt-2 text-lg font-semibold text-amber-300">ROUGH</div>
                    </div>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-3">
                      <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">AI Confidence</div>
                      <div className="mt-2 text-lg font-semibold text-cyan-300">94.0%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-6 pt-8 sm:pt-10">
        <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/65 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-300">Vehicle Health Overview</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Project model statistics</h2>
            </div>
            <p className="text-sm text-slate-400">Illustrative project-level summary for demonstration and reporting.</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Vehicles Analyzed" value="250,000+" detail="Historic data points and fleet scenarios"/>
            <StatCard label="Maintenance Risk" value="32%" detail="Vehicles requiring inspection attention"/>
            <StatCard label="Healthy Vehicles" value="68%" detail="Operating within target thresholds"/>
            <StatCard label="Prediction Accuracy" value="94.05%" detail="Final selected model performance"/>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">How RoadMind AI works</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            From Vehicle Data to Maintenance Insight
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-400">
            An intelligent pipeline that transforms vehicle and road data into actionable maintenance insights.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-8 right-8 top-7 hidden h-px bg-gradient-to-r from-slate-700 via-teal-400/35 to-slate-700 lg:block"/>
          <div className="grid gap-5 lg:grid-cols-5">
            {workflowSteps.map(function (step) { return (<div key={step.number} className="group rounded-[26px] border border-slate-800/80 bg-slate-900/65 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-teal-400/30 hover:bg-slate-900">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{step.number}</span>
                  <StepIcon type={step.icon}/>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              </div>); })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">Core features</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Everything You Need for Smarter Maintenance
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featureCards.map(function (feature) { return (<div key={feature.title} className="group rounded-[28px] border border-slate-800/80 bg-slate-900/65 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-[0_20px_50px_rgba(15,23,42,0.45)]">
              <FeatureIcon type={feature.icon}/>
              <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{feature.description}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-teal-300">
                Learn more
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </div>); })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="rounded-[30px] border border-slate-800/80 bg-[linear-gradient(135deg,_rgba(15,23,42,0.82),_rgba(15,118,110,0.05),_rgba(15,23,42,0.96))] p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[26px] border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-center justify-between pb-4 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                <span>Contribution view</span>
                <span className="rounded-full border border-slate-700 px-2 py-1 text-[10px] text-slate-300">Demo only</span>
              </div>

              <div className="space-y-4">
                {[
            { label: 'Engine Temperature', value: 0.82 },
            { label: 'Vibration Levels', value: 0.67 },
            { label: 'Road Conditions', value: 0.51 },
            { label: 'Oil Quality', value: 0.43 },
            { label: 'Battery Status', value: -0.12 }
        ].map(function (item) { return (<div key={item.label}>
                    <div className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-slate-400">
                      <span>{item.label}</span>
                      <span className={item.value >= 0 ? 'text-teal-300' : 'text-slate-400'}>{item.value.toFixed(2)}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800">
                      <div className={item.value >= 0 ? 'h-2.5 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-cyan-500' : 'h-2.5 w-1/5 rounded-full bg-slate-600'} style={{ width: "".concat(Math.min(Math.abs(item.value) * 100, 95), "%") }}/>
                    </div>
                  </div>); })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">AI explanation preview</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Don&apos;t Just Predict.
                <span className="mt-1 block text-teal-300">Understand Why.</span>
              </h2>

              <div className="mt-6 rounded-[24px] border border-slate-800 bg-slate-950/50 p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">AI Maintenance Insight</p>
                <p className="mt-4 text-lg leading-8 text-slate-200">
                  High engine temperature and increased vibration are the strongest contributors to the predicted maintenance risk.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-slate-400">
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2">Visualization demo only</span>
                <span className="rounded-full border border-slate-700 bg-slate-900/60 px-3 py-2">Not connected to a live prediction</span>
              </div>

              <Link to="/model" className="focus-ring mt-8 inline-flex items-center rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-white">
                Explore AI Insights →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">Road analysis</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            Road Conditions Matter.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="rounded-[30px] border border-slate-800/80 bg-slate-900/65 p-5">
            <div className="relative overflow-hidden rounded-[24px] border border-slate-800 bg-[linear-gradient(180deg,_rgba(15,23,42,1),_rgba(2,6,23,1))] p-5">
              <div className="absolute inset-x-8 bottom-6 h-5 rounded-full bg-slate-700/80"/>
              <div className="absolute inset-x-12 bottom-8 h-px bg-slate-500/70"/>
              <div className="absolute inset-x-14 bottom-12 h-px bg-slate-500/40"/>
              <div className="absolute left-8 bottom-8 h-1 w-20 rounded-full bg-slate-500/80"/>
              <div className="absolute right-10 bottom-8 h-1 w-16 rounded-full bg-slate-500/80"/>

              <div className="relative flex h-52 items-end justify-between px-4">
                <div className="absolute left-10 top-10 h-16 w-16 rounded-full border border-teal-400/25 bg-teal-400/5"/>
                <div className="absolute left-8 top-20 h-1.5 w-24 rounded-full bg-gradient-to-r from-slate-500/0 via-slate-500 to-slate-500/0"/>
                <div className="absolute right-12 top-16 h-1.5 w-28 rounded-full bg-gradient-to-r from-slate-500/0 via-amber-400/60 to-slate-500/0"/>

                <div className="relative mt-auto mb-8 h-12 w-20 rounded-2xl border border-slate-700 bg-slate-800/90 shadow-[0_0_30px_rgba(16,185,129,0.18)]">
                  <div className="absolute left-3 top-3 h-3 w-3 rounded-full bg-teal-300"/>
                  <div className="absolute right-3 top-3 h-3 w-3 rounded-full bg-teal-300"/>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {[{ title: 'Smooth Road', detail: 'Low Impact' }, { title: 'Rough Road', detail: 'Moderate Impact' }, { title: 'Poor / Pothole-Affected', detail: 'High Impact' }].map(function (road) { return (<div key={road.title} className="flex items-center justify-between gap-4 rounded-[22px] border border-slate-800 bg-slate-900/65 p-4">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-teal-300 shadow-[0_0_18px_rgba(45,212,191,0.8)]"/>
                  <div>
                    <div className="text-lg font-semibold text-white">{road.title}</div>
                    <div className="text-sm text-slate-400">{road.detail}</div>
                  </div>
                </div>
              </div>); })}

            <div className="rounded-[22px] border border-slate-800 bg-slate-900/65 p-5">
              <p className="text-base leading-7 text-slate-300">
                Road conditions can increase mechanical stress and influence vehicle maintenance requirements.
              </p>
              <Link to="/data" className="focus-ring mt-5 inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-slate-600 hover:bg-slate-800">
                Analyze Road Conditions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">Model performance</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">Powered by Machine Learning</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div className="rounded-[28px] border border-slate-800/80 bg-slate-900/65 p-6">
            <div className="space-y-4">
              {modelComparison.map(function (model) { return (<div key={model.name}>
                  <div className="mb-1 flex items-center justify-between gap-4 text-sm text-slate-300">
                    <span className={model.name === 'Logistic Regression' ? 'font-semibold text-white' : ''}>{model.name}</span>
                    <span className={model.name === 'Logistic Regression' ? 'font-semibold text-teal-300' : 'text-slate-400'}>{model.value}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-800">
                    <div className={model.name === 'Logistic Regression' ? 'h-2.5 rounded-full bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400' : 'h-2.5 rounded-full bg-slate-700'} style={{ width: model.value.replace('%', '') + '%' }}/>
                  </div>
                </div>); })}
            </div>
          </div>

          <div className="rounded-[28px] border border-teal-400/20 bg-teal-400/5 p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-slate-900/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300"/>
              Selected Final Model
            </div>

            <div className="mt-5 text-3xl font-semibold text-white">Logistic Regression</div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
            ['Accuracy', '94.046%'],
            ['Precision', '93.993%'],
            ['Recall', '87.182%'],
            ['F1 Score', '90.459%'],
            ['ROC-AUC', '92.315%']
        ].map(function (_a) {
            var label = _a[0], value = _a[1];
            return (<div key={label} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
                  <div className="mt-2 text-lg font-semibold text-white">{value}</div>
                </div>);
        })}
            </div>

            <Link to="/model" className="focus-ring mt-6 inline-flex items-center rounded-xl bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200">
              View Full Model Comparison →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="rounded-[30px] border border-slate-800 bg-[linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(13,148,136,0.12),_rgba(15,23,42,0.98))] p-8 text-center shadow-[0_25px_80px_rgba(2,6,23,0.7)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-300">Ready to act</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
            Ready to Analyze a Vehicle?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300">
            Turn vehicle and road data into an actionable maintenance insight.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/demo" className="focus-ring inline-flex items-center justify-center rounded-xl bg-teal-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200">
              Start Vehicle Analysis →
            </Link>
            <Link to="/data" className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:border-slate-600 hover:bg-slate-800">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>);
}
