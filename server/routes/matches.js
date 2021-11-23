import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
import auth from '../middleware/auth.js'
const db = pool

/* 
    user matches endpoint
    - get matches for user -> get names of animals
*/
router.get("/users/user", auth, (req, res)=>{
    const user_id = req.user.user_id;
    const getMatches = 'SELECT Pets.name, Pets.pet_id, Pets.type, Pets.status FROM tinder_paws.Pets JOIN tinder_paws.Matches on Pets.pet_id = Matches.pet_id JOIN tinder_paws.Users on Users.user_id = Matches.user_id WHERE Users.user_id=?';
    db.query(`${getMatches};`, [user_id], (err, result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result);
        }
    })
})

// delete a single match from a pet
router.delete('/:match_id', (req,res) => {
    const match_id = req.params.match_id
    // delete match from sql db
    const deleteMatch = 'DELETE FROM Matches WHERE match_id=?'
    db.query(deleteMatch, [match_id], (error, results) => {
        if (error){
            console.log(error)
            return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
            // server msg
        } else if (results.affectedRows === 1){
            // successful delete
            return res.status(200).json({msg: 'Unmatch successful!'})
        } else {
            // invalid match_id. should probably never happen...
            return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
        }
    }) 
})

export {router as matches}