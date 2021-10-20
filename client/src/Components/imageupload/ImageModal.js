import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ImageEditor, {onClickSave} from './ImageEditor';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxWidth: '85%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
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
                <Typography id="modal-modal-title" variant="h6" component="h2" align='center'>
                    Edit Image
                </Typography>

                <ImageEditor image={image} />

                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" sx={{ maxWidth: '80%'}}/>
              
                <Button 
                    fullWidth
                    type='submit' 
                    variant='contained' 
                    color='primary'
                    onClick={onClickSave}>
                    Save Changes
                </Button>

            </Box>
        </Modal>
    )
}

export default ImageModal
