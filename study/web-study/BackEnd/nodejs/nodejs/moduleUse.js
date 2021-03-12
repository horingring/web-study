/*
  var M = {
    v: "v",
    f: function () {
      console.log(this.v);
    },
  };

  M.f();
*/

//다음 코드는 위와 같다.
var part = require("./moduleM.js");
part.f();
