import { GAME_ROLE } from 'src/constants/role.js';
// player {
//  name: string;
//  role: string;
// }

// const fooPlayers = [
//   {
//     name: 'david',
//     role: GAME_ROLE.MERLIN,
//   },
//   {
//     name: 'Terry',
//     role: GAME_ROLE.UNKNOWN,
//   },
//   {
//     name: '啞色的忠誠',
//     role: GAME_ROLE.GOOD,
//   },
//   {
//     name: '我是好人',
//     role: GAME_ROLE.MINION,
//   },
//   {
//     name: 'Jerry',
//     role: GAME_ROLE.PERCIVAL,
//   },
//   {
//     name: '海豹',
//     role: GAME_ROLE.EVIL,
//   },
//   {
//     name: '張莉莉張',
//     role: GAME_ROLE.SERVANT,
//   },
//   {
//     name: '8228',
//     role: GAME_ROLE.MORDRED,
//   },
//   {
//     name: '我是爪牙',
//     role: GAME_ROLE.OBERON,
//   },
//   {
//     name: '魔甘吶',
//     role: GAME_ROLE.UNKNOWN,
//   },
// ];

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
    status: '',
    selectedTaskTeamList: [],
    teamSize: 0,
    round: 0,
    webSocket: null,
  };
}
