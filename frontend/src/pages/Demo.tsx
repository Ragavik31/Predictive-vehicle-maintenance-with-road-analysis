import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleRows } from '../data/demo';
import type { DemoInput } from '../types';

type Field = { key: keyof DemoInput; label: string; min: number; max: number; step: number; unit: string; options?: { value: number; label: string }[] };

const categories = {
  makeAndModel: ['Chevy Silverado', 'Ford F-150', 'Isuzu NPR', 'MAN TGX', 'Mercedes Actros', 'Scania R-Series', 'Tesla Semi', 'Volvo FH'],
  vehicleType: ['Electric Truck', 'Heavy Truck', 'Light Truck', 'Medium Truck', 'Refrigerated Truck'],
  roadConditions: ['Congested', 'Moderate', 'Mountainous', 'Rough', 'Smooth'],
  weatherConditions: ['Clear', 'Cold', 'Foggy', 'Hot', 'Humid', 'Rainy'],
  routeInfo: ['Cold-Chain Route', 'Highway Freight', 'Intercity Logistics', 'Port-to-Warehouse', 'Urban Delivery'],
};

const optionsFor = (values: string[]) => values.map((label, value) => ({ value, label }));

const fields: Field[] = [
  { key: 'makeAndModel', label: 'Make & Model', min: 0, max: 7, step: 1, unit: '', options: optionsFor(categories.makeAndModel) },
  { key: 'vehicleType', label: 'Vehicle Type', min: 0, max: 4, step: 1, unit: '', options: optionsFor(categories.vehicleType) },
  { key: 'yearOfManufacture', label: 'Year', min: 2012, max: 2026, step: 1, unit: '' },
  { key: 'roadConditions', label: 'Road Condition', min: 0, max: 4, step: 1, unit: '', options: optionsFor(categories.roadConditions) },
  { key: 'weatherConditions', label: 'Weather Impact', min: 0, max: 5, step: 1, unit: '', options: optionsFor(categories.weatherConditions) },
  { key: 'routeInfo', label: 'Route Classification', min: 0, max: 4, step: 1, unit: '', options: optionsFor(categories.routeInfo) },
  { key: 'usageHours', label: 'Engine Operating Hours', min: 0, max: 30000, step: 100, unit: 'hrs' },
  { key: 'loadCapacity', label: 'Rated Capacity', min: 0, max: 30000, step: 100, unit: 'kg' },
  { key: 'actualLoad', label: 'Actual Payload Weight', min: 0, max: 30000, step: 100, unit: 'kg' },
  { key: 'engineTemp', label: 'Coolant Temp', min: 60, max: 120, step: 1, unit: '°C' },
  { key: 'fuelConsumption', label: 'Fuel Consumption', min: 0, max: 20, step: 0.1, unit: 'L/100km' },
  { key: 'batteryStatus', label: 'Battery Health', min: 0, max: 120, step: 1, unit: '%' },
  { key: 'oilQuality', label: 'Oil Quality Index', min: 0, max: 120, step: 1, unit: 'pts' },
  { key: 'vibration', label: 'Chassis Vibration', min: 0, max: 8, step: 0.1, unit: 'RMS' },
  { key: 'tirePressure', label: 'Tire Pressure', min: 0, max: 80, step: 0.1, unit: 'PSI' },
  { key: 'failureHistory', label: 'Past Failure Incidents', min: 0, max: 10, step: 1, unit: 'events' },
  { key: 'anomaliesDetected', label: 'Sensor Anomalies', min: 0, max: 10, step: 1, unit: 'alerts' },
  { key: 'diagnosticTroubleCodeCount', label: 'DTC Code Count', min: 0, max: 10, step: 1, unit: 'codes' },
  { key: 'canMessageRateHz', label: 'CAN Bus Message Rate', min: 0, max: 100, step: 0.1, unit: 'Hz' },
  { key: 'sensorPacketLossRate', label: 'Sensor Loss Rate', min: 0, max: 1, step: 0.001, unit: 'ratio' },
];

