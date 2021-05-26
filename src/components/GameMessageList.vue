<template>
  <div class="fit fz-md relative-position">
    {{ messageBoaredText }}
    <q-icon
      v-if="isShowNextButton"
      id="next-button"
      name="arrow_drop_down"
      size="lg"
      class="absolute-bottom-right cursor-pointer"
      @click="handleNextMessage"
    />
  </div>
</template>

<script>
import {
  mapGetters,
  mapState,
  mapMutations,
} from 'vuex';

export default {
  name: 'GameMessageList',
  computed: {
    ...mapState('game', ['messageList']),
    ...mapGetters('game', ['isStarted', 'isHost']),

    messageBoaredText() {
      return this.messageList[0];
    },
    isShowNextButton() {
      return this.messageList.length > 1;
    },
  },
  methods: {
    ...mapMutations('game', ['shiftMessage']),
    handleNextMessage() {
      this.shiftMessage();
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
