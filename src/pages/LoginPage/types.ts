export interface LoginPageProps {
  setRegisterModalIsOpen: (value: React.SetStateAction<boolean>) => void;
  setLoginModalIsOpen: (value: React.SetStateAction<boolean>) => void;
}

export interface User {
  email: string;
  password: string;
}

export interface UserErrors {
  email: string[];
  password: string[];
  response: string[];
}
