import { getRoleImageByRole } from 'src/constants/role.js';

export function isLeader(state) {
  return (playerName) => state.leader === playerName;
}
export function isTaskTeam(state) {
  return state.taskTeamList.includes(state.user);
}
export function isValidGamePlayerCount(state) {
  const count = state.playerList.length;
  return count >= 5 && count <= 10;
}
export function isSelectedTaskTeamPlayer(state) {
  return (playerName) => state.selectedTaskTeamList.includes(playerName);
}
export function isTaskTeamPlayer(state) {
  return (playerName) => state.taskTeamList.includes(playerName);
}
export function userRoleImage(state) {
  return getRoleImageByRole(state.role);
}

export function hasBasicGameInfo(state) {
  if (state.roomId !== '' && state.user !== '') {
    return true;
  }
  return false;
}
export function isHost(state) {
  const hostPlayer = state.playerList[0];
  if (hostPlayer === undefined) {
    return false;
  }

  return hostPlayer.name === state.user;
}
export function isStarted(state) {
  return state.round > 0;
}
export function isShowGameDialog(state) {
  return state.offlinePlayerList.length > 0;
}
export function isShowLoginDialog(state) {
  if (state.isGameOver) {
    return false;
  }

  return state.roomId === '' || state.user === '';
}
export function isShowConnectingDialog(state) {
  if (!state.roomId || !state.user) {
    return false;
  }

  return state.webSocket === null;
}
export function playerOrder(state) {
  return (name) => {
    for (let index = 0; index < state.playerList.length; index += 1) {
      const player = state.playerList[index];
      if (player.name === name) {
        return index + 1;
      }
    }
    return 0;
  };
}
export function isGoodWin(state) {
  if (state.unApproveCount === 5 || state.isMerlinKilled) {
    return false;
  }

  return state.taskResultList.filter((task) => !!task).length >= 3;
}
