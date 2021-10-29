import React, {useEffect, useState} from "react";
import {Grid, Link} from "@mui/material";
import FormTemplate from '../forms/FormTemplate';
import axios from 'axios';
const UserProfileUpdateForm = (props) => {
    const user_id = props.user_id
    const [userData, setUserData] = useState(null)
    // query for user data here
    useEffect(() => {
        const url = `http://localhost:3001/userProfileUpdate/userData/${user_id}`;
        axios.get(url).then((response)=>{
            setUserData(
                {
                    fname: response.data[0].f_name,
                    lname:response.data[0].l_name,
                    email: response.data[0].email,
                    password: response.data[0].password,
                    passwordConfirm: response.data[0].password
                }
            )});
        },[user_id]);
    return ( 
        <Grid>
            {userData && 
            <FormTemplate  
            type={'userUpdate'} 
            button={'Update Profile'}
            data= {userData}
            user_id={user_id}/>}
            <Grid item align="center" sx={{padding: '4% 0% 2% 0%'}}>
                <Link  href="/reset">
                    Reset Password
                </Link>
            </Grid>
        </Grid>
    )
}
 
export default UserProfileUpdateForm;