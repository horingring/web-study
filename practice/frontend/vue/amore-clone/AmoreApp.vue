<template>
  <div>
    <header :class="headerClassObj">
      <section>
        <div class="menu-btn-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <router-link to="/" @click.native="goToTop">
          <div class="logo">
            <p>A MORE<br />BEAUTIFUL<br />WORLD</p>
          </div>
        </router-link>
      </section>
      <section>
        <div class="language-box">
          <span class="language korean">한국어</span>
          <span>|</span>
          <span class="language english">ENGLISH</span>
        </div>
        <div class="header-link-box">
          <router-link to="/commitment">
            <span class="header-link">Commitment</span>
          </router-link>
          <router-link to="/makeupyourlife">
            <span class="header-link">기업 사회 공헌</span>
          </router-link>
          <router-link to="/campaign">
            <span class="header-link">Meet Us</span>
          </router-link>
        </div>
      </section>
    </header>

    <router-view></router-view>
    <!-- <home-page
      v-if="page === 'home-page'"
      @changeScrollNum="changeScrollNum"
    ></home-page> -->
    <!-- <about-page v-else-if="page === 'about-page'"></about-page> -->
    <footer></footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store, { CHANGE_SCROLL_NUM, TOGGLE_SCROLL_LOCK } from "./store";
import router from "./router/routes";
import HomePage from "./components/main-page/HomePage";

export default {
  store,
  router,
  components: {
    HomePage,
  },
  computed: {
    ...mapState(["scrollNum", "scrollLock"]),
    headerClassObj() {
      return {
        "white-background": this.scrollNum == 2 || this.scrollNum == 4,
        "no-background": this.scrollNum == 1 || this.scrollNum == 3,
      };
    },
  },
  data() {
    return {
      page: "home-page",
    };
  },
  methods: {
    goToTop() {
      const rootVm = this;

      // scrollTo(0, 0);
      this.$store.commit(TOGGLE_SCROLL_LOCK, true);
      $("html, body")
        .stop()
        .animate(
          { scrollTop: 0 },
          {
            duration: 600,
            complete: function() {
              rootVm.$store.commit(CHANGE_SCROLL_NUM, 1);
              rootVm.$store.commit(TOGGLE_SCROLL_LOCK, false);
              document.querySelector("header").classList.add("top");
            },
          }
        );
    },
  },
  mounted() {
    document.querySelector("header").classList.add("top");
  },
};
</script>
