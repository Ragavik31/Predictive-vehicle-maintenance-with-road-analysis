import { Section } from '../components/Section';
import { MaintenanceRecommendation } from '../components/MaintenanceRecommendation';

export default function Maintenance() {
  const maintenanceSections = [
    {
      priority: 'critical' as const,
      title: 'Engine and Cooling System',
      areas: [
        'Engine coolant temperature sensor check & radiator flush',
        'Coolant pump impeller inspection',
        'Engine oil viscosity & thermal degradation rating',
        'Thermostat valve opening response under thermal load',
      ],
    },
    {
      priority: 'high' as const,
      title: 'Suspension and Steering Subsystems',
      areas: [
        'Front & rear shock absorber damping efficiency',
        'Suspension mounting bush wear & structural alignment',
        'Brake pad thickness & rotor surface pitting',
        'Tire tread wear & pneumatic pressure balance',
      ],
    },
    {
      priority: 'medium' as const,
      title: 'CAN Electrical Harness & Sensors',
      areas: [
        'Battery voltage level & alternator charge output',
        'CAN bus wiring harness continuity & grounding checks',
        'DTC diagnostic trouble code memory clear',
        'Sensor packet loss rate evaluation',
      ],
    },
    {
      priority: 'low' as const,
      title: 'Routine Preventative Checks',
      areas: [
        'Windshield washer & auxiliary fluid top-ups',
        'Air filter & cabin filter replacement',
        'Drive belt tension inspection',
        'Exterior LED signal & headlamp illumination',
      ],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Maintenance Action Center</h1>
        <p className="text-sm text-slate-500 mt-1">Component inspection protocols derived from risk scoring and SHAP factor analysis.</p>
      </div>

      <div className="space-y-6">
        {maintenanceSections.map((section) => (
          <MaintenanceRecommendation
            key={section.title}
            priority={section.priority}
            inspectionAreas={section.areas}
          />
        ))}
      </div>

      {/* Reactive vs Predictive Comparison */}
      <Section eyebrow="Strategic Operational Value" title="Predictive vs. Breakdown Maintenance">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6 bg-white border border-red-200 shadow-sm">
            <h3 className="font-bold text-red-700 text-base flex items-center gap-2">
              <span>❌</span> Breakdown-Driven Maintenance
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span>Unscheduled roadside breakdowns on active cargo routes</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span>High emergency towing and expediting charges</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span>Cascading damage to adjacent engine/drivetrain assemblies</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                <span>Severe disruption to client SLA delivery schedules</span>
              </li>
            </ul>
          </div>

          <div className="card p-6 bg-white border border-emerald-200 shadow-sm">
            <h3 className="font-bold text-emerald-700 text-base flex items-center gap-2">
              <span>✅</span> RoadMind Predictive Maintenance
            </h3>
            <ul className="mt-4 space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>Intervene prior to physical component fracture</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>Schedule maintenance during planned depot stopovers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>Target specific components instead of full assembly replacements</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                <span>Extend total vehicle operational service life by 3.5+ years</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Cost Impact */}
      <Section eyebrow="Fleet ROI Impact" title="Financial Benefits of Early Intervention">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card p-5 bg-white border border-emerald-200 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">Planned Inspection</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">$250 – $800</div>
            <p className="mt-1 text-xs text-slate-500">Targeted component swap</p>
          </div>
          <div className="card p-5 bg-white border border-amber-200 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-800">Unplanned Roadside Service</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">$2,400 – $6,000</div>
            <p className="mt-1 text-xs text-slate-500">Emergency towing & overtime labor</p>
          </div>
          <div className="card p-5 bg-white border border-red-200 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-red-700">Catastrophic Engine Failure</div>
            <div className="mt-2 text-2xl font-bold text-slate-900">$12,000 – $28,000</div>
            <p className="mt-1 text-xs text-slate-500">Complete block / transmission replacement</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
