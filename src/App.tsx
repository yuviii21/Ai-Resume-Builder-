import { Routes, Route, Navigate } from 'react-router-dom';
import { BuildTrackProvider } from './context/BuildTrackContext';
import { MainLayout } from './components/layout/MainLayout';
import { ProblemStep } from './pages/ProblemStep';
import { MarketStep, ArchitectureStep, HLDStep, LLDStep, BuildStep, TestStep, ShipStep } from './pages/Steps';
import { ProofPage } from './pages/ProofPage';

function App() {
  return (
    <BuildTrackProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/rb/01-problem" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/rb/01-problem" element={<ProblemStep />} />
          <Route path="/rb/02-market" element={<MarketStep />} />
          <Route path="/rb/03-architecture" element={<ArchitectureStep />} />
          <Route path="/rb/04-hld" element={<HLDStep />} />
          <Route path="/rb/05-lld" element={<LLDStep />} />
          <Route path="/rb/06-build" element={<BuildStep />} />
          <Route path="/rb/07-test" element={<TestStep />} />
          <Route path="/rb/08-ship" element={<ShipStep />} />
          <Route path="/rb/proof" element={<ProofPage />} />
        </Route>
      </Routes>
    </BuildTrackProvider>
  );
}

export default App;
