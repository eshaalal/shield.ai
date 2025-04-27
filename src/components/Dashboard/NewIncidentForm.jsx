"use client"

import { useState } from "react"
import '../styles/incidents.css'
const NewIncidentForm = ({ onSubmit, onCancel }) => {
  const [incident, setIncident] = useState({
    title: "",
    description: "",
    severity: "Medium",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setIncident((prev) => ({ ...prev, [name]: value }))

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!incident.title.trim()) newErrors.title = "Title is required"
    if (!incident.description.trim()) newErrors.description = "Description is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit({
        ...incident,
        id: Date.now(), // Generate a simple ID
        reported_at: new Date().toISOString(),
      })

      // Reset form
      setIncident({
        title: "",
        description: "",
        severity: "Medium",
      })
    }
  }

  return (
    <div className="new-incident-form glass-effect">
      <div className="form-header">
        <h3>Report New Safety Incident</h3>
        {onCancel && (
          <button className="close-form-btn" onClick={onCancel} type="button">
            &times;
          </button>
        )}
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
            className={errors.title ? "error" : ""}
            placeholder="Brief title describing the incident"
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
            rows={4}
            className={errors.description ? "error" : ""}
            placeholder="Provide details about what happened..."
          ></textarea>
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select id="severity" name="severity" value={incident.severity} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-actions">
          {onCancel && (
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
          <button type="submit" className="submit-btn">
            Submit Report
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewIncidentForm
