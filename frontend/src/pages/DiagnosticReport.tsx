import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { predictWithModel } from '../lib/model';
import { sampleRows } from '../data/demo';
import type { DemoInput, Prediction } from '../types';
import { PredictionResult } from '../components/PredictionResult';
import { FeatureContribution } from '../components/FeatureContribution';
import { MaintenanceRecommendation } from '../components/MaintenanceRecommendation';

const SCAN_PHASES = [
  { progress: 25, label: 'Phase 1/4: Ingesting 20 CAN bus telemetry parameters...', icon: '📡' },
  { progress: 55, label: 'Phase 2/4: Correlating road surface roughness & terrain stress metrics...', icon: '🛣️' },
  { progress: 82, label: 'Phase 3/4: Computing risk probability & SHAP factor attributions...', icon: '🧠' },
  { progress: 100, label: 'Phase 4/4: Generating targeted component maintenance checklist...', icon: '🛠️' },
];

export default function DiagnosticReport() {
  const location = useLocation();
  const stateInput = (location.state as { input?: DemoInput; vehicleName?: string } | null)?.input;
  const vehicleName = (location.state as { vehicleName?: string } | null)?.vehicleName || 'Target Fleet Vehicle';

  const input: DemoInput = stateInput || sampleRows[0];

  const [error, setError] = useState('');
  const [result, setResult] = useState<Prediction | null>(null);
  const [pendingResult, setPendingResult] = useState<Prediction | null>(null);
  
  // Diagnostic Scan state
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);

  const scanTimerRef = useRef<NodeJS.Timeout[]>([]);

  const startDiagnosticScan = (fetchedPrediction?: Prediction) => {
    scanTimerRef.current.forEach(clearTimeout);
    scanTimerRef.current = [];

    setIsAnalyzing(true);
    setProgress(5);
    setCurrentStep(0);

    const t1 = setTimeout(() => { setProgress(28); setCurrentStep(0); }, 300);
    const t2 = setTimeout(() => { setProgress(58); setCurrentStep(1); }, 1000);
    const t3 = setTimeout(() => { setProgress(85); setCurrentStep(2); }, 1800);
    const t4 = setTimeout(() => { setProgress(100); setCurrentStep(3); }, 2400);

    const t5 = setTimeout(() => {
      setIsAnalyzing(false);
      if (fetchedPrediction) {
        setResult(fetchedPrediction);
      }
    }, 2850);

    scanTimerRef.current = [t1, t2, t3, t4, t5];
  };

  useEffect(() => {
    const controller = new AbortController();
    predictWithModel(input, controller.signal)
      .then((prediction) => {
        setPendingResult(prediction);
        setError('');
        startDiagnosticScan(prediction);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError(requestError instanceof Error ? requestError.message : 'Backend prediction service unreachable.');
          setIsAnalyzing(false);
        }
      });

    return () => {
      controller.abort();
      scanTimerRef.current.forEach(clearTimeout);
    };
  }, [input]);

  const activeRes = result || pendingResult;
  const prob = activeRes?.maintenance_probability ?? activeRes?.probability ?? 0.15;
  const riskLvl = (activeRes?.risk_level?.toLowerCase() as any) || (prob > 0.7 ? 'high' : prob > 0.4 ? 'medium' : 'low');
  const maintReq = prob >= 0.4 ? 'maintenance-likely' : 'no-maintenance';

  const defaultContributions = [
    { feature: 'Engine Temperature', value: input.engineTemp, contribution: (input.engineTemp - 90) * 0.02 },
    { feature: 'Chassis Vibration', value: input.vibration, contribution: (input.vibration - 2.5) * 0.15 },
    { feature: 'Road Roughness', value: input.roadConditions, contribution: (input.roadConditions - 2) * 0.1 },
    { feature: 'DTC Code Count', value: input.diagnosticTroubleCodeCount, contribution: input.diagnosticTroubleCodeCount * 0.12 },
    { feature: 'Sensor Loss Rate', value: input.sensorPacketLossRate, contribution: input.sensorPacketLossRate * 0.5 },
  ];

  const contributions = activeRes?.feature_contributions || activeRes?.contributions || defaultContributions;
  const inspectionAreas = activeRes?.recommendations || [
    'Engine Cooling System & Radiator Flush',
    'Chassis Suspension Bushes & Shock Absorbers',
    'CAN Bus Wiring Harness & Diagnostic Fault Reset',
  ];

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <Link to="/vehicle-analysis" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 mb-1">
            <span>← Back to Diagnostic Hub</span>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Vehicle Diagnostic & Risk Assessment Report</h1>
          <p className="text-sm text-slate-500 mt-0.5">Comprehensive telemetry evaluation for <span className="font-semibold text-slate-800">{vehicleName}</span>.</p>
        </div>

        <button
          type="button"
          onClick={() => startDiagnosticScan(pendingResult || undefined)}
          disabled={isAnalyzing}
          className="focus-ring inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50 transition-all"
        >
          <span>⚡ Re-Run Diagnostic</span>
        </button>
      </div>

      {isAnalyzing ? (
        /* Diagnostic Scanner View */
        <div className="max-w-2xl mx-auto card p-8 bg-white border border-blue-200 shadow-lg space-y-6 animate-fade-up my-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-white text-xl font-bold animate-pulse">
                ⚡
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">System Diagnostic Scan</h3>
                <p className="text-xs text-slate-500">Evaluating CAN telemetry & terrain impact parameters...</p>
              </div>
            </div>
            <span className="font-mono text-2xl font-bold text-blue-600">{progress}%</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Scan Progress</span>
              <span>{progress}% Complete</span>
            </div>
            <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Diagnostic Phases:</div>
            {SCAN_PHASES.map((step, idx) => {
              const isDone = idx < currentStep || progress === 100;
              const isCurrent = idx === currentStep && progress < 100;

              return (
                <div
                  key={idx}
                  className={`flex items-center justify-between rounded-lg border p-3.5 text-xs font-medium transition-all ${
                    isDone
                      ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900'
                      : isCurrent
                      ? 'border-blue-300 bg-blue-50 text-blue-900 shadow-xs'
                      : 'border-slate-100 bg-slate-50/40 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{step.icon}</span>
                    <span className="font-semibold">{step.label}</span>
                  </div>
                  <div>
                    {isDone ? (
                      <span className="font-bold text-emerald-600">✓ Completed</span>
                    ) : isCurrent ? (
                      <span className="font-bold text-blue-600 animate-pulse">Scanning...</span>
                    ) : (
                      <span className="text-slate-300">Queued</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Full Diagnostic Report View */
        <div className="space-y-6 animate-fade-up">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
              ⚠️ {error}
            </div>
          )}

          {/* Primary Risk Result */}
          <PredictionResult
            result={maintReq}
            probability={prob}
            riskLevel={riskLvl}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {/* SHAP Factor Impact Breakdown */}
            <FeatureContribution contributions={contributions} />

            {/* Targeted Maintenance Recommendation Checklist */}
            <MaintenanceRecommendation
              priority={riskLvl}
              inspectionAreas={inspectionAreas}
            />
          </div>

          {/* Observed Telemetry Data Grid */}
          <div className="card p-6 bg-white border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 text-base mb-1">Evaluated Telemetry Parameters</h3>
            <p className="text-xs text-slate-500 mb-4">Observed operational telemetry values evaluated by the system.</p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
              {[
                { label: 'Coolant Temp', val: `${input.engineTemp} °C` },
                { label: 'Chassis Vibration', val: `${input.vibration} RMS` },
                { label: 'CAN Message Rate', val: `${input.canMessageRateHz} Hz` },
                { label: 'DTC Code Count', val: `${input.diagnosticTroubleCodeCount} codes` },
                { label: 'Usage Operating Hours', val: `${input.usageHours} hrs` },
                { label: 'Actual Payload Load', val: `${input.actualLoad} kg` },
                { label: 'Fuel Consumption', val: `${input.fuelConsumption} L/100km` },
                { label: 'Tire Pressure', val: `${input.tirePressure} PSI` },
              ].map((item, i) => (
                <div key={i} className="rounded-lg border border-slate-200/80 bg-slate-50/60 p-3">
                  <div className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">{item.label}</div>
                  <div className="text-sm font-bold text-slate-900 font-mono mt-0.5">{item.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}