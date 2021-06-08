<template>
  <q-dialog
    v-model="isShowLoginDialog"
    persistent
  >
    <q-card
      bordered
      dark
    >
      <q-card-section>
        <q-input
          v-model.trim="player"
          dark
          filled
          color="orange-5"
          standout="text-orange-5"
          no-error-icon
          :rules="[ (val) => !!val || '請輸入暱稱', val => val.length <= 15 || '長度限制 15']"
          input-class="fz-md text-center text-orange-5"
        >
          <template #before>
            <div class="text-h6 text-center text-orange-5">
              暱稱
            </div>
          </template>
        </q-input>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model.trim="roomId"
          color="orange-5"
          dark
          filled
          standout="text-orange-5"
          no-error-icon
          clearable
          input-class="fz-md text-center text-orange-5"
        >
          <template #before>
            <div class="text-h6 text-center text-orange-5">
              房號
            </div>
          </template>
        </q-input>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn
          :label="buttonText"
          @click="handleClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'LoginDialog',
  data() {
    return {
      player: '',
      roomId: '',
    };
  },
  computed: {
    ...mapGetters('game', [
      'isShowLoginDialog',
    ]),

    buttonText() {
      if (this.roomId !== '') {
        return '加入遊戲';
      }
      return '建立遊戲';
    },
  },
  mounted() {
    const { roomId } = this.$route.params;
    if (roomId) {
      this.roomId = roomId;
    }
  },
  methods: {
    ...mapMutations('game', [
      'setRoomId',
      'setUser',
    ]),
    ...mapActions('game', [
      'createGameAction',
      'joinGameAction',
    ]),
    async handleCreate() {
      const handleSuccess = () => {};
      const handleError = () => {
        this.$q.notify({
          message: '建立遊戲失敗',
        });
      };
      await this.createGameAction({
        player: this.player,
        handleSuccess,
        handleError,
      });
    },
    async handleJoin() {
      const handleSuccess = () => {};
      const handleError = () => {
        this.$q.notify({
          message: '加入遊戲失敗',
        });
      };
      await this.joinGameAction({
        player: this.player, roomId: this.roomId, handleSuccess, handleError,
      });
    },
    async handleClick() {
      if (this.player === '') {
        this.$q.notify({
          message: '請輸入遊戲暱稱',
        });
        return;
      }
      if (this.roomId !== '') {
        await this.handleJoin();
      } else {
        await this.handleCreate();
      }
    },
  },
};
</script>
