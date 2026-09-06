import { NavLink } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  { to: '/vehicle-analysis', label: 'Vehicle Analysis', icon: '🚗' },
  { to: '/maintenance', label: 'Maintenance', icon: '🔧' },
  { to: '/about', label: 'About & How It Works', icon: 'ℹ️' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-slate-800/80 bg-slate-950/95 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="border-b border-slate-800/80 px-6 py-4">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-teal-400/30 bg-teal-400/10 text-sm font-semibold text-teal-300">
                R
              </span>
              <div>
                <div className="text-sm font-semibold text-white">RoadMind AI</div>
                <div className="text-[10px] text-slate-500">Vehicle Intelligence</div>
              </div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
            <div className="mb-4">
              <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                Platform
              </div>
              {navItems.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/dashboard'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `focus-ring flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                      isActive
                        ? 'bg-teal-400/10 text-teal-200'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`
                  }
                >
                  <span className="text-base">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>

          </nav>
        </div>
      </aside>
    </>
  );
}
