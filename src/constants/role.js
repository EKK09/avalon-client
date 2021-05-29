export const GAME_ROLE = {
  UNKNOWN: 'UNKNOWN',
  SERVANT: 'SERVANT',
  MINION: 'MINION',
  MERLIN: 'MERLIN',
  PERCIVAL: 'PERCIVAL',
  ASSASSIN: 'ASSASSIN',
  MORGANA: 'MORGANA',
  OBERON: 'OBERON',
  MORDRED: 'MORDRED',
  GOOD: 'GOOD',
  EVIL: 'EVIL',
};
export const GAME_ROLE_NAME = {
  UNKNOWN: '未知',
  SERVANT: '忠臣',
  MINION: '爪牙',
  MERLIN: '梅林',
  PERCIVAL: '派西維爾',
  ASSASSIN: '刺客',
  MORGANA: '魔甘娜',
  OBERON: '奧柏倫',
  MORDRED: '莫德雷德',
  GOOD: '正義陣營',
  EVIL: '邪惡陣營',
};
export const GAME_ROLE_IMAGE = {
  UNKNOWN: 'unknown.jpg',
  SERVANT: 'servant.jpg',
  MINION: 'minion.jpg',
  MERLIN: 'merlin.jpg',
  PERCIVAL: 'percival.jpg',
  ASSASSIN: 'assassin.jpg',
  MORGANA: 'morcana.jpg',
  OBERON: 'oberon.jpg',
  MORDRED: 'mordred.jpg',
  GOOD: 'good.jpg',
  EVIL: 'evil.jpg',
};

export const getRoleImageByRole = (role) => {
  if (role === GAME_ROLE.UNKNOWN) {
    return GAME_ROLE_IMAGE.UNKNOWN;
  }
  if (role === GAME_ROLE.SERVANT) {
    return GAME_ROLE_IMAGE.SERVANT;
  }
  if (role === GAME_ROLE.MINION) {
    return GAME_ROLE_IMAGE.MINION;
  }
  if (role === GAME_ROLE.MERLIN) {
    return GAME_ROLE_IMAGE.MERLIN;
  }
  if (role === GAME_ROLE.PERCIVAL) {
    return GAME_ROLE_IMAGE.PERCIVAL;
  }
  if (role === GAME_ROLE.ASSASSIN) {
    return GAME_ROLE_IMAGE.ASSASSIN;
  }
  if (role === GAME_ROLE.MORGANA) {
    return GAME_ROLE_IMAGE.MORGANA;
  }
  if (role === GAME_ROLE.OBERON) {
    return GAME_ROLE_IMAGE.OBERON;
  }
  if (role === GAME_ROLE.MORDRED) {
    return GAME_ROLE_IMAGE.MORDRED;
  }
  if (role === GAME_ROLE.EVIL) {
    return GAME_ROLE_IMAGE.EVIL;
  }
  if (role === GAME_ROLE.GOOD) {
    return GAME_ROLE_IMAGE.GOOD;
  }
  return GAME_ROLE_IMAGE.UNKNOWN;
};

export const getRoleNameByRole = (role) => {
  if (role === GAME_ROLE.SERVANT) {
    return GAME_ROLE_NAME.SERVANT;
  }
  if (role === GAME_ROLE.MINION) {
    return GAME_ROLE_NAME.MINION;
  }
  if (role === GAME_ROLE.MERLIN) {
    return GAME_ROLE_NAME.MERLIN;
  }
  if (role === GAME_ROLE.PERCIVAL) {
    return GAME_ROLE_NAME.PERCIVAL;
  }
  if (role === GAME_ROLE.ASSASSIN) {
    return GAME_ROLE_NAME.ASSASSIN;
  }
  if (role === GAME_ROLE.MORGANA) {
    return GAME_ROLE_NAME.MORGANA;
  }
  if (role === GAME_ROLE.OBERON) {
    return GAME_ROLE_NAME.OBERON;
  }
  if (role === GAME_ROLE.MORDRED) {
    return GAME_ROLE_NAME.MORDRED;
  }
  if (role === GAME_ROLE.EVIL) {
    return GAME_ROLE_NAME.EVIL;
  }
  if (role === GAME_ROLE.GOOD) {
    return GAME_ROLE_NAME.GOOD;
  }
  return GAME_ROLE_NAME.UNKNOWN;
};
