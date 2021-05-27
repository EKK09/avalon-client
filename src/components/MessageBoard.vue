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
      return this.message.substr(0, this.textCount);
    },
  },
  watch: {
    message() {
      this.textCount = 1;
      this.setTypeMessageTimer();
    },

  },
  mounted() {
    this.setTypeMessageTimer();
  },
  methods: {
    async setTypeMessageTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        console.log('tick');

        this.textCount += 1;
        if (this.textCount >= this.message.length) {
          clearInterval(this.timer);
        }
      }, this.delayMilliSencond);
    },
  },
};
</script>
