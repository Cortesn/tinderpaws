import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import pool from '../Database/dbcon.js'
const db = pool

// console.log(new Date(Date.now()).toLocaleDateString('en-US'),)


router.post('/user', async (req, res) => {
    const {fname, lname, email, password} = req.body
    console.log(req.body)
   
    // check if user already exists
    const findUser = `SELECT user_id FROM Users WHERE email=${email}`
    db.query(findUser, async (error, results)  => {
        if (error){
            console.log(error)
            // render error message on frontend user snackbar or alert from mui
            // server error
            return res.status(400).json({ error : { msg : 'Somthing went wrong. Please try agian.'} })
            // redirect back to login
        } else if (results.length > 0){
            // user with email already exists
            // render error msg
            return res.status(400).json({ error : { msg : 'User already exists with this email' } })
        } else {
            // user with email does not exist -> create new user

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            var password = await bcrypt.hash(password, salt)

            //  save data to database
            const saveUser = `INSERT INTO Users (f_name, l_name, email, password, date_created, last_updated) VALUES (?,?,?,?,?,?)`
            db.query()
        }
    })

    

    

    // make payload for token after getting user id from db
    const payload = { user: { id : user.id }}

    // generate token to send to client
    jwt.sign( payload, config.get('jwtSecret'))


    var token= {hello: 'world'}
    res.status(201).json(token)
})



export {router as signup}