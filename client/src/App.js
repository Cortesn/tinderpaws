import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import SignupPage from "./screens/SignupPage";
import {LoginScreen}  from "./screens/LoginScreen";
import { UserPage } from "./screens/UserPage";
import Navbar from "./Components/navbar/Navbar.js";
import AdminEditPetPage from "./screens/AdminEditPetPage";
import NewsFeed from "./screens/NewsFeed";
import { AdminPage } from "./screens/AdminPage";

function App() {
  return (
    <Router>
    {/* <div className="App"> */}
      <Navbar />
      {/* <div className="content"> */}
        {/* can be a string, int, float, array, even math.random */}
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/mission">
            <MissionPage />
          </Route>
          <Route exact path="/login">
            <LoginScreen />
          </Route>
          <Route exact path="/user">
            <UserPage/>
          </Route>
          <Route exact path="/signup">
            <SignupPage />
          </Route>
          <Route exact path="/admin/editpet">
            <AdminEditPetPage />
          </Route>
          <Route exact path="/admin" render={()=> <AdminPage/>}/>
        </Switch>
      {/* </div> */}
    {/* </div> */}
  </Router>
  )
}
export default App;