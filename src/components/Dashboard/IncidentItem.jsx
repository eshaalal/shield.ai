"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"

const IncidentItem = ({ incident, viewMode }) => {
  const [expanded, setExpanded] = useState(false)

  const getSeverityWidth = (severity) => {
    switch (severity) {
      case "High":
        return "100%"
      case "Medium":
        return "66%"
      case "Low":
        return "33%"
      default:
        return "0%"
    }
  }

  const getSeverityClass = (severity) => {
    return severity.toLowerCase()
  }

  // Add a safety check for date formatting
  const timeAgo = incident.reported_at
    ? formatDistanceToNow(new Date(incident.reported_at), { addSuffix: true })
    : "Unknown time"

  // Add console log to debug
  console.log("Rendering incident:", incident)

  return (
    <div className={`incident-item glass-effect severity-${getSeverityClass(incident.severity)}`}>
      <div className="incident-header">
        <div className="incident-title">{incident.title}</div>

        <div className={`incident-severity severity-${getSeverityClass(incident.severity)}`}>{incident.severity}</div>

        <div className="incident-date">{timeAgo}</div>

        <button className="view-details-btn" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Hide" : "View"}
        </button>
      </div>

      {expanded && (
        <div className="incident-details">
          <p>{incident.description}</p>

          <div className="severity-indicator">
            <div className="severity-label">Severity Level</div>
            <div className="severity-meter">
              <div
                className={`severity-bar ${getSeverityClass(incident.severity)}`}
                style={{ width: getSeverityWidth(incident.severity) }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default IncidentItem
