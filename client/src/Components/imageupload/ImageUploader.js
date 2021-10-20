import React from 'react'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageModal from './ImageModal';
import useImageUploadState from '../../hooks/useImageUploadState';


const ImageUploader = () => {
    const [image, 
            handleImageChange, 
            open, 
            handleClose] = useImageUploadState({false:false, true:true})

    return (
        <>
            <label htmlFor="icon-button-file">
                <input 
                    id="icon-button-file" 
                    accept="image/*" 
                    type="file" 
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
                image={image} 
                open={open} 
                handleClose={handleClose}/>
        </>
    )
}

export default ImageUploader