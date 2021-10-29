import { Box, Typography, Link, IconButton, Grid} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
const createDynamicMatches = (arr) => {

    const matches = arr.map((obj,key)=>{
        const name = obj["name"]
        const pet_id = "/animalProfilePage/" + obj["pet_id"].toString()
        return  <Grid item align="center" key={key}>
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
                        spacing={{ xs: 10, sm: 12, md: 12, lg:12, xl:18}}
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
                                    href={pet_id}
                                    underline="none"
                                    color="inherit"
                                    >
                                    {name}
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>

    });
    return ( 
        matches
     );
}
 
export default createDynamicMatches;