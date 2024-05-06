import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import EmployeeTable from "./Table/EmployeeTable";
import AddEmployee from "./components/AddUser";
import AdminLogin from "./components/AdminLogin";
import Home from "./components/Home";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <Routes> {/* Use Routes instead of Switch */}
        <Route path="/add-employee" element={<AddEmployee />} /> {/* Use element prop instead of component */}
        <Route path="/list-employee" element={<EmployeeTable />} /> {/* Use element prop instead of component */}
        <Route path="/" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/edit/:userId" element={<EditUser />} />


      </Routes>
    </Router>
  );
}

export default App;
