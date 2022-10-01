import axios from 'axios';
import { env } from '../environments';

const User = {
  getUser: async () => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response =  await axios.get(`${env.host}/user`,
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  }
};
export default User;