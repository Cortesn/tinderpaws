import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import pool from '../Database/dbcon.js'
const db = pool


// user login route
router.post('/', (req,res) => {
    var {email, password} = req.body
    console.log(req.body)
   
    // check if user already exists
    const findUser = `SELECT user_id, email, password FROM Users WHERE email='${email}'`
    db.query(findUser, async (error, results)  => {
        if (error){
            // server error
            return res.status(400).json({ msg : 'Somthing went wrong. Please try agian.' })
            // redirect back to login
        } else if (results.length <= 0){
            console.log("error")
            console.log(results)
            // did not find a email match
            return res.status(400).json({ msg : 'Invalid credentials' })
        } else {
            // user is found
            console.log('user found-> login route:')
            console.log(results[0])
            try{
                // match password
                const isMatch = await bcrypt.compare(password, results[0].password);

                if(!isMatch){
                    return res.status(400).json({ msg : 'Invalid credentials'})
                } else {
                    // password patches generate token
                    const payload = { user: { id : results[0].user_id }}
                    jwt.sign( payload, config.get('jwtSecret'), {expiresIn: 360000}, (error, token) => {
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


export {router as login}