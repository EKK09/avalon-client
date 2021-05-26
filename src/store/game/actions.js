import { createGameApi } from 'src/api/gameApi';
import { GAME_ACTION_TYPE } from 'src/constants/action';
import { GAME_ROLE } from 'src/constants/role';

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
export async function joinGameAction({ commit, state }, { handleSuccess, handleError }) {
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
        commit('addMessage', `你的角色為 ${payload}`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL) {
        commit('revealEvilRole', payload);
        commit('addMessage', `${payload.join(',')} 為邪惡方`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_MERLIN) {
        commit('revealMerlin', payload);
        commit('addMessage', `${payload.join(',')} 的身份為梅林？`);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL_EACH) {
        commit('revealEvilRole', payload);
        commit('addMessage', `${payload.join(',')} 與您是同夥`);
      } else if (type === GAME_ACTION_TYPE.DECLARE_LEADER) {
        commit('setLeader', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_RESULT) {
        // TODO: 再說
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_LIST) {
        commit('updateTaskResultList', payload);
        commit('addMessage', `任務${payload[payload.length - 1] ? '成功' : '失敗'}`);
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

export async function startGameAction({ state }) {
  try {
    const action = {
      type: GAME_ACTION_TYPE.START,
    };
    const socket = state.webSocket;
    socket.send(JSON.stringify(action));
  } catch (error) {
    console.log(error);
  }
}
