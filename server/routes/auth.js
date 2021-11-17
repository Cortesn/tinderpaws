import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
import auth from '../middleware/auth.js'
import { OAuth2Client } from 'google-auth-library'

// route used to authenticate user as they move about the webpage
// should be called on every "protected route"
router.get('/', auth, (req, res) => {
    const user = req.user
    if (user.user_id){
        var id = user.user_id
        var findUser = 'SELECT user_id, email FROM Users WHERE user_id=?'
    }else if (user.shelter_id){
        id = user.shelter_id
        findUser = 'SELECT shelter_id, email FROM Shelters WHERE shelter_id=?'
    }else if (user.employee_id){
        id = user.employee_id
        findUser = 'SELECT employee_id, email FROM Employees WHERE employee_id=?'
    } else {
        return res.status(401).json({ msg : 'Invalid credentials' })
    }

    db.query( findUser, [id],  (error, results)  => {
        if (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Server error. Please try again later' })
        } else if (results.length <= 0){
            // console.log(results)
            return res.status(401).json({ msg : 'Invalid credentials' })    
        } else {
            // console.log('auth')
            return res.json(results[0])
        }
    }) 
})


// Google OAuth
router.post('/google', async (req, res) => {
    const idToken = req.header('x-auth-token')
    const client = new OAuth2Client(process.env.GAPI_CLIENT_ID)
    const ticket = await client.verifyIdToken({
        idToken: idToken,
        audience: process.env.GAPI_CLIENT_ID
    })
    const payload = ticket.getPayload()
    console.log(payload)
})





export {router as auth}
