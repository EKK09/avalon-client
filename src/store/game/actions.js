import { createGameApi } from 'src/api/gameApi';
import { GAME_ACTION_TYPE } from 'src/constants/action';
import { GAME_ROLE, getRoleNameByRole } from 'src/constants/role';
import { GAME_STATUS } from 'src/constants/status';

export async function createGameAction({ commit }, player) {
  try {
    const body = {
      player_name: player,
    };
    const response = await createGameApi(body);
    console.log(response.data);
    const roomId = response.data.room_id;
    commit('setRoomId', roomId);
    commit('setUser', player);
  } catch (error) {
    console.log(error);
  }
}
export async function joinGameAction({ commit, state, getters }, { handleSuccess, handleError }) {
  try {
    const serverUrl = `${process.env.AVALON_WEBSOCKET_SERVER_URL}/${state.roomId}/${state.user}`;
    const socket = new WebSocket(serverUrl);

    // Connection opened
    socket.addEventListener('open', () => {
      handleSuccess();
      socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server ', event.data);
      let action;
      try {
        action = JSON.parse(event.data);
        if (!action.type) {
          throw new Error();
        }
      } catch (error) {
        action = null;
      }

      if (action === null) {
        console.log('action null');
        return;
      }

      const { type, payload } = action;
      if (type === GAME_ACTION_TYPE.DECLARE_PLAYER) {
        const players = payload.map((player) => ({ name: player, role: GAME_ROLE.UNKNOWN }));
        commit('setPlayerList', players);
      } else if (type === GAME_ACTION_TYPE.DECLARE_ROUND) {
        commit('setRound', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_ROLE) {
        commit('setRole', payload);
        commit('updateUserRole', payload);
        commit('resetMessage');
        commit('addMessage', `你的角色為 ${getRoleNameByRole(payload)}`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL) {
        commit('revealEvilRole', payload);
        commit('addMessage', `${payload.join(',')} 為邪惡陣營`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_MERLIN) {
        commit('revealMerlin', payload);
        commit('addMessage', `${payload.join(',')} 的身份為梅林？`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL_EACH) {
        commit('revealEvilRole', payload);
        commit('addMessage', `${payload.join(',')} 為同夥`);
      } else if (type === GAME_ACTION_TYPE.DECLARE_LEADER) {
        commit('resetSelectedTaskTeamList');
        commit('resetTaskTeamList');
        commit('setLeader', payload);
        if (payload === state.user) {
          commit('addMessage', `請選擇 ${state.teamSize} 位出任務玩家`);
          commit('setStatus', GAME_STATUS.SELECT_TASK_PLAYER);
        } else {
          commit('addMessage', `等待 ${payload} 指派玩家`);
        }
      } else if (type === GAME_ACTION_TYPE.DECLARE_TEAM_SIZE) {
        commit('setTeamSize', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TEAM) {
        commit('setTaskTeamList', payload);
        commit('resetMessage');
        commit('addMessage', `本回出任務玩家${payload.join(',')}`);
        commit('setStatus', GAME_STATUS.APPROVE);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_RESULT) {
        // TODO: 再說
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_LIST) {
        commit('updateTaskResultList', payload);
        commit('resetMessage');
        commit('resetTaskTeamList');
        commit('resetSelectedTaskTeamList');
        commit('addMessage', `任務${payload[payload.length - 1] ? '成功' : '失敗'}`);
      } else if (type === GAME_ACTION_TYPE.ASSIGN_TASK) {
        commit('setSelectedTaskTeamList', payload);
        if (payload.includes(state.user)) {
          commit('addMessage', '請出任務');
          commit('setStatus', GAME_STATUS.VOTE);
        } else {
          commit('addMessage', `${payload.join(',')} 出任務中`);
        }
      } else if (type === GAME_ACTION_TYPE.DECLARE_GOD_STATEMENT) {
        commit('setStatus', GAME_STATUS.WAIT);
        commit('addMessage', `${payload.god} 表示 ${payload.player} 是 ${payload.isGood ? '亞瑟的忠臣' : '莫德雷德的爪牙'}`);
      } else if (type === GAME_ACTION_TYPE.ASSIGN_GOD) {
        const isGod = state.user === payload;
        const status = isGod ? GAME_STATUS.SELECT_REVEAL_PLAYER : GAME_STATUS.WAIT;
        const message = isGod ? '湖中女神出現，請選擇你想檢視的玩家' : '湖中女神出現，等待湖中女神的指示';
        commit('resetSelectedTaskTeamList');
        commit('resetTaskTeamList');
        commit('setStatus', status);
        commit('addMessage', message);
      } else if (type === GAME_ACTION_TYPE.DECLARE_REVEALED_PLAYER_LIST) {
        commit('setRevealedPlayerList', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_APPROVAL_LIST) {
        commit('resetMessage');
        const unApprovePlayers = payload.filter((item) => !item.result).map((item) => item.player);
        const isApprove = unApprovePlayers.length < (state.playerList.length / 2);
        const resultText = isApprove ? '投票通過' : '投票不通過';
        const unApproveText = unApprovePlayers.length > 0 ? `${unApprovePlayers.join(',')} 表示反對` : '無人反對';
        const taskText = isApprove ? '任務玩家請投票' : '';
        const message = `${resultText},${unApproveText} ${taskText}`;
        const status = isApprove && getters.isTaskTeam ? GAME_STATUS.VOTE : GAME_STATUS.WAIT;
        commit('addMessage', message);
        commit('setStatus', status);
      } else if (type === GAME_ACTION_TYPE.REVEAL_PLAYER) {
        commit('resetMessage');
        const playerName = payload.player;
        const role = payload.isGood ? GAME_ROLE.GOOD : GAME_ROLE.EVIL;
        const message = `${playerName} 角色是 ${payload.isGood ? '忠臣' : '爪牙'} ，你想告訴大家？`;
        commit('updatePlayerRole', { name: playerName, role });
        commit('addMessage', message);
        commit('setStatus', GAME_STATUS.ASSIGN_GOD_STATEMENT);
      } else if (type === GAME_ACTION_TYPE.DECLARE_UNAPPROVAL_COUNT) {
        commit('setUnApproveCount', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_ASSASSIN) {
        commit('revealAssassin', payload);
        const isAssassin = payload === state.user;
        const status = isAssassin ? GAME_STATUS.SELECT_KILL_PLAYER : GAME_STATUS.WAIT;
        commit('setStatus', status);
        const commandText = isAssassin ? '請選擇要刺殺的玩家' : '';
        const message = `刺客登場( ${payload} ) ！！！ 梅林危險了 ${commandText}`;
        commit('addMessage', message);
      } else if (type === GAME_ACTION_TYPE.DECLARE_GAME_RESULT) {
        const { result, isMerlinKilled, role } = payload;
        const title = result ? '正義陣營獲勝' : '邪惡陣營獲勝';
        const killText = isMerlinKilled ? '梅林遭到刺殺!!!' : '';
        const message = title + killText;

        commit('setStatus', GAME_STATUS.END);
        commit('revealAllPlayer', role);
        commit('addMessage', message);
      }
    });
    socket.addEventListener('error', (event) => {
      console.log('error from server ', event.data);
    });
    socket.addEventListener('close', (event) => {
      console.log('close from server ', event.data);
    });
    commit('setWebSocket', socket);
  } catch (error) {
    console.log(error);
    handleError();
  }
}

export async function startGameAction({ state, commit }) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);

    const action = {
      type: GAME_ACTION_TYPE.START,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
  } catch (error) {
    console.log(error);
  }
}
export async function assignTaskTeamAction({ state, commit }) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);

    const action = {
      type: GAME_ACTION_TYPE.ASSIGN_TEAM,
      payload: state.selectedTaskTeamList,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
    commit('resetSelectedTaskTeamList');
  } catch (error) {
    console.log(error);
  }
}
export async function voteTaskAction({ state, commit }, isSuccess) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);
    const action = {
      type: GAME_ACTION_TYPE.VOTE,
      payload: isSuccess,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
  } catch (error) {
    console.log(error);
  }
}
export async function approveAction({ state, commit }, isApprove) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);
    const action = {
      type: GAME_ACTION_TYPE.APPROVE,
      payload: isApprove,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
  } catch (error) {
    console.log(error);
  }
}
export async function assignRevealPlayerAction({ state, commit }) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);
    const action = {
      type: GAME_ACTION_TYPE.ASSIGN_REVEAL_PLAYER,
      payload: state.revealPlayer,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
  } catch (error) {
    console.log(error);
  }
}
export async function assignGodStatementAction({ state, commit }, isGood) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);
    const statement = {
      god: state.user,
      isGood,
      player: state.revealPlayer,
    };
    const action = {
      type: GAME_ACTION_TYPE.ASSIGN_GOD_STATEMENT,
      payload: statement,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
    commit('setRevealPlayer', '');
  } catch (error) {
    console.log(error);
  }
}
export async function assignKillPlayerAction({ state, commit }) {
  try {
    commit('setStatus', GAME_STATUS.WAIT);
    const action = {
      type: GAME_ACTION_TYPE.ASSIGN_KILL_PLAYER,
      payload: state.killPlayer,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
  } catch (error) {
    console.log(error);
  }
}
