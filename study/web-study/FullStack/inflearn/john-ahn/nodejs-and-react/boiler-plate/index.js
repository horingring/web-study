const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const { User } = require("./models/User");

//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있도록 함
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 타입으로 된 데이터를 분석해서 가져올 수 있도록 하기 위함
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) =>
  res.send("Hello World! 하이하이 하이하이 노드몬 하이!!!!")
);

app.post("/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 db에 넣어준다.

  //bodyParser가 있는 덕분에 req.body로 간단히 요청(req)의 body를 불러올 수 있는 것임
  const user = new User(req.body);

  //save 메소드를 사용하면 db의 model에 데이터가 저장됨. 이후 callback 호출
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/login", (req, res) => {
  //요청된 이메일이 데이터베이스에 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    //요청된 이메일이 db에 있다면 요청된 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 어디에? 쿠키 or 로컬스토리지
        res
          .cookie("x-auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
