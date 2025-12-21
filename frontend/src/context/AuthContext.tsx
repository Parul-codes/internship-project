import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services/auth';
import { UserRole } from '../types';

type Role = 'admin' | 'mentor' | 'student';

interface AuthContextType {
  role: Role | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setRole(role as UserRole);
    }
    setIsLoading(false);
  }, []);


  const login = (token: string, role: UserRole) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    setRole(role );
  };


  const logout = () => {
    authService.logout();
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        isAuthenticated: !!role,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
