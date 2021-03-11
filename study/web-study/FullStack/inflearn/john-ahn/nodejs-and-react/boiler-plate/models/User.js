const mongoose = require("mongoose");

//bcrypt를 통해 hash를 만들기 위해서는, salt가 필요.
const bcrypt = require("bcrypt");
const saltRounds = 10; //salt를 만들기 위해 필요한 값.

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//index.js에서 db로 save를 하기 전에 실행되도록 하는 메소드(on)
//아래에서 callback에 들어오는 next는 save함수 로직이다.
userSchema.pre("save", function (next) {
  var user = this;

  /*
    user가 password가 아닌 다른 정보(email 등)만을 변경했을 때
    또 다시 비밀번호 hash가 일어나면 안되므로 조건을 걸어준다.
  */
  if (user.isModified("password")) {
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
