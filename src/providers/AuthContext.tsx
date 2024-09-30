import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { UserType, AuthTypes } from "../types/AuthTypes";
import {
  createUser,
  getUserByEmail,
  getUsersFromDB,
} from "../api/users/api-users";

export const AuthContext = createContext({} as AuthTypes);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
      sessionStorage.setItem("authtoken", "true");
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
      const data = await getUsersFromDB();
      const user = data.find(
        (user: UserType) => user.email === email && user.password === password
      );
      if (!user) {
        toast.error("Invalid email or password");
        throw new Error("Invalid email or password");
      }

      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("authtoken", true.toString());
      setUser(user);
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

    const queryUser = await getUserByEmail(email);
    if (queryUser) {
      toast.error("User already exists");
      throw new Error("User already exists 01");
    }

    const newUser: UserType = {
      email,
      name,
      password,
    };

    try {
      const createdUser = await createUser(newUser);
      setUser(createdUser);
      sessionStorage.setItem("user", JSON.stringify(createdUser));
      sessionStorage.setItem("authtoken", "true");
      toast.success("User created successfully");
    } catch (error: unknown) {
      console.error(error);
      toast.error("Error creating user");
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
