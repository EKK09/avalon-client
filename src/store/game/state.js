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
    taskResultList: [undefined, undefined, undefined, undefined, undefined],
    messageList: ['等待玩家就位，遊戲人數 5 ~ 10'],
    status: GAME_STATUS.WAIT,
    selectedTaskTeamList: [],
    teamSize: 0,
    round: 0,
    webSocket: null,
  };
}
