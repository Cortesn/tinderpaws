import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import {LoginScreen}  from "./screens/LoginScreen";
import AdminHome from "./screens/adminHome";
import UserHome from "./screens/UserHome";


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
          <Route path="/userHome/:id">
            <UserHome />
          </Route>
          <Route path="/adminHome/:id">
            <AdminHome />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  )
  }
export default App;
