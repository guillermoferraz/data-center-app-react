import axios from 'axios';
import { FormValuesTypes, LoginType } from './auth.types';
import { env } from '../environments';
const Auth = {
  register: async (formValues: FormValuesTypes) => {
    const response =  await axios.post(`${env.host}/register`, formValues);
    return response?.data;
  },
  login: async (formValues: LoginType) => {
    const response = await axios.post(`${env.host}/login`, { Email: formValues.email, Password: formValues.password})
    return response?.data;
  }
};
export default Auth;