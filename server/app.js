import express from 'express';
import pool from './Database/dbcon.js'

const app = express();
const db = pool;


// endpoint to get shelter information given employee id
app.get("/shelters/employees/{:id}", (req,res)=>{
    const getShelterInfo = "SELECT Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info FROM Shelters INNER JOIN Employees on Shelter.id = Employees.shelter_id WHERE Employees.id = :employee_id;";
    db.query(getShelterInfo, (err, result)=>{
        console.log(err)
        console.log(result[0].name) // name
        console.log(result) // all
        res.send("hello pedro")
    });

})

// endpoint to get employee name given employee id
app.get("/employee/{:id}", (req,res)=>{
    const getShelterInfo = "SELECT employees.name FROM employees WHERE employees.id = :employee_id;";
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