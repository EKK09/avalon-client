<template>
  <div class="fullscreen flex flex-center q-pa-xs">
    <q-card
      class="full-width"
      style="max-width: 500px; min-height: 300px"
    >
      <q-card-section>
        <div class="text-h6 text-center">
          玩家暱稱
        </div>
        <q-input
          v-model="player"
          outlined
          rounded
          no-error-icon
          clearable
          :rules="[ val => val.length <= 15 || '長度限制 15']"
          input-class="fz-md text-center"
        />
      </q-card-section>
      <q-card-section class="row items-center justify-around">
        <q-input
          v-model="roomId"
          placeholder="輸入遊戲房號"
          input-class="text-center"
        >
          <template #after>
            <q-btn
              label="加入遊戲"
              color="primary"
            />
          </template>
        </q-input>
        <q-separator vertical />
        <q-btn
          label="開新遊戲"
          color="primary"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'EntrancePage',

  data() {
    return {
      player: '',
      roomId: '',
    };
  },
};
</script>
