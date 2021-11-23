import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
import auth from '../middleware/auth.js'
const db = pool

/* 
    Breed endpoints
    - all breeds for a single type
    - all breeds for mutiple types
*/

router.get("/filter", auth, (req,res)=>{
    const animalTypes = req.query.animalTypes;
    var sqlAnimalTypesArray = [];
    animalTypes.forEach(num => sqlAnimalTypesArray.push(parseInt(num)));
    const getBreeds = `SELECT breed_name AS name FROM Breeds Where type IN (?);`
    db.query(getBreeds, [sqlAnimalTypesArray], (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    })
})

// get all breeds
router.get('/', auth, (req,res)=> {
    const type = req.query.type;
    const breeds = 'SELECT breed_name AS name FROM Breeds WHERE type=?;'
    db.query(breeds, [type], (err, result)=>{
        return res.status(200).json(result)
    })
})


export {router as breeds}