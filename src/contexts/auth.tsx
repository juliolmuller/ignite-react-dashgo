import { useRouter } from 'next/router';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import api from '~/services/api';

export interface User {
  email: string;
  roles: string[];
  permissions: string[];
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | undefined;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const isAuthenticated = Boolean(user);

  async function signIn(credentials: SignInCredentials) {
    const { data } = await api.post('sessions', credentials);
    const cookiesOptions = {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      path: '/',
    };

    setCookie(
      null,
      process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!,
      data.token,
      cookiesOptions,
    );
    setCookie(
      null,
      process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!,
      data.refreshToken,
      cookiesOptions,
    );
    setUser({
      email: credentials.email,
      roles: data.roles,
      permissions: data.permissions,
    });
  }

  async function signOut() {
    destroyCookie(null, process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!);
    destroyCookie(null, process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!);
    setUser(undefined);
    router.replace('/');
  }

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_TOKEN!];
    const refreshToken =
      cookies[process.env.NEXT_PUBLIC_COOKIE_KEY_REFRESH_TOKEN!];

    if (token && refreshToken) {
      api
        .get<User>('me')
        .then(({ data }) => {
          const { email, roles, permissions } = data;
          setUser({ email, roles, permissions });
        })
        .catch(signOut);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
