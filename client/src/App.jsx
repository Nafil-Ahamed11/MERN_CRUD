import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import EmployeeTable from "./Table/EmployeeTable";
import AddEmployee from "./components/AddUser";
import EditUser from "./components/EditUser";

// ProtectedRoute component
const ProtectedRoute = ({ element, ...rest }) => {
  const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
  return isAdminLoggedIn ? (
    element
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/add-employee" element={<ProtectedRoute element={<AddEmployee />} />} />
        <Route path="/list-employee" element={<ProtectedRoute element={<EmployeeTable />} />} />
        <Route path="/edit/:userId" element={<ProtectedRoute element={<EditUser />} />} />
      </Routes>
    </Router>
  );
}

export default App;
