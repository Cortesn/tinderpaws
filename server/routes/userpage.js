import {Router} from 'express'
const userRouter = Router();
import db from '../Database/dbcon.js'


// return all available shelters in the db
userRouter.get('/pets', (req, res) => {
    const getPets = 'SELECT pet_id, name, breed, description FROM Pets;'
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