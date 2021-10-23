import {useState} from 'react'

const useImageUploadState = (initialValue) => {
    const [image, setImage] = useState();
    const [open, setOpen] = useState(initialValue.false);
    const handleOpen = () => setOpen(initialValue.true);
    const handleClose = () => setOpen(initialValue.false);

    const handleImageChange = event => {
        // creates a local blob
        const imgBlob = URL.createObjectURL(event.target.files[0])
        console.log(imgBlob);
        // update image state
        setImage(imgBlob)
        // open the modal
        handleOpen();
       
        // free memory when ever this component is unmounted
        // return () => URL.revokeObjectURL(imgURL)
      };
    
    return [image, handleImageChange, open, handleClose]
}

export default useImageUploadState
