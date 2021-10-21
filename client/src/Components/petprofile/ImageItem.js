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
            <img
                src={`${image.url}`}
                alt={image.id}/>

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
