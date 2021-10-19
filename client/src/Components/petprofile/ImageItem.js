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
    const {image, deleteClicked, deleteItem} = props;

    return (
        <ImageListItem key={image.id} >
            {/* default img sizing from MUI */}
            <img
                src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={image.id}
                loading="lazy"/>

            {/* delete button visible when delete is clicked */}
            <Collapse 
                orientation="horizontal"
                in={deleteClicked}>
                <ImageListItemBar
                // shadow effect from MUI examples
                sx={{
                    background:
                    'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                    'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}
                position="top"
                actionIcon={
                    <IconButton
                        color='error' 
                        aria-label={`delete ${image.name}`}
                        onClick={()=>{deleteItem(image.id);}}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                }
                actionPosition="right"/>

            </Collapse>  
        </ImageListItem>
    )
}

export default ImageItem
