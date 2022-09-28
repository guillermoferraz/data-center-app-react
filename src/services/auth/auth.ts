import axios from 'axios';
import { FormValuesTypes, LoginType } from './auth.types';

const Auth = {
  register: async (formValues: FormValuesTypes) => {
    const response =  await axios.post('http://localhost:4201/register', formValues);
    return response?.data;
  },
  login: async (formValues: LoginType) => {
    const response = await axios.post('http://localhost:4201/login', { Email: formValues.email, Password: formValues.password})
    return response?.data;
  }
};
export default Auth;