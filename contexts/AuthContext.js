import React, { Context, useContext } from "react"

// Hooks
import useAuthForContextProvider from "../hooks/useAuthForContextProvider";

export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const auth = useAuthForContextProvider();

  return (
    <AuthContext.Provider value={auth}>
      { children }
    </AuthContext.Provider>
  );
}