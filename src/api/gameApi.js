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
export const fetchGameInfoApi = (roomId) => {
  const path = `/game/${roomId}`;
  return avalonServer.get(path);
};
export const fetchGameHostApi = (roomId) => {
  const path = `/host/${roomId}`;
  return avalonServer.get(path);
};
export const fetchGameJoinCodeApi = (roomId, body) => {
  const path = `/join/${roomId}`;
  return avalonServer.post(path, body);
};
