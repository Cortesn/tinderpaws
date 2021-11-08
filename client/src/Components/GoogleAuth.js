
import React, {useEffect} from 'react'
import { api, setToken } from '../helperFunctions/axiosInstace'


const GoogleAuth = (props) => {
    const { setGAlert, type } = props

    // https://developers.google.com/identity/sign-in/web/build-button 
    function onSuccess(googleUser) {
        // https://developers.google.com/identity/sign-in/web/backend-auth
        const id_token = googleUser.getAuthResponse().id_token
        googleUser.disconnect()
        api.defaults.headers.common['x-auth-token'] = id_token
        api.post(`/${type}/google`)
            .then(response => {
                setToken(response.data.token)
                // *********
                // need to fix this. infinite page render/request due to state
                setGAlert({error: null, success: 'Success!'})
                // could check auth state and direct to pagebased on id type
                window.location = '/'
            })
            .catch(error => {
                console.log(error.response)
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
                    'width': 378,
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
