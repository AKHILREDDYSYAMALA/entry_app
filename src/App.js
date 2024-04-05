import React, { useState } from "react";
import PopupForm from "./Components/PopupForm";
import CompanyTable from "./Components/CompanyTable";

function App() {
  const [companies, setCompanies] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);

  const addCompany = (newCompany) => {
    // Generate a unique id for the new company
    const id = companies.length + 1;
    const companyWithId = { ...newCompany, id }; // Add id to the newCompany object
    setCompanies([...companies, companyWithId]);
    setPopupOpen(false);
  };

  const editCompany = (editedCompany) => {
    const updatedCompanies = companies.map((company) =>
      company.id === editedCompany.id ? editedCompany : company
    );
    setCompanies(updatedCompanies);
    setPopupOpen(false);
    setCompanyToEdit(null);
  };

  const deleteCompany = (companyId) => {
    const updatedCompanies = companies.filter((company) => company.id !== companyId);
    setCompanies(updatedCompanies);
  };

  const handleClosePopup = () => {
    setPopupOpen(false); // Close the popup
    setCompanyToEdit(null);
  };

  const handleEditCompany = (company) => {
    setPopupOpen(true);
    console.log(company);
    setCompanyToEdit(company);
  };

  

  return (
    <div className="container mx-auto">
      <div>
      <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded float-right mt-8 mb-8 mr-4"
      onClick={() => setPopupOpen(true)}
    >
      Add Company
    </button>
    {isPopupOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
        <PopupForm onSave={companyToEdit ? editCompany : addCompany}
    onClose={handleClosePopup}
    companyToEdit={companyToEdit} />
      </div>
    )}
    <CompanyTable
      companies={companies}
      onEdit={handleEditCompany}
      onDelete={deleteCompany}
    />
      </div>
  </div>
  );
}

export default App;
