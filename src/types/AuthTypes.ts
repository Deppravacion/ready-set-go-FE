export type AuthTypes = {
  // user?: UserType | null;
  // user: AuthenticatedUser;
  user?: AuthenticatedUser | null;

  setUser: (user: AuthenticatedUser | null) => void;
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
  name: string;
  email: string;
  password?: string;
};

export interface UserSignup extends UserType {
  confirmPassword: string;
}

export type UserInformation = Omit<UserType, "password"> & {
  id?: number | string;
};

export type AuthenticatedUser = {
  token: string;
  userInformation: UserInformation;
};
