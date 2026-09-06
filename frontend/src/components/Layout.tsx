import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Navbar */}
      <Navbar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isOpen={isSidebarOpen}
      />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - visible on desktop, toggleable on mobile */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto lg:ml-64">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 lg:ml-64">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-teal-400/30 bg-teal-400/10 text-sm font-semibold text-teal-300">R</span>
            <span className="text-sm font-semibold text-white">RoadMind AI</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 RoadMind AI</p>
        </div>
      </footer>
    </div>
  );
}

