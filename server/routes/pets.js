import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool

// route to get all pet data for the /admin/edit/:pet_id path
router.get('/:pet_id', (req,res) => {
    const id = req.params.pet_id;
    const pet =`SELECT Pets.pet_id, name, type, breed, status, date_created, last_updated, 
                description, shelter_id, GROUP_CONCAT(disposition_id) AS dispositions FROM 
                Pets LEFT JOIN Pets_Dispositions ON Pets.pet_id=Pets_Dispositions.pet_id 
                WHERE Pets.pet_id=?;`;
    const images = 'SELECT image_id, url FROM Images WHERE pet_id=?;'
    const matches =`SELECT Matches.match_id, Users.user_id, l_name, f_name FROM Users 
                    LEFT JOIN Matches ON Matches.user_id=Users.user_id
                    WHERE pet_id=?;`;
    db.query(`${pet} ${images} ${matches}`, [id, id, id], (error, results)=>{
        if (error){
            console.log(error)
            return
        } else if (results[0][0].pet_id){
            // console.log(results)
            var payload = {}
                payload.pet = results[0][0]
                payload.pet.dispositions = payload.pet.dispositions.split(',').map(Number) // conver to int
            if (results[1].length > 0) payload.images = results[1]
            if (results[2].length > 0) payload.matches = results[2]
            // console.log(payload)
            return res.status(200).json(payload)
        }
        // redirect to a 404 page
        return res.status(404).json({msg: 'This pet does not exist.'})
    })

})


export {router as pets}