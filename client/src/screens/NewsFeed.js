import React, { useState, useEffect } from 'react'
import { Box, ImageList, ImageListItem, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NewsCard from '../Components/NewsCard';
import { api } from '../helperFunctions/axiosInstace'


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

    // get news items
    useEffect(() => {
        if (newsItems.length === 0){
            api.get('/pets')
            .then(response => {
                // console.log("response data:", response.data)
                setNewsItems(response.data)
            })
            .catch(error => {
                console.log("error: ", error)
                // redirect to a 404 page
            })
        } 
    })

    return (

        <Box sx={{margin: 'auto', maxWidth: 1200}}>
            <Typography variant='h2' align='center'>
                News
            </Typography>
            <Box sx={{overflowY: 'scroll' }}>
                <ImageList variant="masonry" cols={ sm ? updateDisplayCol('sm') : md ? updateDisplayCol('md') : 3 } gap={8}>

                {newsItems.map((item) => (
                    <ImageListItem key={item.pet_id}>
                        <NewsCard data={item}/>
                    </ImageListItem>
                ))}

                </ImageList>
            </Box>
        </Box>
    )
}

export default NewsFeed