export default function Demo() {
  const navigate = useNavigate();
  const [customInput, setCustomInput] = useState<DemoInput>(sampleRows[0]);
  const [showCustomDrawer, setShowCustomDrawer] = useState<boolean>(false);

  const updateCustom = (key: keyof DemoInput, value: number) => setCustomInput((cur) => ({ ...cur, [key]: value }));

  const launchDiagnosticReport = (inputPayload: DemoInput, name: string) => {
    navigate('/vehicle-analysis/report', {
      state: { input: inputPayload, vehicleName: name }
    });
  };

  const presetCards = [
    {
      id: 'VH-2841',
      name: 'Volvo FH16 (Heavy Hauler)',
      desc: 'Standard highway cargo haul under baseline operating parameters.',
      route: 'Interstate 95 Express Corridor',
      badge: 'Baseline Operational',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: '🚚',
      input: sampleRows[0],
    },
    {
      id: 'VH-2850',
      name: 'MAN TGX (Refrigerated Transport)',
      desc: 'Elevated engine coolant temperature (108°C) under heavy thermal load.',
      route: 'Trans-Mountain Alpine Pass',
      badge: '🔥 Overheating Critical Alert',
      badgeColor: 'bg-red-50 text-red-700 border-red-200',
      icon: '⚠️',
      input: { ...sampleRows[0], engineTemp: 108, oilQuality: 35 },
    },
    {
      id: 'VH-2855',
      name: 'Isuzu Giga (Dump Heavy Truck)',
      desc: 'Severe chassis vibration (5.8 RMS) and rough unpaved terrain stress.',
      route: 'Quarry Access Off-Road',
      badge: '🛣️ High Roughness Stress',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: '📉',
      input: { ...sampleRows[0], vibration: 5.8, roadConditions: 4 },
    },
    {
      id: 'VH-2838',
      name: 'Scania R500 (Long Haul Semi)',
      desc: 'Multiple active CAN diagnostic trouble codes (DTC) & sensor packet loss.',
      route: 'Northern Logistics Loop',
      badge: '⚡ Electrical DTC Alert',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: '🔧',
      input: { ...sampleRows[0], diagnosticTroubleCodeCount: 4, sensorPacketLossRate: 0.08 },
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Compact Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vehicle Diagnostic Hub</h1>
          <p className="text-sm text-slate-500 mt-0.5">Select a vehicle profile or launch a custom telemetry scan to generate a full diagnostic report.</p>
        </div>

        <button
          type="button"
          onClick={() => setShowCustomDrawer(!showCustomDrawer)}
          className="focus-ring inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
        >
          <span>⚙️</span>
          <span>{showCustomDrawer ? 'Hide Telemetry Builder' : 'Configure Custom Telemetry'}</span>
        </button>
      </div>

      {/* Collapsible Custom Telemetry Builder */}
      {showCustomDrawer && (
        <div className="card p-6 bg-white border border-blue-200 shadow-md animate-fade-up space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-slate-900 text-base">Custom Vehicle Telemetry Parameters</h2>
              <p className="text-xs text-slate-500">Adjust any of the 20 CAN bus inputs below before launching your diagnostic scan.</p>
            </div>
            <button
              type="button"
              onClick={() => launchDiagnosticReport(customInput, 'Custom Vehicle Scan')}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <span>⚡ Launch Custom Scan →</span>
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-h-[380px] overflow-y-auto pr-1">
            {fields.map((field) => (
              <div key={field.key} className="rounded-lg border border-slate-200/80 bg-slate-50/60 p-2.5">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-slate-800 text-[11px]">{field.label}</span>
                  <span className="font-mono text-[11px] font-bold text-blue-600">
                    {field.options?.find((o) => o.value === customInput[field.key])?.label ?? `${customInput[field.key]} ${field.unit}`}
                  </span>
                </div>

                {field.options ? (
                  <select
                    className="w-full rounded border border-slate-200 bg-white px-2 py-1 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                    value={customInput[field.key]}
                    onChange={(e) => updateCustom(field.key, Number(e.target.value))}
                  >
                    {field.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={customInput[field.key]}
                    onChange={(e) => updateCustom(field.key, Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Simple & Clean Vehicle Profile Selection Cards */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Operational Vehicle Profiles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {presetCards.map((v) => (
            <div key={v.id} className="card p-5 bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{v.icon}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${v.badgeColor}`}>
                    {v.badge}
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-base">{v.name}</div>
                <div className="text-xs font-medium text-slate-500 mt-0.5">{v.id} • {v.route}</div>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{v.desc}</p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">20 CAN Telemetry Inputs</span>
                <button
                  type="button"
                  onClick={() => launchDiagnosticReport(v.input, `${v.id} (${v.name})`)}
                  className="focus-ring inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
                >
                  <span>Run Full Diagnostic Report</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
