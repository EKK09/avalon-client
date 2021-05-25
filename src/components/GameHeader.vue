<template>
  <q-header
    elevated
    bordered
    class="bg-blue-grey-9"
  >
    <q-toolbar class="q-pa-sm">
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
      </div>
      <q-toolbar-title class="flex flex-center q-pa-sm">
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
            class="q-mx-sm"
          >
            <img
              v-if="result === false"
              src="score_fail.jpg"
            >
            <img
              v-else-if="result === true"
              src="score_success.jpg"
            >
            <template v-else-if="result === undefined">
              任務{{ index + 1 }}
            </template>
          </q-avatar>
        </div>
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'GameHeader',
  computed: {
    ...mapGetters('game', ['userRoleImage']),
    ...mapState('game', ['roomId', 'taskResultList']),
  },
};
</script>
