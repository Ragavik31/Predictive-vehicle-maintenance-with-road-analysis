import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/prediction', label: 'Prediction', icon: '⚡' },
  { to: '/model-xai', label: 'Model & XAI', icon: '🧠' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 z-45 h-screen w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            {/* Logo & Brand Header */}
            <div className="border-b border-slate-100 px-6 py-5">
              <NavLink to="/home" onClick={onClose} className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
                  FG
                </div>
                <div>
                  <div className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                    FleetGuard AI
                  </div>
                  <div className="text-[9px] font-bold tracking-widest text-blue-600 uppercase mt-1">
                    Predictive Intelligence
                  </div>
                </div>
              </NavLink>
            </div>

            {/* Navigation Section: strictly 4 core pages */}
            <nav className="space-y-1 px-4 py-5">
              <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Fleet Management
              </div>
              {navItems.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`
                  }
                >
                  <span className="text-base">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Predictive Engine Status Widget */}
          <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  Predictive Intelligence Engine
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  FleetGuard AI Active
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
