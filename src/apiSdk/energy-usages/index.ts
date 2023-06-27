import axios from 'axios';
import queryString from 'query-string';
import { EnergyUsageInterface, EnergyUsageGetQueryInterface } from 'interfaces/energy-usage';
import { GetQueryInterface } from '../../interfaces';

export const getEnergyUsages = async (query?: EnergyUsageGetQueryInterface) => {
  const response = await axios.get(`/api/energy-usages${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEnergyUsage = async (energyUsage: EnergyUsageInterface) => {
  const response = await axios.post('/api/energy-usages', energyUsage);
  return response.data;
};

export const updateEnergyUsageById = async (id: string, energyUsage: EnergyUsageInterface) => {
  const response = await axios.put(`/api/energy-usages/${id}`, energyUsage);
  return response.data;
};

export const getEnergyUsageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/energy-usages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEnergyUsageById = async (id: string) => {
  const response = await axios.delete(`/api/energy-usages/${id}`);
  return response.data;
};
