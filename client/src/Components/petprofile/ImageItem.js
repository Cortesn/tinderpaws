import React from 'react'
import { 
    ImageListItem,
    IconButton,
    ImageListItemBar,
    Collapse
} from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

/* Returns a single Pet Image */
const ImageItem = (props) => {
    const {image, deleteImage, deleteClicked, snackBar} = props;

    return (
        <ImageListItem key={image.image_id} >
            <img
                src={image.url}
                alt='pet'
                style={{borderRadius: '20px', maxWidth: '300px'}}/>

            {/* delete button visible when delete is clicked */}
            <Collapse 
                orientation="horizontal"
                in={deleteClicked}>

                <ImageListItemBar
                    sx={{
                        // shadow effect from MUI examples
                        background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                        borderRadius: '20px 20px 0px 0px'
                    }}
                    position="top"
                    actionIcon={
                        <IconButton
                            id='btn-img-delete'
                            color='error' 
                            aria-label={`delete ${image.image_id}`}
                            onClick={()=>{deleteImage(image.image_id, 'image', snackBar);}}>
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    }
                    actionPosition="right"/>

            </Collapse>  
        </ImageListItem>
    )
}

export default ImageItem
