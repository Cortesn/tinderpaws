import React from 'react'
import AvatarEditor from 'react-avatar-editor'

// Saves the edited image to a blob saved on local memory
const onClickSave = () => {
    if (AvatarEditor.editor) {
        // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
        // drawn on another canvas, or added to the DOM.

        // Image resized to the canvas size (also a HTMLCanvasElement)
        const canvasScaled = AvatarEditor.editor.getImageScaledToCanvas().toDataURL()
        // The edited image
        let imageURL =
            fetch(canvasScaled)
            .then(res => res.blob())
            .then(blob => (imageURL = URL.createObjectURL(blob)))

        console.log(imageURL)

        // This needs to be called after saving the image to fix memory leaks??
        return URL.revokeObjectURL(imageURL)
    }
}


const ImageEditor =(props) => {
    const {image} = props
    const setEditorRef = (editor) => (AvatarEditor.editor = editor)
    
        return (
                <AvatarEditor
                    style={{}}
                    image={image}
                    width={250}
                    height={300}
                    border={50}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={1.2}
                    rotate={0}
                    ref={setEditorRef}/>
        )
}

export default ImageEditor;
export {onClickSave};
