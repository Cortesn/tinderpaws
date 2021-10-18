import express from 'express';
import pool from './Database/dbcon.js'

const app = express();
const db = pool;

// below works - need to figure out how to send back to client! 

// endpoint to get shelter information given employee id
app.get("/shelters/employees/:id", (req,res)=>{
    const getShelterInfo = `SELECT Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info FROM Shelters INNER JOIN Employees on Shelters.shelter_id = Employees.shelter_id WHERE Employees.employee_id = ${req.params.id}`;
    db.query(getShelterInfo, (err, result)=>{
        console.log(err)
        console.log(result[0].name) // name
        console.log(result) // all
        res.send("hello pedro")
    });

})

// endpoint to get employee name given employee id
app.get("/employee/:id", (req,res)=>{
    const getShelterInfo = `SELECT name FROM Employees WHERE employee_id = ${req.params.id}`;
    db.query(getShelterInfo, (err, result)=>{
        console.log(err)
        console.log(result[0].name) // name
        console.log(result) // all
        res.send("hello pedro")
    });

})

app.listen(3001, ()=>{
    console.log("running on port 3001")
})