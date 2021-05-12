import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/main-page/HomePage/HomePage";
import AboutPage from "../components/main-page/AboutPage/AboutPage";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    // { path: "/number-baseball", component: NumberBaseball },
    // { path: "/number-baseball", component: NumberBaseball },
    { path: "/about/:aboutPages", component: AboutPage },
    { path: "/", component: HomePage },
  ],
});
