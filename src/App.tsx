import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TopBar from './components/layout/TopBar';
import ProofPage from './pages/ProofPage';
import Builder from './pages/Builder';
import Preview from './pages/Preview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
        <TopBar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/preview" element={<Preview />} />
            <Route path="/proof" element={<ProofPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
