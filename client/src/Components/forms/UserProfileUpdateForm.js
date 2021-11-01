import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import FormTemplate from '../forms/FormTemplate';
import {api} from '../../helperFunctions/axiosInstace'

const UserProfileUpdateForm = (props) => {
    const user_id = props.user_id
    const [userData, setUserData] = useState(null)
    // query for user data here
    useEffect(() => {
        api.get(`/userProfileUpdate/userData/${user_id}`).then((response)=>{
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
            </Grid>
        </Grid>
    )
}
 
export default UserProfileUpdateForm;