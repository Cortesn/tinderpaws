import React from 'react'
import Grid from '@mui/material/Grid';
import { 
    FilledInput, 
    InputLabel, 
    FormControl, 
    Button, 
    MenuItem, 
    Select, 
    TextareaAutosize,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText} from '@mui/material';


const PetInfoForm = () => {
    return (
        <form style={{padding: '20px'}}>
            <Grid container direction={"column"} spacing={1}>
                <Grid item>
                    <FormControl fullWidth variant="filled" size="small">
                        <InputLabel htmlFor="petName">Pet Name</InputLabel>
                        <FilledInput
                            id='petName'
                            fullWidth />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled" size="small">
                        <InputLabel htmlFor="type">Type</InputLabel>
                        <Select
                            labelId="type"
                            id="type"
                            value='' >
                            <MenuItem value={1}>Dog</MenuItem>
                            <MenuItem value={2}>Cat</MenuItem>
                            <MenuItem value={3}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled" size="small">
                        <InputLabel htmlFor="type">Breed</InputLabel>
                        <Select
                            labelId="breed"
                            id="breed"
                            value=''>
                            <MenuItem value={1}>Breed 1</MenuItem>
                            <MenuItem value={2}>Breed 2</MenuItem>
                            <MenuItem value={3}>Breed 3</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled" size="small">
                        <InputLabel htmlFor="type">Status</InputLabel>
                        <Select
                            labelId="status"
                            id="status"
                            value=''>
                            <MenuItem value={1}>Not Available</MenuItem>
                            <MenuItem value={2}>Available</MenuItem>
                            <MenuItem value={3}>Pending</MenuItem>
                            <MenuItem value={3}>Adopted</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Add dispostionsion */}
                <Grid item>
                    <FormLabel component="legend">Dispositions</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                            <Checkbox checked=''  name="Good with other animals" />
                            }
                            label="Good with other animals"/>
                        <FormControlLabel
                            control={
                            <Checkbox checked=''  name="Good with children" />
                            }
                            label="Good with children"/>
                        <FormControlLabel
                            control={
                            <Checkbox checked=''  name="Animal must be leashed at all times" />
                            }
                            label="Animal must be leashed at all times"/>
                    </FormGroup>
                </Grid>
                
                <Grid item>
                    <FormControl fullWidth variant="filled" size="small">
                        <TextareaAutosize
                            aria-label="textarea"
                            minRows={5}
                            placeholder="Decription..."
                            style={{resize: 'vertical', maxWidth: '100%' }}/>
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
