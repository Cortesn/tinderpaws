import React from "react";
import { Box, TextField, Button } from "@mui/material";
const UserHome = () => {
    return ( 
        <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '40ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-first-name"
            label="First Name"
            defaultValue="Robert"
          />
        </div>
        <div>
          <TextField
            id="outlined-last-name"
            label="Last Name"
            defaultValue="Hello World"
          />
        </div>
        <div>
            <TextField
                id="outlined-email"
                label="Email"
                defaultValue="robert@humanesocietysv.com"
            />
        </div>
        <div>
            <TextField
                id="outlined-password"
                label="Update Password"
                type="password"
                defaultValue="**********"
            />
        </div>
        <div>
            <TextField
                id="outlined-confirm-password"
                label="Confirm Password"
                type="password"
                defaultValue="**********"
            />
        </div>
        <div >
            <Button sx={{marginLeft:"4%"}}variant="contained" color="success" href="/addAnimalProfile">
                Save Changes
            </Button>
        </div>
        </Box>
     );
}
 
export default UserHome;