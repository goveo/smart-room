import { createContext } from 'react';

export type UserCredentials = {
  username: string;
  password: string;
};

export type AuthState = {
  username: string;
  preferences: any[];
  gestures: any[];
  token: string;
  isAuthenticated: boolean;
  loading: boolean;
  error: object | string;
  register: (user: UserCredentials) => Promise<any>;
  login: (user: UserCredentials) => Promise<any>;
  logout: () => void;
};

const authContext = createContext<AuthState>({} as any);

export const AuthContextProvider = authContext.Provider;
export const AuthContextConsumer = authContext.Consumer;

export default authContext;
