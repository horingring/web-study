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
let scrollLock = false;

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
  data() {
    return {
      scrollNum: 1,
      scrollPages: [1, 2, 3, 4],
    };
  },
  computed: {
    isEven() {
      return {
        even: this.scrollNum == 2 || this.scrollNum == 4,
      };
    },
  },
  methods: {
    changeScrollNum() {
      this.$emit("changeScrollNum", this.scrollNum);
    },
    onClickSideNavi(num) {
      if (scrollLock) return;
      scrollLock = true;
      this.scrollNum = num;
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
              scrollLock = false;
            },
          }
        );
      this.$emit("changeScrollNum", this.scrollNum);
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
    window.addEventListener("wheel", (e) => {
      if (wheelLock) return;
      if (e.deltaY > 0 && homePageVm.scrollNum < 4) {
        // wheel down
        console.log("wheel down");
        homePageVm.scrollNum += 1;
        homePageVm.changeScrollNum();
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
      } else if (e.deltaY < 0 && homePageVm.scrollNum > 1) {
        // wheel up
        console.log("wheel up");
        homePageVm.scrollNum -= 1;
        homePageVm.changeScrollNum();
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
    });

    //scroll 이벤트
    window.addEventListener("scroll", (e) => {
      if (wheelLock || scrollLock) return;
      let scrollTop = window.pageYOffset;
      if (
        scrollTop >= 0 &&
        scrollTop < getDivTop("scroll2") - window.innerHeight / 2 - 1
      ) {
        homePageVm.scrollNum = 1;
        homePageVm.changeScrollNum();
        console.log(homePageVm.scrollNum);
      } else if (
        scrollTop >= getDivTop("scroll2") - window.innerHeight / 2 - 1 &&
        scrollTop < getDivTop("scroll3") - window.innerHeight / 2 - 1
      ) {
        homePageVm.scrollNum = 2;
        homePageVm.changeScrollNum();
        console.log(homePageVm.scrollNum);
      } else if (
        scrollTop >= getDivTop("scroll3") - window.innerHeight / 2 - 1 &&
        scrollTop < getDivTop("scroll4") - window.innerHeight / 2 - 1
      ) {
        homePageVm.scrollNum = 3;
        homePageVm.changeScrollNum();
        console.log(homePageVm.scrollNum);
      } else {
        homePageVm.scrollNum = 4;
        homePageVm.changeScrollNum();
        console.log(homePageVm.scrollNum);
      }
    });
  },
  updated() {},
};
</script>
