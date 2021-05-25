import axios from 'axios';

export const avalonServer = axios.create({
  baseURL: process.env.AVALON_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createGameApi = (body) => {
  const path = '/room';
  return avalonServer.post(path, body);
};
