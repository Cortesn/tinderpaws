import React from 'react'
import { 
    InputAdornment, 
    IconButton, 
    TextField, 
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

export const RenderInputs = (props) => {
    const {input} = props;

    if (input.password){
        // passwords
        return (
            <TextField 
                key={input.id}
                variant= 'filled'
                id={input.id}
                label={input.label}
                type={input.password.type}
                value={input.password.value}
                onChange={input.password.onChange}
                error={input.password.error}
                helperText={input.password.helperText}
                InputProps={{
                    endAdornment:(
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={input.password.endAdornment.onClick}
                            onMouseDown={input.password.endAdornment.onMouseDown}
                            edge="end">
                            {input.password.endAdornment.visibility}
                        </IconButton>
                        </InputAdornment>
                    )
                }}
            /> 
        )
    } else if (input.options){
        // select/options
        return (
            <>
            <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
            <Select
                labelId={input.id}
                id={input.id}
                value=''>
                {input.options.map(option =>
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                )}
            </Select>
            </>
        )
    } else {
        // normal text input field
        return (
            <TextField
                variant= 'filled'
                id={input.id}
                label={input.label}
                name={input.id}
                value={input.value}
                onChange={input.onChange}
                error={input.error}
                helperText={input.helperText}/>
        )
    }
}
