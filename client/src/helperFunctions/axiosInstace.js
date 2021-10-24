import axios from 'axios'

// set URL and headers
const instance = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'Content-type' : 'application/json'
    }
});

// set auth token
const setToken = (token) => {
    if(token){
        // set header tokens
        instance.defaults.headers.common['Authorization'] = token
        // set local storage tokens
        localStorage.setItem('token', token)
    } else {
        delete instance.defaults.headers.common['Authorization']
        localStorage.removeItem('token')
    }
}

// look up setting a refresh token

// may also use axios interceptors but not sure how they work yet.
// https://www.npmjs.com/package/axios#interceptors

export {instance as axios}
export {setToken}