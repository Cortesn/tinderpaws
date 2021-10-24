import React, { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import SignupPage from "./screens/SignupPage";
import {LoginScreen}  from "./screens/LoginScreen";
import { UserPage } from "./screens/UserPage";
import Navbar from "./Components/navbar/Navbar.js";
import AdminEditPetPage from "./screens/AdminEditPetPage";
// import NewsFeed from "./screens/NewsFeed";
import { api, setToken } from "./helperFunctions/axiosInstace";
import Logout from "./Components/Logout";


function App() {
  const [values, setValues] = useState({user_id: '', email: '', auth: false})
  // console.log(values)

  const handleLogout = () => {
    setValues({user_id: '', email: '', auth: false})
  }

  // check if valid token and load user or admin information
  useEffect( () => {
    setToken(localStorage.token)
    // check if user is authenticated
    api.get('/auth')
      .then(function(response){
        // set state here
        var data = response.data
        data.auth = true
        // console.log(data)
        setValues(data)
      })
      .catch(function(error){
        // console.log(error)
        // set axios interceptors to handle browser errors
      })

  }, [])

  return (
    <Router>
    {/* <div className="App"> */}
      <Navbar user={values}/>
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
          <Route path="/admin/editpet">
            <AdminEditPetPage />
          </Route>
          <Route exact path="/logout">
            <Logout handleLogout={handleLogout}/>
          </Route>
        </Switch>
      {/* </div> */}
    {/* </div> */}
  </Router>
  )
}
export default App;