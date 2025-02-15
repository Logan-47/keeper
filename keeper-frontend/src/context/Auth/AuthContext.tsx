import { createContext } from 'react'

export interface IUser {
  name?: string | null,
  email?: string | null
}

export interface IAuthContextType {
  user: IUser | null;
  signup: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => string | null;
  email: string | null
}


export const AuthContext = createContext<IAuthContextType | null>(null);