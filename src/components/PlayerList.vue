<template>
  <div
    class="row q-pt-md q-col-gutter-sm"
  >
    <div
      v-for="(player, index) in playerList"
      :key="index"
      class="col-4"
    >
      <PlayerListItem :player="player" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import PlayerListItem from 'src/components/PlayerListItem.vue';

export default {
  name: 'PlayerList',
  components: { PlayerListItem },
  computed: {
    ...mapState('game', ['playerList']),
  },
};
</script>
