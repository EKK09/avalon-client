<template>
  <div class="fz-sm fit">
    <div class="text-bold fz-md">
      正義陣營獲勝
    </div>
    <ul style="list-style-type:disc">
      <li>
        任務成功3次，且梅林沒有被刺殺。
        (<q-avatar
          size="30px"
          color="black"
        >
          <img
            src="score_success.jpg"
          >
        </q-avatar>
        X 3)
      </li>
    </ul>
    <div class="text-bold fz-md">
      邪惡陣營獲勝
    </div>
    <ul style="list-style-type:disc">
      <li>
        任務失敗3次。
        (<q-avatar
          size="30px"
          color="black"
        >
          <img
            src="score_fail.jpg"
          >
        </q-avatar>
        X 3)
      </li>
      <li>
        領袖選擇出任務成員時，連續投票失敗5次。
        (<q-avatar
          size="30px"
          color="black"
        >
          <img
            src="unapprove.jpg"
          >
        </q-avatar> X 5)
      </li>
      <li>
        (任務成功3次後)刺殺梅林成功。
        <q-avatar
          size="30px"
          color="black"
        >
          <img
            src="kill.jpg"
          >
        </q-avatar>
      </li>
      <q-icon />
    </ul>
    <div class="text-bold fz-md">
      湖中女神
    </div>
    <ul style="list-style-type:disc">
      <li>
        第一次湖中女神指示物為第二位玩家擁有。
        <q-avatar
          size="30px"
          color="black"
        >
          <img
            src="god.jpg"
          >
        </q-avatar>
      </li>
      <li>
        第2、3、4回合，出完任務後才可以使用湖中女神能力。
      </li>
      <li>
        持有湖中女神指示物的玩家選擇要檢視的對象，但是不可以選擇之前被湖中女神能力看過的玩家。
      </li>
      <li>
        被檢視的玩家將會成為新的湖中女神指示物持有者。
      </li>
      <q-icon />
    </ul>
  </div>
</template>

<script>

export default {
  name: 'GameRule',
};
</script>
