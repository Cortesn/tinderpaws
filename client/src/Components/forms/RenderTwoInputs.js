import React from 'react'
import { 
    Grid,
    TextField
} from '@mui/material';

// Rendering to input fields side-by-side
const RenderTwoInputs = (props) => {
    const {input1, input2} = props;

    return (
      
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant= 'filled'
                        id={input1.id}
                        label={input1.label}
                        name={input1.id}
                        value={input1.value}
                        onChange={input1.onChange}
                        error={input1.error}
                        helperText={input1.helperText}/>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        variant= 'filled'
                        id={input2.id}
                        label={input2.label}
                        name={input2.id}
                        value={input2.value}
                        onChange={input2.onChange}
                        error={input2.error}
                        helperText={input2.helperText}/>
                </Grid>
            </Grid>

    )
}

export default RenderTwoInputs
