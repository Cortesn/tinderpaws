import React from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import { removeTokenLogout } from "../helperFunctions/axiosInstace"

// clears tokens set in axios head, loacalstorage, and replaces history with /login
// to prevent from using browser back to access previous state before logout
// used withRouter wrapper 
// https://stackoverflow.com/questions/42701129/how-to-push-to-history-in-react-router-v4#:~:text=Use%20the%20withRouter%20high-order%20component
const Logout = (props) => {
    // const { handleLogout } = props
    removeTokenLogout()
    // update state
    // handleLogout()
    // send back to login page
    return <Redirect to="/login" push={true}/>
}

export default withRouter(Logout)
