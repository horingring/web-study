import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const CHANGE_SCROLL_NUM = "CHANGE_SCROLL_NUM";
export const PLUS_SCROLL_NUM = "PLUS_SCROLL_NUM";
export const MINUS_SCROLL_NUM = "MINUS_SCROLL_NUM";

export default new Vuex.Store({
  state: {
    scrollNum: 1,
  },
  getters: {},
  mutations: {
    [CHANGE_SCROLL_NUM](state, num) {
      state.scrollNum = num;
    },
    [PLUS_SCROLL_NUM](state) {
      state.scrollNum += 1;
    },
    [MINUS_SCROLL_NUM](state) {
      state.scrollNum -= 1;
    },
  },
  actions: {},
});
