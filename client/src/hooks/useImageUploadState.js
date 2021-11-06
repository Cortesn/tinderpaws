import {useState} from 'react'


const useImageUploadState = (initialValues) => {
    const [image, setImage] = useState(initialValues);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleClose = (event) => {
      // event.target.files = null
      setImage('')
      setOpen(false);
      // handle clearing our memory so that you can click on the image upload again
    }

    const handleImageChange = event => {
      setImage(event.target.files[0])
      if(!open){
        handleOpen();
      }
      event.target.value = ''; // clears event for repeated uploads
    };

    return [image, handleImageChange, open, handleClose]
}

export default useImageUploadState
