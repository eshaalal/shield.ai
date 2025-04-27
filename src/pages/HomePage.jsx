import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { FaShieldAlt, FaBolt, FaBookOpen } from 'react-icons/fa'; // Using icons matching your features
const HomePage = () => {
  const { darkMode } = useTheme();

  return (
    <div className={`home-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="hero-section">
        <h1 className="hero-title">Engineering AI for Safety, Built Around Human Values.</h1>
        <p className="hero-subtitle">
          At Shield.ai, we design AI with safety at its core, protecting human values and well-being. 
          Our mission is simple: empower humanity through ethical, secure AI innovation.
        </p>
        <Link to="/dashboard" className="dashboard-link">
          Check Dashboard →
        </Link>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <div className="feature-icon glass">
            <FaShieldAlt className="icon" />
          </div>
          <h3 className="feature-title">Safety Monitoring</h3>
          <p className="feature-desc">
            Continuous monitoring and reporting of AI safety incidents to prevent potential harm.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon glass">
            <FaBolt className="icon" />
          </div>
          <h3 className="feature-title">Rapid Response</h3>
          <p className="feature-desc">
            Quick identification and mitigation of AI risks before they escalate into serious issues.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon glass">
            <FaBookOpen className="icon" />
          </div>
          <h3 className="feature-title">Transparent Reporting</h3>
          <p className="feature-desc">
            Open documentation of AI incidents to foster accountability and continuous improvement.
          </p>
        </div>
      </div>
    </div>
    
  );
};

export default HomePage;
