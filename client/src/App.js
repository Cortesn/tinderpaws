import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./screens/HomePage";
import MissionPage from "./screens/MissionPage";
import SignupPage from "./screens/SignupPage";
import { LoginScreen } from "./screens/LoginScreen";
import { UserPage } from "./screens/UserPage";
import Navbar from "./Components/navbar/Navbar.js";
import AdminEditPetPage from "./screens/AdminEditPetPage";
import NewsFeed from "./screens/NewsFeed";
import { AdminPage } from "./screens/AdminPage";
import ResetPassword from './screens/ResetPassword';
import Logout from "./Components/Logout";
import AdminHome from "./screens/AdminHome";
import UserHome from "./screens/UserHome";
import useAuthState from "./hooks/useAuthState";

const App = () => {
	const [authValues] = useAuthState({
		user_id: "",
		shelter_id: "",
		employee_id: "",
		email: "",
		auth: false,
	});
	return (
		<Router>
			<Navbar account={authValues} />
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/mission" component={MissionPage} />
				<Route exact path="/login" component={LoginScreen} />
				<Route exact path="/user" component={UserPage} />
				<Route exact path="/signup" component={SignupPage} />
				<Route exact path="/admin/edit/:pet_id" component={AdminEditPetPage} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/admin" render={() => <AdminPage />} />
				<Route path="/userHome/:id" component={UserHome}/>
				<Route path="/adminHome/:id" component={AdminHome}/>
				<Route exact path="/logout" component={Logout}/>
				<Route path="/newsFeed" component={NewsFeed}/>
        <Route path="/resetPassword/email/:email/reset_key/:reset_key" component={ResetPassword}/>
			</Switch>
		</Router>
	);
};
export default App;
