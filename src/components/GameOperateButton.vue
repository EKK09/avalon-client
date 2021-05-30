<template>
  <q-btn
    v-if="isShowStartButton"
    rounded
    color="positive"
    glossy
    label="遊戲開始"
    @click="handleStart"
  />
  <q-btn
    v-else-if="isShowSelectTaskTeamButton"
    padding="0"
    round
    @click="assignTaskTeam"
  >
    <q-avatar size="65px">
      <img src="task.jpg">
    </q-avatar>
  </q-btn>
  <q-btn
    v-else-if="isShowAssignRevealPlayerButton"
    padding="0"
    round
    @click="assignRevealPlayer"
  >
    <q-avatar size="65px">
      <img src="god.jpg">
    </q-avatar>
  </q-btn>
  <div
    v-else-if="isShowVoteButton"
    class="row no-wrap"
  >
    <q-btn
      rounded
      color="positive"
      glossy
      label="成功"
      class="q-mr-md"
      @click="handleVote(true)"
    />
    <q-btn
      rounded
      color="negative"
      glossy
      label="失敗"
      @click="handleVote(false)"
    />
  </div>
  <div
    v-else-if="isShowApproveButton"
    class="row no-wrap"
  >
    <q-btn
      rounded
      color="positive"
      glossy
      class="q-mr-md"
      label="贊成"
      @click="handleApprove(true)"
    />
    <q-btn
      rounded
      color="negative"
      glossy
      label="反對"
      @click="handleApprove(false)"
    />
  </div>
  <div
    v-else-if="isShowGodStatementButton"
    class="row no-wrap"
  >
    <q-btn
      rounded
      color="positive"
      glossy
      class="q-mr-md"
      label="他是忠臣"
      @click="assignGodState(true)"
    />
    <q-btn
      rounded
      color="negative"
      glossy
      label="他是爪牙"
      @click="assignGodState(false)"
    />
  </div>
  <q-btn
    v-else-if="isShowAssignKillPlayerButton"
    padding="0"
    round
    @click="assignKillPlayer"
  >
    <q-avatar size="65px">
      <img src="kill.jpg">
    </q-avatar>
  </q-btn>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapActions,
} from 'vuex';
import { GAME_STATUS } from 'src/constants/status';

export default {
  name: 'GameOperateButton',
  computed: {
    ...mapState('game', [
      'status',
      'teamSize',
      'revealPlayer',
      'selectedTaskTeamList',
      'killPlayer',
    ]),
    ...mapGetters('game', [
      'isHost',
      'isStarted',
      'isValidGamePlayerCount',
    ]),

    isShowStartButton() {
      return this.status === GAME_STATUS.WAIT && this.isHost && !this.isStarted;
    },
    isShowSelectTaskTeamButton() {
      return this.status === GAME_STATUS.SELECT_TASK_PLAYER;
    },
    isShowVoteButton() {
      return this.status === GAME_STATUS.VOTE;
    },
    isShowApproveButton() {
      return this.status === GAME_STATUS.APPROVE;
    },
    isShowGodStatementButton() {
      return this.status === GAME_STATUS.ASSIGN_GOD_STATEMENT;
    },
    isShowAssignRevealPlayerButton() {
      return this.status === GAME_STATUS.SELECT_REVEAL_PLAYER;
    },
    isShowAssignKillPlayerButton() {
      return this.status === GAME_STATUS.SELECT_KILL_PLAYER;
    },
  },
  methods: {
    ...mapActions('game', [
      'startGameAction',
      'assignTaskTeamAction',
      'voteTaskAction',
      'approveAction',
      'assignGodStatementAction',
      'assignRevealPlayerAction',
      'assignKillPlayerAction',
    ]),
    handleStart() {
      if (this.isValidGamePlayerCount === false) {
        this.$q.notify({
          message: '玩家人數不符',
        });
        return;
      }
      this.startGameAction();
    },
    assignTaskTeam() {
      if (this.selectedTaskTeamList.length !== this.teamSize) {
        this.$q.notify({
          message: `請選擇 ${this.teamSize} 位出任務玩家`,
        });
        return;
      }
      this.assignTaskTeamAction();
    },
    assignRevealPlayer() {
      if (this.revealPlayer === '') {
        this.$q.notify({
          message: '請選擇檢視玩家',
        });
        return;
      }
      this.assignRevealPlayerAction();
    },
    handleVote(isSuccess) {
      this.voteTaskAction(isSuccess);
    },
    handleApprove(isApprove) {
      this.approveAction(isApprove);
    },
    assignGodState(isGood) {
      this.assignGodStatementAction(isGood);
    },

    assignKillPlayer() {
      if (this.killPlayer === '') {
        this.$q.notify({
          message: '請選擇刺殺玩家',
        });
        return;
      }
      this.assignKillPlayerAction();
    },
  },
};
</script>
