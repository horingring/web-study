import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../components/main-page/HomePage/HomePage";
import AboutPage from "../components/main-page/AboutPage/AboutPage";
import VisionPage from "../components/main-page/AboutPage/inner-pages/VisionPage";
import CommitmentPage from "../components/main-page/AboutPage/inner-pages/CommitmentPage";
import FoundationPage from "../components/main-page/AboutPage/inner-pages/FoundationPage";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    // { path: "/number-baseball", component: NumberBaseball },
    // { path: "/number-baseball", component: NumberBaseball },
    {
      path: "/about",
      component: AboutPage,
      children: [
        { path: "vision", component: VisionPage },
        { path: "commitment", component: CommitmentPage },
        { path: "foundation", component: FoundationPage },
      ],
    },
    { path: "/", component: HomePage },
  ],
});
