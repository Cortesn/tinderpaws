import {api, setToken} from '../../helperFunctions/axiosInstace'
const signUpRequest = (values, {resetForm, setFieldValue}, {...props}) => {
    var data = JSON.parse(JSON.stringify(values))
        delete data.passwordConfirm

        // make request
        api.post('/signup/user', data )
            .then( response => {
                const {token} = response.data
                setToken(token)

                // remove error if exists
                setFieldValue('error', '')
                setFieldValue('success', 'Success!')

                props.handleAuthChange()
                // redirects page
                props.history.push('/')
            })
            .catch( error => {
                // set error msg with formik
                setFieldValue('error', error.response.data.msg)
            })

    return ( null );
}
 
export default signUpRequest;