import { useState, useEffect } from "react";
import { api, setToken, removeTokenLogout } from "../helperFunctions/axiosInstace";

// hook to manage login/signup authenication state
const useAuthState = (initialValue) => {
    const [authValues, setAuthValues] = useState(initialValue)

    // toggle to auth state to trigger the re render and api call
    const handleAuthChange = () => {
        setAuthValues({ ...authValues, isAuth : !authValues.isAuth })
    }

    // check if valid token and load user or admin information
    useEffect( () => {
        // if token exists in local storage
        if (localStorage.getItem('token')){
            // set headers
            setToken(localStorage.token)
            // check if user is authenticated
            api.get('/auth')
                .then( response => {
                    // set state here
                    var data = response.data
                    data.isAuth = true
                    data.loading = false
                    setAuthValues(data)
                })
                .catch( error => {
                    console.log(error)
                    removeTokenLogout()
                })
        } else {
            // remove values from state
            setAuthValues({
                user_id: '', 
                shelter_id: '',
                employee_id: '',
                email: '', 
                isAuth: false,
                loading: true
            })
        }

    }, [authValues.isAuth]) // monitor if auth changes to false then remove other data

    return [authValues, handleAuthChange]
}

export default useAuthState