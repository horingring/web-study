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
