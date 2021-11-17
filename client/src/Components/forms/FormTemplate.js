import React from 'react'
import { Button, Stack, FormControl, Alert } from '@mui/material';
import { RenderInputs } from './RenderInputs';
import RenderTwoInputs from './RenderTwoInputs';
import { FormInputs, formik } from './FormInputs';

const FormTemplate = (props) => {
    const {type, button, data, gAlert} = props;
    const {filteredInputs} = FormInputs(type, data, {...props});
    var tempInput = null;
    return (
        <Stack
            direction="column"
            justifyContent="center"
            // alignItems="center"
            component="form"
            spacing={1}
            noValidate
            autoComplete="off"
            sx={{width:'100%'}}
            onSubmit={formik.handleSubmit}>
            
            {/* display alert messages */}
            {formik.values.error || (gAlert && gAlert.error) ? 
                <Alert sx={{'.MuiAlert-message': {margin: 'auto', paddingRight: '30px'}}}
                    severity="error">{formik.values.error || gAlert.error }</Alert> : null}
            {formik.values.success || (gAlert && gAlert.success) ? 
                <Alert sx={{'.MuiAlert-message': {margin: 'auto', paddingRight: '30px'}}}
                    severity="success">{formik.values.success || gAlert.success}</Alert> : null}
            
            {filteredInputs.map(input =>{
                
                if (input.id === 'state'){
                    tempInput = input;
                    return null;

                } else if (input.id === 'zip' && tempInput !== null){
                    return(
                        <FormControl key={input.id} variant="filled">   
                            <RenderTwoInputs input1={tempInput} input2={input} />
                        </FormControl>
                    )
                } else {
                    return (
                        <FormControl key={input.id} variant="filled">   
                            <RenderInputs input={input} type={type}/> 
                        </FormControl>
                    )
                }  
            })}
            <Button 
                id="formButton"
                type='submit' 
                variant='contained' 
                color='primary'
                sx={{textTransform: 'none'}}
                >
                {button}
            </Button>
        </Stack>
    )
}

export default FormTemplate;