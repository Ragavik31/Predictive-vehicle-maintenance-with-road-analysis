import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const mainNavItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/fleet', label: 'Fleet', icon: '🚚' },
  { to: '/vehicle-analysis', label: 'Vehicle Analysis', icon: '⚡' },
  { to: '/maintenance', label: 'Maintenance', icon: '🔧' },
  { to: '/road-insights', label: 'Road Insights', icon: '🛣️' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-slate-100 px-6 py-5">
            <NavLink to="/" onClick={onClose} className="flex items-center gap-3 group">
              <img 
                src="/logo-icon-transparent.png" 
                alt="RoadMind AI Logo" 
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105" 
              />
              <div>
                <div className="text-base font-extrabold text-slate-900 leading-tight tracking-tight">RoadMind AI</div>
                <div className="text-[10px] font-semibold tracking-wider text-blue-600 uppercase">Intelligence on the Road</div>
              </div>
            </NavLink>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
            <div>
              <div className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Logistics Platform
              </div>
              <div className="space-y-1">
                {mainNavItems.map(({ to, label, icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`
                    }
                  >
                    <span className="text-base">{icon}</span>
                    <span>{label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          </nav>

          {/* Operational Status Footer */}
          <div className="border-t border-slate-100 p-4 bg-slate-50/50">
            <div className="flex items-center gap-2.5 rounded-lg border border-slate-200 bg-white p-2.5 shadow-2xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <div className="text-xs font-semibold text-slate-800">Predictive Intelligence Engine</div>
                <div className="text-[10px] text-slate-500">Predictive Service Active</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
