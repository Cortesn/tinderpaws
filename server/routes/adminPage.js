import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
/*
    admin page endpoints 
    - employee name
    - shelter information given employee
    - update shelter information 
    
*/
// endpoint to get shelter information given employee id
router.get("/shelters/shelter/employees/:id", (req,res)=>{
    const employee_id = req.params.id;
    const getShelterInfo = `SELECT Shelters.shelter_id, Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info FROM Shelters INNER JOIN Employees on Shelters.shelter_id = Employees.shelter_id WHERE Employees.employee_id = ${employee_id}`;
    db.query(getShelterInfo, (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            console.log(result)
            res.send(result)
        }
    });

})

// endpoint to get employee name given employee id
router.get("/employees/:id", (req,res)=>{
    const employee_id = req.params.id;
    const getShelterInfo = `SELECT name FROM Employees WHERE employee_id = ${employee_id}`;
    db.query(getShelterInfo, (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    });

})

// endpoint to update shelter information 
router.patch("/shelters/:shelter_id", (req, res)=>{
    const shelter_id = req.params.shelter_id;
    const shelter_name = req.body.sname;
    const street = req.body.street;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    // sql format
    const last_updated = new Date().toISOString().slice(0,10);
    const updateShelter = `UPDATE Shelters SET name = "${shelter_name}", street="${street}", city="${city}", state="${state}", zip="${zip}", last_updated="${last_updated}" WHERE shelter_id=${shelter_id}`;
    db.query(updateShelter, (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as adminPage}