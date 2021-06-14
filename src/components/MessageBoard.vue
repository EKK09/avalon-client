<template>
  <div class="fit">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'MessageBoard',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      delayMilliSencond: 80,
      timer: null,
      textCount: 1,
    };
  },
  computed: {
    text() {
      if (!this.message) {
        return '';
      }
      return this.message.substr(0, this.textCount);
    },
  },
  watch: {
    message(val) {
      this.textCount = 1;
      console.log({ message: val });
      clearInterval(this.timer);
      if (val) {
        this.setTypeMessageTimer();
      }
    },
  },
  mounted() {
    this.setTypeMessageTimer();
  },
  methods: {
    async setTypeMessageTimer() {
      this.timer = setInterval(() => {
        this.textCount += 1;
        if (this.textCount >= this.message.length) {
          clearInterval(this.timer);
        }
      }, this.delayMilliSencond);
    },
  },
};
</script>
