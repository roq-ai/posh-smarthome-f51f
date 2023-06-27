import axios from 'axios';
import queryString from 'query-string';
import { PoshSmartHomeInterface, PoshSmartHomeGetQueryInterface } from 'interfaces/posh-smart-home';
import { GetQueryInterface } from '../../interfaces';

export const getPoshSmartHomes = async (query?: PoshSmartHomeGetQueryInterface) => {
  const response = await axios.get(`/api/posh-smart-homes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPoshSmartHome = async (poshSmartHome: PoshSmartHomeInterface) => {
  const response = await axios.post('/api/posh-smart-homes', poshSmartHome);
  return response.data;
};

export const updatePoshSmartHomeById = async (id: string, poshSmartHome: PoshSmartHomeInterface) => {
  const response = await axios.put(`/api/posh-smart-homes/${id}`, poshSmartHome);
  return response.data;
};

export const getPoshSmartHomeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/posh-smart-homes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePoshSmartHomeById = async (id: string) => {
  const response = await axios.delete(`/api/posh-smart-homes/${id}`);
  return response.data;
};
