<template>
  <main class="about-page">
    <section>
      <h1>About Us</h1>
      <p>
        우리만이 창조할 수 있는 아름다움으로 여성의 삶을 아름답게 하는 것을
        우리의 소명으로 생각합니다.<br />
        ‘A MORE Beautiful World’라는 비전 아래 모든 여성들이 저마다 꿈꾸는 삶을
        누리며 더 아름다운 세상을 만들어 갈 수<br />
        있도록 여성의 아름다운 삶에 기여합니다.
      </p>
    </section>
    <section>
      <ul>
        <li>
          <router-link to="/about/vision">
            <div>Vision</div>
          </router-link>
        </li>
        <li>
          <router-link to="/about/commitment">
            <div>Commitment</div>
          </router-link>
        </li>
        <li class="last">
          <router-link to="/about/foundation">
            <div>공익재단</div>
          </router-link>
        </li>
      </ul>
      <div class="about_banner">
        <span>{{ currentAboutPage }}</span>
      </div>
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
import { mapState } from "vuex";
import store, { CHANGE_COMMITMENT_PAGE } from "../../../store";

export default {
  store,
  computed: {
    ...mapState(["aboutPage"]),
    currentAboutPage() {
      let currentAboutPage = this.aboutPage.page;
      if (currentAboutPage === "foundation") {
        currentAboutPage = "공익재단";
      }
      return currentAboutPage;
    },
  },
};
</script>
