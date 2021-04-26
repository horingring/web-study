<template>
  <div id="main-page">
    <section id="main-sec1">
      <div>안녕하세요!</div>
      <div>{{ getMent }}</div>
    </section>
    <section id="main-sec2">
      <div><small>오늘은</small></div>
      <section class="day-con">
        <b>{{ today.month }}</b>
        <span>월</span>
        <b>{{ today.date }}</b>
        <span>일</span>
        <b>{{ today.day }}</b>
        <span>요일</span>
        <small>입니다</small>
      </section>
    </section>
    <section id="main-sec3">
      <div>{{ todayTemp.city }}의 날씨는 {{ todayTemp.weather }}</div>
      <div>
        최고기온 {{ todayTemp.highTemp }} / 최저 {{ todayTemp.lowTemp }} 입니다!
      </div>
    </section>
  </div>
</template>

<script>
// const API_KEY = "";
const COORDS = "coords";

export default {
  data() {
    return {
      ment: [
        "오늘도 희망찬 하루가 되길!",
        "잘 해왔고, 잘 하고 있고, 잘 할 거예요!",
        "잠은 잘 주무셨나요?",
      ],
      today: {
        month: "1",
        date: "1",
        day: "월",
      },
      todayTemp: {
        city: "",
        weather: "",
        highTemp: "",
        lowTemp: "",
      },
    };
  },
  computed: {
    getMent() {
      const todayOfMent = Math.round(Math.random() * (this.ment.length - 1));
      return this.ment[todayOfMent];
    },
  },
  methods: {
    getNow() {
      const today = new Date();
      this.today.month = today.getMonth() + 1;
      this.today.date = today.getDate();
      const day = today.getDay();
      switch (day) {
        case 1:
          this.today.day = "월";
          break;
        case 2:
          this.today.day = "화";
          break;
        case 3:
          this.today.day = "수";
          break;
        case 4:
          this.today.day = "목";
          break;
        case 5:
          this.today.day = "금";
          break;
        case 6:
          this.today.day = "토";
          break;
        case 7:
          this.today.day = "일";
          break;
      }
    },

    //날씨정보 얻어오기(use weather API, 매개변수: 위도, 경도)
    getWeather(lat, lng) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          const tempObj = json.main;
          const place = json.name;
          this.todayTemp.city = place;
          this.todayTemp.highTemp = tempObj.temp_max - 273.15;
          this.todayTemp.lowTemp = tempObj.temp_min - 273.15;
        });
    },

    //localStorage에 저장
    saveCoords(coordsObj) {
      localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    },

    //요청 수락
    handleGeoSuccess(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const coordsObj = {
        latitude,
        longitude,
      };
      this.saveCoords(coordsObj); //localStorage에 저장 함수 호출
    },

    //요청 거절
    handleGeoError() {
      console.log("요청이 거절됨");
    },

    //사용자 위치 요청(요청 수락, 요청 거절)
    askForCoords() {
      navigator.geolocation.getCurrentPosition(
        this.handleGeoSuccess,
        this.handleGeoError
      );
    },

    //좌표 불러오기
    loadCoords() {
      const loadedCoords = localStorage.getItem(COORDS); //localStorage에서 위치정보 가져옴
      if (loadedCoords === null) {
        this.askForCoords();
      } else {
        const parseCoords = JSON.parse(loadedCoords); //json형식을 객체 타입으로 바꿔서 저장
        this.getWeather(parseCoords.latitude, parseCoords.longitude); //날씨요청 함수 호출
      }
    },
  },
  mounted() {
    this.loadCoords();
    this.getNow();
  },
};
</script>

<style scoped></style>
