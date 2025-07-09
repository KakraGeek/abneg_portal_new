import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

console.log("AdminRoleDashboard file loaded");

const AdminRoleDashboard: React.FC = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  console.log("AdminRoleDashboard rendered");

  // Check if user is super admin (frontend check)
  useEffect(() => {
    console.log("Checking super admin role...");
    const checkRole = async () => {
      if (!isAuthenticated) return setIsSuperAdmin(false);
      const token = await getAccessTokenSilently();
      const payload = JSON.parse(atob(token.split(".")[1]));
      const roles = payload["https://abneg-portal/roles"] || [];
      setIsSuperAdmin(roles.includes("super_admin"));
      console.log("Super admin roles:", roles);
    };
    checkRole();
  }, [isAuthenticated, getAccessTokenSilently]);

  // Fetch users and roles
  useEffect(() => {
    if (!isSuperAdmin) return;
    console.log("Fetching users and roles...");
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await getAccessTokenSilently();
        const usersRes = await fetch("/api/users", { headers: { Authorization: `Bearer ${token}` } });
        const usersData = await usersRes.json();
        const rolesRes = await fetch("/api/roles", { headers: { Authorization: `Bearer ${token}` } });
        const rolesData = await rolesRes.json();

        setUsers(Array.isArray(usersData.users) ? usersData.users : []);
        setRoles(Array.isArray(rolesData.roles) ? rolesData.roles : []);
        console.log("Fetched users:", usersData.users);
        console.log("Fetched roles:", rolesData.roles);
      } catch (err) {
        setError("Failed to load users or roles.");
        console.error("Error fetching users/roles:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getAccessTokenSilently, isSuperAdmin]);

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    setError(null);
    setSuccess(null);
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`/api/users?action=roles&userId=${userId}&roleName=${newRole}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ assignedBy: null }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to update role");
      }
      setSuccess("Role updated successfully!");
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, roles: [{ ...u.roles[0], roleName: newRole }] } : u
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isSuperAdmin) {
    return <div className="text-center mt-10 text-red-600">Access denied: Super Admins only.</div>;
  }
  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">Role Management Dashboard</h1>
      {success && <div className="mb-4 text-green-600 text-center">{success}</div>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-100">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4 flex items-center gap-2">
                  {/* Render user picture (if available) and name only once */}
                  {user.picture && (
                    <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                  )}
                  {/* Only render the name, and ensure it's not duplicated */}
                  <span>{user.name?.split(" ").filter((v: string, i: number, arr: string[]) => arr.indexOf(v) === i).join(" ") || "(No Name)"}</span>
                </td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.roles[0]?.roleName || "-"}</td>
                <td className="py-2 px-4">
                  <select
                    className="border rounded px-2 py-1"
                    value={user.roles[0]?.roleName || ""}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((role: any) => (
                      <option key={role.id} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRoleDashboard; 