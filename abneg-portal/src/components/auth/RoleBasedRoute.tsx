import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRole?: "member" | "admin" | "super_admin";
  redirectTo?: string;
}

export default function RoleBasedRoute({ 
  children, 
  requiredRole = "member",
  redirectTo 
}: RoleBasedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    // Wait for authentication to load
    if (isLoading) return;

    // If not authenticated, redirect to home
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    // If custom redirect is specified, redirect
    if (redirectTo) {
      navigate(redirectTo);
      return;
    }
  }, [isAuthenticated, isLoading, redirectTo, navigate]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-blue-600">Loading...</div>
      </div>
    );
  }

  // If not authenticated, don't render children
  if (!isAuthenticated) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
} 