import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface UserRole {
  roleId: number;
  roleName: string;
  roleDescription: string;
  assignedAt: string;
}

interface UserWithRoles {
  id: number;
  auth0Id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
  updatedAt: string;
  roles: UserRole[];
}

interface UserRolesStatus {
  user: UserWithRoles | null;
  isLoading: boolean;
  error: string | null;
  hasRole: (roleName: string) => boolean;
  isAdmin: boolean;
  isMember: boolean;
  isSuperAdmin: boolean;
}

export function useUserRoles() {
  const { user, isAuthenticated } = useAuth0();
  const [status, setStatus] = useState<UserRolesStatus>({
    user: null,
    isLoading: false,
    error: null,
    hasRole: () => false,
    isAdmin: false,
    isMember: false,
    isSuperAdmin: false,
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setStatus({
        user: null,
        isLoading: false,
        error: null,
        hasRole: () => false,
        isAdmin: false,
        isMember: false,
        isSuperAdmin: false,
      });
      return;
    }

    const fetchUserRoles = async () => {
      setStatus(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // Use the new endpoint for roles
        const response = await fetch(`/api/users?action=roles&userId=${user.sub}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const userWithRoles = data.user as UserWithRoles;

          const hasRole = (roleName: string) =>
            userWithRoles.roles.some(role => role.roleName === roleName);

          const isAdmin = hasRole("admin");
          const isMember = hasRole("member");
          const isSuperAdmin = hasRole("super_admin");

          setStatus({
            user: userWithRoles,
            isLoading: false,
            error: null,
            hasRole,
            isAdmin,
            isMember,
            isSuperAdmin,
          });
        } else {
          throw new Error("Failed to fetch user roles");
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
        setStatus({
          user: null,
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error occurred",
          hasRole: () => false,
          isAdmin: false,
          isMember: false,
          isSuperAdmin: false,
        });
      }
    };

    fetchUserRoles();
  }, [isAuthenticated, user]);

  return status;
} 