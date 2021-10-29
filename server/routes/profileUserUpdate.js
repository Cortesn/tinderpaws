import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
/*
    Profile settings endpoint
    - get profile data
    - update profile
*/
router.get("/userData/:user_id",(req,res)=>{
    const user_id = parseInt(req.params.user_id);
    const getProfileData = 'SELECT Users.f_name, Users.l_name, Users.email, Users.password FROM Users WHERE Users.user_id = ?';
    db.query(`${getProfileData}`, [user_id], (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result)
        }
    })
})
router.patch("/:user_id", (req, res)=>{
    const user_id = req.params.user_id;
    let {fname, lname, email, password} = req.body
    // sql format
    let last_updated = new Date().toISOString().slice(0,10);
    const updateProfile = 'UPDATE Users SET f_name = ?, l_name=?, email=?, password=?, last_updated=? WHERE user_id=?';
    db.query(`${updateProfile}`, [fname, lname, email, password, last_updated, user_id], (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as profileUserUpdate}