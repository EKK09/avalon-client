import { GAME_ROLE } from 'src/constants/role.js';
import { GAME_STATUS } from 'src/constants/status';

// player {
//  name: string;
//  role: string;
// }

export default function state() {
  return {
    roomId: '',
    user: '',
    role: GAME_ROLE.UNKNOWN,
    leader: '',
    playerList: [],
    taskTeamList: [],
    taskResultList: [],
    messageList: ['等待玩家就位，遊戲人數 5 ~ 10'],
    status: GAME_STATUS.WAIT_START,
    selectedTaskTeamList: [],
    teamSize: 0,
    round: 0,
    webSocket: null,
    revealPlayer: '',
    killPlayer: '',
    revealedPlayerList: [],
    unApproveCount: 0,
    offlinePlayerList: [],
    isGameOver: false,
    isMerlinKilled: false,
    isConnectingGame: false,
    isShowInviteDialog: false,
    reconnectCount: 0,
  };
}
