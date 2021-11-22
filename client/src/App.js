import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import SignupPage from "./screens/SignupPage";
import LoginScreen from "./screens/LoginScreen";
import Navbar from "./Components/navbar/Navbar.js";
import AdminEditPetPage from "./screens/AdminEditPetPage";
import NewsFeed from "./screens/NewsFeed";
import { AdminPage } from "./screens/AdminPage";
import ResetPassword from './screens/ResetPassword';
import Logout from "./Components/Logout";
import AdminHome from "./screens/AdminHome";
import AddPet from "./screens/AddPet";
import UserHome from "./screens/UserHome";
import useAuthState from "./hooks/useAuthState";
import NotFound404 from "./screens/NotFound404";
import NotAuth401 from "./screens/NotAuth401"
import AuthRoute from "./Components/AuthRoute";

const App = () => {
	const [authValues, handleAuthChange] = useAuthState({
		user_id: "",
		shelter_id: "",
		employee_id: "",
		email: "",
		isAuth: false,
		loading: true
	});

	return (
		<Router>
			<Navbar account={authValues} />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/mission" component={MissionPage} />
				<Route exact path="/signin" render={props => authValues.isAuth ? <HomePage/> : <LoginScreen {...props} handleAuthChange={handleAuthChange}/>} />
				<Route exact path="/signup" render={props => authValues.isAuth ? <HomePage/> : <SignupPage {...props} handleAuthChange={handleAuthChange}/>} />
				<Route exact path="/signout" render={props => <Logout {...props} handleAuthChange={handleAuthChange} />} />
				<AuthRoute exact path="/news" component={NewsFeed} auth={authValues} handleAuthChange={handleAuthChange} />
				<AuthRoute exact path="/userHome" component={UserHome} auth={authValues}/>
				<Route exact path="/admin/edit/:pet_id" component={AdminEditPetPage} />
				<Route exact path="/adminHome/:id/pets" render={() => <AdminPage />} />
				<Route exact path="/addpet" component={AddPet}/>
				<Route exact path="/adminHome" component={AdminHome}/>
        		<Route exact path="/resetPassword/email/:email/reset_key/:reset_key" component={ResetPassword}/>
				<Route path='/unauthorized' component={NotAuth401} />
				<Route path="*" component={NotFound404} />
			</Switch>
		</Router>
	);
};
export default App;



