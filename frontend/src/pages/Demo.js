var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useMemo, useState } from 'react';
import { parseDemoCsv } from '../lib/csv';
import { predict, sampleRows, sampleCsv } from '../data/demo';
var labels = [
    { key: 'engineTemp', label: 'Engine temperature', min: 60, max: 120, step: 1, unit: '°C' }, { key: 'oilPressure', label: 'Oil pressure', min: 15, max: 60, step: 1, unit: 'kPa' }, { key: 'vibration', label: 'Vibration', min: 0, max: 8, step: .1, unit: 'RMS' }, { key: 'mileage', label: 'Mileage', min: 0, max: 180000, step: 1000, unit: 'km' }, { key: 'roadRoughness', label: 'Road roughness', min: 0, max: 1, step: .01, unit: 'index' }, { key: 'brakingEvents', label: 'Braking events', min: 0, max: 30, step: 1, unit: 'count' }
];
export default function Demo() {
    var _this = this;
    var _a = useState(sampleRows[0]), input = _a[0], setInput = _a[1];
    var _b = useState(''), error = _b[0], setError = _b[1];
    var result = useMemo(function () { return predict(input); }, [input]);
    var update = function (key, value) { return setInput(function (x) {
        var _a;
        return (__assign(__assign({}, x), (_a = {}, _a[key] = value, _a)));
    }); };
    var onFile = function (e) { return __awaiter(_this, void 0, void 0, function () { var file, rows, err_1; var _a; return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                setError('');
                file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
                if (!file)
                    return [2 /*return*/];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, parseDemoCsv(file)];
            case 2:
                rows = _b.sent();
                setInput(rows[0]);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                setError(err_1 instanceof Error ? err_1.message : 'Unable to read CSV.');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    }); }); };
    return <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16"><div className="max-w-3xl"><div className="text-xs font-semibold uppercase tracking-[.18em] text-teal-300">Interactive Demo</div><h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Run a prediction in your browser</h1><p className="mt-4 text-slate-400">No API call is made. The demo uses a deterministic, precomputed-style scorer so the interaction remains deployable as static files.</p></div><div className="mt-8 grid gap-5 lg:grid-cols-[1fr_.9fr]"><div className="card p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-semibold text-white">Manual sample</h2><button onClick={function () { return setInput(sampleRows[Math.floor(Math.random() * sampleRows.length)]); }} className="focus-ring rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800">Load random sample</button></div><div className="mt-5 grid gap-5 sm:grid-cols-2">{labels.map(function (f) { return <label key={f.key} className="block"><span className="flex justify-between text-xs text-slate-400"><span>{f.label}</span><span>{input[f.key]} {f.unit}</span></span><input className="mt-2 w-full accent-teal-300" type="range" min={f.min} max={f.max} step={f.step} value={input[f.key]} onChange={function (e) { return update(f.key, Number(e.target.value)); }}/></label>; })}</div><div className="mt-7 rounded-xl border border-dashed border-slate-700 p-4"><label className="focus-ring block cursor-pointer"><span className="text-sm font-medium text-white">Upload a small CSV</span><span className="mt-1 block text-xs text-slate-500">Required headers: engineTemp, oilPressure, vibration, mileage, roadRoughness, brakingEvents · max 250 KB / first 20 rows</span><input aria-label="Upload CSV" className="mt-3 block w-full text-sm text-slate-400" type="file" accept=".csv,text/csv" onChange={onFile}/></label>{error && <p role="alert" className="mt-3 text-sm text-rose-300">{error}</p>}<a className="mt-3 inline-block text-xs text-teal-300 underline" href={"data:text/csv;charset=utf-8,".concat(encodeURIComponent(sampleCsv))} download="sample-vehicle-input.csv">Download sample CSV</a></div></div><div className="card p-6" aria-live="polite"><div className="text-xs uppercase tracking-widest text-slate-500">Prediction</div><div className={"mt-3 text-2xl font-semibold ".concat(result.probability >= .5 ? 'text-amber-200' : 'text-teal-200')}>{result.label}</div><div className="mt-2 text-sm text-slate-400">Estimated risk probability: <strong className="text-white">{Math.round(result.probability * 100)}%</strong></div><div className="mt-8"><div className="mb-3 text-sm font-medium text-white">SHAP-like feature contributions</div><div className="space-y-3">{__spreadArray([], result.contributions, true).sort(function (a, b) { return Math.abs(b.contribution) - Math.abs(a.contribution); }).map(function (c) { return <div key={c.feature}><div className="mb-1 flex justify-between text-xs"><span className="text-slate-300">{c.feature}</span><span className={c.contribution >= 0 ? 'text-amber-200' : 'text-teal-200'}>{c.contribution >= 0 ? '+' : ''}{c.contribution.toFixed(2)}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className={"h-full rounded-full ".concat(c.contribution >= 0 ? 'bg-amber-300' : 'bg-teal-300')} style={{ width: "".concat(Math.min(100, Math.abs(c.contribution) * 22), "%") }}/></div></div>; })}</div></div><p className="mt-7 text-xs leading-6 text-slate-500">Positive contributions increase predicted maintenance risk; negative contributions reduce it. These are demo explanation vectors, not a substitute for SHAP values from the trained model.</p></div></div></section>;
}
