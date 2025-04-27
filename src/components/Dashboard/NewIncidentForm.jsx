import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const NewIncidentForm = ({ onSubmit }) => {
  const { darkMode } = useTheme();
  const [formVisible, setFormVisible] = useState(false);
  const [incident, setIncident] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident(prev => ({ ...prev, [name]: value }));
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!incident.title.trim()) newErrors.title = 'Title is required';
    if (!incident.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...incident,
        id: Date.now(), // Generate a simple ID
        reported_at: new Date().toISOString()
      });
      
      // Reset form
      setIncident({
        title: '',
        description: '',
        severity: 'Medium'
      });
      
      // Close form after submission (optional)
      setFormVisible(false);
    }
  };

  return (
    <div className={`new-incident-container ${darkMode ? 'dark' : 'light'}`}>
      {!formVisible ? (
        <button 
          className="toggle-form-btn"
          onClick={() => setFormVisible(true)}
        >
          + Report New Incident
        </button>
      ) : (
        <div className="form-container">
          <div className="form-header">
            <h3>Report New Safety Incident</h3>
            <button 
              className="close-form-btn"
              onClick={() => setFormVisible(false)}
            >
              &times;
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={incident.title}
                onChange={handleChange}
                className={errors.title ? 'error' : ''}
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={incident.description}
                onChange={handleChange}
                rows="4"
                className={errors.description ? 'error' : ''}
              ></textarea>
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="severity">Severity</label>
              <select
                id="severity"
                name="severity"
                value={incident.severity}
                onChange={handleChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button type="button" onClick={() => setFormVisible(false)}>Cancel</button>
              <button type="submit" className="submit-btn">Submit Report</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewIncidentForm;