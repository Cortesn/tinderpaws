import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../Database/dbcon.js'
const db = pool

// User signup route
router.post('/user', (req, res) => {
    var {fname, lname, email, password} = req.body
    console.log(req.body)
   
    // check if user already exists
    const findUser = 'SELECT user_id FROM Users WHERE email=?'
    const findShelter = 'SELECT shelter_id FROM Shelters WHERE email=?'
    const findEmployee = 'SELECT employee_id FROM Employees WHERE email=?'
    db.query(`${findUser}; ${findShelter}; ${findEmployee}`, [email, email, email], async (error, results)  => {
        if (error){
            // render error message on frontend user snackbar or alert from mui
            // server error
            console.log(error)
            return res.status(400).json({ msg : 'Something went wrong. Please try agian later.'})
        } else {
            console.log(results)
            // try/catch incase async/await fails
            try {
                const result = await results.filter(arr => arr.length > 0)
                console.log(result)
                if (result.length > 0){
                    // user with email already exists
                    // render error msg
                    return res.status(400).json({ msg : 'Account already exists with this email' })
                }
       
                // user with email does not exist -> create new user
                // encrypt password
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt)

                // get current date format to YYYY-MM-DD
                // const date = new Date(Date.now()).toLocaleDateString('en-CA')
                const date = new Date().toISOString().slice(0,10);
   
                //  save data to database
                const saveUser = 'INSERT INTO Users (f_name, l_name, email, password, date_created, last_updated) VALUES (?,?,?,?,?,?)'
                db.query(saveUser, [fname, lname, email, password, date, date], (error, results) => {
                    if (error){
                        console.log(error)
                        return res.status(400).json({ msg : 'Somthing went wrong. Please try agian later.'})
                    } else if (results) {
                        // user was saved
                        // make payload for token after getting user id from db
                        // set user prop in token
                        const payload = { user: { user_id : results.insertId }}
                        // generate token to send to client
                        jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: 360000 }, (error, token) => {
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


// Shelter signup route
router.post('/shelter', (req, res) => {
    console.log(req.body)
    var {sname, street, city, state, zip, email, password} = req.body
   
    // check if user already exists
    const findUser = 'SELECT user_id FROM Users WHERE email=?'
    const findShelter = 'SELECT shelter_id FROM Shelters WHERE email=?'
    const findEmployee = 'SELECT employee_id FROM Employees WHERE email=?'
    db.query(`${findUser}; ${findShelter}; ${findEmployee}`, [email, email, email], async (error, results)  => {
        if (error){
            // render error message on frontend user snackbar or alert from mui
            // server error
            return res.status(400).json({ msg : 'Somthing went wrong. Please try agian later.'})
        } else {
            console.log(results)
            // try/catch incase async/await fails
            try {
                const result = await results.filter(arr => arr.length > 0)
                // console.log(result)
                if (result.length > 0){
                    // user with email already exists
                    // render error msg
                    return res.status(400).json({ msg : 'Account already exists with this email' })
                }
                // user with email does not exist -> create new user
                // encrypt password
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt)
                console.log(password)
                // get current date format to YYYY-MM-DD
                const date = new Date(Date.now()).toLocaleDateString('en-CA')
   
                //  save data to database
                const saveShelter = 'INSERT INTO Shelters (name, street, city, state, zip, email, password, date_created, last_updated) VALUES (?,?,?,?,?,?,?,?,?)'
                db.query(saveShelter, [sname, street, city, state, zip, email, password, date, date], (error, results) => {
                    if (error){
                        console.log(error)
                        return res.status(400).json({ msg : 'Somthing went wrong. Please try agian later.'})
                    } else if (results) {
                        // user was saved
                        // make payload for token after getting user id from db
                        // set user prop in token
                        const payload = { user: { shelter_id : results.insertId }}
                        // generate token to send to client
                        jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: 360000 }, (error, token) => {
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


// Employee signup route
router.post('/employee', (req, res) => {
    var {shelterOptions, employeeId, name, email, password} = req.body
    console.log(req.body)
   
    // check if user already exists
    const findUser = 'SELECT user_id FROM Users WHERE email=?'
    const findShelter = 'SELECT shelter_id FROM Shelters WHERE email=?'
    const findEmployee = 'SELECT employee_id FROM Employees WHERE email=?'
    db.query(`${findUser}; ${findShelter}; ${findEmployee}`, [email, email, email], async (error, results)  => {
        if (error){
            // server error
            return res.status(400).json({ msg : 'Somthing went wrong. Please try agian later.'})
        } else {
            console.log(results)
            // try/catch incase async/await fails
            try {
                const result = await results.filter(arr => arr.length > 0)
                console.log(result)
                if (result.length > 0){
                    // user with email already exists
                    return res.status(400).json({ msg : 'Account already exists with this email' })
                }
                // encrypt password
                const salt = await bcrypt.genSalt(10);
                password = await bcrypt.hash(password, salt)

                // get current date format to YYYY-MM-DD
                const date = new Date(Date.now()).toLocaleDateString('en-CA')
   
                //  save data to database
                const saveEmployee = 'INSERT INTO Employees (employee_id, shelter_id, name, email, password, date_created) VALUES (?,?,?,?,?,?)'
                db.query(saveEmployee, [employeeId, shelterOptions, name, email, password, date], (error, results) => {
                    if (error){
                        console.log(error)
                        return res.status(400).json({ msg : 'Somthing went wrong. Please try agian later.'})
                    } else if (results) {
                        // user was saved
                        console.log(results.insertId)
                        // make payload for token after getting user id from db
                        const payload = { user: { employee_id : employeeId }}
                        // generate token to send to client
                        jwt.sign( payload, process.env.JWT_SECRET, {expiresIn: 360000 }, (error, token) => {
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