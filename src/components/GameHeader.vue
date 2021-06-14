<template>
  <q-header
    elevated
    bordered
    class="bg-blue-grey-9"
  >
    <q-item
      class="q-pa-sm"
      dense
    >
      <q-item-section>
        <q-item-label
          v-show="roomId"
          class="q-pa-sm text-bold"
        >
          No. {{ roomId }} <span v-show="user">({{ user }})</span>
        </q-item-label>
        <div
          class="flex justify-center"
          style="min-height: 80px"
        >
          <div
            v-for="index in 5"
            :key="index"
            class="flex"
            :class="index %2 === 0? '': 'content-end'"
          >
            <q-avatar
              size="55px"
              font-size="18px"
              color="black"
              text-color="white"
              class="q-mx-sm text-no-wrap shadow-24 flex flex-center"
            >
              <img
                v-if="taskResultList[index-1] === false"
                src="score_fail.jpg"
              >
              <img
                v-else-if="taskResultList[index-1] === true"
                src="score_success.jpg"
              >

              <template
                v-else-if="taskResultList[index-1] === undefined"
              >
                任務{{ index }}
              </template>
            </q-avatar>
          </div>
        </div>
        <div class="row q-pt-md justify-center">
          <div
            v-for="n in 5"
            :key="n"
            class="flex flex-center"
          >
            <q-avatar
              size="30px"
              color="black"
              text-color="white"
              class="q-mx-sm relative-position overflow-hidden"
            >
              <img
                src="unapprove.jpg"
              >
              <div
                v-show="n > unApproveCount"
                class="fit bg-black absolute"
                style="opacity: 0.7"
              />
            </q-avatar>
          </div>
        </div>
      </q-item-section>
      <q-item-section
        side
        top
      >
        <q-btn
          icon="help_outline"
          round
          text-color="primary"
          size="md"
          padding="0"
          class="q-my-sm"
          @click="handleQuestionclick"
        />
        <q-btn
          icon="person_add"
          text-color="primary"
          size="md"
          padding="0"
          class="q-my-sm"
          round
          @click="handleInviteclick"
        />
      </q-item-section>
    </q-item>
    <GameRoleDialog ref="gameRoleDialog" />
    <InviteDialog ref="inviteDialog" />
  </q-header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import GameRoleDialog from 'src/components/GameRoleDialog.vue';
import InviteDialog from 'src/components/InviteDialog.vue';

export default {
  name: 'GameHeader',
  components: { GameRoleDialog, InviteDialog },
  computed: {
    ...mapGetters('game', ['userRoleImage']),
    ...mapState('game', ['roomId', 'taskResultList', 'user', 'unApproveCount']),
  },
  methods: {
    handleQuestionclick() {
      this.$refs.gameRoleDialog.showDialog();
    },
    handleInviteclick() {
      this.$refs.inviteDialog.showDialog();
    },
  },
};
</script>
