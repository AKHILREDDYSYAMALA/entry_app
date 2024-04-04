import React, { useState } from "react";

function PopupForm({ onSave, onClose }) {
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

  const handleChange = (e, field, managerIndex, employeeIndex) => {
    const { value } = e.target;
    if (field === "managerName") {
      const managers = [...companyData.managers];
      managers[managerIndex].managerName.value = value;
      managers[managerIndex].managerName.isValid = validateField(value, field);
      setCompanyData({ ...companyData, managers });
    } else if (field === "employeeName") {
      const managers = [...companyData.managers];
      managers[managerIndex].employees[employeeIndex].value = value;
      managers[managerIndex].employees[employeeIndex].isValid = validateField(
        value,
        field
      );
      setCompanyData({ ...companyData, managers });
    } else {
      setCompanyData({
        ...companyData,
        [field]: { value, isValid: validateField(value, field) },
      });
    }
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
        return /^[A-Z][a-z]+$/.test(value);
      case "employeeName":
        return /^[A-Z][a-z]+$/.test(value);
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
    const isAnyRequiredFieldFilled =
      companyData.name.value !== "" ||
      companyData.email.value !== "" ||
      companyData.contact.value !== "" ||
      companyData.domain.value !== "";

    // If none of the required fields are filled out, prevent form submission
    if (!isAnyRequiredFieldFilled) {
      alert("Please fill the form");
      return;
    }
    const { name, email, contact, domain, managers } = companyData;

    if (
      !companyData.name.isValid ||
      !companyData.email.isValid ||
      !companyData.contact.isValid ||
      !companyData.domain.isValid ||
      companyData.managers.some(
        (manager) =>
          !manager.managerName.isValid ||
          manager.employees.some((employee) => !employee.isValid)
      )
    ) {
      alert("Please fill all fields correctly.");
      return;
    }

    //onSave(companyData);
    onSave({
      name: name.value,
      email: email.value,
      contact: contact.value,
      domain: domain.value,
      managers,
    });

    console.log(companyData);
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
              Please enter a valid company name.
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address (General email format)
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
            Contact Details (Only numbers and less than 10 digits)
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
              Please enter a valid contact details.
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

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          type="button"
          onClick={addManager}
        >
          Add Manager
        </button>

        {companyData.managers.map((manager, managerIndex) => (
          <div key={managerIndex}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Manager {managerIndex + 1}:
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
                Please enter a valid manager name.
              </p>
            )}

            {manager.employees.map((employee, employeeIndex) => (
              <div key={employeeIndex}>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Employee {employeeIndex + 1}:
                </label>
                <input
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
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
                    Please enter a valid employee name.
                  </p>
                )}
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

        <div className="flex justify-end">
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
