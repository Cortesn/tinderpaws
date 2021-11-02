import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool

// route to get all pet data for the /admin/edit/:pet_id path
router.get('/:pet_id', (req,res) => {
    const id = req.params.pet_id;
    const pet =`SELECT *, GROUP_CONCAT(disposition_id) AS dispositions FROM Pets
                JOIN Pets_Dispositions ON Pets.pet_id=Pets_Dispositions.pet_id
                AND Pets.pet_id=?`;
    const matches = 'SELECT user_id, l_name, f_name FROM Users WHERE user_id IN (SELECT user_id FROM Matches WHERE pet_id=?)';
    db.query(`${pet}; ${matches};`, [id, id], (error, results)=>{
        if (error){
            console.log(error)
            return
        } else if (results[0][0].pet_id){
            // console.log(results)
            var payload = {}
                payload.pet = results[0][0]
                payload.matches = results[1]
                payload.pet.dispositions = payload.pet.dispositions.split(',').map(Number)
            // console.log(payload)
            return res.status(200).json(payload)
        }
        // redirect to a 404 page
        return res.status(404).json({msg: 'This pet does not exist.'})
    })

})


export {router as pets}