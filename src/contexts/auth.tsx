import { createContext, ReactNode, useContext } from 'react';

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn(credentials: SignInCredentials) {
    console.log('signIn', credentials);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
