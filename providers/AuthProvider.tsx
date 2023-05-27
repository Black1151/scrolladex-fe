import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkSessionAPI } from "@/api/authAPI";

interface AuthContextData {
  user: any | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  isLoading: true,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await checkSessionAPI();
        setUser(user);
      } catch (error) {
        console.error("Session check failed", error);
        router.replace("/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
