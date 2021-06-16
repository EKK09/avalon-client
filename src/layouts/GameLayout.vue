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
  async preFetch({ store, currentRoute }) {
    console.log('preFetch');
    const { roomId } = currentRoute.params;
    if (roomId) {
      store.commit('game/setRoomId', roomId);
      await store.dispatch('game/fetchGameInfoAction');
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
  meta: {
    title: 'Avalon',
    meta: {
      description: { name: 'description', content: '阿瓦隆(Avalon)是很熱門的陣營類桌遊，已經推出了好幾年，一直受到許多玩家熱愛。遊戲中玩家分成兩大陣營，每個陣營內有能力者和普通角色，玩家要通過邏輯推理和對話來試探彼此的陣營。' },
      keywords: { name: 'keywords', content: 'avalon 桌遊 阿瓦隆' },
      equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
      ogTitle: {
        name: 'og:title',
        content: '阿瓦隆 - 陣營對抗類桌遊',
      },
      ogDescription: {
        name: 'og:description',
        content: '阿瓦隆(Avalon)是很熱門的陣營類桌遊，已經推出了好幾年，一直受到許多玩家熱愛。遊戲中玩家分成兩大陣營，每個陣營內有能力者和普通角色，玩家要通過邏輯推理和對話來試探彼此的陣營。',
      },
      ogImage: { name: 'og:image', content: `${process.env.AVALON_CLIENT_URL}/assassin.jpg` },
      ogUrl: { name: 'og:url', content: process.env.AVALON_CLIENT_URL },
    },
  },
};
</script>
