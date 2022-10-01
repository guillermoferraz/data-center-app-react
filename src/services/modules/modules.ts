import axios from 'axios';
import { ModulesTypes, SubmoduleTypes } from './modules.types';
import { env } from '../environments';

const Modules = {
  addModule: async (data: ModulesTypes) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response =  await axios.post(`${env.host}/addmodule`, data,
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  patchModule: async (data: ModulesTypes) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response =  await axios.patch(`${env.host}/module/edit`, data,
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  getModules: async () => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.get(`${env.host}/modules`,{
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  addSubmodule: async(data: SubmoduleTypes) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.post(`${env.host}/addsubmodule`, data, 
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  patchSubmodule: async(data: SubmoduleTypes) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.patch(`${env.host}/submodule/edit`, data, 
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  getSubmodulesByModule: async(id:string) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.get(`${env.host}/submodulesbymodule/?${id}`, 
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  deleteSubmodule: async(id: string) =>{
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.delete(`${env.host}/submodule/?${id}`, 
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  },
  deleteModule: async (id: string) => {
    const token = typeof window !== 'undefined' ? sessionStorage.getItem('dc_tkn') : ""
    const response = await axios.delete(`${env.host}/module/?${id}`, 
    {
      headers:{
        'Authorization': `${token}`
      }
    });
    return response?.data;
  }
};
export default Modules;