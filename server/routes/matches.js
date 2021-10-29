import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool

/* 
    user matches endpoint
    - get matches for user -> get names of animals
*/
router.get("/users/:id", (req, res)=>{
    const user_id = req.params.id;
    const getMatches = 'SELECT Pets.name, Pets.pet_id FROM tinder_paws.Pets JOIN tinder_paws.Matches on Pets.pet_id = Matches.pet_id JOIN tinder_paws.Users on Users.user_id = Matches.user_id WHERE Users.user_id=?';
    db.query(`${getMatches};`, [user_id], (err, result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result);
        }
    })
})
export {router as matches}