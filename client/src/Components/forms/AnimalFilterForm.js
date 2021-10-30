import React, {useState, useEffect} from "react";
import {TextField, Button, Typography, Autocomplete, FormGroup, FormControlLabel, Checkbox, Grid} from "@mui/material";
import UseDispositionState from "../../hooks/useDispositionState";
import UseAnimalFilterState from "../../hooks/useAnimalFilterState";
// import axios from "axios";
import {api, setToken} from '../../helperFunctions/axiosInstace'
import createAnimalTypeArray from "../../helperFunctions/UserHome/createAnimalTypeArray";
import createObjectToArray from "../../helperFunctions/UserHome/createObjectToArray";
import convertDispObjToArray from "../../helperFunctions/UserHome/convertDispObjToArray";
import UseShelterState from "../../hooks/useShelterState";
import UseBreedState from "../../hooks/useBreedState";

let animals = null; // not sure how nicolas will be using the queried data
const AnimalFilterForm = (props) => {

    const submitAnimalFilter = ()=>{
        // const url = 'http://localhost:3001/filterSetting/filteredAnimals';
        const params = {params: {shelters: createObjectToArray(selectedShelters,[]), breeds: createObjectToArray(selectedBreeds,[]), dispositions: convertDispObjToArray(disposition,[])}}
        try{
            api.get('/filterSetting/filteredAnimals', params).then((response)=>{
                animals = response.data;
                console.log(response.data)
            })
        }catch(error){
            console.error(error)
            }
        }

    // shelters to populate dropdown on initial page render
    const shelters = props.shelters;

    // shelters - hook for final query
    const [selectedShelters, handleSelectedShelters] = UseShelterState();

    // animal types - hook
    const [state, handleAnimalSelectionChange] = UseAnimalFilterState(); 
    const { Dog, Cat, Other } = state;

    // breeds - hook for final query
    const[selectedBreeds, handleSelectedBreeds] = UseBreedState();
    
    // populating breeds drop down -- cant move out due to initial render
    const [breedState, setBreedState] = useState(null);
    useEffect(() => {
        const animalTypes = {params: {shelter: createObjectToArray(selectedShelters,[]), animalTypes: createAnimalTypeArray(state,[])}}
        // const url = 'http://localhost:3001/filterSetting/animals/breed';
        api.get('/filterSetting/animals/breed', animalTypes).then((response)=>{
            setBreedState(response.data);
            });
        }, [state, selectedShelters]);
    
    // disposition - hook for final query
    const [disposition, handleDispositionChange] = UseDispositionState();
    const { OtherAnimals, Children, Leashed, Available, Pending} = disposition;

    return ( 
        <form>
            <Grid container direction={"column"} spacing={1}>
                <Grid item align="center">
                    <Typography
                    variant="p"
                    align="center"
                    style={{fontWeight: 600, fontSize: "large"}}>
                        Shelters
                    </Typography>
                </Grid>
                <Grid item>
                    {/* need this for multiselect: https://mui.com/components/autocomplete/ */}
                    <Autocomplete
                        multiple
                        id="size-small-standard-multi"
                        size="small"
                        onChange={handleSelectedShelters}
                        options={shelters}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Shelters"
                            placeholder="Shelters"
                        />
                        )}
                    />
                </Grid>
                <Grid item align="center" marginTop="2%">
                    <Typography
                    variant="p"
                    align="center"
                    style={{fontWeight: 600, fontSize: "large"}}>
                        Types
                    </Typography>
                </Grid>
                <Grid item>    
                    <FormGroup>
                    {/* https://mui.com/components/checkboxes/ */}
                        <FormControlLabel control={<Checkbox checked={Dog} onChange={handleAnimalSelectionChange} name="Dog" />} label="Dog" />
                        <FormControlLabel  control={<Checkbox checked={Cat} onChange={handleAnimalSelectionChange} name="Cat"/>} label="Cat" />
                        <FormControlLabel  control={<Checkbox checked={Other} onChange={handleAnimalSelectionChange} name="Other" />} label="Other" />
                    </FormGroup>
                </Grid>
                <Grid item align="center">
                    <Typography
                    variant="p"
                    align="center"
                    style={{fontWeight: 600, fontSize: "large"}}>
                        Breeds
                    </Typography>
                </Grid>
                <Grid item>
                    {/* need this for multiselect: https://mui.com/components/autocomplete/ */}
                    {breedState && <Autocomplete
                        onChange={handleSelectedBreeds}
                        multiple
                        id="size-small-standard-multi"
                        size="small"
                        options={breedState}
                        getOptionLabel={(option) => option.breed}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Breeds"
                            placeholder="Breeds"
                        />
                        )}
                    /> }
                </Grid>
                <Grid item align="center" marginTop="2%">
                    <Typography
                    variant="p"
                    align="center"
                    style={{fontWeight: 600, fontSize: "large"}}>
                        Disposition
                    </Typography>
                </Grid>
                <Grid item>
                    <FormGroup>
                    {/* https://mui.com/components/checkboxes/ */}
                        <FormControlLabel control={<Checkbox checked={OtherAnimals} onChange={handleDispositionChange} name="OtherAnimals" />} label="Good with other animals" />
                        <FormControlLabel  control={<Checkbox checked={Children} onChange={handleDispositionChange} name="Children"/>} label="Good with children" />
                        <FormControlLabel  control={<Checkbox checked={Leashed} onChange={handleDispositionChange} name="Leashed" />} label="Animal must be leashed at all times" />
                        <FormControlLabel  control={<Checkbox checked={Available} onChange={handleDispositionChange} name="Available"/>} label="Available" />
                        <FormControlLabel  control={<Checkbox checked={Pending} onChange={handleDispositionChange} name="Pending" />} label="Pending" />
                    </FormGroup>
                </Grid>
                <Grid item>
                    <Button fullWidth align="center" variant="contained" color="success" onClick={submitAnimalFilter}>
                        Apply Filter
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
export default AnimalFilterForm;