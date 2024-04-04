// CompanyTable.js
import React from "react";

function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          {/* Add other headers */}
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td>{company.name}</td>
            {/* Display other company details */}
            <td>
              <button onClick={() => onEdit(company)}>Edit</button>
              <button onClick={() => onDelete(company.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CompanyTable;
