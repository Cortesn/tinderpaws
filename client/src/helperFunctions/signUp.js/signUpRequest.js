import axios from "axios";
const signUpRequest = (values, resetForm) => {
    axios.post('http://localhost:3001/signup/user', values)
    .then(function(response){
        if (response.status === 201){
            // window.location = '/'
        }
    })

    // alert(JSON.stringify(values));

    // reset form
    resetForm();
    return ( null );
}
 
export default signUpRequest;