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


const NewsCard = (props) => {
    const {image, adopted} = props
    
    return (
        <Card >
            {/* image */}
            {adopted ?
                <CardMedia
                    component="img"
                    image={image}
                    alt=""/>
            :
                <CardMedia
                    component="img"
                    image={image}
                    alt=""
                    sx={{height: 300}}/>
            }
            {/* visibile content */}
            <CardActionArea sx={{
                '.MuiCardActionArea-focusHighlight': {
                    backgroundColor: 'blue'
                }}}>
                <CardContent>
                    <Typography variant="body2" >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
                    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </CardContent>

            </CardActionArea>
            {/* bottom buttons */}
            <CardActions disableSpacing>
                {/* add to matched pets */}
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                
                {/* future use: email/social */}
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default NewsCard