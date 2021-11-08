import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import FormTemplate from '../forms/FormTemplate';
import { api, setToken } from "../../helperFunctions/axiosInstace";
const UserProfileUpdateForm = () => {
    const [userData, setUserData] = useState(null)
    // query for user data here
    useEffect(() => {
        const url = `/userProfileUpdate/userData`;
        setToken(localStorage.token)
        api.get(url).then((response)=>{
            setUserData(
                {
                    fname: response.data[0].f_name,
                    lname:response.data[0].l_name,
                    email: response.data[0].email
                }
            )});
        },[]);
    return ( 
        <Grid>
            {userData && 
            <FormTemplate  
            type={'userUpdate'} 
            button={'Update Profile'}
            data= {userData}
            />}
            <Grid item align="center" sx={{padding: '4% 0% 2% 0%'}}>
            </Grid>
        </Grid>
    )
}
 
export default UserProfileUpdateForm;