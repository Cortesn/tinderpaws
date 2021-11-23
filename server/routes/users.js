import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
import auth from '../middleware/auth.js'
const db = pool
/*
    Profile settings endpoint
    - get profile data
    - update profile
*/
router.get("/user", auth, (req,res)=>{
    const user_id = req.user.user_id
    const getProfileData = 'SELECT Users.f_name, Users.l_name, Users.email FROM Users WHERE Users.user_id = ?';
    db.query(`${getProfileData}`, [user_id], (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result)
        }
    })
})

router.patch("/user", auth, (req, res)=>{
    const user_id = req.user.user_id
    let {fname, lname, email} = req.body
    // sql format
    let last_updated = new Date().toISOString().slice(0,10);
    const updateProfile = 'UPDATE Users SET f_name = ?, l_name=?, email=?, last_updated=? WHERE user_id=?';
    db.query(`${updateProfile}`, [fname, lname, email, last_updated, user_id], (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as users}