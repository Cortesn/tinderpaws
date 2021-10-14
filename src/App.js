import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import {LoginScreen}  from "./screens/LoginScreen";


function App() {
  return (
    <Router>
    <div className="App">
      {/* <Navbar /> */}
      <div className="content">
        {/* can be a string, int, float, array, even math.random */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/mission">
            <MissionPage />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  )
  }
export default App;
