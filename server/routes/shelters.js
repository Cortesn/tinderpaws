import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
import auth from '../middleware/auth.js'

/*
    shelter endpoints 
    - get a single shelter's information given employee
    - get all shelter names
    - get shelter employee infromation given employee_id
    - update shelter information
*/

// endpoint to get shelter information given employee id
router.get("/shelter", auth, (req,res)=>{
    const employee_id = req.user.employee_id;
    const getShelterInfo = 'SELECT Shelters.shelter_id, Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info FROM Shelters INNER JOIN Employees on Shelters.shelter_id = Employees.shelter_id WHERE Employees.employee_id = ?';
    db.query(`${getShelterInfo}`, [employee_id], (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    });
})

// return all available shelters in the db. No auth middleware because used int he sign up forms
router.get('/', (req, res) => {
    const getShelters = 'SELECT shelter_id, name FROM Shelters;'
    db.query(getShelters, (error, results) => {
        if (error){
            console.log(error)
            return
        } 
        return res.status(200).json(results)
    })
})

// endpoint to get employee name given employee id
router.get("/employee", auth, (req,res)=>{
    const employee_id = req.user.employee_id
    const getShelterInfo = 'SELECT name FROM Employees WHERE Employees.employee_id = ?';
    db.query(`${getShelterInfo}`, [employee_id], (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    });

})

// endpoint to update shelter information 
router.patch("/:shelter_id", auth, (req, res)=>{
    const shelter_id = req.params.shelter_id;
    const {sname, street, city, state, zip} = req.body;
    // sql format
    const last_updated = new Date().toISOString().slice(0,10);
    const updateShelter = `UPDATE Shelters SET name=?, street=?, city=?, state=?, zip=?, last_updated=? WHERE shelter_id=?`;
    db.query(`${updateShelter}`, [sname, street, city, state, zip, last_updated, shelter_id ],(err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as shelters}