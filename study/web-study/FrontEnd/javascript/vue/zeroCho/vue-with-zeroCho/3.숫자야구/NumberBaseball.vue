<template>
  <div>
    <h1>{{ result }}</h1>
    <form v-on:submit="onSubmitForm">
      <input type="text" ref="inputRef" maxlength="4" v-model="input" />
    </form>
    <div>시도: {{}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      result: "",
    };
  },
  methods: {
    onSubmitForm(e) {
      e.preventDefault();
    },
  },
};
</script>

<style></style>
