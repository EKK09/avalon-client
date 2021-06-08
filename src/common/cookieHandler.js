import { Cookies } from 'quasar';

export const setPlayerName = (name) => {
  const options = {
    path: '/',
  };
  Cookies.set('playerName', encodeURIComponent(name), options);
};

export const getPlayerNameFromCookie = () => {
  const { playerName } = Cookies.getAll();
  return decodeURIComponent(playerName) || '';
};
