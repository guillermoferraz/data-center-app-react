import axios from 'axios';
import { ModulesTypes, SubmoduleTypes } from './modules.types';

const Modules = {
  addModule: async (data: ModulesTypes) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response =  await axios.post('http://localhost:4201/addmodule', data,
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  getModules: async () => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.get('http://localhost:4201/modules',{
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  addSubmodule: async(data: SubmoduleTypes) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.post('http://localhost:4201/addsubmodule', data, 
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  }
};
export default Modules;