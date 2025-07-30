import React from "react";

function ShipmentsTable({ shipments }) {
  if (!shipments || shipments.length === 0) {
    return (
      <div className="text-center text-muted py-4">
        <i className="fas fa-table fa-3x mb-3"></i>
        <p>No shipment data available</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Shipment ID</th>
            <th scope="col">Cost (USD)</th>
            <th scope="col">Carrier</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map((shipment, index) => (
            <tr key={index}>
              <td className="fw-bold">{index + 1}</td>
              <td>
                <code className="text-primary">{shipment.ShipmentID}</code>
              </td>
              <td>
                <span className="badge bg-success fs-6">
                  ${shipment.CostUSD?.toFixed(2) || shipment.CostUSD}
                </span>
              </td>
              <td>
                <span className="badge bg-info text-dark">
                  {shipment.Carrier}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShipmentsTable;