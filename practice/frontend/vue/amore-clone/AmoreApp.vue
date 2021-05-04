<template>
  <div>
    <header :class="headerClassObj">
      <section>
        <div class="menu-btn-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div class="logo">
          <p>A MORE<br />BEAUTIFUL<br />WORLD</p>
        </div>
      </section>
      <section>
        <div class="language-box">
          <span class="language korean">한국어</span>
          <span>|</span>
          <span class="language english">ENGLISH</span>
        </div>
        <div class="header-link-box">
          <span class="header-link">Commitment</span>
          <span class="header-link">기업 사회 공헌</span>
          <span class="header-link">Meet Us</span>
        </div>
      </section>
    </header>
    <home-page
      v-if="page === 'home-page'"
      @changeScrollNum="changeScrollNum"
    ></home-page>
    <about-page v-else-if="page === 'about-page'"></about-page>
    <footer></footer>
  </div>
</template>

<script>
import HomePage from "./components/main-page/HomePage";

export default {
  components: {
    HomePage,
  },
  computed: {
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
      scrollNum: 1,
    };
  },
  methods: {
    changeScrollNum(params) {
      this.scrollNum = params;
    },
  },
  mounted() {
    document.querySelector("header").classList.add("top");
  },
};
</script>
