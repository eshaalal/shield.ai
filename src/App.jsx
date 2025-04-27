import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ParticleBackground from './components/ParticleBackground';
import './index.css';

function App() {
  return (
    
    <ThemeProvider>
      <Router>
      
        <div className="app">
        <ParticleBackground />
          <div className="content-wrapper" style={{ position: "relative", zIndex: 1 }}></div>
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </main>
          
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;