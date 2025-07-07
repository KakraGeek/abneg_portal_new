import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Join", path: "/join" },
  ];

  return (
    <nav className="bg-green-600 shadow-sm border-b border-green-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              ABNEG
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                  ${location.pathname === link.path
                    ? "bg-white text-green-700 shadow"
                    : "text-white hover:bg-green-700 hover:text-white"}
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 