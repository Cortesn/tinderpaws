import React from 'react'
import { 
    Button, 
    Divider, 
    Grid, 
    IconButton, 
    ListItem, 
    Typography,
    ListItemText, 
    ListItemIcon, 
    List, 
    Collapse, 
    Card,
    CardMedia,
    Container
} from '@mui/material';
import TinderCard from 'react-tinder-card'
// temp dog images
import dog1 from '../images/alvan-nee-LHeDYF6az38-unsplash.jpg'
import dog2 from '../images/fabian-gieske-3nQhyFuwUkk-unsplash.jpg'
import dog3 from '../images/karsten-winegeart-BJaqPaH6AGQ-unsplash.jpg'
import './PetProfile.css'
import PetInfoForm from './forms/PetInfoForm';
const tempData = [
    {
        name: 'dog no.1',
        url: dog1
    },
    {
        name: 'dog no.2',
        url: dog2
    },
    {
        name: 'dog no.3',
        url: dog3
    }
]

const PetProfile = () => {
    const petData = tempData

    const [lastDirection, setLastDirection] = React.useState()

    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <Grid sx={{margin: 'auto'}}>
            {/* onClick event to hide/show delete buttons */}
            <Typography 
                sx={{textAlign:'center', padding: '20px 0px 20px'}}>
                (Name of Pet)
            </Typography>

            <Container sx={{display: 'block', position: 'relative'}}>
                {petData.map((pet) =>
                    <TinderCard 
                        className='swipe'
                        key={pet.name} 
                        preventSwipe={['up', 'down']}
                        onSwipe={(dir) => swiped(dir, pet.name)} 
                        onCardLeftScreen={() => outOfFrame(pet.name)}
                        >

                        <CardMedia
                            component='img'
                            image={pet.url}
                            sx={{
                                objectFit: 'cover',      
                                margin: 'auto',
                                width: '600px',
                                height: '600px', 
                                maxWidth:'80%',
                                maxHeight: '70%',
                                borderRadius: '20px',
                            }}/>
                    </TinderCard>
                )}
            </Container>

            {/* <Container sx={{display: 'block' , position: }}>
                <PetInfoForm />
            </Container> */}
        </Grid>
    )
}

export default PetProfile
