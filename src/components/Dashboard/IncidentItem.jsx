import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const IncidentItem = ({ incident }) => {
  const [expanded, setExpanded] = useState(false);
  const { darkMode } = useTheme();
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleString(undefined, options);
  };
  
  const getSeverityClass = (severity) => {
    switch(severity.toLowerCase()) {
      case 'high': return 'severity-high';
      case 'medium': return 'severity-medium';
      case 'low': return 'severity-low';
      default: return '';
    }
  };

  return (
    <div className={`incident-item ${darkMode ? 'dark' : 'light'}`}>
      <div className="incident-header">
        <div className="incident-title">{incident.title}</div>
        <div className={`incident-severity ${getSeverityClass(incident.severity)}`}>
          {incident.severity}
        </div>
        <div className="incident-date">{formatDate(incident.reported_at)}</div>
        <button 
          className="view-details-btn" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Hide Details' : 'View Details'}
        </button>
      </div>
      
      {expanded && (
        <div className="incident-details">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentItem;