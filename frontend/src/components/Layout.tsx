import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FC] text-slate-900 font-sans">
      {/* Top Navbar */}
      <Navbar 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isOpen={isSidebarOpen}
      />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto lg:ml-64 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white lg:ml-64 px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">RoadMind AI</span>
            <span>•</span>
            <span>Enterprise Fleet Predictive Maintenance Engine</span>
          </div>
          <div>© 2026 Fleet Operations System • Powered by Predictive Intelligence Engine</div>
        </div>
      </footer>
    </div>
  );
}

