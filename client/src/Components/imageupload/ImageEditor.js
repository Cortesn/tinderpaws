import React from 'react'
import { Button, Slider, Stack } from '@mui/material'
import AvatarEditor from 'react-avatar-editor'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {api, setToken} from '../../helperFunctions/axiosInstace'

/* Reference: https://www.npmjs.com/package/react-avatar-editor */
class ImageEditor extends React.Component {
    state = {
        image: this.props.image,
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1.5,
        rotate: 0,
        borderRadius: 20,
        preview: null,
        width: 300,
        maxWidth:300,
        height: 400,
        maxHeight: 400,
        color: [255, 255, 255, 0.6], // RGBA
        style: {display: 'flex', justifyContent: 'center'}
    }

    onClickSave = () => {
        if (this.editor) {
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL()
            // The edited image
            fetch(canvasScaled)
                .then(res => res.blob())
                .then(blob => new File([blob], 'image'))
                .then(file => {
                    // console.log(file)
                    // make a new form element
                    let fd = new FormData();
                    fd.append('image', file)
                    console.log("fd", fd)
                    if (this.props.pet_id) {
                        // make request to upload a photo
                        setToken(localStorage.token)
                        api.post(`/images/${this.props.pet_id}`, fd )
                            .then( response => {
                                console.log("response data:", response.data)
                                const {payload} = response.data
                                // update the list of images
                                this.props.addImage({image_id: payload.image_id, url: payload.url})
                                // display snackbar alert
                                this.props.snackBar({success: payload.msg})
                                // close the modal
                                this.props.handleClose()
                            })
                            .catch( error => {
                                console.log("error:", error)
                                // display snackbar alert
                                this.props.snackBar({error: error.response.data.msg})
                                // close the modal
                                this.props.handleClose()
                            })
                    } else {
                        console.log("no pet id")

                    }
                })
        }
    }
    
    // handles image adjustment
    onZoom = (event) => {
        const scale = parseFloat(event.target.value)
        this.setState({ scale })
    }

    setEditorRef = (editor) => (this.editor = editor)

    render() {
        return (
            <div style={{paddingTop: '2.5rem'}}>
                <div style={this.state.style}>
                <AvatarEditor
                    ref={this.setEditorRef}
                    image={this.state.image}
                    width={this.state.width}
                    height={this.state.height}
                    border={this.state.border}
                    borderRadius={this.state.borderRadius}
                    color={this.state.color} 
                    scale={this.state.scale}
                    rotate={this.state.rotate}/>
                </div>

                <Stack spacing={2} direction="row" sx={{ mt: 2, mb: 2 }} alignItems="center">
                <RemoveIcon sx={{color: (theme) => theme.palette.grey[500]}} />
                <Slider 
                    onChange={this.onZoom}
                    defaultValue={1.5} 
                    aria-label="Image-Zoom-Slider" 
                    max={2.4}
                    min={1}
                    step={0.01}/>
                <AddIcon sx={{color: (theme) => theme.palette.grey[500]}}/>
                </Stack>
               
                <div style={this.state.style}>
                <Button 
                    sx={{maxWidth: '80%'}}
                    fullWidth
                    type='submit' 
                    variant='contained' 
                    color='primary'
                    onClick={this.onClickSave}>
                    Submit Image
                </Button>
                </div>
            </div>
        )
    }
}

export default ImageEditor