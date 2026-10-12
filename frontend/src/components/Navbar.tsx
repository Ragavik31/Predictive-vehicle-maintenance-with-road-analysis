import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  onMenuToggle?: () => void;
  isOpen?: boolean;
}

export function Navbar({ onMenuToggle, isOpen }: NavbarProps) {
  const [syncTime, setSyncTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSyncTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 backdrop-blur-md lg:ml-64">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: Mobile Toggle & Operations Status Pill */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Toggle navigation menu"
            className="focus-ring grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            onClick={onMenuToggle}
          >
            {isOpen ? '✕' : '☰'}
          </button>

          {/* Status Pill */}
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3.5 py-1.5 text-xs text-slate-700 shadow-2xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-slate-800">Fleet Operations Active</span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Last Sync: <span className="font-mono text-slate-700 font-medium">{syncTime || 'Just now'}</span>
            </span>
          </div>
        </div>

        {/* Right: Action Button */}
        <div className="flex items-center gap-3">
          <Link
            to="/prediction"
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
          >
            <span>⚡</span>
            <span>Analyze Vehicle</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
