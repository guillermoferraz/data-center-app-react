export interface FormValuesTypes {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type LoginType = Omit<FormValuesTypes, 'firstname' | 'lastname'>