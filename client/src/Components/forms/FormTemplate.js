import React from 'react'
import { Button, Stack, FormControl } from '@mui/material';
import { RenderInputs } from './RenderInputs';
import RenderTwoInputs from './RenderTwoInputs';


const FormTemplate = (props) => {
    const {form, type, options, button} = props;
    const {filteredInputs, formik} = form(type, options);
   
    var tempInput = null;
    return (
        <Stack
            component="form"
            spacing={1}
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}>
            
            {filteredInputs.map(input =>{
                
                if (input.id === 'city'){
                    tempInput = input;

                } else if (input.id === 'zip' && tempInput !== null){
                    return(
                        <FormControl key={input.id} variant="filled">   
                            <RenderTwoInputs input1={tempInput} input2={input} />
                        </FormControl>
                    )
                } else {
                    return (
                        <FormControl key={input.id} variant="filled">   
                            <RenderInputs input={input}/> 
                        </FormControl>
                    )
                }  
            })}
            <Button 
                type='submit' 
                variant='contained' 
                color='primary'
                >
                {button}
            </Button>
        </Stack>
    )
}

export default FormTemplate;