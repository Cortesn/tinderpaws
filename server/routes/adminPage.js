import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
/*
    admin page endpoints 
    - employee name
    - shelter information given employee
    
*/
// endpoint to get shelter information given employee id
router.get("/shelters/shelter/employees/:id", (req,res)=>{
    const employee_id = req.params.id;
    const getShelterInfo = `SELECT Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info FROM Shelters INNER JOIN Employees on Shelters.shelter_id = Employees.shelter_id WHERE Employees.employee_id = ${employee_id}`;
    db.query(getShelterInfo, (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
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

export {router as adminPage}