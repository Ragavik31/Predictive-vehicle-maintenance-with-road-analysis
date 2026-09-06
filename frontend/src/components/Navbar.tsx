import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavLink {
  to: string;
  label: string;
}

interface NavbarProps {
  onMenuToggle?: () => void;
  isOpen?: boolean;
}

export function Navbar({ onMenuToggle, isOpen }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useState(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled ? 'border-slate-700/70 bg-slate-950/75 backdrop-blur-xl' : 'border-slate-800/80 bg-slate-950/90'
      }`}
    >
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

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            aria-label="Application settings"
            className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-slate-900/70 text-slate-200 transition-colors duration-200 hover:border-slate-600 hover:bg-slate-800"
          >
            ⚙
          </button>
          <Link
            to="/vehicle-analysis"
            className="focus-ring inline-flex items-center rounded-xl bg-teal-300 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-teal-200"
          >
            Analyze Vehicle
          </Link>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          className="focus-ring grid h-10 w-10 place-items-center rounded-xl border border-slate-700 bg-slate-900/70 text-lg text-slate-200 lg:hidden"
          onClick={onMenuToggle}
        >
          {isOpen ? '×' : '☰'}
        </button>
      </div>
    </header>
  );
}
