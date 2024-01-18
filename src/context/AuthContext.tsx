import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type AuthContextType = {
    // Define your context properties and their types
    token: string | null;
    userRole: string | null;
    login: (newToken: string | null, role: string| null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode; // Explicitly define children prop type
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    const [userRole, setUserRole] = useState<string | null>(null);

  const login = (newToken: string | null, role: string| null) => {
    setToken(newToken);
    setUserRole(role);
  };

  const logout = () => {
    setToken(null);
    setUserRole(null);
  };

  const contextValue: AuthContextType = {
    token,
    userRole,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};