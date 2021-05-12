import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/main-page/HomePage";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    // { path: "/number-baseball", component: NumberBaseball },
    // { path: "/number-baseball", component: NumberBaseball },
    { path: "/", component: HomePage },
  ],
});
