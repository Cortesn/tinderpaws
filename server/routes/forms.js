import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool


// return all available shelters in the db
router.get('/shelters', (req, res) => {
    const getShelters = 'SELECT shelter_id, name FROM Shelters;'
    db.query(getShelters, (error, results) => {
        if (error){
            console.log(error)
            return
        } 
        // console.log(results)
        return res.status(200).json(results)
    })
})


export {router as forms}