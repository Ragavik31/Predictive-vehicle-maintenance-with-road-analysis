import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseDemoCsv } from '../lib/csv';
import { predictWithModel } from '../lib/model';
import { sampleRows, sampleCsv } from '../data/demo';
import type { DemoInput, Prediction } from '../types';

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
  { key: 'makeAndModel', label: 'Make and model', min: 0, max: 7, step: 1, unit: '', options: optionsFor(categories.makeAndModel) },
  { key: 'vehicleType', label: 'Vehicle type', min: 0, max: 4, step: 1, unit: '', options: optionsFor(categories.vehicleType) },
  { key: 'yearOfManufacture', label: 'Year of manufacture', min: 1900, max: 2100, step: 1, unit: 'year' },
  { key: 'roadConditions', label: 'Road conditions', min: 0, max: 4, step: 1, unit: '', options: optionsFor(categories.roadConditions) },
  { key: 'weatherConditions', label: 'Weather conditions', min: 0, max: 5, step: 1, unit: '', options: optionsFor(categories.weatherConditions) },
  { key: 'routeInfo', label: 'Route info', min: 0, max: 4, step: 1, unit: '', options: optionsFor(categories.routeInfo) },
  { key: 'usageHours', label: 'Usage hours', min: 0, max: 30000, step: 100, unit: 'hours' },
  { key: 'loadCapacity', label: 'Load capacity', min: 0, max: 30000, step: 100, unit: 'kg' },
  { key: 'actualLoad', label: 'Actual load', min: 0, max: 30000, step: 100, unit: 'kg' },
  { key: 'engineTemp', label: 'Engine temperature', min: 60, max: 120, step: 1, unit: 'C' },
  { key: 'fuelConsumption', label: 'Fuel consumption', min: 0, max: 20, step: 0.1, unit: 'L/100 km' },
  { key: 'batteryStatus', label: 'Battery status', min: 0, max: 120, step: 1, unit: '%' },
  { key: 'oilQuality', label: 'Oil quality', min: 0, max: 120, step: 1, unit: 'score' },
  { key: 'vibration', label: 'Vibration levels', min: 0, max: 8, step: 0.1, unit: 'RMS' },
  { key: 'tirePressure', label: 'Tire pressure', min: 0, max: 80, step: 0.1, unit: 'psi' },
  { key: 'failureHistory', label: 'Failure history', min: 0, max: 10, step: 0.1, unit: 'count' },
  { key: 'anomaliesDetected', label: 'Anomalies detected', min: 0, max: 10, step: 0.1, unit: 'count' },
  { key: 'diagnosticTroubleCodeCount', label: 'Diagnostic trouble codes', min: 0, max: 10, step: 1, unit: 'count' },
  { key: 'canMessageRateHz', label: 'CAN message rate', min: 0, max: 100, step: 0.1, unit: 'Hz' },
  { key: 'sensorPacketLossRate', label: 'Sensor packet loss', min: 0, max: 1, step: 0.001, unit: 'rate' },
];

const emptyPrediction: Prediction = {
  label: 'No immediate maintenance',
  probability: 0,
  contributions: [],
};

export default function Demo() {
  const [input, setInput] = useState(sampleRows[0]);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Prediction | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = window.setTimeout(() => {
      predictWithModel(input, controller.signal)
        .then((prediction) => {
          setResult(prediction);
          setError('');
        })
        .catch((requestError) => {
          if (requestError.name !== 'AbortError') {
            setError(requestError instanceof Error ? requestError.message : 'Unable to reach the prediction service.');
          }
        });
    }, 250);
    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [input]);

  const update = (key: keyof DemoInput, value: number) => setInput((current) => ({ ...current, [key]: value }));
  const onFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const rows = await parseDemoCsv(file);
      setInput(rows[0]);
    } catch (fileError) {
      setError(fileError instanceof Error ? fileError.message : 'Unable to read CSV.');
    }
  };

  const displayedResult = result ?? emptyPrediction;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
      <div className="max-w-3xl">
        <div className="text-xs font-semibold uppercase tracking-[.18em] text-teal-300">Vehicle Analysis</div>
        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Live maintenance prediction</h1>
        <p className="mt-4 text-slate-400">Enter all 20 features used by the trained model. Results update automatically through the prediction service.</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <div className="card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-semibold text-white">Model inputs</h2>
            <button type="button" onClick={() => setInput(sampleRows[0])} className="focus-ring rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">
              Load sample
            </button>
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.key} className="block">
                <span className="flex justify-between gap-3 text-xs text-slate-400">
                  <span>{field.label}</span>
                  <span>{field.options?.find((option) => option.value === input[field.key])?.label ?? `${input[field.key]} ${field.unit}`}</span>
                </span>
                {field.options ? (
                  <select className="focus-ring mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200" value={input[field.key]} onChange={(event) => update(field.key, Number(event.target.value))}>
                    {field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                ) : (
                  <input className="mt-2 w-full accent-teal-300" type="range" min={field.min} max={field.max} step={field.step} value={input[field.key]} onChange={(event) => update(field.key, Number(event.target.value))} />
                )}
              </label>
            ))}
          </div>
          <div className="mt-7 rounded-xl border border-dashed border-slate-700 p-4">
            <label className="focus-ring block cursor-pointer">
              <span className="text-sm font-medium text-white">Upload 20-feature CSV</span>
              <span className="mt-1 block text-xs text-slate-500">CSV headers must match the 20 input names. Maximum 250 KB; first 20 rows are supported.</span>
              <input aria-label="Upload CSV" className="mt-3 block w-full text-sm text-slate-400" type="file" accept=".csv,text/csv" onChange={onFile} />
            </label>
            {error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}
            <a className="mt-3 inline-block text-xs text-teal-300 underline" href={`data:text/csv;charset=utf-8,${encodeURIComponent(sampleCsv)}`} download="sample-vehicle-input.csv">Download sample CSV</a>
          </div>
        </div>

        <div className="card p-6" aria-live="polite">
          <div className="text-xs uppercase tracking-widest text-slate-500">Maintenance required probability</div>
          <div className={`mt-3 text-5xl font-semibold ${displayedResult.probability >= .5 ? 'text-amber-200' : 'text-teal-200'}`}>
            {result ? `${Math.round(displayedResult.probability * 100)}%` : '--'}
          </div>
          <p className="mt-3 text-sm text-slate-400">{result ? 'Live prediction from the trained model.' : 'Waiting for the prediction service...'}</p>
          <Link
            to="/prediction-analysis"
            state={{ result: result ?? undefined }}
            aria-disabled={!result}
            className={`focus-ring mt-8 inline-flex rounded-lg px-4 py-2.5 text-sm font-semibold ${result ? 'bg-teal-300 text-slate-950 hover:bg-teal-200' : 'pointer-events-none bg-slate-800 text-slate-500'}`}
          >
            View SHAP analysis
          </Link>
        </div>
      </div>
    </section>
  );
}
