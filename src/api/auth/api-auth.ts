import { toast } from "react-toastify";
import { AuthenticatedUser } from "../../types/AuthTypes";

export const authenticateUser = async (
  email: string,
  password: string
): Promise<AuthenticatedUser> => {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    toast.error("Error logging in.");
    throw new Error("Error logging in.");
  }
  return response.json();
};
