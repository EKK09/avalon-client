<template>
  <q-footer
    elevated
    bordered
    class="bg-white text-black q-pa-md"
  >
    <q-item class="q-pa-none">
      <q-item-section>
        <GameMessageList />
      </q-item-section>

      <q-item-section
        side
        top
      >
        <GameOperateButton />
      </q-item-section>
    </q-item>
  </q-footer>
</template>

<script>
import GameMessageList from 'src/components/GameMessageList.vue';
import GameOperateButton from 'src/components/GameOperateButton.vue';

export default {
  name: 'GameFooter',
  components: { GameMessageList, GameOperateButton },
};
</script>
