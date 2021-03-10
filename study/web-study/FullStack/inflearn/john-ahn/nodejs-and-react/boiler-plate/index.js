const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

//application/x-www-form-urlencoded 이렇게 된 데이터를 분석해서 가져올 수 있도록 함
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 타입으로 된 데이터를 분석해서 가져올 수 있도록 하기 위함
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://horingring:abcd1234@horingcluster.is1qc.mongodb.net/HoringCluster?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World! 하이하이 하이하이!!!!"));

app.post("/register", (req, res) => {
  //회원가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 db에 넣어준다.

  //bodyParser가 있는 덕분에 req.body로 간단히 요청(req)의 body를 불러올 수 있는 것임
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
