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
