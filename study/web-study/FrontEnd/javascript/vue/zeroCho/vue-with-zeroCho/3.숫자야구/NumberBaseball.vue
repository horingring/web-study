<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm">
      <input type="text" ref="inputRef" minlength="4" maxlength="4" v-model="input" />
      <button type="submit">입력</button>
    </form>
    <div>시도: {{tries.length}}</div>
    <ul>
      <li v-for="t in tries">
        <div>{{t.try}}</div>
        <div>{{t.result}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tries: [],
      input: "",
      result: "",
    };
  },
  methods: {
    onSubmitForm(e) {
      // e.preventDefault();  
      //  ㄴ> form의 v-on:submit 속성에 .prevent를 추가함으로써 역할을 대신함
      this.tries.push({
        try: this.input,
        result: '홈런',
      });
      this.input = '';
      this.$refs.inputRef.focus();
    },
  },
};
</script>

<style></style>
