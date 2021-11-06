import React from 'react'
import { 
    Card,
    CardMedia, 
    CardContent, 
    CardActions, 
    IconButton, 
    Typography,
    CardHeader} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import celebration from '../assets/images/celebration.png'

const NewsCard = (props) => {
    const {data} = props
    
    return (
        <Card >
            
            {/* image */}
            {data.status === 4 ?
                // adopted
            <>
                <CardHeader 
                    title='Adopted'
                    subheader={data.last_updated}
                    sx={{ backgroundColor: '#00bcd4', color: 'white' }}
                    />
                    <CardMedia
                        component="img"
                        image={data.images[0]}
                        alt=""/>
                    {/* image overlay */}
                    <img 
                        src={celebration} 
                        style={{
                            position: 'absolute',
                            top: 88,
                            left: 0,
                        }}/>
            </>
            :
            <>
                <CardHeader 
                    title='Recently Updated'
                    subheader={data.last_updated}
                    sx={{ backgroundColor: '#7133FF', color: 'white' }}
                    />
                <CardMedia
                    component="img"
                    image={data.images[0]}
                    alt=""
                    sx={{height: 300}}/>
            </>
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
                    {data.status === 4 ? 
                        `ADOPTED! Congratulations to ${data.name} and their new family! 
                        ${data.name} was adopted on ${data.last_updated} `

                        : data.description
                    }
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