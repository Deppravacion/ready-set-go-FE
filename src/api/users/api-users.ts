import { toast } from "react-toastify";
import { UserType } from "../../types/AuthTypes";

export const getUsersFromDB = async () => {
  return await fetch("http://localhost:3004/users").then((response) =>
    response.json()
  );
};

export const getUserByEmail = async (email: string) => {
  const userEmail = email;
  const tail = `?email=${userEmail}`;
  const user = await fetch(`http://localhost:3004/users${tail}`).then(
    (response) => response.json()
  );
  return user[0];
};

export const createUser = async (user: UserType) => {
  const response = await fetch("http://localhost:3004/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    toast.error("Error creating user");
    throw new Error("Error creating user");
  }
  return response.json();
};
