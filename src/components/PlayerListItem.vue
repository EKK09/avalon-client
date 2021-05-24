<template>
  <div
    class="bg-black column items-center q-pt-sm q-px-sm relative-position"
    style="border-radius: 10px;"
    @click="handlePlayerClick"
  >
    <q-img
      :src="roleImageUrl"
      basic
      width="80px"
      height="112px"
      style="border-radius: 10px"
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
  </div>
</template>

<script>
import { getRoleImageByRole } from 'src/constants/role';
import { mapGetters, mapMutations } from 'vuex';

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
    ]),

    isShowLeaderSign() {
      return this.isLeader(this.player.name);
    },
    isShowTaskTeamSign() {
      return this.isSelectedTaskTeamPlayer(this.player.name);
    },
    roleImageUrl() {
      return getRoleImageByRole(this.player.role);
    },
  },

  methods: {
    ...mapMutations('game', [
      'addSelectedTaskTeamPlayer',
      'removeSelectedTaskTeamPlayer',
    ]),

    handlePlayerClick() {
      const playerName = this.player.name;
      if (this.isSelectedTaskTeamPlayer(playerName)) {
        this.removeSelectedTaskTeamPlayer(playerName);
      } else {
        this.addSelectedTaskTeamPlayer(playerName);
      }
    },
  },
};
</script>
