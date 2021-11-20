import React, {useState, useEffect} from "react";
import {TextField, Button, Typography, Autocomplete, FormGroup, FormControlLabel, Checkbox, Grid} from "@mui/material";
import UseDispositionState from "../../hooks/useDispositionState";
import UseAnimalFilterState from "../../hooks/useAnimalFilterState";
import {api} from '../../helperFunctions/axiosInstace'
import createAnimalTypeArray from "../../helperFunctions/UserHome/createAnimalTypeArray";
import createObjectToArray from "../../helperFunctions/UserHome/createObjectToArray";
import convertDispObjToArray from "../../helperFunctions/UserHome/convertDispObjToArray";
import UseShelterState from "../../hooks/useShelterState";
import UseBreedState from "../../hooks/useBreedState";

const AnimalFilterForm = (props) => {
    const submitAnimalFilter = ()=>{
        const params = {params: {shelters: createObjectToArray(selectedShelters,[]), breeds: createObjectToArray(selectedBreeds,[]), dispositions: convertDispObjToArray(disposition,[])}}
        try{
            api.get('/filterSetting/filteredAnimals', params).then((response)=>{
                response.data.forEach((pet) => {
                    pet.images = pet.images.split(",");
                    pet.type = pet.animalType;
                    pet.id = pet.pet_id;
                    return pet;
                });
                console.log("submitanimalFilter",response.data)
                props.setPetState(response.data);
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
                        id="size-small-standard-multi shelters"
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
                        <FormControlLabel control={<Checkbox checked={OtherAnimals} onChange={handleDispositionChange} name="OtherAnimals" />} label="Good with other animals" id="animals" />
                        <FormControlLabel  control={<Checkbox checked={Children} onChange={handleDispositionChange} name="Children"/>} label="Good with children" id="child"/>
                        <FormControlLabel  control={<Checkbox checked={Leashed} onChange={handleDispositionChange} name="Leashed" />} label="Animal must be leashed at all times" id="leash"/>
                        <FormControlLabel  control={<Checkbox checked={Available} onChange={handleDispositionChange} name="Available"/>} label="Available" id="avail"/>
                        <FormControlLabel  control={<Checkbox checked={Pending} onChange={handleDispositionChange} name="Pending" />} label="Pending" id="pending"/>
                    </FormGroup>
                </Grid>
                <Grid item>
                    <Button fullWidth align="center" variant="contained" color="success" id="applyAnimalFilter" onClick={submitAnimalFilter}>
                        Apply Filter
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
export default AnimalFilterForm;