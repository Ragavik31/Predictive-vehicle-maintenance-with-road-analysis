import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* HERO SECTION: PROJECT ABSTRACT & MISSION */}
      <div className="rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/60 to-blue-50/40 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black tracking-wider bg-blue-600 text-white shadow-2xs">
              FleetGuard AI
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Theoretical Foundation & Methodology
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Soft Voting Ensemble & SHAP XAI
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Predictive Vehicle Maintenance with Road Condition Intelligence
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            A machine learning framework designed to eliminate unexpected fleet breakdowns by fusing 
            real-time CAN-bus mechanical telemetry with dynamic road surface context, environmental stress, 
            and load utilization metrics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/prediction"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white text-xs sm:text-sm font-bold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
            >
              <span>⚡</span>
              <span>Launch 20-Feature Predictive Tool</span>
            </Link>
            <Link
              to="/model-xai"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs sm:text-sm font-bold hover:bg-slate-50 transition-all shadow-2xs"
            >
              <span>🧠</span>
              <span>View Model Ablation & SHAP XAI</span>
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 1: THE CORE PROBLEM & ENGINEERING MOTIVATION */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🎯</span> The Engineering Problem & Motivation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Why traditional fleet maintenance paradigms fail and why environmental context is essential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-lg border border-rose-100">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Failure of Reactive Maintenance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Traditional fleets rely on <em>run-to-failure</em> operations or static mileage intervals. 
              Run-to-failure incurs catastrophic towing fees, emergency repair premiums, and secondary damage across interconnected powertrain assemblies.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg border border-amber-100">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Inadequacy of Static Schedules</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Time-based (e.g., every 90 days) or odometer-based (every 10,000 km) servicing assumes identical operating conditions. A vehicle traveling over mountainous rough terrain accumulates mechanical fatigue up to 3× faster than one on smooth highways.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg border border-blue-100">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">The Road Context Blindspot</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Prior predictive maintenance models inspected vehicle internal telemetry in isolation. By neglecting surface roughness, terrain elevation, weather severity, and load strain, models suffered high false-negative rates in demanding operating environments.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 2: THEORETICAL PILLARS OF FLEETGUARD AI */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🔬</span> Theoretical Foundations & Scientific Pillars
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Key machine learning, statistical, and domain principles underpinning the system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Pillar 1 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Pillar 1</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Data Integrity
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Target Leakage Elimination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In real-world predictive maintenance, historical retrospective fields (such as <em>Days_Since_Last_Maintenance</em>, 
              <em>Historical_Maintenance_Cost</em>, and <em>Impact_on_Efficiency</em>) introduce severe data leakage because they encode 
              retrospective failure outcomes rather than pre-failure degradation physics. FleetGuard AI eliminates these features, training strictly on an 
              autonomous <strong>20-feature operational space</strong> to guarantee genuine pre-failure generalization.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Pillar 2</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Imbalance Handling
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Synthetic Minority Over-sampling (SMOTE)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Commercial vehicle breakdowns are rare events, typically constituting &lt;15% of fleet operations. Standard classifiers trained on imbalanced distributions exhibit heavy majority-class bias. 
              FleetGuard AI applies <strong>SMOTE</strong> strictly to the training partition, synthesizing failure samples along $k$-nearest neighbor feature vectors without contaminating test distributions.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Pillar 3</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Ensemble Learning
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">Soft Voting Ensemble Classifier</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rather than relying on a single algorithm, FleetGuard AI combines four fundamentally diverse inductive biases:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 pl-4 list-disc">
              <li><strong>Logistic Regression:</strong> Robust linear probabilistic boundary.</li>
              <li><strong>Gaussian Naive Bayes:</strong> Independent feature likelihood estimation under normal distribution.</li>
              <li><strong>Random Forest:</strong> Bagged ensemble of decorrelated decision trees reducing variance.</li>
              <li><strong>Gradient Boosting:</strong> Sequential ensemble minimizing loss residuals via gradient descent.</li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              Predictions are aggregated via soft probability averaging across all 4 base models: P(y=1|x) = (1/4) × ∑ P_m(y=1|x).
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="card p-6 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Pillar 4</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                Explainability & Statistics
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">SHAP Explainability & Statistical Validation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Black-box predictions are unacceptable in fleet safety. FleetGuard AI integrates:
            </p>
            <ul className="text-xs text-slate-600 space-y-1.5 pl-4 list-disc">
              <li><strong>SHAP (Shapley Additive Explanations):</strong> Grounded in cooperative game theory to allocate fair marginal contributions $\phi_i$ to each sensor and road factor.</li>
              <li><strong>Chi-Square ($\chi^2$) & Cramér's $V$:</strong> Validates statistically significant non-causal association between road conditions and maintenance rates ($p &lt; 0.001$).</li>
            </ul>
            <p className="text-xs text-slate-500 italic">
              All findings use non-causal phrasing ("associated with", never "causes").
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3: SYSTEM ARCHITECTURAL WORKFLOW */}
      <div className="card p-6 sm:p-8 border border-slate-200/90 bg-white shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>⚙️</span> End-to-End Methodology Workflow
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            The five-stage execution pipeline from raw telemetry acquisition to actionable maintenance dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              step: 'Step 01',
              title: 'Telemetry Ingestion',
              desc: 'High-frequency CAN-bus sensor streams (engine temp, vibration harmonics, oil quality, battery voltage, DTC codes) + GPS route context.',
              icon: '📡',
              badge: 'Input Layer',
            },
            {
              step: 'Step 02',
              title: 'Leakage Removal',
              desc: 'Rigorous removal of retrospective historical leakage variables. Normalization and standardization across 20 active operational features.',
              icon: '🧹',
              badge: 'Preprocessing',
            },
            {
              step: 'Step 03',
              title: 'SMOTE Balancing',
              desc: 'Synthetic minority over-sampling on the training partition to balance rare failure events without test data contamination.',
              icon: '⚖️',
              badge: 'Sampling',
            },
            {
              step: 'Step 04',
              title: 'Soft Voting Inference',
              desc: 'Simultaneous inference across Logistic Regression, Gaussian NB, Random Forest, and Gradient Boosting, aggregated by soft voting.',
              icon: '🗳️',
              badge: 'Classification',
            },
            {
              step: 'Step 05',
              title: 'SHAP Attribution',
              desc: 'Local Shapley values compute marginal feature contributions, generating plain-English explanations and inspection directives.',
              icon: '💡',
              badge: 'Explainability',
            },
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5 relative">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              </div>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                {item.step}
              </div>
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: THE 20 OPERATIONAL FEATURES TAXONOMY */}
      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-2">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>📊</span> The 20-Feature Operational Telemetry Space
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Every feature utilized by the Soft Voting Ensemble categorized by operational subsystem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category 1 */}
          <div className="card p-5 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700">
              <span>🗺️</span>
              <span>Fleet & Route Context (6)</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 divide-y divide-slate-100">
              <li className="pt-1.5 font-medium">1. Make & Model</li>
              <li className="pt-1.5 font-medium">2. Vehicle Type</li>
              <li className="pt-1.5 font-medium">3. Route Type</li>
              <li className="pt-1.5 font-medium">4. Road Condition</li>
              <li className="pt-1.5 font-medium">5. Weather Condition</li>
              <li className="pt-1.5 font-medium">6. Year of Manufacture</li>
            </ul>
          </div>

          {/* Category 2 */}
          <div className="card p-5 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
              <span>⚖️</span>
              <span>Payload & Lifecycle (4)</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 divide-y divide-slate-100">
              <li className="pt-1.5 font-medium">7. Actual Load (kg)</li>
              <li className="pt-1.5 font-medium">8. Load Capacity (kg)</li>
              <li className="pt-1.5 font-medium">9. Usage Hours (hrs)</li>
              <li className="pt-1.5 font-medium">10. Failure History (count)</li>
            </ul>
          </div>

          {/* Category 3 */}
          <div className="card p-5 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
              <span>⚙️</span>
              <span>Powertrain Telemetry (5)</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 divide-y divide-slate-100">
              <li className="pt-1.5 font-medium">11. Engine Temperature (°C)</li>
              <li className="pt-1.5 font-medium">12. Vibration Levels (mm/s)</li>
              <li className="pt-1.5 font-medium">13. Oil Quality (%)</li>
              <li className="pt-1.5 font-medium">14. Battery Status (%)</li>
              <li className="pt-1.5 font-medium">15. Fuel Consumption (L/100km)</li>
            </ul>
          </div>

          {/* Category 4 */}
          <div className="card p-5 border border-slate-200/90 bg-white shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
              <span>📡</span>
              <span>Diagnostics & CAN Bus (5)</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 divide-y divide-slate-100">
              <li className="pt-1.5 font-medium">16. Trouble Codes (DTC Count)</li>
              <li className="pt-1.5 font-medium">17. Anomalies Detected</li>
              <li className="pt-1.5 font-medium">18. Tire Pressure (psi)</li>
              <li className="pt-1.5 font-medium">19. CAN Message Rate (Hz)</li>
              <li className="pt-1.5 font-medium">20. Sensor Packet Loss Rate (%)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION 5: EXPLORE APPLICATION MODULES */}
      <div className="rounded-3xl border border-slate-200/90 bg-slate-900 text-white p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
              FleetGuard AI Platform
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">
              Ready to explore live vehicle predictions and road intelligence?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Navigate to any of the core application modules below to interact with real model inference and statistical analytics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          <Link
            to="/prediction"
            className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group"
          >
            <div className="text-3xl mb-2.5 group-hover:scale-110 transition-transform">⚡</div>
            <div className="text-base font-bold text-white">Vehicle Risk Prediction Tool</div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              Configure 20 operational parameters and telemetry sliders to execute the live Soft Voting Ensemble with plain-English SHAP explanations.
            </div>
          </Link>

          <Link
            to="/model-xai"
            className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all group"
          >
            <div className="text-3xl mb-2.5 group-hover:scale-110 transition-transform">🧠</div>
            <div className="text-base font-bold text-white">Model Performance & XAI Validation</div>
            <div className="text-xs text-slate-400 mt-1 leading-relaxed">
              Compare rigorous ablation metrics (with vs without road context), statistical validation, and explore global top-8 SHAP feature rankings.
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
