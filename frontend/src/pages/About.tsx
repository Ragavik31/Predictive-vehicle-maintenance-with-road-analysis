import { Link } from 'react-router-dom';
import { Section } from '../components/Section';
import { FeatureCard } from '../components/FeatureCard';

export default function About() {
  return (
    <div>
      <Section
        eyebrow="ABOUT ROADMIND AI"
        title="Intelligent Vehicle Maintenance Prediction"
        description="RoadMind AI is an AI-powered system that predicts vehicle maintenance requirements before failures occur, using machine learning and explainable AI techniques."
      >
        <div className="card p-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300">
              Modern vehicles generate vast amounts of operational data. RoadMind AI transforms this data into actionable insights, helping you maintain vehicles proactively rather than reactively.
            </p>
            <p className="mt-4 text-lg text-slate-300">
              By combining vehicle telemetry, road conditions, and machine learning, we predict maintenance needs with 94% accuracy, while explaining exactly why each prediction was made.
            </p>
          </div>
        </div>
      </Section>

      {/* The Problem */}
      <Section eyebrow="THE CHALLENGE" title="Why Predictive Maintenance Matters">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-orange-300">❌ Traditional Approach</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Fixed maintenance schedules regardless of actual condition</li>
              <li>Surprise breakdowns and emergency repairs</li>
              <li>Vehicles over-serviced or under-maintained</li>
              <li>High operational costs and downtime</li>
              <li>No insights into why issues occur</li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-teal-300">✅ RoadMind AI Approach</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>Maintenance predicted based on actual vehicle condition</li>
              <li>Prevent failures before they happen</li>
              <li>Optimize maintenance scheduling and costs</li>
              <li>Reduced downtime and extended vehicle lifespan</li>
              <li>Full transparency with explainable predictions</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* How It Works */}
      <Section eyebrow="HOW IT WORKS" title="The RoadMind AI Pipeline">
        <div className="space-y-6">
          {[
            {
              step: '1',
              title: 'Data Collection',
              description: 'Capture vehicle telemetry including engine temperature, vibration, oil pressure, and road conditions.',
            },
            {
              step: '2',
              title: 'Feature Engineering',
              description: 'Process and normalize data, extract meaningful features that predict maintenance needs.',
            },
            {
              step: '3',
              title: 'ML Prediction',
              description: 'Use trained Logistic Regression model to predict maintenance probability (94% accuracy).',
            },
            {
              step: '4',
              title: 'Explainability',
              description: 'Analyze feature contributions using SHAP values to explain the prediction.',
            },
            {
              step: '5',
              title: 'Recommendations',
              description: 'Generate actionable maintenance recommendations based on predicted risk and contributing factors.',
            },
          ].map((item) => (
            <div key={item.step} className="card p-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-teal-400/30 bg-teal-400/10 font-semibold text-teal-300">
                    {item.step}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-slate-400">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Technology */}
      <Section eyebrow="TECHNOLOGY STACK" title="Powered by Modern ML">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="🤖"
            title="Logistic Regression"
            description="Final model selected for superior accuracy, precision, and interpretability over ensemble methods."
          />
          <FeatureCard
            icon="📊"
            title="SHAP Analysis"
            description="Explains predictions by showing the contribution of each feature to the final prediction."
          />
          <FeatureCard
            icon="⚡"
            title="Feature Engineering"
            description="Extracts and normalizes vehicle telemetry into meaningful predictive features."
          />
          <FeatureCard
            icon="🗄️"
            title="Historical Data"
            description="Trained on 100,000+ vehicle records with known maintenance outcomes."
          />
          <FeatureCard
            icon="🌐"
            title="Real-time Processing"
            description="Predictions generated instantly from current vehicle sensor data."
          />
          <FeatureCard
            icon="📈"
            title="Continuous Learning"
            description="Model performance monitored and refined with new data over time."
          />
        </div>
      </Section>

      {/* Key Metrics */}
      <Section eyebrow="PERFORMANCE" title="Model Evaluation Metrics">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'Accuracy', value: '94.046%' },
            { label: 'Precision', value: '93.993%' },
            { label: 'Recall', value: '87.182%' },
            { label: 'F1 Score', value: '90.459%' },
            { label: 'ROC-AUC', value: '92.315%' },
          ].map((metric) => (
            <div key={metric.label} className="card p-4 text-center">
              <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {metric.label}
              </div>
              <div className="mt-2 text-2xl font-bold text-teal-300">{metric.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 card p-6 bg-slate-900/50 border-slate-800">
          <p className="text-sm text-slate-400">
            Logistic Regression was selected as the final model after comprehensive evaluation of 7 different algorithms including Random Forest, XGBoost, LightGBM, and ensemble methods. It offers the best balance of accuracy, precision, and interpretability for this maintenance prediction task.
          </p>
        </div>
      </Section>

      {/* Benefits */}
      <Section eyebrow="WHY CHOOSE ROADMIND AI" title="Key Benefits">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="💰"
            title="Cost Savings"
            description="Reduce maintenance costs by 20-40% through proactive intervention."
          />
          <FeatureCard
            icon="⏱️"
            title="Reduced Downtime"
            description="Schedule maintenance at convenient times, not during emergencies."
          />
          <FeatureCard
            icon="🛡️"
            title="Prevent Failures"
            description="Catch issues early before they escalate into major problems."
          />
          <FeatureCard
            icon="📊"
            title="Data-Driven Decisions"
            description="Make maintenance decisions based on real vehicle condition data."
          />
          <FeatureCard
            icon="🎯"
            title="High Accuracy"
            description="94% accuracy in predicting maintenance requirements."
          />
          <FeatureCard
            icon="💡"
            title="Explainable AI"
            description="Understand exactly why each prediction was made."
          />
        </div>
      </Section>

      {/* Use Cases */}
      <Section eyebrow="USE CASES" title="Who Benefits from RoadMind AI">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Fleet Managers',
              description: 'Optimize maintenance schedules across hundreds of vehicles, reduce costs, minimize downtime.',
            },
            {
              title: 'Logistics Companies',
              description: 'Keep vehicles running reliably, prevent unexpected breakdowns that disrupt deliveries.',
            },
            {
              title: 'Vehicle Rental Services',
              description: 'Maintain fleet reliability, reduce warranty claims, extend vehicle lifespan.',
            },
            {
              title: 'Public Transportation',
              description: 'Improve service reliability, schedule maintenance during off-peak hours.',
            },
            {
              title: 'Government Agencies',
              description: 'Manage large vehicle fleets efficiently with predictive maintenance.',
            },
            {
              title: 'Field Service Companies',
              description: 'Ensure vehicles are in perfect condition for on-site work.',
            },
          ].map((useCase) => (
            <div key={useCase.title} className="card p-6 border-teal-400/10">
              <h4 className="font-semibold text-white">{useCase.title}</h4>
              <p className="mt-2 text-sm text-slate-400">{useCase.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section eyebrow="GET STARTED" title="Ready to Transform Your Maintenance?">
        <div className="card p-8 text-center">
          <p className="text-lg text-slate-300">
            Start analyzing vehicles and predicting maintenance needs with RoadMind AI today.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              to="/vehicle-analysis"
              className="focus-ring inline-flex items-center justify-center rounded-xl bg-teal-300 px-6 py-3 font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200"
            >
              Analyze a Vehicle →
            </Link>
            <Link
              to="/dashboard"
              className="focus-ring inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-slate-800"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
