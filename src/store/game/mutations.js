import { GAME_ROLE } from 'src/constants/role';

export function setRoomId(state, value) {
  state.roomId = value;
}
export function setUser(state, value) {
  state.user = value;
}
export function setRole(state, value) {
  state.role = value;
}
export function setLeader(state, value) {
  state.leader = value;
}
export function addMessage(state, message) {
  state.messageList.push(message);
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

export function resetSelectedTaskTeamPlayer(state) {
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
