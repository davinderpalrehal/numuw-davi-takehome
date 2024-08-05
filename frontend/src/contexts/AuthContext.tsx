import { createContext, useContext, useState } from 'react';
import { AuthContextType } from '../types';
import Api from '../utils/Api.ts';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await Api.post('api/auth/login/', {
        username,
        password,
      });
      console.log({
        login: response,
      });
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, login }}>
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
