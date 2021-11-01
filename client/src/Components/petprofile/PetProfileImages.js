import React, {useEffect} from 'react'
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
import {api} from '../../helperFunctions/axiosInstace'


// transitions columns from 2 to 1
const updateDisplayCol = (items) => {
    if (items){
        return items.length > 1 ? 2 : 1;
    }
}
// temp pet_id ******
const tempPetId = 4

/* Returns a complied list of a single Pet's images */
const PetProfileImages = () => {
    const [deleteClicked, handleDeleteChange] = useButtonState(false);
    const [items, handleChange, deleteItem] = useDeleteItemState([]);
    
    useEffect(() => {
        if (items.length === 0){
            api.get('/images/' + tempPetId)
                .then( response => {
                    // console.log("response data:", response.data.results)
                    // clean data 
                    const images = response.data.results.map(image => ({id: image.image_id, url: image.url}))
                    // console.log(images)
                    handleChange(images)
                })
                .catch( error => {
                    console.log("error: ", error)
                })
        }
    }, [items.length])
    
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

                {items ? items.map((item) => (
                    <ImageItem 
                        key={item.id}
                        image={item}
                        deleteClicked={deleteClicked} 
                        deleteItem={deleteItem}/>
                        )
                    ) : null
                }
            </ImageList>
        </Grid>
    )
}

export default PetProfileImages
