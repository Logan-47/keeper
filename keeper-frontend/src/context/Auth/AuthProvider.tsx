 
import { useState } from "react";
import { login as loginApi, signup as signupApi } from "../../services/auth";
import { AuthContext, IUser } from "./AuthContext";


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const localStorageUser: IUser | null = {
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email")
  }
  const [user, setUser] = useState<IUser | null>(localStorageUser);

  const login = async (email: string, password: string) => {
    const res = await loginApi(email, password);
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("name", res.data.data.name);
    localStorage.setItem("email", res.data.data.email)
    setUser(res.data.data.name);
  };

  const signup = async (name: string, email: string, password: string) => {
    await signupApi(name, email, password);
    await login(email, password);
  };

  const logout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setUser(null)
  }

  const getToken = () => {
    return localStorage.getItem("token")
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, getToken, email: user?.email || null }}>
      {children}
    </AuthContext.Provider>
  );
};