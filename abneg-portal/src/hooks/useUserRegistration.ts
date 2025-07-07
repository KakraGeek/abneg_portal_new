import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface UserRegistrationStatus {
  isRegistered: boolean;
  isLoading: boolean;
  error: string | null;
}

export function useUserRegistration() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [status, setStatus] = useState<UserRegistrationStatus>({
    isRegistered: false,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setStatus({ isRegistered: false, isLoading: false, error: null });
      return;
    }

    const registerUser = async () => {
      setStatus(prev => ({ ...prev, isLoading: true, error: null }));

      try {
        // First, check if user already exists
        const response = await fetch(`http://localhost:5000/api/users/${user.sub}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          // User already exists
          setStatus({ isRegistered: true, isLoading: false, error: null });
          return;
        }

        if (response.status === 404) {
          // User doesn't exist, register them
          const registerResponse = await fetch("http://localhost:5000/api/users/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              auth0Id: user.sub,
              name: user.name,
              email: user.email,
              picture: user.picture,
            }),
          });

          if (registerResponse.ok) {
            setStatus({ isRegistered: true, isLoading: false, error: null });
          } else {
            const errorData = await registerResponse.json();
            throw new Error(errorData.error || "Failed to register user");
          }
        } else {
          throw new Error("Failed to check user status");
        }
      } catch (error) {
        console.error("Error in user registration:", error);
        setStatus({
          isRegistered: false,
          isLoading: false,
          error: error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    };

    registerUser();
  }, [isAuthenticated, user]);

  return status;
} 