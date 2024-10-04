// import { UserType } from "../../types/AuthTypes";

export const getUsersFromDB = async () => {
  return await fetch("http://localhost:3000/users").then((response) =>
    response.json()
  );
};

export const getUserByEmail = async (email: string) => {
  const user = await fetch(`http://localhost:3000/users/user/${email}`).then(
    (response) => response.json()
  );
  return user[0];
};

export const createUser = async (user: any): Promise<any> => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  console.log(`POST http://localhost:3000/users - Status: ${response.status}`);

  if (!response.ok) {
    throw new Error(`Error creating user: ${response.statusText}`);
  }
  return response.json();
};
