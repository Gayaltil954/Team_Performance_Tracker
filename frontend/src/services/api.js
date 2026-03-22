import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const registerUser = async (payload) => {
  const { data } = await api.post('/auth/register', payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post('/auth/login', payload);
  return data;
};

export const getMembers = async () => {
  const { data } = await api.get('/members');
  return data;
};

export const createMember = async (member) => {
  const { data } = await api.post('/members', member);
  return data;
};

export const updateMemberScore = async (id, delta) => {
  const { data } = await api.put(`/members/${id}`, { delta });
  return data;
};

export const deleteMember = async (id) => {
  const { data } = await api.delete(`/members/${id}`);
  return data;
};
