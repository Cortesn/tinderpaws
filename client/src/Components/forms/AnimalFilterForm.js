import React, {useState, useEffect} from "react";
import {TextField, Button, Typography, Autocomplete, FormGroup, FormControlLabel, Checkbox, Grid} from "@mui/material";
import UseDispositionState from "../../hooks/useDispositionState";
import UseAnimalFilterState from "../../hooks/useAnimalFilterState";
import axios from "axios";
import createAnimalTypeArray from "../../helperFunctions/UserHome/createAnimalTypeArray";
import createSheltersNameArray from "../../helperFunctions/UserHome/createSheltersNameArray";

const AnimalFilterForm = (props) => {
    // submitAnimalFilterForm
    const submitAnimalFilter = async ()=>{
        // change the array of breed names and dispositions to nested strings or else sql will error out 
        
        // axios request to our server
        const url = 'https://localhost:3001/animals/filtered';
        const params = {params: {shelters: selectedShelters, breeds: selectedBreed, dispositions: disposition}}
        try{
            axios.get(url, params).then((response)=>{
                console.log(response)
            })
        }catch(error){
            console.error(error)
            }
        }

    // shelters for dropdown
    const shelters = props.shelters;
    // shelters selcted for final query -- cant move out bc value is needed and comes from multiselect dropdown
    const [selectedShelters, setSelectedShelters] = useState(null);
    const handleSelectedShelters = (event, value) => setSelectedShelters(value);

    // animal types
    const [state, handleAnimalSelectionChange] = UseAnimalFilterState(); 
    const { Dog, Cat, Other } = state;

    // breeds selected for final query -- cant move out bc value is needed
    const [selectedBreed, setSelectedBreeds] = useState(null);
    const handleSelectedBreeds = (event, value)=> setSelectedBreeds(value);
    
    // setting breeds for drop down -- cant move out due to initial render
    const [breedState, setBreedState] = useState(null);
    useEffect(() => {
        const animalTypes = {params: {shelter: createSheltersNameArray(selectedShelters,[]), animalTypes: createAnimalTypeArray(state,[])}}
        const url = 'http://localhost:3001/animals/breed';
        axios.get(url, animalTypes).then((response)=>{
            setBreedState(response.data);
            });
        }, [state, selectedShelters]);
    
    // disposition
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
                    defaultValue={[shelters[0]]}
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
                {/* populate drop down on click on the drop down */}
                {breedState && <Autocomplete
                    onChange={handleSelectedBreeds}
                    multiple
                    id="size-small-standard-multi"
                    size="small"
                    options={breedState}
                    getOptionLabel={(option) => option.breed}
                    defaultValue={[breedState[0]]}
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