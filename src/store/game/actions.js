import { createGameApi } from 'src/api/gameApi';

export async function createGameAction({ commit, dispatch }, player) {
  try {
    const body = {
      player_name: player,
    };
    const response = await createGameApi(body);
    console.log(response.data);
    const roomId = response.data.room_id;
    commit('setRoomId', roomId);
    commit('setUser', player);
    await dispatch('joinGameAction');
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
