import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const CHANGE_PAGE = "CHANGE_PAGE";
export const CHANGE_SCROLL_NUM = "CHANGE_SCROLL_NUM";
export const PLUS_SCROLL_NUM = "PLUS_SCROLL_NUM";
export const MINUS_SCROLL_NUM = "MINUS_SCROLL_NUM";
export const TOGGLE_SCROLL_LOCK = "TOGGLE_SCROLL_LOCK";
export const TOGGLE_WHEEL_LOCK = "TOGGLE_WHEEL_LOCK";
export const CHANGE_COMMITMENT_PAGE = "CHANGE_COMMITMENT_PAGE";

export default new Vuex.Store({
  state: {
    page: "homePage",
    scrollNum: 1,
    scrollLock: false,
    wheelLock: false,
    aboutPage: {
      page: "Vision",
    },
  },
  getters: {},
  mutations: {
    [CHANGE_PAGE](state, pageName) {
      state.page = pageName;
    },
    [CHANGE_SCROLL_NUM](state, num) {
      state.scrollNum = num;
    },
    [PLUS_SCROLL_NUM](state) {
      state.scrollNum += 1;
    },
    [MINUS_SCROLL_NUM](state) {
      state.scrollNum -= 1;
    },
    [TOGGLE_SCROLL_LOCK](state, bool) {
      state.scrollLock = bool;
    },
    [TOGGLE_WHEEL_LOCK](state, bool) {
      state.wheelLock = bool;
    },
    [CHANGE_COMMITMENT_PAGE](state, pageName) {
      state.aboutPage.page = pageName;
    },
  },
  actions: {},
});
