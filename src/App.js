// MainApp.js
import React, { useState } from "react";
import PopupForm from "./Components/PopupForm";
import CompanyTable from "./Components/CompanyTable";

function App() {
  const [companies, setCompanies] = useState([]);

  const addCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  const editCompany = (editedCompany) => {
    // Implement edit functionality
  };

  const deleteCompany = (companyId) => {
    // Implement delete functionality
  };

  return (
    <div>
      <button>Add Company</button>
      <PopupForm onSave={addCompany} />
      <CompanyTable
        companies={companies}
        onEdit={editCompany}
        onDelete={deleteCompany}
      />
    </div>
  );
}

export default App;
