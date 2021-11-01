import {api} from '../../helperFunctions/axiosInstace'

const UpdateProfileRequest = (values, user_id) => {
    api.patch(`/userProfileUpdate/${user_id}`, values).then((response)=>{
        if(response.status === 200){
            alert("Successfully updated profile! :) ")
        }else{
            console.error("Something went wrong");
        }
    })
    return ( null );
}
 
export default UpdateProfileRequest;