import config from 'config'
import jwt from 'jsonwebtoken'

// middileware function to verify token i.e. user is logged in
const auth = (req, res, next) => {
    // get the token
    const token = req.header('x-auth-token')
    // no token in the header
    if (!token){
        return res.status(401).json({msg: 'Please login'})
    }
    // if there is a token check if valid
    try {
        // read to token and set the user prop in the request
        const decode = jwt.verify(token, config.get('jwtSecret'));
        req.user = decode.user;

        next() // continue with the request

    } catch (error){
        // token exists but is expired or invalid
        return res.status(401).json({msg: 'Token is invalid or expired.'})
        // have client render the login page
    }
}

export default auth