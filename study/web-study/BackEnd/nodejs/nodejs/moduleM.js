var M = {
  v: "v",
  f: function () {
    console.log(this.v);
  },
};

// module.exports = M
// M이 가리키는 객체를 모듈 바깥에서 사용할 수 있도록 export 한다는 의미
module.exports = M;
