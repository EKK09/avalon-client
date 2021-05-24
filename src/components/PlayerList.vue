<template>
  <div
    class="row q-pt-md"
  >
    <div
      v-for="(player, index) in players"
      :key="index"
      class="q-pa-sm col-4 relative-position"
      @click="handlePlayerClick(player)"
    >
      <div
        class="bg-black fit column items-center q-pa-sm"
        style="border-radius: 10px"
      >
        <q-img
          src="servant.jpg"
          basic
          width="80px"
          height="112px"
          style="border-radius: 10px"
        />
        <div class="text-bold ellipsis text-white fz-sm">
          {{ player }}
        </div>
        <q-badge
          v-show="player === leader"
          class="q-pa-none bg-transparent absolute-top-left"
          floating
        >
          <q-avatar size="40px">
            <img src="crown.jpg">
          </q-avatar>
        </q-badge>
        <q-badge
          v-show="isSelectedPlayer(player)"
          class="q-pa-none bg-transparent"
          floating
          rounded
        >
          <q-avatar size="40px">
            <img src="task.jpg">
          </q-avatar>
        </q-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayerList',
  data() {
    return {
      players: [
        'david',
        'Terry',
        'Jerry',
        '海豹',
        '張莉莉張',
        '8228',
        '啞色的忠誠',
        '我是爪牙',
        '魔甘吶',
      ],
      leader: '海豹',
      selectedPlayers: [],
    };
  },

  methods: {
    handlePlayerClick(player) {
      if (this.isSelectedPlayer(player)) {
        this.removePlayer(player);
      } else {
        this.selectPlayer(player);
      }
    },
    isSelectedPlayer(player) {
      return this.selectedPlayers.includes(player);
    },
    selectPlayer(player) {
      const players = this.selectedPlayers.splice(0, 4);
      players.unshift(player);
      this.selectedPlayers = players;
    },
    removePlayer(player) {
      for (let index = 0; index < this.selectedPlayers.length; index += 1) {
        if (this.selectedPlayers[index] === player) {
          this.selectedPlayers.splice(index, 1);
          return;
        }
      }
    },
  },
};
</script>
