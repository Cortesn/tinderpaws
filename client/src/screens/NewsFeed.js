import React from 'react'
import {Box, ImageList, ImageListItem, Typography, useMediaQuery} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NewsCard from '../Components/NewsCard';

const tempData = [
    {
        adopted: true,
        imageId: 1,
        url: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=988&q=80'
    },
    {
        adopted: false,
        imageId: 2,
        url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=962&q=80'
    },
    {
        adopted: false,
        imageId: 3,
        url: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=985&q=80'
    },
    {
        adopted: true,
        imageId: 4,
        url: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80'
    },
    {
        adopted: false,
        imageId: 5,
        url: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80'
    }
]


// transitions columns from 2 to 1
// const updateDisplayCol = (breakpoint) => {
//     return 
// }

const NewsFeed = () => {
    
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm')); 

    return (

        <Box sx={{margin: 'auto', maxWidth: 1280}}>
            <Typography variant='h2' align='center'>
                News
            </Typography>
            <Box sx={{overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={3} gap={8}>
                {tempData.map((item) => (
                    <ImageListItem key={item.imageId}>
                        <NewsCard image={item.url} adopted={item.adopted}/>
                    
                    </ImageListItem>
                ))}
                </ImageList>
            </Box>
        </Box>
    )
}

export default NewsFeed