import React from "react";
import { Button, Typography, FormControl, Grid, FilledInput, InputLabel} from "@mui/material";
const UserProfileUpdateForm = (props) => {
    const user_id = props.user_id
    

    return ( 
        <form >
            <Grid container direction={"column"} spacing={1}>
                <Grid item align="center">
                    <Typography
                    variant="p"
                    align="center"
                    style={{fontWeight: 600, fontSize: "large"}}>
                        Update Profile
                    </Typography>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="fName">First Name</InputLabel>
                        <FilledInput
                            id="fName"
                            fullWidth
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="lName">Last Name</InputLabel>
                        <FilledInput
                            id="lName"
                            fullWidth
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <FilledInput
                            id="email"
                            fullWidth
                            variant="filled"
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="updatePassword">Update Password</InputLabel>
                        <FilledInput
                            id="updatePassword"
                            fullWidth
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl fullWidth variant="filled">
                        <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                        <FilledInput
                            id="confirmPassword"
                            fullWidth
                        />
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                    fullWidth
                    type='submit' 
                    variant="contained" 
                    color="success">
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </form>
     );
}
 
export default UserProfileUpdateForm;