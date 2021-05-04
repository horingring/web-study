import Vue from "vue";

import AmoreApp from "./AmoreApp";
//위 import에서, from '~~.vue' 라고 쓰지 않아도 되는 이유는
// webpack.config.js의 resolve 배열에서 '.vue'를 줬기 때문

new Vue(AmoreApp).$mount("#root");
