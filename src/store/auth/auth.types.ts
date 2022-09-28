export interface RegisterInitialState {
  message?: string;
  status?: number;
}
export interface LoginInitialState {
  message?: string;
  status?: number;
  user?: {
    Token?: string;
    Id?: string;
    Lastname?: string;
    Firstname?: string;
    Email?: string;
  }
}