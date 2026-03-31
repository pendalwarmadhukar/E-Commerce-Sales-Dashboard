import React from "react";

const TopProductsTable = ({ data }) => {
  return (
    <div className="table-shell">
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Units Sold</th>
            <th>Revenue (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={product.name}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.unitsSold}</td>
              <td>{product.revenue.toLocaleString("en-IN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopProductsTable;
