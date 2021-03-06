import { createGameApi, fetchGameInfoApi, fetchGameJoinCodeApi } from 'src/api/gameApi';
import { GAME_ACTION_TYPE } from 'src/constants/action';
import { GAME_JOIN_CODE } from 'src/constants/joinCode';
import { GAME_ROLE, getRoleNameByRole } from 'src/constants/role';
import { GAME_STATUS } from 'src/constants/status';

export async function createGameAction({ dispatch, commit }, {
  player, handleSuccess, handleError,
}) {
  try {
    commit('setIsConnectingGame', true);
    const body = {
      player_name: player,
    };
    const response = await createGameApi(body);
    console.log(response.data);
    const roomId = response.data.room_id;
    if (!roomId) {
      throw new Error();
    }
    dispatch('joinGameAction', {
      player, roomId, handleSuccess, handleError,
    });
  } catch (error) {
    console.log(error);
    commit('setIsConnectingGame', false);
    handleError();
  }
}
export async function joinGameAction({
  commit, state, getters, dispatch,
}, {
  player, roomId, handleSuccess, handleError,
}) {
  try {
    commit('setIsConnectingGame', true);
    const serverUrl = `${process.env.AVALON_WEBSOCKET_SERVER_URL}/${roomId}/${player}`;
    const socket = new WebSocket(serverUrl);

    // Connection opened
    socket.addEventListener('open', () => {
      window.clearInterval(window.socketTimer);
      commit('setWebSocket', socket);
      commit('setRoomId', roomId);
      commit('setUser', player);
      commit('setIsConnectingGame', false);
      handleSuccess(roomId);
      commit('resetReconnectCount');
      window.socketTimer = setInterval(() => {
        socket.send('check');
      }, 50 * 1000);
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
        const players = payload.map((name) => ({ name, role: GAME_ROLE.UNKNOWN }));
        commit('setPlayerList', players);
      } else if (type === GAME_ACTION_TYPE.DECLARE_ROUND) {
        commit('setRound', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_ROLE) {
        commit('setRole', payload);
        commit('updateUserRole', payload);
        commit('resetMessage');
        commit('addMessage', `??????????????? ${getRoleNameByRole(payload)}`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL) {
        commit('revealEvilRole', payload);
        commit('addMessage', `${payload.join(', ')} ???????????????`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_MERLIN) {
        commit('revealMerlin', payload);
        commit('addMessage', `${payload.join(', ')} ?????????????????????`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL_EACH) {
        commit('revealEvilRole', payload);
        const message = payload.length > 1 ? `${payload.join(', ')} ?????????` : '???????????????';
        commit('addMessage', message);
      } else if (type === GAME_ACTION_TYPE.DECLARE_LEADER) {
        commit('resetSelectedTaskTeamList');
        commit('resetTaskTeamList');
        commit('setLeader', payload);
        if (payload === state.user) {
          commit('addMessage', `????????? ${state.teamSize} ??????????????????`);
          commit('setStatus', GAME_STATUS.SELECT_TASK_PLAYER);
        } else {
          commit('addMessage', `?????? ${payload} ????????????`);
        }
      } else if (type === GAME_ACTION_TYPE.DECLARE_TEAM_SIZE) {
        commit('setTeamSize', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TEAM) {
        commit('setTaskTeamList', payload);
        commit('resetMessage');
        commit('addMessage', `?????????????????????${payload.join(', ')}`);
        commit('setStatus', GAME_STATUS.APPROVE);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_RESULT) {
        const failCountText = `${payload.failCount} ????????????`;
        const resultText = payload.result ? '????????????' : '????????????';
        const message = failCountText + resultText;
        commit('resetMessage');
        commit('resetTaskTeamList');
        commit('resetSelectedTaskTeamList');
        commit('addMessage', message);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_LIST) {
        commit('updateTaskResultList', payload);
      } else if (type === GAME_ACTION_TYPE.ASSIGN_TASK) {
        commit('setSelectedTaskTeamList', payload);
        if (payload.includes(state.user)) {
          commit('addMessage', '????????????');
          commit('setStatus', GAME_STATUS.VOTE);
        } else {
          commit('addMessage', `${payload.join(', ')} ????????????`);
        }
      } else if (type === GAME_ACTION_TYPE.DECLARE_GOD_STATEMENT) {
        commit('setStatus', GAME_STATUS.WAIT);
        commit('addMessage', `${payload.god} ?????? ${payload.player} ??? ${payload.isGood ? '???????????????' : '?????????????????????'}`);
      } else if (type === GAME_ACTION_TYPE.ASSIGN_GOD) {
        const isGod = state.user === payload;
        const status = isGod ? GAME_STATUS.SELECT_REVEAL_PLAYER : GAME_STATUS.WAIT;
        const message = isGod ? '???????????????????????????????????????????????????' : '????????????????????????????????????????????????';
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
        const resultText = isApprove ? '????????????' : '???????????????';
        const unApproveText = unApprovePlayers.length > 0 ? `${unApprovePlayers.join(', ')} ????????????` : '????????????';
        const taskText = isApprove ? '?????????????????????' : '';
        const message = `${resultText},${unApproveText} ${taskText}`;
        const status = isApprove && getters.isTaskTeam ? GAME_STATUS.VOTE : GAME_STATUS.WAIT;
        commit('addMessage', message);
        commit('setStatus', status);
      } else if (type === GAME_ACTION_TYPE.REVEAL_PLAYER) {
        commit('resetMessage');
        const playerName = payload.player;
        const role = payload.isGood ? GAME_ROLE.GOOD : GAME_ROLE.EVIL;
        const message = `${playerName} ????????? ${payload.isGood ? '??????' : '??????'} ????????????????????????`;
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
        const commandText = isAssassin ? '???????????????????????????' : '';
        const message = `????????????( ${payload} ) ????????? ??????????????? ${commandText}`;
        commit('addMessage', message);
      } else if (type === GAME_ACTION_TYPE.DECLARE_GAME_RESULT) {
        const { result, isMerlinKilled, role } = payload;
        const title = result ? '??????????????????' : '??????????????????';
        const killText = isMerlinKilled ? '??????????????????!!!' : '';
        const message = title + killText;

        commit('setStatus', GAME_STATUS.END);
        commit('revealAllPlayer', role);
        commit('addMessage', message);
        commit('setGameOver');
        state.webSocket.close();
      } else if (type === GAME_ACTION_TYPE.DECLARE_OFFLINE) {
        commit('addOfflinePlayer', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_PLAYER_RETURN) {
        commit('removeOfflinePlayer', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_GAME_INFO) {
        const {
          role,
          leader,
          teamSize,
          playerList,
          merlins,
          evils,
          taskList,
          unApproveCount,
          teamMemberList,
          revealedPlayerList,
          status,
          isRevealedPlayerGood,
        } = payload;

        commit('setRole', role);
        commit('setLeader', leader);
        commit('setTeamSize', teamSize);
        commit('setPlayerList', playerList.map((name) => ({ name, role: name === state.user ? role : GAME_ROLE.UNKNOWN })));
        commit('revealMerlin', merlins);
        commit('revealEvilRole', evils);
        commit('updateTaskResultList', taskList);
        commit('setTaskTeamList', teamMemberList);
        commit('setUnApproveCount', unApproveCount);
        commit('setRevealedPlayerList', revealedPlayerList);
        commit('setStatus', status);
        commit('resetMessage');
        commit('addMessage', '??????????????????');

        if (status === GAME_STATUS.VOTE) {
          commit('addMessage', '?????????????????????');
        } else if (status === GAME_STATUS.APPROVE) {
          commit('addMessage', `?????????????????????${teamMemberList.join(', ')}`);
        } else if (status === GAME_STATUS.SELECT_TASK_PLAYER) {
          commit('addMessage', `????????? ${teamSize} ??????????????????`);
        } else if (status === GAME_STATUS.SELECT_REVEAL_PLAYER) {
          commit('addMessage', '???????????????????????????????????????????????????');
        } else if (status === GAME_STATUS.SELECT_KILL_PLAYER) {
          commit('addMessage', '???????????????????????????');
        } else if (status === GAME_STATUS.ASSIGN_GOD_STATEMENT) {
          commit('addMessage', `${revealedPlayerList[revealedPlayerList.length - 1]} ????????? ${isRevealedPlayerGood ? '??????' : '??????'} ????????????????????????`);
        } else if (status === GAME_STATUS.WAIT) {
          commit('addMessage', '????????????????????????');
        }
      } else if (type === GAME_ACTION_TYPE.DECLARE_KILL_RESULT) {
        const isKillSuccess = payload;
        const message = isKillSuccess ? '????????????' : '????????????';
        commit('addMessage', message);
      }
    });
    socket.addEventListener('error', () => {
      console.log('socket error');
      commit('setIsConnectingGame', false);
      commit('setWebSocket', null);
      window.clearInterval(window.socketTimer);
    });
    socket.addEventListener('close', () => {
      console.log('socket close');
      window.clearInterval(window.socketTimer);
      commit('setIsConnectingGame', false);
      commit('setWebSocket', null);
      commit('incrementReconnectCount');
      if (state.reconnectCount <= 3 && state.roomId && state.user && state.isGameOver === false) {
        dispatch('joinGameAction', {
          player: state.user,
          roomId: state.roomId,
          handleSuccess: () => { },
          handleError: () => { },
        });
      }
      // ?????????????????????????????? handleError
      if (!state.user || !state.roomId) {
        handleError();
      }
    });
  } catch (error) {
    console.log(error);
    handleError();
    commit('setIsConnectingGame', false);
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
export async function fetchGameInfoAction({ commit, getters }, roomId) {
  try {
    const response = await fetchGameInfoApi(roomId);

    const {
      player_info: playerInfo,
      tasks,
      killed,
      un_approve_count: unApproveCount,
    } = response.data;
    const players = Object.keys(playerInfo).map((name) => ({
      name,
      role: playerInfo[name],
    }));
    commit('setPlayerList', players);
    commit('setUnApproveCount', unApproveCount);
    commit('updateTaskResultList', tasks);
    if (killed) {
      commit('setMerlinKilled');
    }
    commit('setGameOver');
    commit('resetMessage');

    const message = getters.isGoodWin ? '???????????????????????????????????????' : '???????????????????????????????????????';
    const killedText = killed ? ' ??????????????????' : '';
    commit('addMessage', message + killedText);
  } catch (error) {
    console.log('fetchGameInfoAction error');
  }
}
export async function handleJoinGameAction({ commit, dispatch }, {
  roomId, player, handleSuccess, handleError,
}) {
  try {
    commit('setIsConnectingGame', true);
    const body = {
      player_name: player,
    };
    const response = await fetchGameJoinCodeApi(roomId, body);

    const code = response.data.join_code;

    if (code === GAME_JOIN_CODE.GAME_NOT_EXIST) {
      throw new Error('??????????????????');
    } else if (code === GAME_JOIN_CODE.PLAYER_EXIST) {
      throw new Error(`${player}?????????????????????????????????????????????`);
    } else if (code === GAME_JOIN_CODE.NO_SPACE) {
      throw new Error('???????????????????????????');
    } else if (code === GAME_JOIN_CODE.GAME_HAS_START) {
      throw new Error('??????????????????');
    } else if (code === GAME_JOIN_CODE.OK) {
      dispatch('joinGameAction', {
        player, roomId, handleSuccess, handleError,
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    handleError(error.message);
    commit('setIsConnectingGame', false);
  }
}
