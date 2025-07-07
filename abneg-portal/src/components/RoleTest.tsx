import React from "react";
import { useUserRoles } from "@/hooks/useUserRoles";
import { Button } from "@/components/ui/button";

export default function RoleTest() {
  const { user, isLoading, error, hasRole, isAdmin, isMember, isSuperAdmin } = useUserRoles();

  if (isLoading) {
    return <div className="text-blue-600">Loading user roles...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error loading roles: {error}</div>;
  }

  if (!user) {
    return <div className="text-gray-600">No user data available</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">User Role Information</h3>
      
      <div className="space-y-2 mb-4">
        <div><strong>Name:</strong> {user.name}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Auth0 ID:</strong> {user.auth0Id}</div>
      </div>

      <div className="mb-4">
        <strong>Roles:</strong>
        {user.roles.length === 0 ? (
          <div className="text-gray-500 ml-2">No roles assigned</div>
        ) : (
          <ul className="list-disc list-inside ml-2">
            {user.roles.map((role) => (
              <li key={role.roleId}>
                {role.roleName} - {role.roleDescription}
                <span className="text-gray-500 text-sm ml-2">
                  (assigned: {new Date(role.assignedAt).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-4">
        <strong>Role Checks:</strong>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className={`p-2 rounded ${isMember ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
            Member: {isMember ? '✓' : '✗'}
          </div>
          <div className={`p-2 rounded ${isAdmin ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
            Admin: {isAdmin ? '✓' : '✗'}
          </div>
          <div className={`p-2 rounded ${isSuperAdmin ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
            Super Admin: {isSuperAdmin ? '✓' : '✗'}
          </div>
          <div className={`p-2 rounded ${hasRole('custom') ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-600'}`}>
            Custom Role: {hasRole('custom') ? '✓' : '✗'}
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-600">
        <strong>Database ID:</strong> {user.id} | 
        <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
} 