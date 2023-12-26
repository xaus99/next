import { FC, PropsWithChildren, useEffect, useReducer } from "react";
// import { signOut, useSession } from "next-auth/react";

import { AuthContext, authReducer } from ".";

import Cookies from "js-cookie";
import axios from "axios";

import { IUser } from "../../interfaces";

import { tesloApi } from "../../api";
import { useRouter } from "next/router";

export interface IRegisterUser {
  hasError: boolean;
  message?: string;
}

export interface ILoginUser {
  hasError: boolean;
  message?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  // const { data, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     console.log("user ============>", data);
  //     dispatch({ type: "Auth - Login", payload: data?.user as IUser });
  //   }
  // }, [status, data]);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) return;

    try {
      const { data } = await tesloApi.get("/user/validate-token");
      const { token, user } = data;
      Cookies.set("token", token, { sameSite: "none", secure: true });
      dispatch({ type: "Auth - Login", payload: user });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (
    email: string,
    password: string
  ): Promise<ILoginUser> => {
    try {
      const { data } = await tesloApi.post("/user/login", { email, password });

      const { token, user } = data;
      console.log({ token, user });
      Cookies.set("token", token);
      dispatch({ type: "Auth - Login", payload: user });
      return {
        hasError: false,
      };
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo iniciar sesión - intente de nuevo",
      };
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<IRegisterUser> => {
    try {
      const { data } = await tesloApi.post("/user/register/", {
        name,
        email,
        password,
      });
      const { token, user } = data;
      Cookies.set("token", token, { sameSite: "none", secure: true });
      dispatch({ type: "Auth - Login", payload: user });

      return {
        hasError: false,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error?.response?.data?.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el ususario - intente de nuevo",
      };
    }
  };

  const logout = () => {
    // Cookies.remove("cart");
    // Cookies.remove("firstName");
    // Cookies.remove("lastName");
    // Cookies.remove("address");
    // Cookies.remove("address2");
    // Cookies.remove("zip");
    // Cookies.remove("city");
    // Cookies.remove("country");
    // Cookies.remove("phone");

    Cookies.remove("token");
    router.reload();
    // Cookies.remove("next-auth.session-token");
    // Cookies.remove("next-auth.callback-url");
    // Cookies.remove("next-auth.csrf-token");

    // signOut();
  };

  const values = {
    ...state,
    loginUser,
    registerUser,
    logout,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
