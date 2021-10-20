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
// import updateDisplayCol from '../../helperFunctions/updateDisplayCol';
// temp dog images
import dog1 from '../../images/alvan-nee-LHeDYF6az38-unsplash.jpg'
import dog2 from '../../images/fabian-gieske-3nQhyFuwUkk-unsplash.jpg'
import dog3 from '../../images/karsten-winegeart-BJaqPaH6AGQ-unsplash.jpg'

// Temp Data to be replaced when backend is connected
const tempData = [
    {
        imageId: 1,
        url: dog1
    },
    {
        imageId: 2,
        url: dog2
    },
    {
        imageId: 3,
        url: dog3
    },
    {
        imageId: 4,
        url: dog1
    },
    {
        imageId: 5,
        url: dog2
    },
    {
        imageId: 6,
        url: dog3
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
