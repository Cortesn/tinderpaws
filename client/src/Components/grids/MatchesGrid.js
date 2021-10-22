import React from "react";
import { Box, Typography, Link, IconButton, Grid} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
const MatchesGrid = () => {
    return ( 
        <Grid container direction={"column"} spacing={1}>
            <Grid item align="center">
                {/* for loop of queried matches for user id, will be static data for now */}
                <Box
                sx={{
                    border:1,
                    borderColor: 'grey.500',
                    padding: '1rem',
                    borderRadius:"12px",
                    marginBottom: "3%"
                }}
                >
                    <Grid
                    container 
                    direction={"row"}
                    // // might have to change the spacing below
                    spacing={{ xs: 1, sm: 4, md: 6, lg:10, xl:20}}
                    >
                        <Grid item>
                            <IconButton>
                                <PetsIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography
                            component="div"
                            align="center"
                            paddingTop="10%"
                            >
                                <Link
                                href="/animalProfilePage/:id"
                                underline="none"
                                color="inherit"
                                >
                                Match 1
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item>
            {/* for loop of queried matches for user id, will be static data for now */}
                <Box
                sx={{
                    border:1,
                    borderColor: 'grey.500',
                    padding: '1rem',
                    borderRadius:"12px",
                    marginBottom: "3%"
                }}
                >
                    <Grid 
                    container 
                    direction={"row"}
                    // // might have to change the spacing below
                    spacing={{ xs: 1, sm: 4, md: 6, lg:10, xl:20}}
                    >
                        <Grid item>
                            <IconButton>
                                <PetsIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography
                                component="div"
                                paddingTop="10%"
                                >
                                <Link
                                href="/animalProfilePage/:id"
                                underline="none"
                                color="inherit"
                                >
                                Match 2
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </Grid>         
     );
}
 
export default MatchesGrid;