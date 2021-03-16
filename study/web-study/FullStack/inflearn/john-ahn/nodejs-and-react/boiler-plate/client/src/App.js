import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">LandingPage</Link>
          </li>
          <li>
            <Link to="/login">LoginPage</Link>
          </li>
          <li>
            <Link to="/register">RegisterPage</Link>
          </li>
        </ul>

        <hr></hr>

        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/login" component={LoginPage}></Route>
          <Route exact path="/register" component={RegisterPage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <div>
      <h2>Home 안녕하세요</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About 안녕하세요</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard 안녕하세요</h2>
    </div>
  );
}
