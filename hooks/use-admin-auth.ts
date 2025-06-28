import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    // Check if user is authenticated by making a request to validate the auth cookie
    const checkAuth = async () => {
      try {
        // Call the validation endpoint
        const response = await fetch('/api/auth/validate', { 
          credentials: 'include' 
        });
        
        if (!response.ok) {
          throw new Error('Authentication failed');
        }
        
        const data = await response.json();
        
        if (data.success && data.user) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          throw new Error('Invalid authentication data');
        }
      } catch (error) {
        console.error("Auth error:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { credentials: 'include' });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { 
    isAuthenticated, 
    isLoading, 
    user,
    logout
  };
}