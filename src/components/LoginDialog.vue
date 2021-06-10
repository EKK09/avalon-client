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
      <q-card-actions
        v-show="isShowButton"
        align="center"
      >
        <q-btn
          :loading="isLoging"
          :label="buttonText"
          @click="handleClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { sleep } from 'src/common/asyncHelper';

export default {
  name: 'LoginDialog',
  data() {
    return {
      player: '',
      roomId: '',
      isLoging: false,
      isButtonAvailable: true,
    };
  },
  computed: {
    ...mapGetters('game', [
      'isShowLoginDialog',
    ]),

    buttonText() {
      if (this.roomId) {
        return '加入遊戲';
      }
      return '建立遊戲';
    },
    isShowButton() {
      return this.player !== '';
    },
  },
  mounted() {
    const { roomId } = this.$route.params;
    if (roomId) {
      this.roomId = roomId;
    }
    const playerName = this.$q.localStorage.getItem('player') || '';
    this.player = playerName;
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
      const handleSuccess = (roomId) => { this.$router.push({ path: `/${roomId}` }).catch(() => console.log('test error')); };
      const handleError = () => {
        this.$q.notify({
          message: '遊戲連線錯誤',
        });
      };
      await this.createGameAction({
        player: this.player,
        handleSuccess,
        handleError,
      });
    },
    async handleJoin() {
      const handleSuccess = (roomId) => { this.$router.push({ path: `/${roomId}` }).catch(() => console.log('test error')); };
      const handleError = () => {
        this.$q.notify({
          message: '遊戲連線錯誤',
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
      if (this.isButtonAvailable === false) {
        this.$q.notify({
          message: '請稍候在試！',
        });
        return;
      }
      this.$q.localStorage.set('player', this.player);
      this.isLoging = true;
      this.setClickTimer();
      if (this.roomId) {
        await this.handleJoin();
      } else {
        await this.handleCreate();
      }
      this.isLoging = false;
    },
    async setClickTimer() {
      this.isButtonAvailable = false;
      await sleep(5);
      this.isButtonAvailable = true;
    },
  },
};
</script>
