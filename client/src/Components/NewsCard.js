import React from 'react'
import { 
    Card,
    CardMedia, 
    CardContent, 
    CardActions, 
    IconButton, 
    Typography,
    CardActionArea} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { purple } from '@mui/material/colors';


const NewsCard = (props) => {
    const {data} = props
    
    return (
        <Card >
            {/* image */}
            {data.status === 4 ?
                <CardMedia
                    component="img"
                    image={data.images[0]}
                    alt=""/>
            :
                <CardMedia
                    component="img"
                    image={data.images[0]}
                    alt=""
                    sx={{height: 300}}/>
            }
            {/* visibile content */}

                <CardContent sx={{'&:hover': 
                                    {   background : '#7133FF', 
                                        color: 'white',
                                        '& .buttons': { color: 'white'}
                                    }, 
                                    paddingBottom : '0 !important' 
                                }}>
                    <Typography variant="h5" >
                        {data.name}
                    </Typography>
                    <Typography variant="body2" >
                        {data.description}
                    </Typography>

                    {/* bottom buttons */}
                    <CardActions disableSpacing>
                        {/* add to matched pets */}
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon className='buttons'/>
                        </IconButton>
                        {/* future use: email/social */}
                        <IconButton aria-label="share">
                            <ShareIcon className='buttons'/>
                        </IconButton>
                    </CardActions>

                </CardContent>


            

        </Card>
    );
}

export default NewsCard