<template>
  <div
    class="bg-black column items-center q-pt-sm q-px-sm relative-position"
    :class="`bd-p${order}`"
    style="border-radius: 10px;"
    @click="handlePlayerClick"
  >
    <q-img
      :src="roleImageUrl"
      basic
      width="100%"
      height="100%"
      style="border-radius: 10px; max-width: 80px; max-height: 112px"
      no-default-spinner
    />
    <div class="text-bold ellipsis text-white fz-sm text-center full-width">
      {{ player.name }}
    </div>
    <q-badge
      v-show="isShowLeaderSign"
      class="q-pa-none bg-transparent"
      style="left: -3px"
      floating
      rounded
    >
      <q-avatar size="40px">
        <img src="crown.jpg">
      </q-avatar>
    </q-badge>
    <q-badge
      v-show="isShowTaskTeamSign"
      class="q-pa-none bg-transparent"
      floating
      rounded
    >
      <q-avatar size="40px">
        <img src="task.jpg">
      </q-avatar>
    </q-badge>
    <q-badge
      v-show="isShowGodSign"
      class="q-pa-none bg-transparent absolute-left"
      floating
      rounded
    >
      <q-avatar size="40px">
        <img src="god.jpg">
      </q-avatar>
    </q-badge>
    <q-badge
      v-show="isShowKillSign"
      class="q-pa-none bg-transparent absolute"
      floating
      rounded
    >
      <q-avatar size="40px">
        <img src="kill.jpg">
      </q-avatar>
    </q-badge>
  </div>
</template>

<script>
import { getRoleImageByRole } from 'src/constants/role';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { GAME_STATUS } from 'src/constants/status';

export default {
  name: 'PlayerListItem',
  props: {
    player: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('game', [
      'isLeader',
      'isSelectedTaskTeamPlayer',
      'isTaskTeamPlayer',
      'playerOrder',
    ]),
    ...mapState('game', [
      'status',
      'revealPlayer',
      'killPlayer',
      'revealedPlayerList',
    ]),

    order() {
      return this.playerOrder(this.player.name);
    },

    playerName() {
      return this.player.name;
    },

    isShowLeaderSign() {
      return this.isLeader(this.player.name);
    },
    isShowKillSign() {
      return this.killPlayer === this.player.name;
    },
    isShowTaskTeamSign() {
      const player = this.player.name;
      return this.isSelectedTaskTeamPlayer(player) || this.isTaskTeamPlayer(player);
    },
    isShowGodSign() {
      return this.playerName === this.revealPlayer;
    },
    roleImageUrl() {
      return getRoleImageByRole(this.player.role);
    },
    hasReveal() {
      return this.revealedPlayerList.includes(this.playerName);
    },
  },

  methods: {
    ...mapMutations('game', [
      'addSelectedTaskTeamPlayer',
      'removeSelectedTaskTeamPlayer',
      'setRevealPlayer',
      'setKillPlayer',
    ]),

    handlePlayerClick() {
      if (this.status === GAME_STATUS.SELECT_TASK_PLAYER) {
        this.handleSelectTaskTeam();
        return;
      }
      if (this.status === GAME_STATUS.SELECT_REVEAL_PLAYER) {
        this.handleSelectRevealPlayer();
        return;
      }
      if (this.status === GAME_STATUS.SELECT_KILL_PLAYER) {
        this.handleSelectKillPlayer();
      }
    },

    handleSelectTaskTeam() {
      if (this.isSelectedTaskTeamPlayer(this.playerName)) {
        this.removeSelectedTaskTeamPlayer(this.playerName);
      } else {
        this.addSelectedTaskTeamPlayer(this.playerName);
      }
    },
    handleSelectRevealPlayer() {
      if (this.hasReveal) {
        this.$q.notify({
          message: '無法選擇檢視過的玩家',
        });
        return;
      }

      this.setRevealPlayer(this.playerName);
    },
    handleSelectKillPlayer() {
      if (this.killPlayer === '') {
        this.setKillPlayer(this.playerName);
      } else {
        this.setKillPlayer('');
      }
    },
  },
};
</script>
