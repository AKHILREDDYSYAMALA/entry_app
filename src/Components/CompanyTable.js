// CompanyTable.js
import React from 'react';

function CompanyTable({ companies, onEdit, onDelete }) {
  return (
    <div className=''>
    <table className="w-full mt-8 border-collapse  border-2 border-gray-500">
      <thead>
        <tr>
          <th className="px-4 py-2 border border-gray-500">Name of the Company</th>
          <th className="px-4 py-2 border border-gray-500">Email Address</th>
          <th className="px-4 py-2 border border-gray-500">Contact Details</th>
          <th className="px-4 py-2 border border-gray-500">Domain</th>
          <th className="px-4 py-2 border border-gray-500">Head Count</th>
          <th className="px-4 py-2 border border-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <tr key={company.id}>
            <td className="px-4 py-2 border border-gray-500 text-center">{company.name}</td>
            <td className="px-4 py-2 border  border-gray-500 text-center">{company.email}</td>
            <td className="px-4 py-2 border  border-gray-500 text-center">{company.contact}</td>
            <td className="px-4 py-2 border border-gray-500 text-center">{company.domain}</td>
            <td className="px-4 py-2 border border-gray-500 text-center">{getHeadCount(company)}</td>
            <td className="px-4 py-2 border border-gray-500 text-center">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => onEdit(company)}>Edit</button>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => onDelete(company.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function getHeadCount(company) {
  let managerCount = company.managers.length;
  let employeeCount = company.managers.reduce((total, manager) => total + manager.employees.length, 0);
  return managerCount + employeeCount;
}

export default CompanyTable;






