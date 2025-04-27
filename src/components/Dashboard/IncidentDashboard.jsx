import { useState, useEffect } from 'react';
import IncidentItem from './IncidentItem';
import NewIncidentForm from './NewIncidentForm';
import { useTheme } from '../../contexts/ThemeContext';

const IncidentDashboard = () => {
  const { darkMode } = useTheme();
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [filter, setFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');

  // Initial mock data
  useEffect(() => {
    const mockIncidents = [
      {
        id: 1,
        title: "Biased Recommendation Algorithm",
        description: "Algorithm consistently favored certain demographics in content recommendations, creating potential echo chambers and reinforcing stereotypes.",
        severity: "Medium",
        reported_at: "2025-03-15T10:00:00Z"
      },
      {
        id: 2,
        title: "LLM Hallucination in Critical Info",
        description: "Large language model provided incorrect safety procedure information when queried about emergency protocols, potentially endangering users.",
        severity: "High",
        reported_at: "2025-04-01T14:30:00Z"
      },
      {
        id: 3,
        title: "Minor Data Leak via Chatbot",
        description: "Chatbot inadvertently exposed non-sensitive user metadata in its responses, revealing information about user preferences.",
        severity: "Low",
        reported_at: "2025-03-20T09:15:00Z"
      },
      {
        id: 4,
        title: "Facial Recognition False Positives",
        description: "Security system incorrectly identified multiple individuals, triggering unnecessary security alerts and potentially causing distress.",
        severity: "Medium",
        reported_at: "2025-04-05T16:45:00Z"
      }
    ];
    
    setIncidents(mockIncidents);
  }, []);

  // Apply filtering and sorting whenever incidents, filter, or sortOrder changes
  useEffect(() => {
    let result = [...incidents];
    
    // Apply filtering
    if (filter !== 'All') {
      result = result.filter(incident => incident.severity === filter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      
      if (sortOrder === 'newest') {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });
    
    setFilteredIncidents(result);
  }, [incidents, filter, sortOrder]);

  const handleAddIncident = (newIncident) => {
    setIncidents(prev => [...prev, newIncident]);
  };

  return (
    <div className={`incident-dashboard ${darkMode ? 'dark' : 'light'}`}>
      <h2 className="dashboard-title">AI Safety Incident Dashboard</h2>
      
      <div className="dashboard-controls">
        <div className="filter-controls">
          <span className="control-label">Filter by Severity:</span>
          <div className="button-group">
            <button 
              className={`filter-btn ${filter === 'All' ? 'active' : ''}`}
              onClick={() => setFilter('All')}
            >
              All
            </button>
            <button 
              className={`filter-btn ${filter === 'Low' ? 'active' : ''}`}
              onClick={() => setFilter('Low')}
            >
              Low
            </button>
            <button 
              className={`filter-btn ${filter === 'Medium' ? 'active' : ''}`}
              onClick={() => setFilter('Medium')}
            >
              Medium
            </button>
            <button 
              className={`filter-btn ${filter === 'High' ? 'active' : ''}`}
              onClick={() => setFilter('High')}
            >
              High
            </button>
          </div>
        </div>
        
        <div className="sort-controls">
          <span className="control-label">Sort by Date:</span>
          <div className="button-group">
            <button 
              className={`sort-btn ${sortOrder === 'newest' ? 'active' : ''}`}
              onClick={() => setSortOrder('newest')}
            >
              Newest First
            </button>
            <button 
              className={`sort-btn ${sortOrder === 'oldest' ? 'active' : ''}`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest First
            </button>
          </div>
        </div>
      </div>

      <NewIncidentForm onSubmit={handleAddIncident} />
      
      <div className="incidents-list">
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map(incident => (
            <IncidentItem key={incident.id} incident={incident} />
          ))
        ) : (
          <div className="no-incidents">
            No incidents match your current filters
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentDashboard;
