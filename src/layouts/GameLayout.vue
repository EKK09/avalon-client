<template>
  <q-layout view="hHh lpR fFf">
    <GameHeader />
    <q-page-container>
      <q-page
        :style-fn="myTweak"
        class="bg-blue-grey-2"
        padding
      >
        <PlayerList />
        <GameDialog />
        <LoginDialog />
      </q-page>
    </q-page-container>
    <GameFooter />
  </q-layout>
</template>

<script>
import GameHeader from 'src/components/GameHeader.vue';
import GameFooter from 'src/components/GameFooter.vue';
import PlayerList from 'src/components/PlayerList.vue';
import GameDialog from 'src/components/GameDialog.vue';
import LoginDialog from 'src/components/LoginDialog.vue';

export default {
  name: 'GameLayout',
  components: {
    GameHeader,
    GameFooter,
    PlayerList,
    GameDialog,
    LoginDialog,
  },
  async created() {
    console.log('created');
    const { roomId } = this.$route.params;
    if (roomId) {
      this.$store.commit('game/setRoomId', roomId);
      await this.$store.dispatch('game/fetchGameInfoAction');
    }
  },
  methods: {
    myTweak(offset) {
      // "offset" is a Number (pixels) that refers to the total
      // height of header + footer that occupies on screen,
      // based on the QLayout "view" prop configuration
      console.log(offset);
      // this is actually what the default style-fn does in Quasar
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
    },
  },
};
</script>
