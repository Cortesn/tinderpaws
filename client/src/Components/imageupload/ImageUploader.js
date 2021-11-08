import React from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageModal from './ImageModal';
import useImageUploadState from '../../hooks/useImageUploadState';


const ImageUploader = (props) => {
    const {addImage, snackBar} = props;

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
                addImage={addImage}
                image={image} 
                open={open} 
                handleClose={handleClose}
                pet_id={pet_id}/>
        </>
    )
}

export default ImageUploader
