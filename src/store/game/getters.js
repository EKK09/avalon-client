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
