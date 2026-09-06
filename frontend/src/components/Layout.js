import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
var links = [
    { to: '/', label: 'Dashboard' },
    { to: '/demo', label: 'Vehicle Analysis' },
    { to: '/data', label: 'Road Analysis' },
    { to: '/data', label: 'Analytics' },
    { to: '/model', label: 'Model Performance' }
];
export function Layout() {
    var _a = useState(false), isScrolled = _a[0], setIsScrolled = _a[1];
    var _b = useState(false), isMobileOpen = _b[0], setIsMobileOpen = _b[1];
    useEffect(function () {
        var handleScroll = function () { return setIsScrolled(window.scrollY > 12); };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return function () { return window.removeEventListener('scroll', handleScroll); };
    }, []);
    return (<div className="min-h-screen bg-slate-950 text-slate-100">
      <header className={"sticky top-0 z-50 border-b transition-all duration-300 ".concat(isScrolled ? 'border-slate-700/70 bg-slate-950/75 backdrop-blur-xl' : 'border-slate-800/80 bg-slate-950/90')}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <NavLink to="/" className="focus-ring flex items-center gap-3 rounded-xl" aria-label="RoadMind AI home">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-teal-400/30 bg-teal-400/10 text-lg font-semibold text-teal-300">
              R
            </span>
            <span>
              <span className="block text-base font-semibold text-white">RoadMind AI</span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">Vehicle intelligence</span>
            </span>
          </NavLink>

          <nav aria-label="Primary navigation" className="hidden items-center gap-1 lg:flex">
            {links.map(function (_a) {
            var to = _a.to, label = _a.label;
            return (<NavLink key={label} to={to} end={to === '/'} className={function (_a) {
                    var isActive = _a.isActive;
                    return "focus-ring rounded-lg px-3 py-2 text-sm transition-colors duration-200 ".concat(isActive ? 'bg-teal-400/10 text-teal-200' : 'text-slate-300 hover:bg-slate-800 hover:text-white');
                }}>
                {label}
              </NavLink>);
        })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button type="button" aria-label="Application settings" className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-200 transition-colors duration-200 hover:border-slate-600 hover:bg-slate-800">
              ⚙
            </button>
            <Link to="/demo" className="focus-ring inline-flex items-center rounded-xl bg-teal-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200">
              Analyze Vehicle
            </Link>
          </div>

          <button type="button" aria-label="Toggle navigation menu" className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-slate-900/70 text-lg text-slate-200 lg:hidden" onClick={function () { return setIsMobileOpen(function (current) { return !current; }); }}>
            {isMobileOpen ? '×' : '☰'}
          </button>
        </div>

        {isMobileOpen && (<div className="border-t border-slate-800/80 bg-slate-950/95 lg:hidden">
            <nav aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
              {links.map(function (_a) {
                var to = _a.to, label = _a.label;
                return (<NavLink key={label} to={to} end={to === '/'} onClick={function () { return setIsMobileOpen(false); }} className={function (_a) {
                        var isActive = _a.isActive;
                        return "focus-ring rounded-lg px-3 py-2.5 text-sm ".concat(isActive ? 'bg-teal-400/10 text-teal-200' : 'text-slate-300 hover:bg-slate-800');
                    }}>
                  {label}
                </NavLink>);
            })}
              <Link to="/demo" onClick={function () { return setIsMobileOpen(false); }} className="focus-ring mt-2 inline-flex items-center justify-center rounded-xl bg-teal-300 px-4 py-3 text-sm font-semibold text-slate-950">
                Analyze Vehicle
              </Link>
            </nav>
          </div>)}
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-teal-400/30 bg-teal-400/10 text-sm font-semibold text-teal-300">R</span>
              <span className="text-lg font-semibold text-white">RoadMind AI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              AI-powered predictive vehicle maintenance with road-aware analysis.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Product</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link to="/" className="hover:text-white">Dashboard</Link></li>
              <li><Link to="/demo" className="hover:text-white">Vehicle Analysis</Link></li>
              <li><Link to="/data" className="hover:text-white">Road Analysis</Link></li>
              <li><Link to="/data" className="hover:text-white">Analytics</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">AI</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link to="/demo" className="hover:text-white">Predictions</Link></li>
              <li><Link to="/model" className="hover:text-white">Explainable AI</Link></li>
              <li><Link to="/demo" className="hover:text-white">Maintenance Recommendations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-300">Research</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li><Link to="/data" className="hover:text-white">Methodology</Link></li>
              <li><Link to="/model" className="hover:text-white">Model Performance</Link></li>
              <li><Link to="/data" className="hover:text-white">Dataset</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80">
          <div className="mx-auto flex max-w-7xl justify-center px-5 py-5 text-center text-sm text-slate-500 lg:px-8">
            © 2026 RoadMind AI • Final Year Project
          </div>
        </div>
      </footer>
    </div>);
}
