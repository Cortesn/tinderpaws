import {api, setToken} from '../../helperFunctions/axiosInstace'
const signUpRequest = (values, {resetForm, setFieldValue}) => {
    var data = JSON.parse(JSON.stringify(values))
        delete data.passwordConfirm

        // make request
        api.post('/signup/user', data )
            .then( response => {
                // console.log(response)
                // console.log(response.data)
                
                const {token} = response.data
                setToken(token)

                // remove error if exists
                setFieldValue('error', '')
                setFieldValue('success', 'Success!')

                // redirects page
                window.location = '/'
            })
            .catch( error => {
                // set error msg with formik
                setFieldValue('error', error.response.data.msg)
            })
            // might not need this promise -> always executes
            // .then(function(){
            //     // resetForm()
            // })
    return ( null );
}
 
export default signUpRequest;