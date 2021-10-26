import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import FormTemplate from '../forms/FormTemplate';
import { FormInputs } from '../forms/FormInputs';
import axios from 'axios';
const UserProfileUpdateForm = (props) => {
    const user_id = props.user_id
    const [userData, setUserData] = useState(null)
    // query for user data here
    useEffect(() => {
        const url = `http://localhost:3001/users/${user_id}`;
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
            form={FormInputs} 
            type={'userUpdate'} 
            button={'Update Profile'}
            data= {userData}
            user_id={user_id}/>}
        </Grid>
    )
}
 
export default UserProfileUpdateForm;