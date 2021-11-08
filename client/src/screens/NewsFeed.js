import React, { useState, useEffect } from 'react'
import { 
    Box, 
    CircularProgress, 
    ImageList, 
    ImageListItem, 
    Stack,
    Typography, 
    useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NewsCard from '../Components/NewsCard';
import { api } from '../helperFunctions/axiosInstace'


// transitions columns from 2 to 1
const updateDisplayCol = (breakpoint) => {
    if (breakpoint === 'md'){
        return 2
    } else if (breakpoint === 'sm'){
        return 1
    }
}

const NewsFeed = () => {
    
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.down('md')); 
    const sm = useMediaQuery(theme.breakpoints.down('sm')); 
    const [newsItems, setNewsItems] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
 
    // check scroll position
    const loadMorePets = (event) => {
        // console.log(offset)
        // console.log(event.target.scrollTop, event.target.offsetHeight, event.target.scrollHeight)
        if (event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight 
            && newsItems.length !== 0 && newsItems.length - offset === 0){
            // progress indicator
            setLoading(true)
            api.get('/pets/offset/' + offset)
                .then(response => {
                    setLoading(false)
                    setNewsItems( prevArr => prevArr.concat(response.data.pets))
                })
                .catch(error => console.log(error) )
        }
    }

    // get news items
    useEffect(() => {
        if (newsItems.length === 0){
            api.get('/pets/offset')
            .then(response => {
                // console.log("response :", response.data)
                setNewsItems(prevArr => prevArr.concat(response.data.pets))
                setOffset(response.data.offset)
            })
            .catch(error => {
                console.log("error: ", error)
                // redirect to a 404 page
            })
        } 
    }, [newsItems.length])

    return (

        <Box sx={{ margin: 'auto', maxWidth: 1200 }}>
            <Typography variant='h2' align='center'>
                News
            </Typography>
            <Box 
                onScroll={loadMorePets}
                sx={{ 
                    overflowY: 'scroll', 
                    maxHeight: 900 ,
                    marginBottom: 20
                }}>

                <ImageList 
                    variant="masonry" 
                    cols={ sm ? 
                    updateDisplayCol('sm') 
                    : md ? 
                    updateDisplayCol('md') : 3 } 
                    gap={8}>

                {newsItems.map((item) => (
                    <ImageListItem key={item.pet_id}>
                        <NewsCard data={item}/>
                    </ImageListItem>
                ))}
                </ImageList>
                
                {/* progress indicator */}
                {loading ?
                    <Stack 
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}>
                        <CircularProgress thickness='5'/> 
                        <Typography 
                            component='h4'
                            sx={{ fontWeight: 900, fontSize: '1.5rem'}}>
                            Loading . . . 
                        </Typography>
                    </Stack>
                    : null
                }

            </Box>
        </Box>
    )
}

export default NewsFeed