// PopupForm.js
import React, { useState } from "react";

function PopupForm({ onSave }) {
  const [companyData, setCompanyData] = useState({
    name: "",
    email: "",
    contact: "",
    domain: "",
    managers: [{ managerName: "", employees: [""] }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompanyData({ ...companyData, [name]: value });
  };

  const handleManagerChange = (e, index) => {
    const managers = [...companyData.managers];
    managers[index].managerName = e.target.value;
    setCompanyData({ ...companyData, managers });
  };

  const handleEmployeeChange = (e, managerIndex, employeeIndex) => {
    const managers = [...companyData.managers];
    managers[managerIndex].employees[employeeIndex] = e.target.value;
    setCompanyData({ ...companyData, managers });
  };

  const addManager = () => {
    setCompanyData({
      ...companyData,
      managers: [...companyData.managers, { managerName: "", employees: [""] }],
    });
  };

  const addEmployee = (managerIndex) => {
    const managers = [...companyData.managers];
    managers[managerIndex].employees.push("");
    setCompanyData({ ...companyData, managers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !/^[A-Z][a-z]+$/.test(companyData.name) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(companyData.email) ||
      !/^\d{1,10}$/.test(companyData.contact) ||
      companyData.domain === "" ||
      companyData.managers.length === 0 ||
      companyData.managers.some(
        (manager) =>
          manager.managerName === "" ||
          manager.employees.length === 0 ||
          manager.employees.some((employee) => employee === "")
      )
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    // If validation passes, call onSave with companyData
    onSave(companyData);
  };

  return (
    <div className="w-full max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Name of Company (Start with a capital letter and no special
            characters including spaces)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            name="name"
            value={companyData.name}
            onChange={handleChange}
            placeholder="Company Name"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address (General email format)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            value={companyData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contact"
          >
            Contact Details (Only numbers and less than 10 digits)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="contact"
            type="text"
            name="contact"
            value={companyData.contact}
            onChange={handleChange}
            placeholder="Contact Details"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="domain"
          >
            Domain
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="domain"
            name="domain"
            value={companyData.domain}
            onChange={handleChange}
            required
          >
            <option value="">Select Domain</option>
            <option value="Gaming">Gaming</option>
            <option value="Automobile">Automobile</option>
            <option value="Photography">Photography</option>
          </select>
        </div>
        {companyData.managers.map((manager, managerIndex) => (
          <div key={managerIndex}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Manager {managerIndex + 1}:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={manager.managerName}
              onChange={(e) => handleManagerChange(e, managerIndex)}
              placeholder="Manager Name"
              required
            />
            {manager.employees.map((employee, employeeIndex) => (
              <div key={employeeIndex}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Employee {employeeIndex + 1}:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  value={employee}
                  onChange={(e) =>
                    handleEmployeeChange(e, managerIndex, employeeIndex)
                  }
                  placeholder="Employee Name"
                  required
                />
              </div>
            ))}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
              type="button"
              onClick={() => addEmployee(managerIndex)}
            >
              Add Employee
            </button>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="button"
          onClick={addManager}
        >
          Add Manager
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="submit"
        >
          Save Company
        </button>
      </form>
    </div>
  );
}
export default PopupForm;
