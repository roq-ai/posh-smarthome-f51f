import axios from 'axios';
import queryString from 'query-string';
import { EnergySolutionInterface, EnergySolutionGetQueryInterface } from 'interfaces/energy-solution';
import { GetQueryInterface } from '../../interfaces';

export const getEnergySolutions = async (query?: EnergySolutionGetQueryInterface) => {
  const response = await axios.get(`/api/energy-solutions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEnergySolution = async (energySolution: EnergySolutionInterface) => {
  const response = await axios.post('/api/energy-solutions', energySolution);
  return response.data;
};

export const updateEnergySolutionById = async (id: string, energySolution: EnergySolutionInterface) => {
  const response = await axios.put(`/api/energy-solutions/${id}`, energySolution);
  return response.data;
};

export const getEnergySolutionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/energy-solutions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEnergySolutionById = async (id: string) => {
  const response = await axios.delete(`/api/energy-solutions/${id}`);
  return response.data;
};
