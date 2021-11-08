import React from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageModal from './ImageModal';
import useImageUploadState from '../../hooks/useImageUploadState';


const ImageUploader = (props) => {
    const {addItem, snackBar, pet_id} = props;

    const [image, 
            handleImageChange, 
            open, 
            handleClose] = useImageUploadState('')
    return (
        <>
            <label htmlFor="icon-button-file">
                {/* file input */}
                <input 
                    id="icon-button-file" 
                    accept="image/*" 
                    type="file" 
                    // value={image}
                    onChange={handleImageChange}
                    style={{display: 'none'}}/>

                <IconButton 
                    color="primary" 
                    aria-label="upload picture" 
                    component="span"
                    >
                    <PhotoCamera />
                </IconButton>

            </label>

            {/* modal for image resize/crop */}
            <ImageModal 
                snackBar={snackBar}
                addItem={addItem}
                image={image} 
                open={open} 
                handleClose={handleClose}
                pet_id={pet_id}/>
        </>
    )
}

export default ImageUploader
