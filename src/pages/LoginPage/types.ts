export interface LoginPageProps {}

export interface User {
  email: string;
  password: string;
}

export interface UserErrors {
  email: string[];
  password: string[];
  response: string[];
}
