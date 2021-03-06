import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
import auth from '../middleware/auth.js'
const db = pool

/* 
    user matches endpoint
    - get matches for user -> get names of animals
    - add a match 
    - delete a match
*/

// returns all pet matches for a single user
router.get("/pets", auth, (req, res)=>{
    const user_id = req.user.user_id;
    const getMatches = `SELECT Pets.name, Pets.pet_id, Pets.type, Pets.status, Matches.match_id 
                        FROM tinder_paws.Pets 
                        JOIN tinder_paws.Matches on Pets.pet_id = Matches.pet_id 
                        JOIN tinder_paws.Users on Users.user_id = Matches.user_id 
                        WHERE Users.user_id=?`;
    db.query(`${getMatches};`, [user_id], (err, result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result);
        }
    })
})

// endpoint to add match
router.post('/', auth, (req,res)=>{
    const {pet_id} = req.body
    const user_id = req.user.user_id
    const query = 'INSERT INTO Matches(pet_id, user_id, date_matched) VALUES (?,?,?)'
    const date = new Date().toISOString().slice(0,10);
    db.query(query, [pet_id, user_id, date], (error, results) =>{
        if (error){
            console.log(error)
            return
        } 
        return res.status(201).json(results)
    })
});

// delete a single match from a pet
router.delete('/:match_id', auth, (req,res) => {
    const match_id = req.params.match_id
    // delete match from sql db
    const deleteMatch = 'DELETE FROM Matches WHERE match_id=?'
    db.query(deleteMatch, [match_id], (error, results) => {
        if (error){
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