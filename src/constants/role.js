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
  GOD: '湖中女神',
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
  GOD: 'god.jpg',
  GOOD: 'good.jpg',
  EVIL: 'evil.jpg',
};
export const GAME_ROLE_DESCRIPTION = {
  SERVANT: '(正義方)沒有能力的正義方角色，共有5張牌。',
  MINION: '(邪惡方)沒有能力的邪惡方角色，共有3張牌。',
  MERLIN: '(正義方)擁有知道所有邪惡方陣營玩家的能力，但不知道【莫德雷德】是誰。如果最後被【刺客】刺殺，邪惡方就會獲勝。',
  PERCIVAL: '(正義方)在遊戲開始時的辨識身份階段，可以知道誰是【梅林】。',
  ASSASSIN: '(邪惡方)當遊戲結束，邪惡方失敗時，可以刺殺【梅林】來反敗為勝。',
  MORGANA: '(邪惡方)在遊戲開始時的辨識身份階段，可以假扮成【梅林】，混淆【派西維爾】。',
  OBERON: '(邪惡方)屬於邪惡方角色，但是邪惡方陣營的玩家不曉得他的身份，他也不知道其他邪惡方的角色是誰。',
  MORDRED: '(邪惡方)可以不被【梅林】看到。',
  GOD: '遊戲開始時，將湖中女神給領袖右邊的玩家。第2、3、4回合，出完任務後才可以使用湖中女神能力。持有湖中女神指示物的玩家選擇要檢視的對象，但是不可以選擇之前被湖中女神能力看過的玩家。',
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
