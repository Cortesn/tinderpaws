import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
import passwordReset from '../email/passwordReset.js'

router.post('/', (req, res) => {
    // console.log(req.body)
    const email = req.body.email

    // check if user already exists
    const findUser = 'SELECT user_id, email FROM Users WHERE email=?'
    const findShelter = 'SELECT shelter_id, email FROM Shelters WHERE email=?'
    const findEmployees = 'SELECT employee_id, email FROM Employees WHERE email=?'
    db.query(`${findUser}; ${findShelter}; ${findEmployees}`, [email, email, email], async (error, results)  => {
        if (error){
            // server error
            console.log(error)
            return res.status(400).json({ msg: 'Server error. Please try again later.' })
            // redirect back to login
        } else {
            // user is found
            try{
                // console.log(results)
                const result = await results.filter(arr => arr.length > 0)[0]
                if (!result){
                    // did not find a email match still send back a success
                    return res.status(200).json({ msg : 'Password reset request received.' })
                } else {
                    // console.log('user found')
                    // console.log(result[0])
                    // generate a 25char random string to use as the reset_key
                    // drop leading 0.

                    // ***************************
                    // change this to a dateTime and encrypt it so that it will expire in 24hrs

                    const randomStr = Math.random().toString(36).substring(2)
                    // console.log(randomStr)
                    // var payload = {
                    //     email: result[0].email,
                    //     reset_key: randomStr
                    // }
                    if(result[0].user_id){
                        const updateUserReset = 'UPDATE Users SET reset_key=? where user_id=?';
                        db.query(updateUserReset, [randomStr, result[0].user_id], (error, results) => {
                            if (error){
                                console.log(error)
                                return res.status(400).json({ msg: 'Server error. Please try again later.' })
                            }
                            passwordReset(result[0].email, randomStr)
                        })
                    } else if (result[0].shelter_id){
                        const updateShelterReset = 'UPDATE Shelters SET reset_key=? where shelter_id=?';
                        db.query(updateShelterReset, [randomStr, result[0].shelter_id], (error, results) => {
                            if (error){
                                console.log(error)
                                return res.status(400).json({ msg: 'Server error. Please try again later.' })
                            }
                            passwordReset(result[0].email, randomStr)
                        })
                    } else {
                        const updateEmployeeReset = 'UPDATE Employees SET reset_key=? where employee_id=?';
                        db.query(updateEmployeeReset, [randomStr, result[0].employee_id], (error, results) => {
                            if (error){
                                console.log(error)
                                return res.status(400).json({ msg: 'Server error. Please try again later.' })
                            }
                            passwordReset(result[0].email, randomStr)
                        })
                    }
                    // success!
                    return res.status(200).json({ msg : 'Password reset request received.' })
                }
            } catch (error){
                console.log(error)
                return res.status(500).json({ msg: 'Server error. Please try again later.' })
            }
        }
    })
})


export {router as forgotPassword}