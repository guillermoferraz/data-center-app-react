import axios from 'axios';

const User = {
  getUser: async () => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response =  await axios.get('http://localhost:4201/user',
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  }
};
export default User;