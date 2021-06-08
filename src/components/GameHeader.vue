<template>
  <q-header
    elevated
    bordered
    class="bg-blue-grey-9"
  >
    <q-item class="q-pa-sm">
      <q-item-section avatar>
        <div
          style="width: 100px"
        >
          <div class="text-bold fz-md ellipsis full-width">
            房號: {{ roomId }}
          </div>
          <q-img
            :src="userRoleImage"
            width="100px"
            height="140px"
          />
          <div class="text-bold ellipsis full-width text-center">
            {{ user }}
          </div>
        </div>
      </q-item-section>

      <q-item-section>
        <div class="flex flex-center">
          <div
            v-for="(result, index) in taskResultList"
            :key="index"
            class="flex flex-center"
          >
            <q-avatar
              size="65px"
              font-size="26px"
              color="black"
              text-color="white"
              class="q-mx-sm text-no-wrap"
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
        <div class="row q-pt-sm">
          <div
            v-for="n in unApproveCount"
            :key="n"
            class="flex flex-center"
          >
            <q-avatar
              size="30px"
              color="black"
              text-color="white"
              class="q-mx-sm"
            >
              <img
                src="unapprove.jpg"
              >
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
          push
          @click="handleQuestionclick"
        />
      </q-item-section>
    </q-item>
    <GameRoleDialog ref="gameRoleDialog" />
  </q-header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import GameRoleDialog from 'src/components/GameRoleDialog.vue';

export default {
  name: 'GameHeader',
  components: { GameRoleDialog },
  computed: {
    ...mapGetters('game', ['userRoleImage']),
    ...mapState('game', ['roomId', 'taskResultList', 'user', 'unApproveCount']),
  },
  methods: {
    handleQuestionclick() {
      this.$refs.gameRoleDialog.showDialog();
    },
  },
};
</script>
