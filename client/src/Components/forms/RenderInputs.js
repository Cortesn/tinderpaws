import React from 'react'
import { 
    InputAdornment, 
    IconButton, 
    TextField, 
    InputLabel,
    Select,
    MenuItem,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextareaAutosize
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
                value={input.password.value || ''}
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
        // console.log(input.options)
        // select/options
        return (
            <>
            <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
            <Select
                // onBlur={input.onBlur}
                labelId={input.id}
                id={input.id}
                value={input.value || ''}
                // options={input.options}
                onChange={input.onChange}
                error={input.error}>
                {input.options.map(option =>
                    <MenuItem key={option.id} id={option.id} value={option.id}>{option.name}</MenuItem>
                )}
            </Select>
            </>
        )
    } else if (input.checkboxes){
        return (
            <>
            <FormLabel component="legend">{input.label}</FormLabel>
            <FormGroup>
                {input.checkboxes.map(box => 
                    <FormControlLabel
                        key={box.id}
                        label={box.name}
                        control={<Checkbox name={box.name} />}
                        checked={input.value.includes(box.id)}/>
                )}
            </FormGroup>
            </>
        )
    }else if (input.textArea) {
        return (
            <>
            <TextareaAutosize
                aria-label="textarea"
                minRows={input.textArea.rows}
                placeholder={input.label + '...'}
                defaultValue={input.value}
                style={{resize: 'vertical', maxWidth: '100%' }}/>
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
                value={input.value || ''}
                onChange={input.onChange}
                error={input.error}
                helperText={input.helperText}/>
        )
    }
}
