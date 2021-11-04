import { useState, useEffect } from "react";
import { api, setToken } from "../helperFunctions/axiosInstace";

// hook to manage login/signup authenication state
const useAuthState = (initialValue) => {
    const [authValues, setAuthValues] = useState(initialValue)

    // toggle to auth state
    const handleAuthChange = () => {
        setAuthValues({ ...authValues, [authValues.auth]: !authValues.auth })
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
                    data.auth = true
                    // console.log(data)
                    setAuthValues(data)
                })
                .catch( error => {
                    // console.log(error)
                    // set axios interceptors to handle browser errors
                })
        } else {
            // remove values from state
            setAuthValues({
                user_id: '', 
                shelter_id: '',
                employee_id: '',
                email: '', 
                auth: false
            })
        }

    }, [authValues.auth]) // monitor if auth changes to false then remove other data

    return [authValues, handleAuthChange]
}

export default useAuthState