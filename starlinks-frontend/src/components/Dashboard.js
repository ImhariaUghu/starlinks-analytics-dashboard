import React, { useEffect, useState } from "react";
import {
  getAverageCostByCarrier,
  getDelayedLast3Months,
  getTop5Expensive,
  getPriorityDistribution,
  getExpressCorrelation,
} from "../api";
import Filters from "./Filters";
import Graphs from "./Graphs";
import ShipmentsTable from "./ShipmentsTable";

function Dashboard() {
  const [averageCost, setAverageCost] = useState([]);
  const [delayedCount, setDelayedCount] = useState(0);
  const [top5, setTop5] = useState([]);
  const [priorityDist, setPriorityDist] = useState([]);
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [avgCostData, delayedData, top5Data, priorityData, correlationData] = await Promise.all([
          getAverageCostByCarrier(),
          getDelayedLast3Months(),
          getTop5Expensive(),
          getPriorityDistribution(),
          getExpressCorrelation()
        ]);

        setAverageCost(avgCostData);
        setDelayedCount(delayedData.delayed_count);
        setTop5(top5Data);
        setPriorityDist(priorityData);
        setCorrelation(correlationData.correlation);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please check your API connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-4">
            <h1 className="text-primary mb-2">
              <i className="fas fa-shipping-fast me-2"></i>
              Starlinks Global Analytics Dashboard
            </h1>
            <p className="lead text-muted">
              Expert Global Delivery Analytics - Setting the standard for cross-border shipping performance
            </p>
            <div className="row mt-3">
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  <small className="text-muted">Lowest WISMO rates</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="fas fa-shield-alt text-primary me-2"></i>
                  <small className="text-muted">Lowest loss rates</small>
                </div>
              </div>
              <div className="col-md-4">
                <div className="d-flex align-items-center justify-content-center">
                  <i className="fas fa-truck text-info me-2"></i>
                  <small className="text-muted">Lowest undeliverable rates</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-filter me-2"></i>
                Data Filters
              </h5>
            </div>
            <div className="card-body">
              <Filters />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                Average Cost by Carrier
              </h5>
            </div>
            <div className="card-body">
              <Graphs
                averageCost={averageCost}
                priorityDist={[]}
                correlation={null}
                showAverageCost={true}
                showPriorityDist={false}
              />
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-pie me-2"></i>
                Priority Distribution by Delivery Status
              </h5>
            </div>
            <div className="card-body">
              <Graphs
                averageCost={[]}
                priorityDist={priorityDist}
                correlation={null}
                showAverageCost={false}
                showPriorityDist={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h5 className="mb-0">
                <i className="fas fa-exclamation-triangle me-2"></i>
                Delayed Shipments (Last 3 Months)
              </h5>
            </div>
            <div className="card-body text-center">
              <h2 className="text-warning display-4">{delayedCount}</h2>
              <p className="text-muted">Total delayed shipments</p>
              <small className="text-muted">
                <i className="fas fa-info-circle me-1"></i>
                Starlinks Global maintains industry-leading delivery performance
              </small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="fas fa-chart-line me-2"></i>
                Express Service Correlation
              </h5>
            </div>
            <div className="card-body text-center">
              <h2 className="text-success display-4">
                {correlation !== null ? correlation.toFixed(4) : "N/A"}
              </h2>
              <p className="text-muted">Weight vs. Cost correlation</p>
              <small className="text-muted">
                <i className="fas fa-chart-area me-1"></i>
                Data-driven insights for optimal pricing
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white">
              <h5 className="mb-0">
                <i className="fas fa-list me-2"></i>
                Top 5 Most Expensive Shipments
              </h5>
            </div>
            <div className="card-body">
              <ShipmentsTable shipments={top5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;