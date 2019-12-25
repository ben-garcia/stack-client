export interface RegisterPageProps {}

export interface User {
  email: string;
  username: string;
  password: string;
}

export interface UserErrors {
  email: string[];
  username: string[];
  password: string[];
}
