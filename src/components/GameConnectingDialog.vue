<template>
  <q-dialog
    v-model="isShowConnectingDialog"
    persistent
  >
    <q-card
      dark
      bordered
    >
      <q-card-section
        v-if="isShowReconnectingText"
        class="row items-center"
      >
        <div class="text-h6 q-px-md">
          遊戲連線中
        </div>
        <q-spinner-dots
          color="primary"
          size="2em"
        />
      </q-card-section>
      <q-card-section
        v-else
        class="row items-center"
      >
        <q-icon
          name="error_outline"
          size="2em"
          color="primary"
        />
        <div class="text-h6 q-px-md">
          連線失敗
        </div>

        <q-btn
          label="離開"
          flat
          color="primary"
          unelevated
          @click="handleLaeveGame"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'GameConnectingDialog',
  computed: {
    ...mapGetters('game', [
      'isShowConnectingDialog',
    ]),
    ...mapState('game', [
      'reconnectCount',
    ]),

    isShowReconnectingText() {
      return this.reconnectCount <= 3;
    },
  },
  methods: {

    handleLaeveGame() {
      this.$router.replace('/').then(() => {
        window.location.reload();
      }).catch(() => {
        window.location.reload();
      });
    },
  },
};
</script>
