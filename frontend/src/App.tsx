import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Demo from './pages/Demo';
import Dashboard from './pages/Dashboard';
import Maintenance from './pages/Maintenance';
import About from './pages/About';
import PredictionAnalysis from './pages/PredictionAnalysis';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Main Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/about" element={<About />} />

          <Route path="/vehicle-analysis" element={<Demo />} />
          <Route path="/prediction-analysis" element={<PredictionAnalysis />} />

          <Route path="*" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
