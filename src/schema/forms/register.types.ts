export interface RegisterTypes {
  lastname: string;
  firstname: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

export type LoginTypes = Omit<RegisterTypes, 'lastname' | 'firstname' | 'confirmEmail' | 'confirmPassword'>