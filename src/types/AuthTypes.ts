export type AuthTypes = {
  // user?: UserType | null;
  user?: AuthResponse | null;

  setUser: (user: AuthResponse | null) => void;
  // setUser: (user: UserType | null) => void;
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
  name?: string;
  email: string;
  password?: string;
};

export type UserInformation = {
  email: string;
  name?: string;
};

export type AuthResponse = {
  token: string;
  userInformation: UserInformation;
};
