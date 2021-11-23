
import { api, setToken } from "../axiosInstace";
const UpdateProfileRequest = (values) => {
    setToken(localStorage.token)
    api.patch(`/users/user`, values).then((response)=>{
        if(response.status === 200){
            alert("Successfully updated profile! :) ")
        }else{
            console.error("Something went wrong");
        }
    })
    return ( null );
}
 
export default UpdateProfileRequest;