import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { Box, CircularProgress } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '85%',
    bgcolor: 'background.paper',
};

const Progress =() => (
    <Box sx={style}>
        <CircularProgress />
    </Box>
)

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
    return (
        <Route
            {...rest}
            render={props =>
                auth.isAuth && auth.loading ? 
                ( <Progress /> ) :
                allowedScreens(auth, props.location.pathname) ? 
                ( <Component {...props}/>) : 
                ( <Redirect
                    to={{
                        pathname: "/unauthorized",
                        state: { from: props.location }
                    }}/>
                )
            }
        />
    )
}

export default AuthRoute
