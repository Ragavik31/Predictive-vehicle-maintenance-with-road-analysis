import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sampleRows } from '../data/demo';
import type { DemoInput } from '../types';
import { fetchFleetVehicles, type FleetVehicle } from '../lib/api';

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
  const location = useLocation();
  const incomingVehicleId = (location.state as any)?.selectedVehicleId;

  const [customInput, setCustomInput] = useState<DemoInput>(sampleRows[0]);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>(incomingVehicleId || '');
  const [selectedVehicleName, setSelectedVehicleName] = useState<string>('');
  const [fleetList, setFleetList] = useState<FleetVehicle[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchFleetVehicles(controller.signal)
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFleetList(data);
          if (incomingVehicleId) {
            const target = data.find((v) => v.id === incomingVehicleId);
            if (target) {
              setSelectedVehicleId(target.id);
              setSelectedVehicleName(`${target.id} - ${target.makeModel}`);
              if (target.telemetry) {
                const t = target.telemetry;
                setCustomInput((cur) => ({
                  ...cur,
                  engineTemp: t.engineTemp ?? cur.engineTemp,
                  vibration: t.vibration ?? cur.vibration,
                  oilQuality: t.oilQuality ?? cur.oilQuality,
                  batteryStatus: t.batteryStatus ?? cur.batteryStatus,
                  fuelConsumption: t.fuelConsumption ?? cur.fuelConsumption,
                  tirePressure: t.tirePressure ?? cur.tirePressure,
                  diagnosticTroubleCodeCount: t.diagnosticTroubleCodeCount ?? cur.diagnosticTroubleCodeCount,
                  anomaliesDetected: t.anomaliesDetected ?? cur.anomaliesDetected,
                  usageHours: t.usageHours ?? cur.usageHours,
                  actualLoad: t.actualLoad ?? cur.actualLoad,
                  roadConditions: t.roadConditions ?? cur.roadConditions,
                }));
              }
            }
          }
        }
      })
      .catch(() => null);

    return () => controller.abort();
  }, [incomingVehicleId]);

  const updateCustom = (key: keyof DemoInput, value: number) => setCustomInput((cur) => ({ ...cur, [key]: value }));

  const launchDiagnosticReport = (inputPayload: DemoInput, name: string) => {
    navigate('/vehicle-analysis/report', {
      state: { input: inputPayload, vehicleName: name }
    });
  };

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicleId(id);
    const found = fleetList.find((v) => v.id === id);
    if (found) {
      setSelectedVehicleName(`${found.id} - ${found.makeModel}`);
      if (found.telemetry) {
        const t = found.telemetry;
        setCustomInput((cur) => ({
          ...cur,
          engineTemp: t.engineTemp ?? cur.engineTemp,
          vibration: t.vibration ?? cur.vibration,
          oilQuality: t.oilQuality ?? cur.oilQuality,
          batteryStatus: t.batteryStatus ?? cur.batteryStatus,
          fuelConsumption: t.fuelConsumption ?? cur.fuelConsumption,
          tirePressure: t.tirePressure ?? cur.tirePressure,
          diagnosticTroubleCodeCount: t.diagnosticTroubleCodeCount ?? cur.diagnosticTroubleCodeCount,
          anomaliesDetected: t.anomaliesDetected ?? cur.anomaliesDetected,
          usageHours: t.usageHours ?? cur.usageHours,
          actualLoad: t.actualLoad ?? cur.actualLoad,
          roadConditions: t.roadConditions ?? cur.roadConditions,
        }));
      }
    } else {
      setSelectedVehicleName('');
    }
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vehicle Diagnostic Hub</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {selectedVehicleName
              ? `Operational telemetry pre-filled for ${selectedVehicleName}. Verify parameters and run diagnostic report.`
              : 'Review CAN telemetry parameters or pre-fill from a fleet vehicle to generate a comprehensive diagnostic report.'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => launchDiagnosticReport(customInput, selectedVehicleName || 'Custom Vehicle Scan')}
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
        >
          <span>⚡ Launch Diagnostic Report →</span>
        </button>
      </div>

      {/* Vehicle Telemetry Parameter Editor */}
      <div className="card p-6 bg-white border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="font-bold text-slate-900 text-base">Vehicle Telemetry Parameters</h2>
            <p className="text-xs text-slate-500">
              {selectedVehicleName
                ? `Active telemetry inputs for ${selectedVehicleName}`
                : 'Adjust any of the 20 CAN bus sensor inputs below before launching your diagnostic scan.'}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {fleetList.length > 0 && (
              <select
                value={selectedVehicleId}
                onChange={(e) => handleSelectVehicle(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="">Pre-fill Telemetry from Fleet Vehicle...</option>
                {fleetList.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.id} - {v.makeModel} ({v.route})
                  </option>
                ))}
              </select>
            )}
            <button
              type="button"
              onClick={() => launchDiagnosticReport(customInput, selectedVehicleName || 'Custom Vehicle Scan')}
              className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <span>⚡ Run Scan →</span>
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-h-[500px] overflow-y-auto pr-1">
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
    </div>
  );
}
