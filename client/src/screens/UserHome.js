import React from "react";
import { Box, TextField, Button, Typography, Autocomplete, Stack, FormGroup, FormControlLabel, Checkbox, Accordion, AccordionDetails, AccordionSummary, Link, IconButton, FormControl} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const UserHome = () => {
    // shelters
    const shelters = [{title: 'Humane Society Silicon Valley'}]
    // animals
    const [state, setState] = React.useState({
        Dog:true,
        Cat: false,
        Other: false
    });
    const handleChange = (event) => {
        setState({
          ...state,
          [event.target.name]: event.target.checked,
        });
      };
    
    const { Dog, Cat, Other } = state;

    // breeds
    let activeTypes = (state)=>{
        if(state.Dog && state.Cat && state.Other){
            return 1
        }else if(state.Dog && state.Other){
            return 2
        }else if(state.Cat && state.Other){
            return 3
        }else if(state.Cat && state.Dog){
            return 4
        }else if(state.Cat){
            return 5
        }else if(state.Dog){
            return 6
        }else if(state.Other){
            return 7
        }
    }

    let breedQuery = ()=>{
        // have to parse the query 
        if(activeTypes===1){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type = "Dog" OR Pets.type="Cat" OR Pets.type="Other"`
        }else if(activeTypes===2){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type = "Dog" OR Pets.type="Other"`
        }else if(activeTypes===3){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type="Cat" OR Pets.type="Other"`
        }else if(activeTypes===4){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type = "Dog" OR Pets.type="Cat"`
        }else if(activeTypes===5){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type="Cat"`
        }else if(activeTypes===6){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type = "Dog"`
        }else if(activeTypes===7){
            return `SELECT Pets.breed FROM Pets WHERE Pets.type="Other"`
        }
    }

    let ogBreedsList = (breedQuery)=>{
        // axios request to backend includes query to run 
        // get list of breeds and populate multi select drop down
        return 
    }

    // dummy data for now 
    let breedsList = [{breed: "Yorkshire Terrier"},{ breed:"French Bulldog"}]
    // dispositions

    const [disposition, setDisposition] = React.useState({
        OtherAnimals:false,
        Children: false,
        Leashed: false,
        Unavailable: false,
        Available: false,
        Pending: false

    });
    const handleDispositionChange = (event) => {
        setDisposition({
          ...disposition,
          [event.target.name]: event.target.checked,
        });
      };
    
    const { OtherAnimals, Children, Leashed, Unavailable, Available, Pending} = state;

    // accordion expansion
    const [expanded, setExpanded] = React.useState(false);

    const handleChangeAccordion = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };


    return ( 
        <Box
            sx={{
            border:1,
            borderColor: 'grey.500',
            width: '30%',
            padding: '1rem',
            borderRadius:"12px",
            marginBottom: "2rem",
            marginLeft: "2%"
            }}
        >
            <Accordion expanded={expanded === 'profileSettings'} onChange={handleChangeAccordion('profileSettings')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="profile-settings-content"
                id="profie-settings-header"
                >
                    <Typography sx={{ flexShrink: 0 }}>
                        Profile
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box
                        component="form"
                        sx={{
                        '& .MuiTextField-root': { m: 1, width: '40ch' },
                        }}
                        noValidate
                        autoComplete="off"
                        >
                        <FormControl>
                            <TextField
                                id="outlined-first-name"
                                label="First Name"
                                defaultValue="Robert"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="outlined-last-name"
                                label="Last Name"
                                defaultValue="Hello World"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                    id="outlined-email"
                                    label="Email"
                                    defaultValue="robert@humanesocietysv.com"
                                />
                        </FormControl>
                        <FormControl>
                            <TextField
                                    id="outlined-password"
                                    label="Update Password"
                                    type="password"
                                    defaultValue="**********"
                                />
                        </FormControl>
                       <FormControl>
                        <TextField
                                    id="outlined-confirm-password"
                                    label="Confirm Password"
                                    type="password"
                                    defaultValue="**********"
                                />
                       </FormControl>
                       <div
                       align="center">
                            <Button sx={{marginLeft:"4%"}} type="submit" variant="contained" color="success">
                                Save Changes
                            </Button>
                        </div>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'filterSettings'} onChange={handleChangeAccordion('filterSettings')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="filter-settings-content"
                id="filter-settings-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Filter
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Box
                    component="form"
                    sx={{
                    '& .MuiTextField-root': { m: 1, width: '40ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Stack spacing={2}>
                        <Typography
                        variant="p"
                        align="center"
                        style={{fontWeight: 600, textDecorationLine: 'underline'}}>
                            Filter Settings
                        </Typography>
                        <Typography
                        variant="p"
                        align="center"
                        style={{fontWeight: 600, textDecorationLine: 'underline'}}>
                            Shelters
                        </Typography>
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
                        <Typography
                        variant="p"
                        align="center"
                        style={{fontWeight: 600, textDecorationLine: 'underline'}}>
                            Types
                        </Typography>    
                        <FormGroup>
                        {/* https://mui.com/components/checkboxes/ */}
                            <FormControlLabel control={<Checkbox checked={Dog} onChange={handleChange} name="Dog" />} label="Dog" />
                            <FormControlLabel  control={<Checkbox checked={Cat} onChange={handleChange} name="Cat"/>} label="Cat" />
                            <FormControlLabel  control={<Checkbox checked={Other} onChange={handleChange} name="Other" />} label="Other" />
                        </FormGroup>
                        <Typography
                        variant="p"
                        align="center"
                        style={{fontWeight: 600, textDecorationLine: 'underline'}}>
                            Breeds
                        </Typography>
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
                        <Typography
                        variant="p"
                        align="center"
                        style={{fontWeight: 600, textDecorationLine: 'underline'}}>
                            Disposition
                        </Typography>
                        <FormGroup>
                        {/* https://mui.com/components/checkboxes/ */}
                            <FormControlLabel control={<Checkbox checked={OtherAnimals} onChange={handleDispositionChange} name="OtherAnimals" />} label="Good with other animals" />
                            <FormControlLabel  control={<Checkbox checked={Children} onChange={handleDispositionChange} name="Children"/>} label="Good with children" />
                            <FormControlLabel  control={<Checkbox checked={Leashed} onChange={handleDispositionChange} name="Leashed" />} label="Animal must be leashed at all times" />
                            <FormControlLabel control={<Checkbox checked={Unavailable} onChange={handleDispositionChange} name="Unavailable" />} label="Unavailable" />
                            <FormControlLabel  control={<Checkbox checked={Available} onChange={handleDispositionChange} name="Available"/>} label="Available" />
                            <FormControlLabel  control={<Checkbox checked={Pending} onChange={handleDispositionChange} name="Pending" />} label="Pending" />
                        </FormGroup>
                        <div align="center">
                            <Button align="center" variant="contained" color="success" href="/addAnimalProfile">
                                Save Changes
                            </Button>
                        </div>

                    </Stack>
                    

                </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'matches'} onChange={handleChangeAccordion('matches')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="matches-content"
                id="matches-header"
                >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                        Matches
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {/* for loop of queried matches for user id, will be static data for now */}
                    <Stack>
                        <Box
                        sx={{
                            border:1,
                            borderColor: 'grey.500',
                            padding: '1rem',
                            borderRadius:"12px",
                            marginBottom: "3%"
                        }}
                        >
                            <Stack
                            direction="row"
                            justifyContent="flex-start"
                            // might have to change the spacing below
                            spacing={{ xs: 1, sm: 4, md: 6, lg:10, xl:20}}
                            >
                                <IconButton>
                                    <PetsIcon/>
                                </IconButton>
                                <Typography
                                component="div"
                                align="center"
                                padding="4%"
                                >
                                    <Link
                                    href="/animalProfilePage/:id"
                                    underline="none"
                                    color="inherit"
                                    align="center"
                                    marginTop="2%"
                                    >
                                    Match 1
                                    </Link>
                                </Typography>
                                
                            </Stack>
                        </Box>
                        <Box
                        sx={{
                            border:1,
                            borderColor: 'grey.500',
                            padding: '1rem',
                            borderRadius:"12px",
                            marginBottom: "3%"
                        }}
                        >
                            <Stack
                            direction="row"
                            justifyContent="flex-start"
                            // might have to change the spacing below
                            spacing={{ xs: 1, sm: 4, md: 6, lg:10, xl:20}}
                            >
                                <IconButton>
                                    <PetsIcon/>
                                </IconButton>
                                <Typography
                                component="div"
                                align="center"
                                padding="4%"
                                >
                                    <Link
                                    href="/animalProfilePage/:id"
                                    underline="none"
                                    color="inherit"
                                    align="center"
                                    marginTop="2%"
                                    >
                                    Match 2
                                    </Link>
                                </Typography>
                                
                            </Stack>
                        </Box>
                    </Stack>
                                
                </AccordionDetails>
            </Accordion>
        </Box>
       
     );
}
 
export default UserHome;