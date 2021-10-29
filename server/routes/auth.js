import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
import auth from '../middleware/auth.js'

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
            // console.log(results)
            return res.json(results[0])
        }
    }) 
})

export {router as auth}
