import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if(!context) throw new Error("AuthContext being used outside of AuthContext.Provider");
  return context;
}