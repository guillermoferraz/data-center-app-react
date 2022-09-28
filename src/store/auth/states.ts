import { LoginInitialState, RegisterInitialState } from "./auth.types";

export const registerInitialState: RegisterInitialState = {
  message: undefined,
  status: undefined
};
export const loginInitialState: LoginInitialState = {
  message: undefined,
  status: undefined,
  user: {
    Id: undefined,
    Firstname: undefined,
    Lastname: undefined,
    Token: undefined
  }
}