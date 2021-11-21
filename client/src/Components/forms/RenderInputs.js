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
    TextareaAutosize,
    FormHelperText
} from '@mui/material';


export const RenderInputs = (props) => {
    const {input, type} = props;

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
        // select/options
        return (
            <>
            <InputLabel htmlFor={input.id}>{input.label}</InputLabel>
            <Select
                labelId={input.id}
                id={input.id}
                value={input.value || ''}
                onChange={input.onChange}
                error={input.error}>
                {input.options.map(option =>
                    <MenuItem key={option.id} id={option.id} value={option.id}>{option.name}</MenuItem>
                )}
            </Select>
            <FormHelperText sx={{color: '#d32f2f'}}>{input.helperText}</FormHelperText>
            </>
        )
    } else if (input.checkboxes){
        // checkboxes
        return (
            <>
            <FormLabel component="legend" sx={{color: input.error?'#d32f2f':'#000000'}}>{input.label}</FormLabel>
            <FormGroup >
                {input.checkboxes.map(box => 
                    <FormControlLabel
                        key={box.id}
                        label={box.name}
                        onChange={() => {
                            if (input.value.length > 0 && input.value.includes(box.id)){
                                input.value = input.value.filter(disp => disp !== box.id)
                                input.formik.setFieldValue('dispositions', input.value)
                            } else {
                                input.value.push(box.id)
                                input.formik.setFieldValue('dispositions', input.value)
                            }
                        }}
                        control={<Checkbox name={box.name} />}
                        checked={input.value.length > 0 ? input.value.includes(box.id) : false}/>
                )}
            </FormGroup>
            <FormHelperText sx={{color: '#d32f2f'}}>{input.helperText}</FormHelperText>
            </>
        )
    }else if (input.textArea) {
        // textarea (no validation)
        return (
            <>
            <TextareaAutosize
                aria-label="textarea"
                id={input.textArea.id}
                minRows={input.textArea.rows}
                placeholder={input.label + '...'}
                defaultValue={input.value}
                onChange={input.onChange}
                style={{resize: 'vertical', maxWidth: '100%' }}/>
            </>
        )
    } else {
        // normal text input field
        return (
            <TextField
                variant= 'filled'
                id={input.id + type}
                label={input.label}
                name={input.id}
                value={input.value || ''}
                onChange={input.onChange}
                error={input.error}
                helperText={input.helperText}/>
        )
    }
}
