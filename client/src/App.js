import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import {LoginScreen}  from "./screens/LoginScreen";
import SignupPage from "./screens/SignupPage";
import AdminHome from "./screens/AdminHome";
import UserHome from "./screens/UserHome";
import Navbar from "./Components/navbar/Navbar.js";
import AdminEditPetPage from "./screens/AdminEditPetPage";

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
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
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/userHome/:id">
            <UserHome />
          </Route>
          <Route path="/adminHome/:id">
            <AdminHome />
          </Route>
          <Route path="/admin/editpet">
            <AdminEditPetPage />
          </Route>
        </Switch>
      </div>
    </div>
  </Router>
  )
  }
export default App;
