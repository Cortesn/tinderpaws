import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageEditor from './ImageEditor';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #666',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    padding: '20px',
};

  
const ImageModal = (props) => {
    const {image, open, handleClose} = props
   
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">

            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" align='center' sx={{padding: '10px 0px 20px'}}>
                    Edit Image
                </Typography>

                <ImageEditor image={image} />
                
            </Box>
        </Modal>
    )
}

export default ImageModal
