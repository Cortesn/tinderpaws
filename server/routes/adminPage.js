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
    const getShelterInfo = `SELECT Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info 
    FROM Shelters 
    INNER JOIN Employees on Shelters.shelter_id = Employees.shelter_id 
    WHERE Employees.employee_id = ?;`;
    db.query(getShelterInfo, [employee_id], (err, result)=>{
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
    const getShelterInfo = 'SELECT name FROM Employees WHERE Employees.employee_id = ?;';
    db.query(getShelterInfo, [employee_id], (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    });

})

// endpoint to get pets that belong to the employee's shelter given employee id
router.get("/:admin_id/pets", (req, res)=> {
    const admin_id = req.params.admin_id;
    const query = `SELECT p.*, a.type as animalType, GROUP_CONCAT(i.url) as images 
    FROM Pets as p
    INNER JOIN Images as i ON p.pet_id=i.pet_id
    INNER JOIN Animals as a ON p.type=a.animal_id
    WHERE p.shelter_id = (
      SELECT e.shelter_id
      FROM Employees as e
      WHERE e.employee_id=?
    )
    GROUP BY p.pet_id;`;
    db.query(query, [admin_id], (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    });
})

// endpoint to delete pet from all db tables given pet id
router.delete("/pet/:pet_id", (req, res)=> {
    const pet_id = req.params.pet_id;
    // delete from Images
    // delete from Pets_Dispositions
    // delete from Matches
    // delete from Pets
    const query = `DELETE FROM Pets
    WHERE Pets.pet_id=?`;
    db.query(query, [pet_id], (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    });
});

// endpoint to update shelter information 
router.patch("/shelters/:shelter_id", (req, res)=>{
    const shelter_id = req.params.shelter_id;
    const {sname, street, city, state, zip} = req.body;
    // sql format
    const last_updated = new Date().toISOString().slice(0,10);
    const updateShelter = `UPDATE Shelters SET name = "?", street="?", city="?", state="?", zip="?", last_updated="?" WHERE shelter_id=?`;
    db.query(`${updateShelter}`, [sname, street, city, state, zip, last_updated, shelter_id ],(err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

export {router as adminPage}