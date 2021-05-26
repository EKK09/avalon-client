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
    @click="handleSelectTaskTeam"
  >
    <q-avatar size="65px">
      <img src="task.jpg">
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
      @click="handleTaskSuccess"
    />
    <q-separator
      vertical
      class="q-mx-sm"
    />
    <q-btn
      rounded
      color="negative"
      glossy
      label="任務失敗"
      @click="handleTaskFail"
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
      label="贊成"
      @click="handleApprove"
    />
    <q-separator
      vertical
      class="q-mx-sm"
    />
    <q-btn
      rounded
      color="negative"
      glossy
      label="反對"
      @click="handleReject"
    />
  </div>
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
    ...mapState('game', ['status']),
    ...mapGetters('game', ['isHost', 'isStarted']),

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
  },
  methods: {
    ...mapActions('game', ['startGameAction']),
    handleStart() {
      this.startGameAction();
    },
    handleSelectTaskTeam() {
      this.startGameAction();
    },
    handleTaskSuccess() {
      // TODO: 實作
    },
    handleTaskFail() {
      // TODO: 實作
    },
    handleApprove() {
      // TODO: 實作
    },
    handleReject() {
      // TODO: 實作
    },
  },
};
</script>
