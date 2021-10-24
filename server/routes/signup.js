import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import pool from '../Database/dbcon.js'
const db = pool

// console.log(new Date(Date.now()).toLocaleDateString('en-US'),)


router.post('/user', (req, res) => {
    var {fname, lname, email, password} = req.body
    console.log(req.body)
   
    // check if user already exists
    const findUser = `SELECT user_id FROM Users WHERE email='${email}'`
    db.query(findUser, async (error, results)  => {
        if (error){
            // render error message on frontend user snackbar or alert from mui
            // server error
            return res.status(400).json({ msg : 'Somthing went wrong. Please try agian.'})
            // redirect back to login
        } else if (results.length > 0){
            // user with email already exists
            // render error msg
            return res.status(400).json({ msg : 'User already exists with this email' })
        } else {
            // user with email does not exist -> create new user
            // try/catch incase async/await fails
            try {
                // encrypt password
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt)

                // get current date format to YYYY-MM-DD
                const date = new Date(Date.now()).toLocaleDateString('en-CA')
   
                //  save data to database
                const saveUser = `INSERT INTO Users (f_name, l_name, email, password, date_created, last_updated) VALUES (?,?,?,?,?,?)`
                db.query(saveUser, [fname, lname, email, password, date, date], async (error, results) => {
                    if (error){
                        console.log(error)
                    } else if (results) {
                        // user was saved
                        // make payload for token after getting user id from db
                        // set user prop in token
                        const payload = { user: { id : results.insertId }}
                        // generate token to send to client
                        jwt.sign( payload, config.get('jwtSecret'), {expiresIn: 360000 }, (error, token) => {
                            if (error){
                                console.log(error)
                            } else {
                                return res.status(201).json({token}) // send token back to frontend
                            }
                        })
                    }
                })
            } catch(error) {
                console.log(error)
                res.status(500).json({msg: 'Server error. Please try again later.'})
            }
        }
    })
})



export {router as signup}