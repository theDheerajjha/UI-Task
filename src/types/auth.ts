export interface User {
  email: string;
  username: string;
}

export interface AuthContextType {
  user: User | null;
  signIn: (emailOrUsername: string, password: string) => Promise<boolean>;
  signUp: (email: string, username: string, password: string) => Promise<boolean>;
  signOut: () => void;
} 