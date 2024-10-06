import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthTypes, AuthenticatedUser, UserSignup } from "../types/AuthTypes";
import {
  createUser,
  // getUserByEmail,
  // getUsersFromDB,
} from "../api/users/api-users";
import { authenticateUser } from "../api/auth/api-auth";

export const AuthContext = createContext({} as AuthTypes);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);

  useEffect(() => {
    const sessionStorageObject = sessionStorage.getItem("user");
    if (sessionStorageObject) {
      const sessionUser = JSON.parse(sessionStorageObject);
      sessionStorage.setItem("authtoken", sessionUser.token);
    }
  }, []);

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const authenticatedUser = await authenticateUser(email, password);
      // console.log({ authedUser: authenticatedUser });
      sessionStorage.setItem("user", JSON.stringify(authenticatedUser));
      sessionStorage.setItem("authtoken", authenticatedUser.token);
      setUser(authenticatedUser);
    } catch (error: unknown) {
      console.error(error);
      toast.error("Error logging in");
    }
  };

  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      throw new Error("Passwords do not match");
    }

    const newUser: UserSignup = {
      email,
      name,
      password,
      confirmPassword,
    };

    try {
      const createdUser = await createUser(newUser);
      const authenticatedUser: AuthenticatedUser = {
        token: "someToken",
        userInformation: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
        },
      };
      setUser(authenticatedUser);
      sessionStorage.setItem("user", JSON.stringify(authenticatedUser));
      sessionStorage.setItem("authtoken", "true");
      // sessionStorage.setItem("authtoken", "true");
      toast.success("User created successfully");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Error creating user");
      throw error;
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("authtoken");
    if (!user) {
      toast.success("Logged out!");
      return true;
    } else {
      console.log(user);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleSignUp,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthProvider = () => useContext(AuthContext);
