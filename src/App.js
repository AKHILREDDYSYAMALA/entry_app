// MainApp.js
import React, { useState } from "react";
import PopupForm from "./Components/PopupForm";
import CompanyTable from "./Components/CompanyTable";

function App() {
  const [companies, setCompanies] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const addCompany = (newCompany) => {
    setCompanies([...companies, newCompany]);
  };

  const editCompany = (editedCompany) => {
    // Implement edit functionality
  };

  const deleteCompany = (companyId) => {
    // Implement delete functionality
  };

  const handleClosePopup = () => {
    setPopupOpen(false); // Close the popup
  };

  return (
    <div>
      <button onClick={() => setPopupOpen(true)}>Add Company</button>
      {isPopupOpen && (
        <PopupForm onSave={addCompany} onClose={handleClosePopup} />
      )}
      <CompanyTable
        companies={companies}
        onEdit={editCompany}
        onDelete={deleteCompany}
      />
    </div>
  );
}

export default App;
