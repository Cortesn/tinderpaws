import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
const db = pool
/* 
    filter settings endpoints

    - all shelters
    - selected animal breeds
    - animal cards results 
*/
router.get("/shelters", (req,res)=>{
    const getShelters = `SELECT DISTINCT(Shelters.name) FROM Shelters`;
    db.query(getShelters, (err,result)=>{
        if (err){
            console.error(err.message)
        }else{
            res.send(result)
        }
    })
})

router.get("/animals/breed", (req,res)=>{
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

router.get("/filteredAnimals", (req,res)=>{
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
            console.log(result)
            res.send(result);
        }
    })

})

export {router as filterSetting}