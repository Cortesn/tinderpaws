import React, {useState, useEffect} from "react";
import {TextField, Button, Typography, Autocomplete, FormGroup, FormControlLabel, Checkbox, Grid, Alert} from "@mui/material";
import UseDispositionState from "../../hooks/useDispositionState";
import UseAnimalFilterState from "../../hooks/useAnimalFilterState";
import {api, setToken} from '../../helperFunctions/axiosInstace'
import createAnimalTypeArray from "../../helperFunctions/UserHome/createAnimalTypeArray";
import createObjectToArray from "../../helperFunctions/UserHome/createObjectToArray";
import convertDispObjToArray from "../../helperFunctions/UserHome/convertDispObjToArray";
import UseShelterState from "../../hooks/useShelterState";
import UseBreedState from "../../hooks/useBreedState";


const AnimalFilterForm = (props) => {
    const submitAnimalFilter = ()=>{
        // create types arr
        var petTypes =[] 
        for (const key in state){
            if (state[key] === true){
                petTypes.push(`'${key}'`)
            }
        }
        const params = {params: {
                            shelters: createObjectToArray(selectedShelters,[]),
                            types: petTypes, 
                            breeds: createObjectToArray(selectedBreeds,[]), 
                            dispositions: convertDispObjToArray(disposition,[])
                        }}
        try{
            setToken(localStorage.token)
            api.get('/pets/filter', params).then((response)=>{
                response.data.forEach((pet) => {
                    pet.images = pet.images.split(",");
                    pet.type = pet.animalType;
                    pet.id = pet.pet_id;
                    return pet;
                });
                props.setSuccessState(!props.success)
                props.setPetState(response.data);
            })
        }catch(error){
            props.setFilterErrorState(!props.filterError)
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
    const [breedState, setBreedState] = useState([]);
    useEffect(() => {
        if (Dog || Cat || Other){
            const animalTypes = {params: {animalTypes: createAnimalTypeArray(state,[])}}
            setToken(localStorage.token)
            api.get('/breeds/filter/', animalTypes).then((response)=>{
                setBreedState(response.data);
                });
            }
    }, [Dog, Cat, Other, state, selectedShelters]);
        
    
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
                        id="size-small-standard-multi shelters"
                        size="small"
                        onChange={handleSelectedShelters}
                        options={shelters}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Shelters"
                            id="sheltersDropDown"
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
                        <FormControlLabel control={<Checkbox checked={Dog} onChange={handleAnimalSelectionChange} name="Dog" />} label="Dog" id="Dog"/>
                        <FormControlLabel  control={<Checkbox checked={Cat} onChange={handleAnimalSelectionChange} name="Cat"/>} label="Cat" id="Cat"/>
                        <FormControlLabel  control={<Checkbox checked={Other} onChange={handleAnimalSelectionChange} name="Other" />} label="Other" id="Other" />
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
                     <Autocomplete
                        onChange={handleSelectedBreeds}
                        multiple
                        id="size-small-standard-multi"
                        size="small"
                        options={breedState}
                        getOptionLabel={(option) => option.name}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Breeds"
                        />
                        )}
                    />
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
                        <FormControlLabel control={<Checkbox checked={OtherAnimals} onChange={handleDispositionChange} name="OtherAnimals" />} label="Good with other animals" id="animals" />
                        <FormControlLabel  control={<Checkbox checked={Children} onChange={handleDispositionChange} name="Children"/>} label="Good with children" id="child"/>
                        <FormControlLabel  control={<Checkbox checked={Leashed} onChange={handleDispositionChange} name="Leashed" />} label="Animal must be leashed at all times" id="leash"/>
                        
                        <Typography
                            variant="p"
                            align="center"
                            style={{fontWeight: 600, fontSize: "large"}}>
                            Status
                        </Typography>
                        <FormControlLabel  control={<Checkbox checked={Available} onChange={handleDispositionChange} name="Available"/>} label="Available" id="avail"/>
                        <FormControlLabel  control={<Checkbox checked={Pending} onChange={handleDispositionChange} name="Pending" />} label="Pending" id="pending"/>
                    </FormGroup>
                </Grid>
                <Grid item>
                    {props.success && <Alert severity="success">Successfully filtered! </Alert>}
                    {props.filterError && <Alert severity="error">Error, please double check selected values!</Alert>}
                    <Button fullWidth align="center" variant="contained" style={{backgroundColor: '#467eac'}} id="applyAnimalFilter" onClick={submitAnimalFilter}>
                        Apply Filter
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
export default AnimalFilterForm;