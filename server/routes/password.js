import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import pool from '../Database/dbcon.js'
const db = pool
import passwordReset from '../email/passwordReset.js'


// query the db and update the reset_key for a given account
const updateResetKey = (res, query, reset_key, id, email) => {
    db.query(query, [reset_key, id], (error, results) => {
        if (error){
            console.log(error)
            return res.status(400).json({ msg: 'Server error. Please try again later.' })
        }else {
            // send a email with reset instructions
            passwordReset(email, reset_key) 
        }
    })
}

// route to handle forgot password? reset requests
router.post('/forgot', (req, res) => {
    const email = req.body.email
    // check if user exists
    const findUser = 'SELECT user_id, email FROM Users WHERE email=?';
    const findShelter = 'SELECT shelter_id, email FROM Shelters WHERE email=?';
    const findEmployees = 'SELECT employee_id, email FROM Employees WHERE email=?';
    db.query(`${findUser}; ${findShelter}; ${findEmployees}`, [email, email, email], async (error, results)  => {
        if (error){
            // server error
            console.log(error)
            // redirect back to login
            return res.status(400).json({ msg: 'Server error. Please try again later.' })
        } else {
            try{
                const result = await results.filter(arr => arr.length > 0)[0]
                if (!result){
                    // did not find a email match still send back a success. Prevent phishing.
                    return res.status(200).json({ msg : 'Password reset request received.' })
                } else {
                    // user exists -> generate a random string to use as the reset_key
                    const randomStr = Math.random().toString(36).substring(2)
                    
                    if(result[0].user_id){
                        const updateUserReset = 'UPDATE Users SET reset_key=? where user_id=?';
                        updateResetKey(res, updateUserReset, randomStr, result[0].user_id, result[0].email)
                    } else if (result[0].shelter_id){
                        const updateShelterReset = 'UPDATE Shelters SET reset_key=? where shelter_id=?';
                        updateResetKey(res, updateShelterReset, randomStr, result[0].shelter_id, result[0].email)
                    } else {
                        const updateEmployeeReset = 'UPDATE Employees SET reset_key=? where employee_id=?';
                        updateResetKey(res, updateEmployeeReset, randomStr, result[0].employee_id, result[0].email)
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

// query the db and update the password
const updatePassword = (res, query, password, email) => {
    db.query(query, [password, null, email], (error, results) => {
        if (error){
            console.log(error)
            return res.status(400).json({ msg: 'Server error. Please try again later.' })
        }else {
            // success!
            return res.status(200).json({ msg : 'Password updated. Please log in again.' })
        }
    })
}

// route to handle changing the password
router.patch('/reset', (req, res) => {
    var { email, password, reset_key } = req.body
    // get the id and reset key to compare
    const findUser = 'SELECT user_id, email, reset_key FROM Users WHERE email=? and reset_key=?';
    const findShelter = 'SELECT shelter_id, email, reset_key FROM Shelters WHERE email=? and reset_key=?';
    const findEmployees = 'SELECT employee_id, email, reset_key FROM Employees WHERE email=? and reset_key=?';
    db.query(`${findUser}; ${findShelter}; ${findEmployees}`, [email, reset_key, email, reset_key, email, reset_key], async (error, results)  => {
        if (error){
            // server error
            console.log(error)
            return res.status(400).json({ msg: 'Server error. Please try again later.' })
        } else {
            try{
                // filter out results
                const result = await results.filter(arr => arr.length > 0)[0]
                if (!result){
                    // did not find a email or reset_key match. alert client
                    return res.status(400).json({ msg : 'Invalid account or authorization.' })
                } else {
                    // encrypt password
                    const salt = await bcrypt.genSalt(10);
                    password = await bcrypt.hash(password, salt)
                    
                    // update the password and reset_key=null
                    if(result[0].user_id){
                        const updateUserPassword = 'UPDATE Users SET password=?, reset_key=? where email=?';
                        updatePassword(res, updateUserPassword, password, result[0].email)
                    } else if (result[0].shelter_id){
                        const updateShelterPassword = 'UPDATE Shelters SET password=?, reset_key=? where email=?';
                        updatePassword(updateShelterPassword, password, result[0].email)
                    } else {
                        const updateEmployeePassword = 'UPDATE Employees SET password=?, reset_key=? where email=?';
                        updatePassword(updateEmployeePassword, password, result[0].email)
                    }
                }
            } catch (error){
                console.log(error)
                return res.status(500).json({ msg: 'Server error. Please try again later.' })
            }
        }
    })
})


export {router as password}