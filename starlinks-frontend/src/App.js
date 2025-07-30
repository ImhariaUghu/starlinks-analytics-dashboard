import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <i className="fas fa-globe me-2"></i>
            Starlinks Global
          </a>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text">
              <i className="fas fa-chart-line me-2"></i>
              Expert Global Delivery Analytics
            </span>
          </div>
        </div>
      </nav>
      
      <main className="main-content">
        <Dashboard />
      </main>
      
      <footer className="bg-light text-center py-3 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <small className="text-muted">
                © 2025 Starlinks Global Limited - All rights reserved
              </small>
            </div>
            <div className="col-md-6">
              <small className="text-muted">
                <i className="fas fa-shipping-fast me-1"></i>
                Lowest WISMO rates • Lowest loss rates • Lowest undeliverable rates
              </small>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-12">
              <small className="text-muted">
                Expert Global Delivery for eCommerce Retailers
              </small>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
