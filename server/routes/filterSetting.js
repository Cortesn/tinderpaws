import express from 'express'
const router = express.Router()
import pool from '../Database/dbcon.js'
import auth from '../middleware/auth.js'
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
// filter animal based off user selections - shelter, animal type, pet breed, pet dispositions
router.get("/filteredAnimals", auth, (req,res)=>{
    const user_id = req.user.user_id;
    const shelters = req.query.shelters;
    // do not need types again since we have breeds
    const breeds = req.query.breeds;
    const dispositions = req.query.dispositions;
    // convert JS array to SQL array: breeds shelters dispositions
    const sqlBreedsArray = breeds.join(',');
    const sqlDispositionsArray = dispositions.join(',');
    const sqlSheltersArray = shelters.join(',');

    const getDispositionIds = `SELECT Dispositions.disposition_id from 
    Dispositions WHERE Dispositions.description IN (${sqlDispositionsArray})`;
    const shelterSubQuery = `SELECT Shelters.shelter_id FROM Shelters WHERE Shelters.name IN (${sqlSheltersArray})`;
    const dispositionsSubQuery = `SELECT DISTINCT(p.pet_id) FROM tinder_paws.Pets_Dispositions pd 
    join tinder_paws.Pets p on pd.pet_id = p.pet_id 
    join tinder_paws.Dispositions d on pd.disposition_id = d.disposition_id 
    WHERE d.disposition_id IN (${getDispositionIds})`;

    // final query
    const getFilteredAnimals = `SELECT p.*, a.type as animalType, GROUP_CONCAT(i.url) as images 
    FROM Pets as p 
    INNER JOIN Images as i ON p.pet_id=i.pet_id
    INNER JOIN Animals as a ON p.type=a.animal_id
    WHERE p.shelter_id IN (${shelterSubQuery}) 
    AND p.breed IN (${sqlBreedsArray}) 
    AND p.pet_id IN (${dispositionsSubQuery})
    AND p.pet_id NOT IN (
        SELECT m.pet_id
        FROM Matches as m
        WHERE m.user_id=?
      )
    GROUP BY p.pet_id;`;
    db.query(getFilteredAnimals,[user_id], (err, result)=>{
        if(err){
            console.error(err.message);
        }else{
            console.log(result)
            res.send(result);
        }
    })

})

export {router as filterSetting}