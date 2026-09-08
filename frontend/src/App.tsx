import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Fleet from './pages/Fleet';
import Demo from './pages/Demo';
import DiagnosticReport from './pages/DiagnosticReport';
import Maintenance from './pages/Maintenance';
import RoadInsights from './pages/RoadInsights';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Logistics Fleet Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/vehicle-analysis" element={<Demo />} />
          <Route path="/vehicle-analysis/report" element={<DiagnosticReport />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/road-insights" element={<RoadInsights />} />

          {/* Fallback Catch-All */}
          <Route path="*" element={<Landing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
