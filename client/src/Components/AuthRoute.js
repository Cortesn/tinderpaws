import React from 'react'
import { Route, Redirect } from "react-router-dom";


// check if user is authorized to content
const allowedScreens = (auth, path) => {
    if (!auth.isAuth) {
        return false
    } else if (path.includes('news')) {
        return true
    } else if (path.includes('userHome') && auth.user_id) {
        return true
    } else if (path.includes('adminHome', 'admin', 'addpet') && (auth.employee_id || auth.shelter_id)) {
        return true
    } else {
        return false
    }
}


// route to verify auth state
const AuthRoute = ({ component: Component, auth, ...rest }) => {

    return(
        <Route
            {...rest}
            render={props =>
                allowedScreens(auth, props.location.pathname) ? (
                <Component {...props}/>
                ) : (
                <Redirect
                    to={{
                        pathname: "/unauthorized",
                        state: { from: props.location }
                    }}
                />
                )
            }
        />
    )
}

export default AuthRoute
