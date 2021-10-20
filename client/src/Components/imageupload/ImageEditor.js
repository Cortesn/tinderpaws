import { Button, Slider } from '@mui/material'
import React from 'react'
import AvatarEditor from 'react-avatar-editor'

class ImageEditor extends React.Component {
    state = {
        image: this.props.image,
        allowZoomOut: false,
        position: { x: 0.5, y: 0.5 },
        scale: 1.2,
        rotate: 0,
        borderRadius: 20,
        preview: null,
        width: 250,
        height: 300,
        color: [255, 255, 255, 0.6], // RGBA
        style: {display: 'flex', margin: 'auto', justifyContent: 'center', alignItems:'center'}
    }

    onClickSave = () => {
        if (this.editor) {
            // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
            // drawn on another canvas, or added to the DOM.
    
            // Image resized to the canvas size (also a HTMLCanvasElement)
            const canvasScaled = this.editor.getImageScaledToCanvas().toDataURL()
            // The edited image
            let imageURL =
                fetch(canvasScaled)
                    .then(res => res.blob())
                    .then(blob => (imageURL = window.URL.createObjectURL(blob)))
    
            console.log(imageURL)
    
            // This needs to be called after saving the image to fix memory leaks??
            return URL.revokeObjectURL(imageURL)
        }
    }

    onZoom = (event) => {
        const scale = parseFloat(event.target.value)
        this.setState({ scale })
    }


    setEditorRef = (editor) => (this.editor = editor)

    render() {
        return (
            <div >
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

                <div style={this.state.style}>
                    <Slider 
                        onChange={this.onZoom}
                        defaultValue={1.2} 
                        aria-label="Image-Zoom-Slider" 
                        max={2.4}
                        step={0.01}
                        sx={{
                            padding: '40px 0px',
                            maxWidth: '80%'}}/>
                </div>

                <Button 
                    
                    fullWidth
                    type='submit' 
                    variant='contained' 
                    color='primary'
                    onClick={this.onClickSave}>
                    Submit Image
                </Button>
            </div>
        )
    }
}

export default ImageEditor