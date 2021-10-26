import express from 'express';
import cors from 'cors';
import pool from './Database/dbcon.js'

const app = express();
const db = pool;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/*
    Profile settings endpoint
    - get profile data
    - update profile
*/
app.get("/users/:user_id",(req,res)=>{
    const user_id = parseInt(req.params.user_id);
    const getProfileData = `SELECT Users.f_name, Users.l_name, Users.email, Users.password FROM Users WHERE Users.user_id = ${user_id}`;
    console.log(getProfileData)
    db.query(getProfileData, (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result)
        }
    })
})
app.patch("/updateProfile/:user_id", (req, res)=>{
    const user_id = req.params.user_id;
    const first_name = req.body.fname;
    const last_name = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    // sql format
    const last_updated = new Date().toISOString().slice(0,10);
    // const last_updated =  new Date(Date.now()).toLocaleDateString('en-CA')
    console.log(last_updated)
    const updateProfile = `UPDATE Users SET f_name = "${first_name}", l_name="${last_name}", email="${email}", password="${password}", last_updated="${last_updated}" WHERE user_id=${user_id}`;
    console.log(updateProfile)
    db.query(updateProfile, (err,result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send("Successfully updated user profile!")
        }
    })
})

/* 
    filter settings endpoints

    - all shelters
    - selected animal breeds
    - animal cards results 
*/
app.get("/shelters", (req,res)=>{
    const getShelters = `SELECT DISTINCT(Shelters.name) FROM Shelters`;
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
    // 2 ways: query db table animals to convert all names to types or map them in react before sending over
    const animalTypes = req.query.animalTypes;
    const shelters = req.query.shelter ? req.query.shelter : null 
    const sqlAnimalTypesArray = animalTypes.join(',');
    let getBreeds = null
    if(shelters){
        // if shelters given we query for the id and then query for animals in the shelters
        const sqlSheltersArray = shelters.join(', ');
        const getShelterIdSubquery = `SELECT Shelters.shelter_id FROM Shelters WHERE Shelters.name IN (${sqlSheltersArray})`;
        getBreeds = `SELECT DISTINCT(Pets.breed) FROM Pets WHERE Pets.type IN (${sqlAnimalTypesArray}) AND Pets.shelter_id IN (${getShelterIdSubquery})`;
    }else{
        // shelters not picked so we give all animals that match type
        getBreeds = `SELECT DISTINCT(Pets.breed) from Pets WHERE Pets.type IN (${sqlAnimalTypesArray})`;
    }

    db.query(getBreeds, (err, result)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    })
})

app.get("/animals/filtered", (req,res)=>{
    const shelters = req.query.shelters;
    // do not need types again since we have breeds
    const breeds = req.query.breeds;
    const dispositions = req.query.dispositions;
    // convert JS array to SQL array: breeds shelters dispositions
    const sqlBreedsArray = breeds.join(',');
    const sqlDispositionsArray = dispositions.join(',');
    const sqlSheltersArray = shelters.join(',');

    const getDispositionIds = `SELECT Dispositions.disposition_id from Dispositions WHERE Dispositions.description IN (${sqlDispositionsArray})`;
    const shelterSubQuery = `SELECT Shelters.shelter_id FROM Shelters WHERE Shelters.name IN (${sqlSheltersArray})`;
    const dispositionsSubQuery = `SELECT DISTINCT(p.pet_id) FROM tinder_paws.Pets_Dispositions pd 
    join tinder_paws.Pets p on pd.pet_id = p.pet_id 
    join tinder_paws.Dispositions d on pd.disposition_id = d.disposition_id 
    WHERE d.disposition_id IN (${getDispositionIds})`;

    // final query
    const getFilteredAnimals = `SELECT * FROM Pets INNER JOIN Shelters on Pets.shelter_id = Shelters.shelter_id WHERE Pets.shelter_id IN (${shelterSubQuery}) AND Pets.breed IN (${sqlBreedsArray}) AND Pets.pet_id IN (${dispositionsSubQuery})`;
    db.query(getFilteredAnimals, (err, result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result);
        }
    })

})

/* 
    user matches endpoint
    - get matches for user -> get names of animals
*/
app.get("/users/:id/matches", (req, res)=>{
    const user_id = req.params.id;
    const getMatches = `SELECT Pets.name, Pets.pet_id FROM tinder_paws.Pets JOIN tinder_paws.Matches on Pets.pet_id = Matches.pet_id JOIN tinder_paws.Users on Users.user_id = Matches.user_id WHERE Users.user_id = ${user_id};`
    db.query(getMatches, (err, result)=>{
        if(err){
            console.error(err.message);
        }else{
            res.send(result);
        }
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