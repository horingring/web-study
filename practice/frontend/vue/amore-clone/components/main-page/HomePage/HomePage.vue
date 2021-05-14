<template>
  <main>
    <section class="scroll scroll1"></section>
    <section class="scroll scroll2"></section>
    <section class="scroll scroll3"></section>
    <section class="scroll scroll4"></section>
    <div class="side-navi-box">
      <div
        v-for="(val, idx) in scrollPages"
        :key="idx"
        class="side-navi"
        :class="[`side-navi${val}`, isOn(val), isEven]"
        @click="onClickSideNavi(val)"
      ></div>
      <!-- <div
        class="side-navi side-navi1"
        :class="isOn(1)"
        @click="onClickSideNavi(1)"
      ></div>
      <div
        class="side-navi side-navi2"
        :class="isOn(2)"
        @click="onClickSideNavi(2)"
      ></div>
      <div
        class="side-navi side-navi3"
        :class="isOn(3)"
        @click="onClickSideNavi(3)"
      ></div>
      <div
        class="side-navi side-navi4"
        :class="isOn(4)"
        @click="onClickSideNavi(4)"
      ></div> -->
    </div>
  </main>
</template>

<script>
import { mapState } from "vuex";
import store, {
  CHANGE_SCROLL_NUM,
  PLUS_SCROLL_NUM,
  MINUS_SCROLL_NUM,
  TOGGLE_SCROLL_LOCK,
} from "../../../store";

function getAbsYByVm(vm) {
  let absYByVm = 0;
  for (let i = 1; i < vm.scrollNum; i++) {
    absYByVm += document.querySelector(`.scroll${i}`).clientHeight;
  }

  return absYByVm;
}

function getDivTop(elName) {
  let divTop = 0;
  divTop =
    pageYOffset +
    document.querySelector(`.${elName}`).getBoundingClientRect().top;
  return divTop;
}

export default {
  store,
  data() {
    return {
      scrollPages: [1, 2, 3, 4],
    };
  },
  computed: {
    ...mapState(["scrollNum", "scrollLock"]),
    isEven() {
      return {
        even: this.scrollNum == 2 || this.scrollNum == 4,
      };
    },
  },
  methods: {
    onClickSideNavi(num) {
      const homePageVm = this;
      if (this.scrollLock) return;
      this.$store.commit(TOGGLE_SCROLL_LOCK, true);
      this.$store.commit(CHANGE_SCROLL_NUM, num);
      $("html, body")
        .stop()
        .animate(
          { scrollTop: getAbsYByVm(this) + 1 },
          {
            duration: 600,
            complete: function() {
              if (num == 1) {
                document.querySelector("header").classList.add("top");
              } else {
                document.querySelector("header").classList.remove("top");
              }
            },
          }
        );
      setTimeout(() => {
        homePageVm.$store.commit(TOGGLE_SCROLL_LOCK, false);
      }, 600);
    },
    isOn(val) {
      return {
        on: this.scrollNum === val,
      };
    },
  },

  mounted() {
    const homePageVm = this;
    let wheelLock = false;

    //wheel 이벤트
    window.addEventListener(
      "wheel",
      (e) => {
        if (homePageVm.$root.page !== "homePage") return;

        if (wheelLock) {
          e.preventDefault();
          return;
        }
        if (e.deltaY > 0 && homePageVm.scrollNum < 4) {
          // wheel down
          console.log("wheel down");
          wheelLock = true;
          homePageVm.$store.commit(PLUS_SCROLL_NUM);
          homePageVm.$store.commit(CHANGE_SCROLL_NUM, homePageVm.scrollNum);
          $("html, body")
            .stop()
            .animate(
              { scrollTop: getAbsYByVm(homePageVm) + 1 },
              {
                duration: 600,
                complete: function() {
                  if (homePageVm.scrollNum == 1) {
                    document.querySelector("header").classList.add("top");
                  } else {
                    document.querySelector("header").classList.remove("top");
                  }
                  wheelLock = false;
                },
              }
            );
        } else if (e.deltaY < 0 && homePageVm.scrollNum > 1) {
          // wheel up
          console.log("wheel up");
          homePageVm.$store.commit(MINUS_SCROLL_NUM);
          homePageVm.$store.commit(CHANGE_SCROLL_NUM, homePageVm.scrollNum);
          wheelLock = true;
          $("html, body")
            .stop()
            .animate(
              { scrollTop: getAbsYByVm(homePageVm) + 1 },
              {
                duration: 600,
                complete: function() {
                  if (homePageVm.scrollNum == 1) {
                    document.querySelector("header").classList.add("top");
                  } else {
                    document.querySelector("header").classList.remove("top");
                  }
                  wheelLock = false;
                },
              }
            );
        }
      },
      { passive: false }
    );

    //scroll 이벤트
    window.addEventListener("scroll", (e) => {
      if (homePageVm.$root.page !== "homePage") return;

      if (wheelLock || homePageVm.scrollLock) return;
      let scrollTop = window.pageYOffset;
      if (
        scrollTop >= 0 &&
        scrollTop < getDivTop("scroll2") - window.innerHeight / 2 - 1
      ) {
        homePageVm.$store.commit(CHANGE_SCROLL_NUM, 1);
        console.log(homePageVm.scrollNum);
      } else if (
        scrollTop >= getDivTop("scroll2") - window.innerHeight / 2 - 1 &&
        scrollTop < getDivTop("scroll3") - window.innerHeight / 2 - 1
      ) {
        homePageVm.$store.commit(CHANGE_SCROLL_NUM, 2);
        console.log(homePageVm.scrollNum);
      } else if (
        scrollTop >= getDivTop("scroll3") - window.innerHeight / 2 - 1 &&
        scrollTop < getDivTop("scroll4") - window.innerHeight / 2 - 1
      ) {
        homePageVm.$store.commit(CHANGE_SCROLL_NUM, 3);
        console.log(homePageVm.scrollNum);
      } else {
        homePageVm.$store.commit(CHANGE_SCROLL_NUM, 4);
        console.log(homePageVm.scrollNum);
      }
    });
  },
  updated() {},
};
</script>
