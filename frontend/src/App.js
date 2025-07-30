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
          <small className="text-muted d-block mx-auto">
            © 2025 Starlinks Global Limited - All rights reserved
         </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
