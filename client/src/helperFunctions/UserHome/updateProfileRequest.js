import axios from "axios";
const UpdateProfileRequest = (values, user_id) => {
    let url = `http://localhost:3001/updateProfile/${user_id}`;
    axios.patch(url, values).then((response)=>{
        if(response.status === 200){
            alert("Successfully updated profile! :) ")
        }else{
            console.error("Something went wrong");
        }
    })
    return ( null );
}
 
export default UpdateProfileRequest;