import React, { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  useEffect(() => {
    axios.get("/api/hello").then((res) => {
      console.log("서버로부터 메시지 도착");
      console.log(res);
    });
  }, []);
  return (
    <div>
      <p>LandingPage</p>
    </div>
  );
}

export default LandingPage;
