import React, { useState,useEffect } from "react";

function PopupForm({ onSave, onClose,companyToEdit }) {
  const [companyData, setCompanyData] = useState({
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    contact: { value: "", isValid: true },
    domain: { value: "", isValid: true },
    managers: [
      {
        managerName: { value: "", isValid: true },
        employees: [{ value: "", isValid: true }],
      },
    ],
  });
  

  useEffect(() => {
    if (companyToEdit) {
      setCompanyData({
        name: { value: companyToEdit.name, isValid: true },
        email: { value: companyToEdit.email, isValid: true },
        contact: { value: companyToEdit.contact, isValid: true },
        domain: { value: companyToEdit.domain, isValid: true },
        managers: companyToEdit.managers.map((manager) => ({
          managerName: { value: manager.managerName.value, isValid: true },
          employees: manager.employees.map((employee) => ({
            value: employee.value,
            isValid: true,
          })),
        })),
      });
    }
  }, [companyToEdit]);

  const handleChange = (e, field, managerIndex, employeeIndex) => {
    const { value } = e.target;
    let updatedCompanyData = { ...companyData };
    if (field === "managerName") {
      updatedCompanyData.managers[managerIndex].managerName.value = value;
      updatedCompanyData.managers[managerIndex].managerName.isValid = validateField(value, field);
    } else if (field === "employeeName") {
      updatedCompanyData.managers[managerIndex].employees[employeeIndex].value = value;
      updatedCompanyData.managers[managerIndex].employees[employeeIndex].isValid = validateField(value, field);
    } else if (field === "name" || field === "email" || field === "contact" || field === "domain") {
      updatedCompanyData[field].value = value;
      updatedCompanyData[field].isValid = validateField(value, field);
    } else if (updatedCompanyData[field] && typeof updatedCompanyData[field] === "object") {
      // Handle nested objects
      updatedCompanyData[field].value = value;
      updatedCompanyData[field].isValid = validateField(value, field);
    } else {
      console.error(`Invalid field: ${field}`);
    }
    setCompanyData(updatedCompanyData);
  };
  
  
  
  
  

  const validateField = (value, field) => {
    switch (field) {
      case "name":
        return /^[A-Z][a-z]+$/.test(value);
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "contact":
        return /^\d{1,10}$/.test(value);
      case "domain":
        return value !== "";
      case "managerName":
        return value !== "";
      case "employeeName":
        return value !== "";
      default:
        return true;
    }
  };

  const handleBlur = (field, managerIndex, employeeIndex) => {
    if (field === "managerName") {
      const managers = [...companyData.managers];
      managers[managerIndex].managerName.isValid = validateField(
        companyData.managers[managerIndex].managerName.value,
        field
      );
      setCompanyData({ ...companyData, managers });
    } else if (field === "employeeName") {
      const managers = [...companyData.managers];
      managers[managerIndex].employees[employeeIndex].isValid = validateField(
        companyData.managers[managerIndex].employees[employeeIndex].value,
        field
      );
      setCompanyData({ ...companyData, managers });
    } else {
      setCompanyData({
        ...companyData,
        [field]: {
          ...companyData[field],
          isValid: validateField(companyData[field].value, field),
        },
      });
    }
  };

  const handleFocus = (field, managerIndex, employeeIndex) => {
    if (field === "managerName") {
      const managers = [...companyData.managers];
      managers[managerIndex].managerName.isValid = true;
      setCompanyData({ ...companyData, managers });
    } else if (field === "employeeName") {
      const managers = [...companyData.managers];
      managers[managerIndex].employees[employeeIndex].isValid = true;
      setCompanyData({ ...companyData, managers });
    } else {
      setCompanyData({
        ...companyData,
        [field]: { ...companyData[field], isValid: true },
      });
    }
  };

  const addManager = () => {
    setCompanyData({
      ...companyData,
      managers: [
        ...companyData.managers,
        {
          managerName: { value: "", isValid: true },
          employees: [{ value: "", isValid: true }],
        },
      ],
    });
  };

  const addEmployee = (managerIndex) => {
    const managers = [...companyData.managers];
    managers[managerIndex].employees.push({ value: "", isValid: true });
    setCompanyData({ ...companyData, managers });
  };
 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedCompanyData = Object.keys(companyData).reduce((acc, key) => {
      if (key === "managers") {
        const updatedManagers = companyData.managers.map((manager) => {
          const updatedManager = {
            managerName: { ...manager.managerName },
            employees: manager.employees.map((employee) => ({ ...employee }))
          };
  
          if (updatedManager.managerName.value === "") {
            updatedManager.managerName.isValid = false;
          }
  
          updatedManager.employees.forEach((employee) => {
            if (employee.value === "") {
              employee.isValid = false;
            }
          });
  
          return updatedManager;
        });
  
        acc[key] = updatedManagers;
      } else {
        const isValid = validateField(companyData[key].value, key);
        acc[key] = { ...companyData[key], isValid };
      }
  
      return acc;
    }, {});
  
    // Update the company data
    setCompanyData(updatedCompanyData);
  
    // Check if any field is not valid
    if (
      !updatedCompanyData.name.isValid ||
      !updatedCompanyData.email.isValid ||
      !updatedCompanyData.contact.isValid ||
      !updatedCompanyData.domain.isValid ||
      updatedCompanyData.managers.some(
        (manager) =>
          !manager.managerName.isValid ||
          manager.employees.some((employee) => !employee.isValid)
      )
    ) {
      //alert("Please fill all fields correctly.");
      return;
    }
  
    // If validation passes, call onSave with the required data
    const { name, email, contact, domain, managers } = updatedCompanyData;
    onSave({ name: name.value, email: email.value, contact: contact.value, domain: domain.value, managers });
    console.log(updatedCompanyData);
  };
  
 
  return (
    <div className="w-1/3  bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 overflow-y-auto max-h-screen">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Name of Company
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !companyData.name.isValid ? "border-red-500" : "border-gray-300"
            }`}
            id="companyName"
            type="text"
            name="name"
            value={companyData.name.value}
            onChange={(e) => handleChange(e, "name")}
            onBlur={() => handleBlur("name")}
            onFocus={() => handleFocus("name")}
          />
          {!companyData.name.isValid && (
            <p className="text-red-500 text-sm mt-1">
              Company name should start with a capital letter and no special
            characters including spaces.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !companyData.email.isValid ? "border-red-500" : "border-gray-300"
            }`}
            id="email"
            type="email"
            name="email"
            value={companyData.email.value}
            onChange={(e) => handleChange(e, "email")}
            onBlur={() => handleBlur("email")}
            onFocus={() => handleFocus("email")}
          />
          {!companyData.email.isValid && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid email address.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="contact"
          >
            Contact Details 
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !companyData.contact.isValid
                ? "border-red-500"
                : "border-gray-300"
            }`}
            id="contact"
            type="text"
            name="contact"
            value={companyData.contact.value}
            onChange={(e) => handleChange(e, "contact")}
            onBlur={() => handleBlur("contact")}
            onFocus={() => handleFocus("contact")}
          />
          {!companyData.contact.isValid && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid contact details.Only numbers are allowed and less than 10 digits.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="domain"
          >
            Domain
          </label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              !companyData.domain.isValid ? "border-red-500" : "border-gray-300"
            }`}
            id="domain"
            name="domain"
            value={companyData.domain.value}
            onChange={(e) => handleChange(e, "domain")}
            onBlur={() => handleBlur("domain")}
            onFocus={() => handleFocus("domain")}
          >
            <option value="">Select Domain</option>
            <option value="Gaming">Gaming</option>
            <option value="Automobile">Automobile</option>
            <option value="Photography">Photography</option>
          </select>
          {!companyData.domain.isValid && (
            <p className="text-red-500 text-sm mt-1">Please select a domain.</p>
          )}
        </div>

        <div className="flex justify-end">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 w-36 rounded focus:outline-none focus:shadow-outline mt-4 "
          type="button"
          onClick={addManager}
        >
          Add Manager
        </button>
        </div>


        {companyData.managers.map((manager, managerIndex) => (
          <div key={managerIndex}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Manager {managerIndex + 1}
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                !manager.managerName.isValid
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              value={manager.managerName.value}
              onChange={(e) => handleChange(e, "managerName", managerIndex)}
              onBlur={() => handleBlur("managerName", managerIndex)}
              onFocus={() => handleFocus("managerName", managerIndex)}
              placeholder="Manager Name"
            />
            {!manager.managerName.isValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter manager name.
              </p>
            )}

            {manager.employees.map((employee, employeeIndex) => (
              <div key={employeeIndex} className="ml-10">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Employee {employeeIndex + 1}
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-4 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    !employee.isValid ? "border-red-500" : "border-gray-300"
                  }`}
                  type="text"
                  value={employee.value}
                  onChange={(e) =>
                    handleChange(e, "employeeName", managerIndex, employeeIndex)
                  }
                  onBlur={() =>
                    handleBlur("employeeName", managerIndex, employeeIndex)
                  }
                  onFocus={() =>
                    handleFocus("employeeName", managerIndex, employeeIndex)
                  }
                  placeholder="Employee Name"
                />
                {!employee.isValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter employee name.
                  </p>
                )}
              </div>
            ))}
            <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 w-36  mt-4 mb-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => addEmployee(managerIndex)}
            >
              Add Employee
            </button>
            </div>
            
          </div>
        ))}

        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default PopupForm;