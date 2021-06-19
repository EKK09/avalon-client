<template>
  <q-list
    separator
  >
    <q-item
      v-for="(role, index) in gameRoleList"
      :key="index"
    >
      <q-item-section
        avatar
        top
      >
        <q-avatar size="100px">
          <img
            :src="role.image"
            style="object-fit: cover"
          >
        </q-avatar>
      </q-item-section>
      <q-item-section top>
        <q-item-label
          header
          class="text-bold fz-lg q-py-xs"
        >
          {{ role.name }}
        </q-item-label>
        <q-item-label class="fz-md">
          {{ role.description }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { GAME_ROLE_IMAGE, GAME_ROLE_NAME, GAME_ROLE_DESCRIPTION } from 'src/constants/role';

export default {
  name: 'GameRoleList',
  data() {
    return {
      gameRoleList: [
        {
          image: GAME_ROLE_IMAGE.MERLIN,
          name: GAME_ROLE_NAME.MERLIN,
          description: GAME_ROLE_DESCRIPTION.MERLIN,
        },
        {
          image: GAME_ROLE_IMAGE.PERCIVAL,
          name: GAME_ROLE_NAME.PERCIVAL,
          description: GAME_ROLE_DESCRIPTION.PERCIVAL,
        },
        {
          image: GAME_ROLE_IMAGE.SERVANT,
          name: GAME_ROLE_NAME.SERVANT,
          description: GAME_ROLE_DESCRIPTION.SERVANT,
        },
        {
          image: GAME_ROLE_IMAGE.MORDRED,
          name: GAME_ROLE_NAME.MORDRED,
          description: GAME_ROLE_DESCRIPTION.MORDRED,
        },
        {
          image: GAME_ROLE_IMAGE.ASSASSIN,
          name: GAME_ROLE_NAME.ASSASSIN,
          description: GAME_ROLE_DESCRIPTION.ASSASSIN,
        },
        {
          image: GAME_ROLE_IMAGE.MORGANA,
          name: GAME_ROLE_NAME.MORGANA,
          description: GAME_ROLE_DESCRIPTION.MORGANA,
        },
        {
          image: GAME_ROLE_IMAGE.OBERON,
          name: GAME_ROLE_NAME.OBERON,
          description: GAME_ROLE_DESCRIPTION.OBERON,
        },
        {
          image: GAME_ROLE_IMAGE.MINION,
          name: GAME_ROLE_NAME.MINION,
          description: GAME_ROLE_DESCRIPTION.MINION,
        },
        {
          image: GAME_ROLE_IMAGE.GOD,
          name: GAME_ROLE_NAME.GOD,
          description: GAME_ROLE_DESCRIPTION.GOD,
        },
      ],
    };
  },
};
</script>
