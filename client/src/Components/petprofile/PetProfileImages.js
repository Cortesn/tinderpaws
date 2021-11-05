import React from 'react'
import { 
    ImageList,
    Typography,
    Button,
    Grid,
    Box,
    IconButton
} from '@mui/material';
import ImageUploader from '../imageupload/ImageUploader';
import ImageItem from './ImageItem';
import useButtonState from '../../hooks/useButtonState';
import GroupsIcon from '@mui/icons-material/Groups';

// transitions columns from 2 to 1
const updateDisplayCol = (items) => {
    if (items){
        return items.length > 1 ? 2 : 1;
    }
}

/* Returns a complied list of a single Pet's images */
const PetProfileImages = (props) => {
    const {handleButtonChange, pet, images, addImage, deleteImage} = props;
    const [deleteClicked, handleDeleteChange] = useButtonState(false);

    return(
        <Grid sx={{paddingTop: '1rem'}} item>
            {/* heading */}
            <Box sx={{
                    padding: '0px 20px 0px', 
                    display: 'flex', 
                    justifyContent: 'space-between'
                    }}>

                <Box >
                    {/* matches toggler */}
                    <IconButton
                        onClick={handleButtonChange}
                        color='secondary'
                        sx={{ display: {xs: 'inline' , md: 'none'}}}>
                        <GroupsIcon/>
                    </IconButton>
                    
                    {/* camera button */}
                    <ImageUploader 
                        style={{left: 20}}
                        addImage={addImage} 
                        snackBar={pet.snackBar}/>
                </Box>

                <Typography 
                    sx={{
                        textAlign:'center',
                        display: 'inline', 
                    }}>
                    {pet.name}
                </Typography>

                
                <Box>
                    {/* placeholder object for sizing */}
                    <Box sx={{ width: 24, display: {xs: 'inline-block' , md: 'none'}}}></Box>
                
                    <Button
                        onClick={handleDeleteChange}
                        sx={{
                            textTransform: 'none', 
                            display:'inline'
                            }}>
                        {deleteClicked ? 'done': 'delete'}
                    </Button>
                </Box>

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
                        snackBar={pet.snackBar}/>
                        )
                    ) : null
                }
            </ImageList>
        </Grid>
    )
}

export default PetProfileImages
