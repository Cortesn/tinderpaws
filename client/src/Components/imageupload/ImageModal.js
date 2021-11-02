import React from 'react'
import {
    IconButton,
    Modal, 
    Typography, 
    Box  } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageEditor from './ImageEditor';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '85%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 3,
};

  
const ImageModal = (props) => {
    const {image, open, handleClose, addItem, snackBar} = props

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography 
                    id="modal-modal-title" 
                    variant="h6" 
                    component="h2" 
                    align='center' 
                    sx={{
                        position: 'absolute',
                        // left: 40,
                        top: 20,
                        right: '50%',
                        transform: 'translateX(50%)'}}>
                    Edit Image
                </Typography>

                <IconButton
                    open={open}
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                        color: (theme) => theme.palette.grey[500],
                    }}>
                    <CloseIcon />
                </IconButton>

                <ImageEditor image={image} handleClose={handleClose} addItem={addItem} snackBar={snackBar}/>
                
            </Box>
        </Modal>
    )
}

export default ImageModal
