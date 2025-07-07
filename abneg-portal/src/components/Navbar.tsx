import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export default function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading, getAccessTokenSilently } = useAuth0();
  const location = useLocation();
  const [isSuperAdmin, setIsSuperAdmin] = React.useState(false);
  const [pendingLoans, setPendingLoans] = React.useState<number>(0);

  // Check if user is admin or super_admin
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    const checkRole = async () => {
      if (!isAuthenticated) {
        setIsSuperAdmin(false);
        setIsAdmin(false);
        return;
      }
      const token = await getAccessTokenSilently();
      const payload = JSON.parse(atob(token.split(".")[1]));
      const roles = payload["https://abneg-portal/roles"] || [];
      setIsSuperAdmin(roles.includes("super_admin"));
      setIsAdmin(roles.includes("admin") || roles.includes("super_admin"));
    };
    checkRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Fetch pending loan count for admin badge
  React.useEffect(() => {
    const fetchPendingLoans = async () => {
      if (!isAdmin) return;
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch("/api/loans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        const pending = data.loans.filter((loan: any) => loan.status === "pending").length;
        setPendingLoans(pending);
      } catch {
        setPendingLoans(0);
      }
    };
    fetchPendingLoans();
    // Optionally poll every 60s
    const interval = setInterval(fetchPendingLoans, 60000);
    return () => clearInterval(interval);
  }, [isAdmin, getAccessTokenSilently]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Join", path: "/join" },
  ];

  // Fallback avatar: a small SVG with a subtle initial
  const fallbackAvatar = encodeURIComponent(`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="12" fill="#166534"/>
      <text x="12" y="17" font-size="10" text-anchor="middle" fill="#fff" font-family="Arial" font-weight="bold">D</text>
    </svg>
  `);

  if (isLoading) return null;

  return (
    <nav className="w-full flex items-center justify-between px-6 py-2 bg-green-700 shadow h-14">
      <div className="flex items-center gap-8">
        <span className="text-2xl font-bold text-white tracking-tight">ABNEG Portal</span>
        <div className="flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                ${location.pathname === link.path
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-600 hover:text-white"}
              `}
            >
              {link.name}
            </Link>
          ))}
          {/* Show Member Dashboard link if authenticated */}
          {isAuthenticated && (
            <>
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                  ${location.pathname === "/dashboard"
                    ? "bg-white text-green-700 shadow"
                    : "text-white hover:bg-green-600 hover:text-white"}
                `}
              >
                My Member Dashboard
              </Link>
              <Link
                to="/loan-application"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                  ${location.pathname === "/loan-application"
                    ? "bg-white text-green-700 shadow"
                    : "text-white hover:bg-green-600 hover:text-white"}
                `}
              >
                Loan Application
              </Link>
            </>
          )}
          {/* Conditionally render Admin Panel link */}
          {isSuperAdmin && (
            <Link
              to="/admin/roles"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                ${location.pathname === "/admin/roles"
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-600 hover:text-white"}
              `}
            >
              Admin Panel
              {isAdmin && pendingLoans > 0 && (
                <span className="ml-2 inline-block bg-red-600 text-white text-xs rounded-full px-2 py-0.5 align-middle">
                  {pendingLoans}
                </span>
              )}
            </Link>
          )}
          {/* Add a direct link to Loan Dashboard for admins */}
          {isAdmin && (
            <Link
              to="/admin/loans"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
                ${location.pathname === "/admin/loans"
                  ? "bg-white text-green-700 shadow"
                  : "text-white hover:bg-green-600 hover:text-white"}
              `}
            >
              Loan Dashboard
              {pendingLoans > 0 && (
                <span className="ml-2 inline-block bg-red-600 text-white text-xs rounded-full px-2 py-0.5 align-middle">
                  {pendingLoans}
                </span>
              )}
            </Link>
          )}
        </div>
      </div>
      <div>
        {!isAuthenticated ? (
          <button
            className="px-4 py-1 rounded bg-green-600 text-white font-medium hover:bg-green-800 transition"
            onClick={() => loginWithRedirect()}
          >
            Login
          </button>
        ) : (
          // Dropdown menu for user actions
          <DropdownMenu>
            {/* The trigger is the avatar and name */}
            <DropdownMenuTrigger asChild>
              <button
                className="flex items-center h-8 px-2 rounded focus:outline-none border border-green-800 bg-green-600 hover:bg-green-800 transition"
                style={{ minWidth: "0", maxWidth: "220px" }}
              >
                <Avatar>
                  <AvatarImage
                    src={user?.picture ? user.picture : undefined}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {/* Show first initial or fallback SVG */}
                    {user?.name ? user.name.charAt(0) : (
                      <img
                        src={`data:image/svg+xml,${fallbackAvatar}`}
                        alt="User"
                        className="w-5 h-5"
                      />
                    )}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-white ml-2 text-base truncate">{user?.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Sign out option */}
              <DropdownMenuItem
                onSelect={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                variant="destructive"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}