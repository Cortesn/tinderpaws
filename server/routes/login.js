import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../Database/dbcon.js'
const db = pool
import { OAuth2Client } from 'google-auth-library'

// user login route
router.post('/', (req,res) => {
    var {email, password} = req.body
    // check if user already exists
    const findUser = 'SELECT user_id, email, password FROM Users WHERE email=?'
    const findShelter = 'SELECT shelter_id, email, password FROM Shelters WHERE email=?'
    const findEmployees = 'SELECT employee_id, email, password FROM Employees WHERE email=?'
    db.query(`${findUser}; ${findShelter}; ${findEmployees}`, [email, email, email], async (error, results)  => {
        if (error){
            // server error
            console.log(error)
            return res.status(400).json({ msg: 'Server error. Please try again later.' })
            // redirect back to login
        } else {
            // user is found
            try{
                const result = await results.filter(arr => arr.length > 0)[0]
                if (!result){
                    // did not find a email match
                    return res.status(400).json({ msg : 'Invalid credentials' })
                }
                // match password
                const isMatch = await bcrypt.compare(password, result[0].password);

                if(!isMatch){
                    return res.status(400).json({ msg : 'Invalid credentials'})
                } else {
                    // password patches generate token
                    if(result[0].user_id){
                        var payload = { user: { user_id : result[0].user_id }}
                    } else if (result[0].shelter_id){
                        payload = { user: { shelter_id : result[0].shelter_id }}
                    } else {
                        payload = { user: { employee_id : result[0].employee_id }}
                    }
                    jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: 360000}, (error, token) => {
                        if (error){
                            console.log(error)
                        } else {
                            // send token back to frontend
                            return res.status(201).json({token}) 
                        }
                    })
                }
            } catch (error){
                console.log(error)
                return res.status(500).json({ msg: 'Server error. Please try again later.' })
            }
        }
    })

})


// Google OAuth login
router.post('/google', async (req, res) => {
    const idToken = req.header('x-auth-token')
    const client = new OAuth2Client(process.env.GAPI_CLIENT_ID)
    // authenticate user
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GAPI_CLIENT_ID
        })
        const payload = ticket.getPayload()
        const findUser = 'SELECT user_id, email, password FROM Users WHERE email=?;'
        const findShelter = 'SELECT shelter_id, email, password FROM Shelters WHERE email=?;'
        const findEmployees = 'SELECT employee_id, email, password FROM Employees WHERE email=?;'
        db.query(`${findUser}${findShelter}${findEmployees}`, [payload.email, payload.email, payload.email], async (error, results)  => {
            if (error){
                // server error log out of google & redirect back to login
                console.log(error)
                return res.status(400).json({ msg: 'Server error. Please try again later.' })
            } else {
                // user is found
                try{
                    const result = await results.filter(arr => arr.length > 0)[0]
                    if (!result){
                        // did not find an email match redirect to signup
                        return res.status(401).json({ msg : 'No user found. Please create an account.' })
                    } else {
                        // user found
                        if(result[0].user_id){
                            var payload = { user: { user_id : result[0].user_id }}
                        } else if (result[0].shelter_id){
                            payload = { user: { shelter_id : result[0].shelter_id }}
                        } else {
                            payload = { user: { employee_id : result[0].employee_id }}
                        }
                        jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: 360000}, (error, token) => {
                            if (error){
                                console.log(error)
                            } else {
                                // send token back to frontend
                                return res.status(201).json({token}) 
                            }
                        })
                    }
                } catch (error){
                    return res.status(500).json({ msg: 'Server error. Please try again later.' })
                }
            }
        })
    }
    verify().catch( error => {
        return res.status(500).json({ msg: 'Server error. Please try again later.' })
    })    
})


export {router as login}