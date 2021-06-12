import { GAME_ROLE } from 'src/constants/role';

export function setRoomId(state, value) {
  state.roomId = value;
}
export function setUser(state, value) {
  state.user = value;
}
export function setGameOver(state) {
  state.isGameOver = true;
}
export function setMerlinKilled(state) {
  state.isMerlinKilled = true;
}
export function resetBasicGameInfo(state) {
  state.roomId = '';
  state.user = '';
}
export function setRole(state, value) {
  state.role = value;
}
export function setLeader(state, value) {
  state.leader = value;
}
export function resetMessage(state) {
  state.messageList = [];
}
export function addMessage(state, message) {
  const removeUserMessage = message.replace(state.user, '您');
  state.messageList.push(removeUserMessage);
}
export function shiftMessage(state) {
  state.messageList.shift();
}
export function setStatus(state, value) {
  state.status = value;
}
export function setPlayerList(state, value) {
  state.playerList = value;
}
export function addPlayer(state, playerName) {
  state.playerList.push({
    name: playerName,
    role: GAME_ROLE.UNKNOWN,
  });
}
export function setOfflinePlayerList(state, players) {
  state.offlinePlayerList = players;
}
export function addOfflinePlayer(state, playerName) {
  state.offlinePlayerList.push(playerName);
}
export function removeOfflinePlayer(state, playerName) {
  for (let index = 0; index < state.offlinePlayerList.length; index += 1) {
    if (playerName === state.offlinePlayerList[index]) {
      state.offlinePlayerList.splice(index, 1);
      return;
    }
  }
}
export function updatePlayerRole(state, { name, role }) {
  const players = state.playerList;
  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    if (player.name === name) {
      state.playerList.splice(index, 1, {
        name,
        role,
      });
      return;
    }
  }
}
export function revealAllPlayer(state, role) {
  const players = state.playerList;
  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    state.playerList.splice(index, 1, {
      name: player.name,
      role: role[player.name],
    });
  }
}
export function revealAssassin(state, name) {
  const players = state.playerList;
  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    if (player.name === name) {
      state.playerList.splice(index, 1, {
        name,
        role: GAME_ROLE.ASSASSIN,
      });
      return;
    }
  }
}
export function revealEvilRole(state, evils) {
  const players = state.playerList;
  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    if (evils.includes(player.name) && player.role === GAME_ROLE.UNKNOWN) {
      state.playerList.splice(index, 1, {
        ...player,
        role: GAME_ROLE.EVIL,
      });
    }
  }
}
export function revealMerlin(state, merlins) {
  const players = state.playerList;
  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    if (merlins.includes(player.name)) {
      state.playerList.splice(index, 1, {
        ...player,
        role: GAME_ROLE.MERLIN,
      });
    }
  }
}
export function updateUserRole(state, role) {
  const players = state.playerList;
  for (let index = 0; index < players.length; index += 1) {
    const player = players[index];
    if (player.name === state.user) {
      state.playerList.splice(index, 1, {
        name: state.user,
        role,
      });
      return;
    }
  }
}
export function setTaskTeamList(state, value) {
  state.taskTeamList = value;
}
export function resetTaskTeamList(state) {
  state.taskTeamList = [];
}
export function updateTaskResultList(state, results) {
  const taskResults = [...state.taskResultList];

  results.forEach((result, index) => {
    taskResults[index] = result;
  });

  state.taskResultList = taskResults;
}
export function setTeamSize(state, teamSize) {
  state.teamSize = teamSize;
}
export function setRound(state, round) {
  state.round = round;
}

export function setSelectedTaskTeamList(state, players) {
  state.selectedTaskTeamList = players;
}
export function resetSelectedTaskTeamList(state) {
  state.selectedTaskTeamList = [];
}
export function addSelectedTaskTeamPlayer(state, playerName) {
  const players = state.selectedTaskTeamList.slice(0, state.teamSize - 1);
  players.unshift(playerName);
  state.selectedTaskTeamList = players;
}
export function removeSelectedTaskTeamPlayer(state, playerName) {
  const players = state.selectedTaskTeamList;
  for (let index = 0; index < players.length; index += 1) {
    if (players[index] === playerName) {
      state.selectedTaskTeamList.splice(index, 1);
      return;
    }
  }
}
export function setWebSocket(state, socket) {
  state.webSocket = socket;
}
export function setRevealPlayer(state, player) {
  state.revealPlayer = player;
}
export function setKillPlayer(state, player) {
  state.killPlayer = player;
}
export function setRevealedPlayerList(state, players) {
  state.revealedPlayerList = players;
}
export function setUnApproveCount(state, count) {
  state.unApproveCount = count;
}
export function resetUnApproveCount(state) {
  state.unApproveCount = 0;
}
