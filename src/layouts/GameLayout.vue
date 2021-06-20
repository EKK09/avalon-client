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
        <GameConnectingDialog />
        <LoginDialog />
        <GameRoleDialog ref="gameRoleDialog" />
        <InviteDialog ref="inviteDialog" />
        <q-dialog
          v-model="confirm"
          persistent
        >
          <q-card
            dark
            style="min-width: 350px"
          >
            <q-card-section class="text-h6 text-bold text-center">
              確定離開遊戲 ?
            </q-card-section>

            <q-card-actions align="center">
              <q-btn
                v-close-popup
                flat
                label="取消"
                color="primary"
              />
              <q-btn
                v-close-popup
                flat
                label="確定"
                color="primary"
                @click="handleLaeveGame"
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-page-sticky
          position="bottom-right"
        >
          <div class="row q-gutter-md q-mr-md q-mb-xs">
            <q-icon
              name="help_outline"
              class="cursor-pointer"
              size="sm"
              color="blue-grey-9"
              @click="handleQuestionclick"
            />
            <q-icon
              name="person_add"
              class="cursor-pointer"
              size="sm"
              color="blue-grey-9"
              :disable="isGameOver"
              @click="handleInviteclick"
            />
            <q-icon
              class="cursor-pointer"
              name="exit_to_app"
              size="sm"
              color="blue-grey-9"
              @click="showLeaveDialog"
            >
              <q-tooltip
                :delay="1000"
                :value="true"
                anchor="top middle"
                content-class="text-primary bg-black"
                content-style="overflow-y: visible;overflow-x: visible"
                self="bottom middle"
              >
                開啟新遊戲
                <div id="test" />
              </q-tooltip>
            </q-icon>
          </div>
        </q-page-sticky>
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
import GameConnectingDialog from 'src/components/GameConnectingDialog.vue';
import GameRoleDialog from 'src/components/GameRoleDialog.vue';
import InviteDialog from 'src/components/InviteDialog.vue';
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'GameLayout',
  components: {
    GameHeader,
    GameFooter,
    PlayerList,
    GameDialog,
    LoginDialog,
    GameConnectingDialog,
    GameRoleDialog,
    InviteDialog,
  },
  data() {
    return {
      confirm: false,
    };
  },
  computed: {
    ...mapState('game', ['isGameOver']),
    link() {
      return process.env.AVALON_CLIENT_URL + this.$route.fullPath;
    },
  },
  async preFetch({ store, currentRoute }) {
    if (process.env.CLIENT) {
      return;
    }
    const { roomId } = currentRoute.params;
    if (roomId) {
      await store.dispatch('game/fetchGameInfoAction', roomId);
    }
  },
  methods: {
    ...mapMutations('game', ['setIsShowInviteDialog']),

    handleQuestionclick() {
      this.$refs.gameRoleDialog.showDialog();
    },
    handleInviteclick() {
      this.setIsShowInviteDialog(true);
    },
    showLeaveDialog() {
      this.confirm = true;
    },
    handleLaeveGame() {
      this.$router.replace('/').then(() => {
        window.location.reload();
      }).catch(() => {
        window.location.reload();
      });
    },
    myTweak(offset) {
      return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' };
    },
  },
  meta() {
    return {
      title: '阿瓦隆 - 陣營對抗桌遊',
      meta: {
        description: { name: 'description', content: '阿瓦隆(Avalon)是很熱門的陣營類桌遊，已經推出了好幾年，一直受到許多玩家熱愛。遊戲中玩家分成兩大陣營，每個陣營內有能力者和普通角色，玩家要通過邏輯推理和對話來試探彼此的陣營。' },
        keywords: { name: 'keywords', content: 'avalon 桌遊 阿瓦隆' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
        ogTitle: {
          name: 'og:title',
          content: '阿瓦隆 - 陣營對抗桌遊',
        },
        ogDescription: {
          name: 'og:description',
          content: '阿瓦隆(Avalon)是很熱門的陣營類桌遊，已經推出了好幾年，一直受到許多玩家熱愛。遊戲中玩家分成兩大陣營，每個陣營內有能力者和普通角色，玩家要通過邏輯推理和對話來試探彼此的陣營。',
        },
        ogImage: { name: 'og:image', content: `${process.env.AVALON_CLIENT_URL}/assassin.jpg` },
        ogUrl: { name: 'og:url', content: this.link },
      },
    };
  },
};
</script>
<style lang="scss">
#test::after {
  border-color: black transparent transparent transparent;
  content: "";
  border-width: 8px 8px 0 8px;
  top: 30px;
  border-style: solid;
  display: block;
  height: 0;
  right: 20px;
  margin-left: -8px;
  position: absolute;
  width: 0;
}
</style>
