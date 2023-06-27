import axios from 'axios';
import queryString from 'query-string';
import { ForumInterface, ForumGetQueryInterface } from 'interfaces/forum';
import { GetQueryInterface } from '../../interfaces';

export const getForums = async (query?: ForumGetQueryInterface) => {
  const response = await axios.get(`/api/forums${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createForum = async (forum: ForumInterface) => {
  const response = await axios.post('/api/forums', forum);
  return response.data;
};

export const updateForumById = async (id: string, forum: ForumInterface) => {
  const response = await axios.put(`/api/forums/${id}`, forum);
  return response.data;
};

export const getForumById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/forums/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteForumById = async (id: string) => {
  const response = await axios.delete(`/api/forums/${id}`);
  return response.data;
};
