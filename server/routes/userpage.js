import {Router} from 'express'
const userRouter = Router();
import db from '../Database/dbcon.js'
import auth from '../middleware/auth.js';


// endpoint to get all available pets not matched for user from db
userRouter.get('/pets', auth, (req, res) => {
    const user_id = req.user.user_id;
    const getPets = `SELECT p.*, a.type as animalType, GROUP_CONCAT(i.url) as images 
    FROM Pets as p
    INNER JOIN Images as i ON p.pet_id=i.pet_id
    INNER JOIN Animals as a ON p.type=a.animal_id
    WHERE p.pet_id NOT IN (
      SELECT m.pet_id
      FROM Matches as m
      WHERE m.user_id=?
    )
    GROUP BY p.pet_id;`
    db.query(getPets,[user_id], (error, results) => {
        if (error){
            console.log(error)
            return
        } 
        // console.log(results)
        return res.status(200).json(results)
    })
});

// endpoint to add match
userRouter.post('/match', auth, (req,res)=>{
    const {pet_id} = req.body
    const user_id = req.user.user_id

    // Insert if match does not exists
    const query = `INSERT INTO Matches(pet_id, user_id, date_matched)
    SELECT ?, ?, CURDATE()
    WHERE NOT EXISTS(
    SELECT 1 FROM Matches as m
    WHERE m.pet_id=?
    AND m.user_id=?);`
    db.query(query, [pet_id, user_id, pet_id, user_id], (error, results) =>{
        if (error){
            console.log(error)
            return
        } 
        // console.log("from /user/matches", results)
        return res.status(201).json(results)
    })
});


export {userRouter}