<template>
  <div class="fullscreen flex flex-center q-pa-xs">
    <q-card
      class="full-width"
      style="max-width: 500px; min-height: 300px"
    >
      <q-card-section>
        <div class="text-h6 text-center">
          玩家暱稱
        </div>
        <q-input
          v-model="player"
          outlined
          rounded
          no-error-icon
          clearable
          :rules="[ (val) => !!val || '請輸入暱稱', val => val.length <= 15 || '長度限制 15']"
          input-class="fz-md text-center"
        />
      </q-card-section>
      <q-card-section class="row items-center justify-around">
        <q-input
          v-model="roomId"
          placeholder="輸入遊戲房號"
          input-class="text-center"
        >
          <template #after>
            <q-btn
              label="加入遊戲"
              color="primary"
              @click="handleJoinGameClick"
            />
          </template>
        </q-input>
        <q-separator vertical />
        <q-btn
          label="開新遊戲"
          color="primary"
          @click="createGame"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {
  mapActions, mapGetters, mapMutations,
} from 'vuex';

export default {
  name: 'EntrancePage',

  data() {
    return {
      player: '',
      roomId: '',
    };
  },
  computed: {
    ...mapGetters('game', ['hasBasicGameInfo']),
  },
  methods: {
    ...mapActions('game', [
      'createGameAction',
      'joinGameAction',
    ]),
    ...mapMutations('game', [
      'setRoomId',
      'setUser',
    ]),
    async createGame() {
      if (this.player === '') {
        this.$q.notify({
          message: '請輸入遊戲暱稱',
        });
        return;
      }
      await this.createGameAction(this.player);

      if (this.hasBasicGameInfo === false) {
        this.$q.notify({
          message: '建立遊戲失敗',
        });
        return;
      }
      await this.joinGame();
    },
    async handleJoinGameClick() {
      if (this.player === '') {
        this.$q.notify({
          message: '請輸入遊戲暱稱',
        });
        return;
      }
      if (this.roomId === '') {
        this.$q.notify({
          message: '請輸入房號',
        });
        return;
      }

      this.setRoomId(this.roomId);
      this.setUser(this.player);
      await this.joinGame();
    },
    async joinGame() {
      const handleSuccess = () => {
        this.$router.push('/game');
      };
      const handleError = () => {
        this.$q.notify({
          message: '進入遊戲失敗',
        });
      };
      await this.joinGameAction({ handleSuccess, handleError });
    },
  },
};
</script>
