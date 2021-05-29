<template>
  <div
    class="fit fz-md relative-position"
    @click="handleNextMessage"
  >
    <MessageBoard :message="messageBoaredText" />
    <q-icon
      v-if="hasNextMessage"
      id="next-button"
      name="arrow_drop_down"
      size="lg"
      class="absolute-bottom-right cursor-pointer"
    />
  </div>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapMutations,
} from 'vuex';
import MessageBoard from 'src/components/MessageBoard.vue';

export default {
  name: 'GameMessageList',
  components: { MessageBoard },
  computed: {
    ...mapState('game', ['messageList']),
    ...mapGetters('game', ['isStarted', 'isHost']),

    messageBoaredText() {
      return this.messageList[0];
    },
    hasNextMessage() {
      return this.messageList.length > 1;
    },
  },
  methods: {
    ...mapMutations('game', ['shiftMessage']),
    handleNextMessage() {
      if (this.hasNextMessage) {
        this.shiftMessage();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
#next-button {
  animation: shine 0.8s linear infinite;
}
@keyframes shine {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}
</style>
