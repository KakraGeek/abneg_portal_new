import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add About and Join routes as placeholders for now */}
        <Route path="/about" element={<div className="p-8 text-center text-2xl">About Page (Coming Soon)</div>} />
        <Route path="/join" element={<div className="p-8 text-center text-2xl">Join Page (Coming Soon)</div>} />
      </Routes>
    </Router>
  );
}

export default App;
