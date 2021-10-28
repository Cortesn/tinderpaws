import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import SignupPage from "./screens/SignupPage";
import {LoginScreen}  from "./screens/LoginScreen";
import { UserPage } from "./screens/UserPage";
import Navbar from "./Components/navbar/Navbar.js";
import AdminEditPetPage from "./screens/AdminEditPetPage";
// import NewsFeed from "./screens/NewsFeed";
import Logout from "./Components/Logout";
import useAuthState from "./hooks/useAuthState";
import ResetPassword from "./screens/ResetPassword";

const App = () => {

    const [authValues] = useAuthState({
        user_id: '', 
        shelter_id: '',
        employee_id: '',
        email: '', 
        auth: false
    })

    return (
        <Router>
            <Navbar account={authValues}/>

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
                    <Logout />
                </Route>
                <Route exact path="/resetPassword">
                    <ResetPassword />
                </Route>
            </Switch>
        </Router>
    )
}

export default App
