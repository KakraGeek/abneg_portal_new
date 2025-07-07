import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminRoleDashboard from "./pages/AdminRoleDashboard";
import About from "./pages/About";
import Join from "./pages/Join";
import { useUserRegistration } from "./hooks/useUserRegistration";

function App() {
  // Ensure user is provisioned in the database after login
  useUserRegistration();
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add About and Join routes as placeholders for now */}
        <Route path="/about" element={<About />} />
        <Route path="/join" element={<Join />} />
        <Route path="/admin/roles" element={<AdminRoleDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
