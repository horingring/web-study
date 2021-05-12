<template>
  <div>
    <header :class="headerClassObj">
      <section>
        <div class="menu-btn-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <router-link to="/" @click.native="onChangePage('homePage')">
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
          <router-link
            to="/about/commitment"
            @click.native="onChangePage('commitmentPage')"
          >
            <span class="header-link">Commitment</span>
          </router-link>
          <router-link
            to="/makeupyourlife"
            @click.native="onChangePage('makeupyourlifePage')"
          >
            <span class="header-link">기업 사회 공헌</span>
          </router-link>
          <router-link
            to="/campaign"
            @click.native="onChangePage('campaignPage')"
          >
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
import store, {
  CHANGE_PAGE,
  CHANGE_SCROLL_NUM,
  TOGGLE_SCROLL_LOCK,
} from "./store";
import router from "./router/routes";
import HomePage from "./components/main-page/HomePage/HomePage";

export default {
  store,
  router,
  components: {
    HomePage,
  },
  computed: {
    ...mapState(["page", "scrollNum", "scrollLock"]),
    headerClassObj() {
      return {
        "white-background": !(
          this.page === "homePage" &&
          (this.scrollNum == 1 || this.scrollNum == 3)
        ),
        "no-background":
          this.page === "homePage" &&
          (this.scrollNum == 1 || this.scrollNum == 3),
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    onChangePage(pageName) {
      this.goToTop();
      this.$store.commit(CHANGE_PAGE, pageName);
    },
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
              setTimeout(() => {
                document.querySelector("header").classList.add("top");
              }, 10);
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
