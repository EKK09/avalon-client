<template>
  <q-footer
    elevated
    bordered
    class="bg-white text-black q-pa-md"
  >
    <q-toolbar>
      <q-toolbar-title>
        <div
          class="text-black"
          style="height: 80px"
        >
          請選擇出任務玩家
        </div>
      </q-toolbar-title>
      <q-btn
        padding="0"
        round
      >
        <q-avatar size="65px">
          <img src="task.jpg">
        </q-avatar>
      </q-btn>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  name: 'GameFooter',
  data() {
    return {
      taskResultList: [
        true,
        true,
        false,
        true,
        undefined,
      ],
    };
  },
};
</script>
