<template>
  <q-dialog
    v-model="isShowConnectingDialog"
    persistent
  >
    <q-card
      dark
      bordered
    >
      <q-card-section class="row items-center">
        <div class="text-h6 q-px-md">
          遊戲連線中
        </div>
        <q-spinner-dots
          color="primary"
          size="2em"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GameConnectingDialog',
  computed: {
    ...mapGetters('game', [
      'isShowConnectingDialog',
    ]),
  },
};
</script>
