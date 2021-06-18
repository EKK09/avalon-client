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
      <q-item-section
        v-if="roomId && user"
        avatar
        class="gt-xs"
      >
        <div
          style="width: 100px"
        >
          <div class="text-bold ellipsis full-width">
            房號: {{ roomId }}
          </div>
          <q-img
            :src="userRoleImage"
            width="100px"
            height="140px"
          />
          <div class="text-bold fz-sm ellipsis full-width text-center">
            {{ user }}
          </div>
        </div>
      </q-item-section>
      <q-item-section>
        <q-item-label
          v-show="roomId"
          class="q-pa-sm text-bold lt-sm"
        >
          房號: {{ roomId }} <span v-show="user">({{ user }})</span>
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
    </q-item>
  </q-header>
</template>

<script>
import { mapGetters, mapState } from 'vuex';

export default {
  name: 'GameHeader',
  computed: {
    ...mapGetters('game', ['userRoleImage']),
    ...mapState('game', ['roomId', 'taskResultList', 'user', 'unApproveCount']),
  },
};
</script>
