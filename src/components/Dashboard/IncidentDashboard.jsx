"use client"

import { useState, useEffect } from "react"
import IncidentItem from "./IncidentItem"
import NewIncidentForm from "./NewIncidentForm"
import mockIncidents from "../data/mockIncidents"

const IncidentDashboard = () => {
  // Initialize incidents state with mock data
  const [incidents, setIncidents] = useState(mockIncidents || [])
  const [filteredIncidents, setFilteredIncidents] = useState([])
  const [filter, setFilter] = useState("All")
  const [sortOrder, setSortOrder] = useState("newest")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [viewMode, setViewMode] = useState("list")

  // Summary stats
  const [stats, setStats] = useState({
    total: 0,
    high: 0,
    medium: 0,
    low: 0,
  })

  // Make sure we log the data to verify it's loaded
  useEffect(() => {
    console.log("Loaded incidents:", incidents)
  }, [incidents])

  // Calculate stats whenever incidents change
  useEffect(() => {
    const newStats = {
      total: incidents.length,
      high: incidents.filter((inc) => inc.severity === "High").length,
      medium: incidents.filter((inc) => inc.severity === "Medium").length,
      low: incidents.filter((inc) => inc.severity === "Low").length,
    }
    setStats(newStats)
  }, [incidents])

  // Filter and sort incidents
  useEffect(() => {
    let filtered = [...incidents]

    // Apply severity filter
    if (filter !== "All") {
      filtered = filtered.filter((incident) => incident.severity === filter)
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.reported_at)
      const dateB = new Date(b.reported_at)

      if (sortOrder === "newest") {
        return dateB.getTime() - dateA.getTime()
      } else {
        return dateA.getTime() - dateB.getTime()
      }
    })

    setFilteredIncidents(filtered)
  }, [incidents, filter, sortOrder])

  const handleAddIncident = (newIncident) => {
    setIncidents((prev) => [
      ...prev,
      {
        ...newIncident,
        id: prev.length > 0 ? Math.max(...prev.map((i) => i.id)) + 1 : 1,
      },
    ])
    setIsFormVisible(false) // Hide form after submission
  }

  return (
    <div className="incident-dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">AI Safety Incident Dashboard</h2>

        {/* Summary stats bar */}
        <div className="stats-summary">
          <div className="stat-item">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item severity-high">
            <span className="stat-value">{stats.high}</span>
            <span className="stat-label">High</span>
          </div>
          <div className="stat-item severity-medium">
            <span className="stat-value">{stats.medium}</span>
            <span className="stat-label">Medium</span>
          </div>
          <div className="stat-item severity-low">
            <span className="stat-value">{stats.low}</span>
            <span className="stat-label">Low</span>
          </div>
        </div>
      </div>

      <div className="dashboard-controls glass-effect">
        <div className="filter-controls">
          <span className="control-label">Filter by Severity:</span>
          <div className="button-group">
            <button className={`filter-btn ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>
              All
            </button>
            <button className={`filter-btn ${filter === "Low" ? "active" : ""}`} onClick={() => setFilter("Low")}>
              Low
            </button>
            <button className={`filter-btn ${filter === "Medium" ? "active" : ""}`} onClick={() => setFilter("Medium")}>
              Medium
            </button>
            <button className={`filter-btn ${filter === "High" ? "active" : ""}`} onClick={() => setFilter("High")}>
              High
            </button>
          </div>
        </div>

        <div className="sort-controls">
          <span className="control-label">Sort by Date:</span>
          <div className="button-group">
            <button
              className={`sort-btn ${sortOrder === "newest" ? "active" : ""}`}
              onClick={() => setSortOrder("newest")}
            >
              Newest First
            </button>
            <button
              className={`sort-btn ${sortOrder === "oldest" ? "active" : ""}`}
              onClick={() => setSortOrder("oldest")}
            >
              Oldest First
            </button>
          </div>
        </div>

        <div className="view-controls">
          <span className="control-label">View:</span>
          <div className="button-group">
            <button className={`view-btn ${viewMode === "list" ? "active" : ""}`} onClick={() => setViewMode("list")}>
              List
            </button>
            <button className={`view-btn ${viewMode === "grid" ? "active" : ""}`} onClick={() => setViewMode("grid")}>
              Grid
            </button>
          </div>
        </div>
      </div>

      <div className="action-bar">
        <button className="toggle-form-btn pulse-animation" onClick={() => setIsFormVisible(!isFormVisible)}>
          {isFormVisible ? "- Cancel" : "+ Report New Incident"}
        </button>
      </div>

      {isFormVisible && (
        <div className="form-wrapper animate-in">
          <NewIncidentForm onSubmit={handleAddIncident} onCancel={() => setIsFormVisible(false)} />
        </div>
      )}

      <div className={`incidents-container ${viewMode === "grid" ? "grid-view" : "list-view"}`}>
        {filteredIncidents.length > 0 ? (
          filteredIncidents.map((incident) => (
            <IncidentItem key={incident.id} incident={incident} viewMode={viewMode} />
          ))
        ) : (
          <div className="no-incidents glass-effect">
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3>No incidents match your current filters</h3>
              <p>Try changing your filters or add a new incident</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default IncidentDashboard
