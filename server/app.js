import express from 'express';
import cors from 'cors';
import pool from './Database/dbcon.js'

const app = express();
const db = pool;

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

/* 
    user settings endpoints

    - all shelters
    - selected animal breeds
    - animal cards results 
*/
app.get("/shelters", (req,res)=>{
    const getShelters = `SELECT Shelters.name FROM Shelters`
    db.query(getShelters, (err,result)=>{
        if (err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    })
})

app.get("/animals/breed", (req,res)=>{
    // animl types need to be an array of numbers 1 == Dog, 2==Cat, 3==Other
    const animalTypes = req.body.animalTypes;
    
    // 2nd way
    const sqlAnimalTypesArray = animalTypes.join(',')
    const getBreeds = `SELECT Pets.breed from Pets WHERE Pets.type IN (${sqlAnimalTypesArray})`

    db.query(getBreeds, (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    })
})

app.get("/animals/filtered", (req,res)=>{
    const shelter = req.body.shelter;
    // do not need types again since we have breeds
    const breeds = req.body.breeds;
    const dispositions = req.body.dispositions;

    // convert JS array to SQL array: breeds and dispositions
    const sqlBreedsArray = breeds.join(',')
    const sqlDispositionsArray = dispositions.join(',')
    const shelterSubQuery = `SELECT Shelters.shelter_id FROM Shelters WHERE Shelters.shelter_id = ${shelter}`
    const dispositionsSubQuery = `SELECT p.pet_id FROM tinder_paws.Pets_Dispositions pd 
    join tinder_paws.Pets p on pd.pet_id = p.pet_id 
    join tinder_paws.Dispositions d on pd.disposition_id = d.disposition_id 
    WHERE d.disposition_id IN ${sqlDispositionsArray}`

    // final query
    const getFilteredAnimals = `SELECT * FROM Pets INNER JOIN Shelters on Pets.shelter_id = Shelters.shelter_id WHERE Pets.shelter_id IN ${shelterSubQuery} AND Pets.breed IN ${sqlBreedsArray} AND Pets.pet_id IN ${dispositionsSubQuery}`
    db.query(getFilteredAnimals, (err, result)=>{
        res.send(result)
    })

})


/*
    admin page endpoints 
    - employee name
    - shelter information given employee
    
*/
// endpoint to get shelter information given employee id
app.get("/shelters/shelter/employees/:id", (req,res)=>{
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
app.get("/employee/:id", (req,res)=>{
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

app.listen(3001, ()=>{
    console.log("running on port 3001")
})