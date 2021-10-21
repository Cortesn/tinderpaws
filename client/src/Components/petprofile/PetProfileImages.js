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
import useDeleteItemState from '../../hooks/useDeleteItemState';

// Temp Data to be replaced when backend is connected
const tempData = [
    {
        imageId: 1,
        url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
    },
    {
        imageId: 2,
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=962&q=80'
    },
    {
        imageId: 3,
        url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=985&q=80'
    },
    {
        imageId: 4,
        url: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80'
    },
    {
        imageId: 5,
        url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
    }
]

const rename = tempData.map(image => ({id: image.imageId, url: image.url}))

// transitions columns from 2 to 1
const updateDisplayCol = (items) => {
    return items.length > 1 ? 2 : 1;
}


/* Returns a complied list of a single Pet's images */
const PetProfileImages = () => {
    const [deleteClicked, handleDeleteChange] = useButtonState(false);
    const [items, deleteItem] = useDeleteItemState(rename);

    return(
        <Grid sx={{paddingTop: '1rem'}} item>
            {/* heading */}
            <Box sx={{
                    padding: '0px 20px 0px', 
                    display: 'flex', 
                    justifyContent: 'space-between'
                    }}>

                {/* heading  */}
                <ImageUploader/>

                <Typography 
                    sx={{
                        textAlign:'center',
                        display: 'inline', 
                    }}>
                    NameOfPet
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
                        cols={updateDisplayCol(items)} >

                {items.map((item) => (
                    <ImageItem 
                        key={item.id}
                        image={item}
                        deleteClicked={deleteClicked} 
                        deleteItem={deleteItem}/>
                        )
                    )
                }
            </ImageList>
        </Grid>
    )
}

export default PetProfileImages
