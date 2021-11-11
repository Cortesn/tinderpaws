import React, {useEffect} from 'react'
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material'
import { api, setToken } from '../helperFunctions/axiosInstace'


const GoogleAuth = (props) => {
    const { setGAlert, type, handleAuthChange } = props
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('md')); 

    // https://developers.google.com/identity/sign-in/web/build-button 
    function onSuccess(googleUser) {
        // https://developers.google.com/identity/sign-in/web/backend-auth
        const id_token = googleUser.getAuthResponse().id_token
        googleUser.disconnect()
        api.defaults.headers.common['x-auth-token'] = id_token
        api.post(`/${type}/google`)
            .then(response => {
                setToken(response.data.token)
                setGAlert({error: null, success: 'Success!'})
                // trigger rerender
                handleAuthChange()
                props.history.push('/') // need to add a delay! => renders too fast!
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 400){
                    setGAlert({error: error.response.data.msg, success: null})
                } else if (error.response.status === 401){
                    setGAlert({error: error.response.data.msg, success: null})
                    // delay to see msg
                    window.setTimeout(() => {window.location = '/signup'}, 2000)
                } else {
                    // 500
                    setGAlert({error: error.response.data.msg, success: null})
                }
            })
    }

    function onFailure(error) {
        console.log('error : ', error);
        setGAlert({error: error.error, success: null})
    }

    useEffect(()=> {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                client_id : process.env.REACT_APP_CLIENT_ID,
                scope : 'profile email'
            }).then(
                window.gapi.signin2.render('my-signin2', {
                    'scope': 'profile email',
                    'width': mobile ? 310 : 370,
                    'height': 36,
                    'longtitle': true,
                    'theme': 'dark',
                    'onsuccess': onSuccess,
                    'onfailure': onFailure
                })
            )
        })
    })

    return ( <div id="my-signin2" ></div> )
}

export default GoogleAuth
