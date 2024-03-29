import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
type AuthContextType = {
    // Define your context properties and their types
    token: string | null;
    email: string | null;
    userRole: string | null;
    login: (newToken: string | null, email: string | null, role: string| null) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
    children: ReactNode; // Explicitly define children prop type
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const [userRole, setUserRole] = useState<string | null>(null);

  const login = (newToken: string | null, email: string | null, role: string| null) => {
    console.log("login!!!")
    console.log(email)
    console.log(userRole)

    setToken(newToken);
    setEmail(email);
    setUserRole(role);
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setUserRole(null);
    
  };

  const contextValue: AuthContextType = {
    token,
    email,
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