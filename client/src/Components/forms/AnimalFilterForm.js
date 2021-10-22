import React from "react";
import {TextField, Button, Typography, Autocomplete, FormGroup, FormControlLabel, Checkbox, Grid} from "@mui/material";
import UseDispositionState from "../../hooks/useDispositionState";
import UseAnimalFilterState from "../../hooks/useAnimalFilterState";

const AnimalFilterForm = () => {
    // shelters 
    const shelters = [{title: 'Humane Society Silicon Valley'}]

    // animals
    const [state, handleAnimalSelectionChange] = UseAnimalFilterState(); 
    const { Dog, Cat, Other } = state;

    // dummy data for now 
    let breedsList = [{breed: "Yorkshire Terrier"},{ breed:"French Bulldog"}]
    
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
                    options={shelters}
                    getOptionLabel={(option) => option.title}
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
                <Autocomplete
                    multiple
                    id="size-small-standard-multi"
                    size="small"
                    options={breedsList}
                    getOptionLabel={(option) => option.breed}
                    defaultValue={[breedsList[0]]}
                    renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Breeds"
                        placeholder="Breeds"
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
                    <FormControlLabel control={<Checkbox checked={OtherAnimals} onChange={handleDispositionChange} name="OtherAnimals" />} label="Good with other animals" />
                    <FormControlLabel  control={<Checkbox checked={Children} onChange={handleDispositionChange} name="Children"/>} label="Good with children" />
                    <FormControlLabel  control={<Checkbox checked={Leashed} onChange={handleDispositionChange} name="Leashed" />} label="Animal must be leashed at all times" />
                    <FormControlLabel  control={<Checkbox checked={Available} onChange={handleDispositionChange} name="Available"/>} label="Available" />
                    <FormControlLabel  control={<Checkbox checked={Pending} onChange={handleDispositionChange} name="Pending" />} label="Pending" />
                </FormGroup>
            </Grid>
            <Grid item>
                <Button fullWidth align="center" variant="contained" color="success" href="/addAnimalProfile">
                    Apply Filter
                </Button>
            </Grid>
        </Grid>
    </form>
    );
}
 
export default AnimalFilterForm;