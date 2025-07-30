import React, { useState } from "react";

function Filters() {
  const [selectedCarrier, setSelectedCarrier] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedServiceType, setSelectedServiceType] = useState("");

  const carriers = ["DHL", "FedEx", "UPS", "Royal Mail", "Starlinks Express"];
  const statuses = ["Delivered", "In Transit", "Delayed", "Cancelled"];
  const serviceTypes = ["Standard", "Express", "Same Day", "Overnight"];

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "carrier":
        setSelectedCarrier(value);
        break;
      case "status":
        setSelectedStatus(value);
        break;
      case "serviceType":
        setSelectedServiceType(value);
        break;
      default:
        break;
    }
    // TODO: Implement actual filtering logic
    console.log(`Filter changed: ${filterType} = ${value}`);
  };

  const clearFilters = () => {
    setSelectedCarrier("");
    setSelectedStatus("");
    setSelectedServiceType("");
  };

  return (
    <div>
      <div className="row align-items-end">
        <div className="col-md-3">
          <label htmlFor="carrierFilter" className="form-label fw-bold">
            <i className="fas fa-truck me-2"></i>
            Carrier
          </label>
          <select
            id="carrierFilter"
            className="form-select"
            value={selectedCarrier}
            onChange={(e) => handleFilterChange("carrier", e.target.value)}
          >
            <option value="">All Carriers</option>
            {carriers.map((carrier) => (
              <option key={carrier} value={carrier}>
                {carrier}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="statusFilter" className="form-label fw-bold">
            <i className="fas fa-info-circle me-2"></i>
            Delivery Status
          </label>
          <select
            id="statusFilter"
            className="form-select"
            value={selectedStatus}
            onChange={(e) => handleFilterChange("status", e.target.value)}
          >
            <option value="">All Statuses</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="serviceTypeFilter" className="form-label fw-bold">
            <i className="fas fa-shipping-fast me-2"></i>
            Service Type
          </label>
          <select
            id="serviceTypeFilter"
            className="form-select"
            value={selectedServiceType}
            onChange={(e) => handleFilterChange("serviceType", e.target.value)}
          >
            <option value="">All Service Types</option>
            {serviceTypes.map((serviceType) => (
              <option key={serviceType} value={serviceType}>
                {serviceType}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={clearFilters}
          >
            <i className="fas fa-times me-2"></i>
            Clear Filters
          </button>
        </div>
      </div>

      {(selectedCarrier || selectedStatus || selectedServiceType) && (
        <div className="mt-3">
          <div className="d-flex flex-wrap gap-2">
            {selectedCarrier && (
              <span className="badge bg-primary">
                Carrier: {selectedCarrier}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  onClick={() => handleFilterChange("carrier", "")}
                ></button>
              </span>
            )}
            {selectedStatus && (
              <span className="badge bg-success">
                Status: {selectedStatus}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  onClick={() => handleFilterChange("status", "")}
                ></button>
              </span>
            )}
            {selectedServiceType && (
              <span className="badge bg-info text-dark">
                Service: {selectedServiceType}
                <button
                  type="button"
                  className="btn-close btn-close-white ms-2"
                  onClick={() => handleFilterChange("serviceType", "")}
                ></button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;