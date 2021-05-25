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
      } else if (type === GAME_ACTION_TYPE.DECLARE_ROLE) {
        commit('setRole', payload);
        commit('updateUserRole', payload);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL) {
        commit('revealEvilRole', payload);
      } else if (type === GAME_ACTION_TYPE.REVEAL_MERLIN) {
        commit('revealMerlin', payload);
      } else if (type === GAME_ACTION_TYPE.REVEAL_EVIL_EACH) {
        commit('revealEvilRole', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_LEADER) {
        commit('setLeader', payload);
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_RESULT) {
        // TODO: 再說
      } else if (type === GAME_ACTION_TYPE.DECLARE_TASK_LIST) {
        commit('updateTaskResultList', payload);
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
