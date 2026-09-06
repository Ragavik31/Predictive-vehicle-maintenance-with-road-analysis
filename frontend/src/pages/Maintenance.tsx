import { Section } from '../components/Section';
import { FeatureCard } from '../components/FeatureCard';
import { MaintenanceRecommendation } from '../components/MaintenanceRecommendation';

export default function Maintenance() {
  const maintenanceSections = [
    {
      priority: 'critical' as const,
      title: 'Engine and Cooling System',
      areas: [
        'Engine oil level and condition',
        'Coolant level and temperature',
        'Radiator and fan operation',
        'Thermostat functionality',
      ],
    },
    {
      priority: 'high' as const,
      title: 'Suspension and Steering',
      areas: [
        'Suspension wear and alignment',
        'Steering responsive and smooth',
        'Brake pads and rotors',
        'Tire condition and pressure',
      ],
    },
    {
      priority: 'medium' as const,
      title: 'Electrical System',
      areas: [
        'Battery health and connections',
        'Alternator output',
        'Wiring and connector inspection',
        'Sensor functionality check',
      ],
    },
    {
      priority: 'low' as const,
      title: 'Routine Maintenance',
      areas: [
        'Fluid top-ups (windshield, washer)',
        'Filter inspection and replacement',
        'Belt and hose condition',
        'Light functionality (headlights, signals)',
      ],
    },
  ];

  return (
    <div>
      <Section
        eyebrow="MAINTENANCE PLANNING"
        title="Recommended Inspection Areas"
        description="Based on predictive analysis, here are the areas that typically warrant inspection when maintenance is predicted to be necessary."
      >
        <div className="space-y-6">
          {maintenanceSections.map((section) => (
            <MaintenanceRecommendation
              key={section.title}
              priority={section.priority}
              inspectionAreas={section.areas}
            />
          ))}
        </div>
      </Section>

      {/* Benefits Section */}
      <Section eyebrow="WHY THIS MATTERS" title="Predictive vs. Reactive Maintenance">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6 border-orange-400/20">
            <h3 className="font-semibold text-orange-300">❌ Reactive Maintenance</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <span className="text-orange-300">•</span>
                <span>Wait until vehicle fails</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-300">•</span>
                <span>Unexpected downtime and costs</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-300">•</span>
                <span>Risk of secondary damage</span>
              </li>
              <li className="flex gap-3">
                <span className="text-orange-300">•</span>
                <span>Emergency repair rates</span>
              </li>
            </ul>
          </div>

          <div className="card p-6 border-teal-400/20">
            <h3 className="font-semibold text-teal-300">✅ Predictive Maintenance</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-3">
                <span className="text-teal-300">•</span>
                <span>Predict issues before failure</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-300">•</span>
                <span>Schedule maintenance proactively</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-300">•</span>
                <span>Prevent cascading failures</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-300">•</span>
                <span>Extend vehicle lifespan</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Best Practices */}
      <Section eyebrow="BEST PRACTICES" title="Maintenance Guidelines">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon="🔧"
            title="Follow Recommendations"
            description="Act on predictive maintenance recommendations promptly to prevent failures."
          />
          <FeatureCard
            icon="📋"
            title="Document Everything"
            description="Keep records of all inspections and maintenance performed."
          />
          <FeatureCard
            icon="⏱️"
            title="Schedule Regularly"
            description="Integrate predictive insights with routine maintenance schedules."
          />
          <FeatureCard
            icon="👨‍🔧"
            title="Use Qualified Technicians"
            description="Have inspections performed by qualified vehicle technicians."
          />
          <FeatureCard
            icon="📊"
            title="Monitor Trends"
            description="Track how vehicle condition changes over time."
          />
          <FeatureCard
            icon="🚗"
            title="Keep Fleet Health"
            description="Address issues across all vehicles, not just critical cases."
          />
        </div>
      </Section>

      {/* Cost Impact */}
      <Section eyebrow="COST IMPACT" title="The Numbers Behind Maintenance">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card p-6 border-amber-400/20">
            <div className="text-lg font-semibold text-amber-300">Scheduled Maintenance</div>
            <div className="mt-2 text-3xl font-bold text-white">₹41,500-1,24,500</div>
            <p className="mt-2 text-sm text-slate-400">Average cost when planned</p>
          </div>
          <div className="card p-6 border-orange-400/20">
            <div className="text-lg font-semibold text-orange-300">Unplanned Maintenance</div>
            <div className="mt-2 text-3xl font-bold text-white">₹1,66,000-4,15,000</div>
            <p className="mt-2 text-sm text-slate-400">Average cost when emergency</p>
          </div>
          <div className="card p-6 border-rose-400/20">
            <div className="text-lg font-semibold text-rose-300">Major Failure</div>
            <div className="mt-2 text-3xl font-bold text-white">₹4,15,000-12,45,000</div>
            <p className="mt-2 text-sm text-slate-400">When not caught in time</p>
          </div>
        </div>

        <div className="mt-6 card p-6 bg-teal-400/5 border-teal-400/20">
          <p className="text-sm text-teal-200">
            💡 <span className="font-medium">Key Insight:</span> Predictive maintenance can reduce overall costs by 20-40% through planned interventions and prevention of major failures.
          </p>
        </div>
      </Section>
    </div>
  );
}
