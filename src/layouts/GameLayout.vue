<template>
  <q-layout view="hHh lpR fFf">
    <GameHeader />
    <q-page-container>
      <!-- <router-view /> -->
      <q-page>
        內容
      </q-page>
    </q-page-container>

    <GameFooter />
  </q-layout>
</template>

<script>
import GameHeader from 'src/components/GameHeader.vue';
import GameFooter from 'src/components/GameFooter.vue';

export default {
  name: 'GameLayout',
  components: {
    GameHeader,
    GameFooter,
  },
  data() {
    return {
    };
  },
};
</script>
