<template>
  <q-dialog
    v-model="isShowGameDialog"
    persistent
  >
    <q-card
      dark
      bordered
    >
      <q-card-section>
        <div class="text-h6">
          {{ message }}
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'GameDialog',
  computed: {
    ...mapGetters('game', [
      'isShowGameDialog',
    ]),
    ...mapState('game', [
      'offlinePlayerList',
    ]),
    message() {
      const playersText = this.offlinePlayerList.join(', ');

      return `${playersText} 離開位置去上廁所 !!`;
    },
  },
};
</script>
