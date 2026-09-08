import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuToggle?: () => void;
  isOpen?: boolean;
}

export function Navbar({ onMenuToggle, isOpen }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-md lg:ml-64">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left Mobile Toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={onMenuToggle}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <img src="/logo-icon-transparent.png" alt="RoadMind AI Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-slate-900 text-sm">RoadMind AI</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-slate-100/80 rounded-full px-3 py-1 border border-slate-200">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-700">Fleet Operations Active</span>
            <span className="text-slate-400">|</span>
            <span>1,247 Vehicles Tracked</span>
          </div>
        </div>

        {/* Right Search & Quick Actions */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search vehicle ID, DTC code..."
              className="w-64 rounded-lg border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
            <span className="absolute right-3 top-2 text-xs text-slate-400">⌘K</span>
          </div>

          <Link
            to="/vehicle-analysis"
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <span>⚡</span>
            <span className="hidden sm:inline">Analyze Vehicle</span>
          </Link>

        </div>
      </div>
    </header>
  );
}
