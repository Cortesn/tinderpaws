import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../Database/dbcon.js'
const db = pool


// user login route
router.post('/', (req,res) => {
    var {email, password} = req.body
    // console.log(req.body)
   
    // check if user already exists
    const findUser = 'SELECT user_id, email, password FROM Users WHERE email=?'
    const findShelter = 'SELECT shelter_id, email, password FROM Shelters WHERE email=?'
    const findEmployees = 'SELECT employee_id, email, password FROM Employees WHERE email=?'
    db.query(`${findUser}; ${findShelter}; ${findEmployees}`, [email, email, email], async (error, results)  => {
        if (error){
            // server error
            console.log(error)
            return res.status(400).json({ msg : 'Somthing went wrong. Please try agian.' })
            // redirect back to login
        } else {
            // user is found
            try{
                // console.log(results)
                const result = await results.filter(arr => arr.length > 0)[0]
                if (!result){
                    // did not find a email match
                    return res.status(400).json({ msg : 'Invalid credentials' })
                }
                // console.log('user found-> login route:')
                // console.log(result[0])
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
                    // const payload = { user: { user_id : result.user_id ?? result.shelter_id ?? result.employee_id }}

                    // console.log(payload)
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


export {router as login}