import { Cookies } from 'quasar';

export const setPlayerName = (name) => {
  const options = {
    path: '/',
  };
  Cookies.set('playerName', name, options);
};

export const getPlayerNameFromCookie = () => {
  const { playerName } = Cookies.getAll();
  return playerName || '';
};
