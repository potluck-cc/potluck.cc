import { createContext, Dispatch } from "react";
import { AuthState } from "./types";

export interface AuthContextInterface {
  authState: AuthState;
  setAuthState: Dispatch<React.SetStateAction<AuthState>>;
}

export default createContext<AuthContextInterface | null>(null);
