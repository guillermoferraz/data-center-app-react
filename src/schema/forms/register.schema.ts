import { RegisterTypes, LoginTypes } from "./register.types"

export const RegisterSchema: RegisterTypes = {
  firstname: "",
  lastname: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: ""
};

export const LoginSchema: LoginTypes = {
  email: "",
  password: ""
};
