import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export default function Navbar() {
  const { isAuthenticated, user, loginWithRedirect, logout, isLoading } = useAuth0();

  if (isLoading) return null;

  // Fallback avatar: a small SVG with a subtle initial
  const fallbackAvatar = encodeURIComponent(`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#6d28d9"/>
      <text x="12" y="17" font-size="10" text-anchor="middle" fill="#fff" font-family="Arial" font-weight="bold">D</text>
    </svg>
  `);

  return (
    <nav className="w-full flex items-center justify-between px-6 py-2 bg-white shadow h-12">
      <div className="text-xl font-bold text-blue-700">ABNEG Portal</div>
      <div>
        {!isAuthenticated ? (
          <button
            className="px-4 py-1 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        ) : (
          <button
            className="flex items-center h-8 px-2 rounded focus:outline-none border"
            style={{ minWidth: "0", maxWidth: "220px" }}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            <img
              src={user?.picture ? user.picture : `data:image/svg+xml,${fallbackAvatar}`}
              alt={user?.name || "User"}
              className="rounded-full border"
              style={{ objectFit: "cover", width: "20px", height: "20px" }}
            />
            <span className="font-medium text-blue-700 ml-2 text-base">{user?.name}</span>
          </button>
        )}
      </div>
    </nav>
  );
}