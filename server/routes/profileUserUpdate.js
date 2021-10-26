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
    const getProfileData = `SELECT Users.f_name, Users.l_name, Users.email, Users.password FROM Users WHERE Users.user_id = ${user_id}`;
    console.log(getProfileData)
    db.query(getProfileData, (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result)
        }
    })
})
router.patch("/:user_id", (req, res)=>{
    const user_id = req.params.user_id;
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    // sql format
    const last_updated = new Date().toISOString().slice(0,10);
    const updateProfile = `UPDATE Users SET f_name = "${first_name}", l_name="${last_name}", email="${email}", password="${password}", last_updated="${last_updated}" WHERE user_id=${user_id}`;
    db.query(updateProfile, (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as profileUserUpdate}