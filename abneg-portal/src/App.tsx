import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminRoleDashboard from "./pages/AdminRoleDashboard";
import About from "./pages/About";
import Join from "./pages/Join";
import Dashboard from "./pages/Dashboard";
import LoanApplication from "./pages/LoanApplication";
import AdminLoanDashboard from "./pages/AdminLoanDashboard";
import Events from "./pages/Events";
import Leadership from "./pages/Leadership";
import News from "./pages/News";
import Contact from "./pages/Contact";
import Payments from "./pages/Payments";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin/roles" element={<AdminRoleDashboard />} />
        <Route path="/loan-application" element={<LoanApplication />} />
        <Route path="/admin/loans" element={<AdminLoanDashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/news" element={<News />} />
        <Route path="/leadership" element={<Leadership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;
