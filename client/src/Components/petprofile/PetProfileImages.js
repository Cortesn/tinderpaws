import React from 'react'
import { 
    ImageList,
    Typography,
    Button,
    Grid,
    Box
} from '@mui/material';
import ImageUploader from '../imageupload/ImageUploader';
import ImageItem from './ImageItem';
import useButtonState from '../../hooks/useButtonState';

// transitions columns from 2 to 1
const updateDisplayCol = (items) => {
    if (items){
        return items.length > 1 ? 2 : 1;
    }
}

/* Returns a complied list of a single Pet's images */
const PetProfileImages = (props) => {
    const {pet, images, addImage, deleteImage, snackBar} = props;
    const [deleteClicked, handleDeleteChange] = useButtonState(false);

    return(
        <Grid sx={{paddingTop: '1rem'}} item>
            {/* heading */}
            <Box sx={{
                    padding: '0px 20px 0px', 
                    display: 'flex', 
                    justifyContent: 'space-between'
                    }}>

                {/* heading  */}
                <ImageUploader 
                    addImage={addImage} 
                    snackBar={snackBar}/>

                <Typography 
                    sx={{
                        textAlign:'center',
                        display: 'inline', 
                    }}>
                    {pet.name}
                </Typography>
                
                <Button
                    onClick={handleDeleteChange}
                    sx={{
                        textTransform: 'none', 
                        display:'inline'
                        }}>
                    {deleteClicked ? 'done': 'delete'}
                </Button>
            </Box>

            {/* images */}
            <ImageList sx={{ 
                            margin: 'auto', 
                            padding: '20px', 
                            maxWidth: '100%', 
                            maxHeight: 500 
                        }} 
                        cols={updateDisplayCol(images)} >

                {images ? images.map((image) => (
                    <ImageItem 
                        key={image.image_id}
                        image={image}
                        deleteImage={deleteImage}
                        deleteClicked={deleteClicked}
                        snackBar={snackBar}/>
                        )
                    ) : null
                }
            </ImageList>
        </Grid>
    )
}

export default PetProfileImages
