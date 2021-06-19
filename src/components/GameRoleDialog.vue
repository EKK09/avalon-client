<template>
  <q-dialog
    v-model="isShowDialog"
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card
      ref="card"
      style="max-width: 760px"
      class="column no-wrap"
    >
      <q-card-section
        class="row justify-between items-center bg-white q-pb-none"
        style="position: sticky; top: 0; z-index: 10"
      >
        <q-tabs
          v-model="tab"
        >
          <q-tab
            name="role"
            label="角色介紹"
          />
          <q-tab
            name="rule"
            label="勝利條件"
          />
        </q-tabs>
        <q-btn
          v-close-popup
          icon="close"
          round
          push
          color="black"
          text-color="white"
          padding="4px"
          size="md"
        />
      </q-card-section>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
        keep-alive
        class="col"
      >
        <q-tab-panel
          name="role"
          class="scroll overflow-auto"
        >
          <GameRoleList />
        </q-tab-panel>
        <q-tab-panel
          name="rule"
          class="scroll overflow-auto"
        >
          <GameRule />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
import GameRoleList from 'src/components/GameRoleList.vue';
import GameRule from 'src/components/GameRule.vue';

export default {
  name: 'GameRoleDialog',
  components: { GameRoleList, GameRule },
  data() {
    return {
      isShowDialog: false,
      tab: 'role',
    };
  },
  methods: {
    showDialog() {
      this.isShowDialog = true;
    },
  },
};
</script>
