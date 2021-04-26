<template>
  <div>
    <today-is-main v-if="page === 1"></today-is-main>
    <today-is-close v-else-if="page === 2"></today-is-close>
  </div>
</template>

<script>
import TodayIsClose from "./TodayIsClose.vue";
import TodayIsMain from "./TodayIsMain.vue";
export default {
  components: {
    TodayIsMain,
    TodayIsClose,
  },
  data() {
    return {
      page: 1,
    };
  },
};
</script>

<style scoped></style>
