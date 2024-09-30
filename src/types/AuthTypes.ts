export type AuthTypes = {
  user?: UserType | null;

  setUser: (user: UserType | null) => void;
  handleLogin: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  handleSignUp: (
    name: string,
    email: string,
    password: string,
    confrimPassword: string
  ) => Promise<void>;

  handleLogout: () => void;
};

export type UserType = {
  id?: string;
  name: string;
  email: string;
  password?: string;
};
