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
        <q-item-label class="q-pa-sm text-bold">
          房號: {{ roomId }}
        </q-item-label>
        <div
          class="flex justify-center"
          style="min-height: 80px"
        >
          <div
            v-for="(result, index) in taskResultList"
            :key="index"
            class="flex"
            :class="index %2 === 0? '': 'content-end'"
          >
            <q-avatar
              size="55px"
              font-size="18px"
              color="black"
              text-color="white"
              class="q-mx-sm text-no-wrap shadow-24"
            >
              <img
                v-if="result === false"
                src="score_fail.jpg"
              >
              <img
                v-else-if="result === true"
                src="score_success.jpg"
              >

              <template
                v-else-if="result === undefined"
              >
                任務{{ index + 1 }}
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
