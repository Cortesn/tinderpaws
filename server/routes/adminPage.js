import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
import auth from '../middleware/auth.js'

/*
    admin page endpoints 
    - employee name
    - shelter information given employee
    
*/
// endpoint to get shelter information given employee id
router.get("/shelters/shelter/employees", auth, (req,res)=>{
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

// endpoint to get employee name given employee id
router.get("/employees", auth, (req,res)=>{
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
router.patch("/shelters/:shelter_id", auth, (req, res)=>{
    const shelter_id = req.params.shelter_id;
    const {sname, street, city, state, zip} = req.body;
    // sql format
    const last_updated = new Date().toISOString().slice(0,10);
    const updateShelter = `UPDATE Shelters SET name=?, street=?, city=?, state=?, zip=?, last_updated=? WHERE shelter_id=?`;
    db.query(`${updateShelter}`, [sname, street, city, state, zip, last_updated, shelter_id ],(err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            console.log("success")
            console.log(result)
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as adminPage}