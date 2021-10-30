import {Router} from 'express'
const userRouter = Router();
import db from '../Database/dbcon.js'


// return all available shelters in the db
userRouter.get('/pets', (req, res) => {
    const getPets = `SELECT p.*, a.type as animalType, GROUP_CONCAT(i.url) as images 
    FROM Pets as p
    INNER JOIN Images as i ON p.pet_id=i.pet_id
    INNER JOIN Animals as a ON p.type=a.animal_id
    GROUP BY p.pet_id;`
    db.query(getPets, (error, results) => {
        if (error){
            console.log(error)
            return
        } 
        // console.log(results)
        return res.status(200).json(results)
    })
})


export {userRouter}