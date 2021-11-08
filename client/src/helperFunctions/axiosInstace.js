import axios from 'axios'

// set URL and headers
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type' : 'application/json',
    }
});

// set auth token
const setToken = (token) => {
    if(token){
        // set header tokens
        // use x-auth-token instead -> similar to OAuth2.0
        instance.defaults.headers.common['x-auth-token'] = token
        // instance.defaults.headers.common['Authorization'] = token
        // set local storage tokens
        localStorage.setItem('token', token)
    } else {
        delete instance.defaults.headers.common['x-auth-token']
        // delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem('token')
    }
}

// remove the azios header token and the local storage token
const removeTokenLogout = () =>{
    delete instance.defaults.headers.common['x-auth-token']
    localStorage.removeItem('token')
}

// look up setting a refresh token

// catch response coming from server auth.middleware with 401 unathenticated status
// https://www.npmjs.com/package/axios#interceptors
// instance.interceptors.response.use(function(response){
//     // 2xx repsonse codes
// }, function(error){
//     // anything not 2xx
//     if (error.response.status === 401) {
//         // user is not authenticated . logout user

//     }
//     return Promise.reject(error)
// })

export {instance as api}
export {setToken, removeTokenLogout}