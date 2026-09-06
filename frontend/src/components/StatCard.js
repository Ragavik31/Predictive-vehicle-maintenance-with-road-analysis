export function StatCard(_a) {
    var label = _a.label, value = _a.value, detail = _a.detail;
    return <div className="card p-5"><div className="text-xs uppercase tracking-widest text-slate-500">{label}</div><div className="mt-2 text-2xl font-semibold text-white">{value}</div><div className="mt-1 text-sm text-slate-400">{detail}</div></div>;
}
