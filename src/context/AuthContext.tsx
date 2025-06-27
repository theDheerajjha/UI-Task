import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthContextType, User } from '../types/auth';

const testAccounts = [
  { email: 'demo@example.com', username: 'demo', password: 'password123' },
  { email: 'test@user.com', username: 'testuser', password: 'testpass' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getStoredUser = (): User | null => {
  const data = localStorage.getItem('authUser');
  return data ? JSON.parse(data) : null;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('authUser');
    }
  }, [user]);

  const signIn = async (emailOrUsername: string, password: string): Promise<boolean> => {
    const found = testAccounts.find(
      acc => (acc.email === emailOrUsername || acc.username === emailOrUsername) && acc.password === password
    );
    if (found) {
      setUser({ email: found.email, username: found.username });
      return true;
    }
    return false;
  };

  const signUp = async (email: string, username: string): Promise<boolean> => {
    // For demo, just allow any signup and "log in" the user
    setUser({ email, username });
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('posts');
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}; 