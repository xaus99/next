import { createContext } from "react";
import { IUser } from "../../interface";
import { IRegisterUser } from "./AuthProvider";
import { ILoginUser } from "./AuthProvider";

interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;

  loginUser: (email: string, pasword: string) => Promise<ILoginUser>;
  registerUser: (
    name: string,
    email: string,
    password: string
  ) => Promise<IRegisterUser>;
  logout: () => void;
}

export const AuthContext = createContext({} as ContextProps);
