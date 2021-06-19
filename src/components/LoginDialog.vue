<template>
  <q-dialog
    v-model="isShowLoginDialog"
    persistent
  >
    <q-card
      bordered
      dark
    >
      <q-card-section class="q-pb-sm">
        <q-select
          :value="player"
          use-input
          fill-input
          dark
          hide-selected
          input-debounce="0"
          options-cover
          input-class="text-center text-orange-5 fz-md"
          hide-dropdown-icon
          :options="options"
          options-dark
          placeholder="遊戲暱稱"
          @filter="filterFn"
          @input-value="setPlayer"
        />
      </q-card-section>
      <q-card-actions
        align="center"
        class="q-pb-md"
      >
        <q-btn
          class="fz-md"
          outline
          push
          rounded
          :loading="isConnectingGame || isFetchingHost"
          :color="buttonColor"
          padding="sm md"
          :label="buttonText"
          @click="handleClick"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  mapGetters, mapState, mapMutations, mapActions,
} from 'vuex';
import { sleep } from 'src/common/asyncHelper';
import { fetchGameHostApi } from 'src/api/gameApi';

export default {
  name: 'LoginDialog',
  data() {
    return {
      player: '',
      roomId: '',
      host: '',
      isFetchingHost: false,
      isButtonAvailable: true,
      options: [],
      recommandNames: [
        '金貝貝',
        '阿土伯',
        '金太郎',
        '孫小美',
        '小蝦米',
        '金✖️五',
        '藜民',
        '流得滑',
        '山下智囧',
        '9527',
      ],
    };
  },
  computed: {
    ...mapGetters('game', [
      'isShowLoginDialog',
    ]),
    ...mapState('game', [
      'isConnectingGame',
    ]),

    buttonText() {
      const { roomId, host } = this;
      if (roomId && host) {
        return `加入${this.host}的遊戲`;
      }
      if (roomId && !host) {
        return `遊戲(${roomId}) 不存在 !`;
      }
      return '建立遊戲';
    },
    buttonColor() {
      const { roomId, host } = this;
      if (roomId && host) {
        return 'primary';
      }
      if (roomId && !host) {
        return 'negative';
      }
      return 'primary';
    },
    isShowButton() {
      return this.player !== '';
    },
    isShowRoomIdInput() {
      return !!this.roomId;
    },
  },
  async mounted() {
    const { roomId } = this.$route.params;
    const playerName = this.$q.localStorage.getItem('player') || '';
    this.player = playerName;

    if (roomId) {
      this.roomId = roomId;
      this.host = await this.fetchGameHostName(roomId);
    }
  },
  methods: {
    ...mapMutations('game', [
      'setRoomId',
      'setUser',
      'setIsShowInviteDialog',
    ]),
    ...mapActions('game', [
      'createGameAction',
      'joinGameAction',
      'handleJoinGameAction',
    ]),
    async handleCreate() {
      const handleSuccess = async (roomId) => {
        await this.$router.push({ path: `/${roomId}` }).catch(() => console.log('push error'));
        this.setIsShowInviteDialog(true);
      };
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
      const handleError = (message = '遊戲連線錯誤') => {
        this.$q.notify({
          message,
        });
      };
      await this.handleJoinGameAction({
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
      if (this.roomId && this.host) {
        this.setClickTimer();
        await this.handleJoin();
      } else if (this.roomId) {
        this.roomId = '';
      } else {
        this.setClickTimer();
        await this.handleCreate();
      }
    },
    async setClickTimer() {
      this.isButtonAvailable = false;
      await sleep(3);
      this.isButtonAvailable = true;
    },
    async fetchGameHostName(roomId) {
      try {
        this.isFetchingHost = true;
        const response = await fetchGameHostApi(roomId);
        const host = response.data.host || '';
        return host;
      } catch (error) {
        return '';
      } finally {
        this.isFetchingHost = false;
      }
    },
    filterFn(val, update) {
      update(() => {
        this.options = this.recommandNames.filter((name) => name.includes(val));
      });
    },
    setPlayer(val) {
      this.player = val;
    },
  },
};
</script>
