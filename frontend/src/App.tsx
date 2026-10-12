import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import ModelXAI from './pages/ModelXAI';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Core Pages: Home, Prediction, Model & XAI */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Navigate to="/home" replace />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/model-xai" element={<ModelXAI />} />

          {/* Clean fallbacks for existing links */}
          <Route path="/road-analysis" element={<Navigate to="/model-xai" replace />} />
          <Route path="/road-insights" element={<Navigate to="/model-xai" replace />} />
          <Route path="/vehicle-analysis" element={<Navigate to="/prediction" replace />} />
          <Route path="/vehicle-analysis/report" element={<Navigate to="/prediction" replace />} />
          <Route path="/fleet" element={<Navigate to="/home" replace />} />
          <Route path="/maintenance" element={<Navigate to="/prediction" replace />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
