import React from 'react'
import Grid from '@mui/material/Grid';
import { 
    FilledInput, 
    InputLabel, 
    FormControl, 
    Button, 
    MenuItem, 
    Select } from '@mui/material';


const PetInfoForm = () => {
    return (
        <form style={{display: 'block'}}>
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="petName">Pet Name</InputLabel>
                        <FilledInput
                            id='petName'
                            fullWidth />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value=''
                        >
                            <MenuItem value={1}>Dog</MenuItem>
                            <MenuItem value={2}>Cat</MenuItem>
                            <MenuItem value={3}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="type">Breed</InputLabel>
                        <Select
                            labelId="breed"
                            id="breed"
                            value=''
                        >
                            <MenuItem value={1}>Breed 1</MenuItem>
                            <MenuItem value={2}>Breed 2</MenuItem>
                            <MenuItem value={3}>Breed 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                
                <Grid item>
                    <Button 
                        fullWidth
                        type='submit' 
                        variant='contained' 
                        color='primary'>
                        Save Changes
                    </Button>
                </Grid>
               
                
            </Grid> 
        </form>
    )
}

export default PetInfoForm
