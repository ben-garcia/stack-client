export interface RegisterPageProps {
  setRegisterModalIsOpen: (value: React.SetStateAction<boolean>) => void;
  setLoginModalIsOpen: (value: React.SetStateAction<boolean>) => void;
}

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
