import React from 'react'
import { Grid, Box, Fab } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import MatchList from './MatchList.js'

function MatchView(props) {
    const {buttonClicked, handleButtonChange, matches, addMatch, deleteMatch, snackBar} = props
    return (
        <Grid 
            item 
            xs={12} sm={12} md={6} lg={4}
            sx={{ 
                display: { xs: buttonClicked ? 'block':'none', md: 'block' },
                maxWidth: '650px'
                }}>
            <Box sx={{ 
                    '& > :not(style)': { m: 1 } , 
                    display: {xs: 'block' , md: 'none'} 
                    }}>
                <Fab 
                    sx={{right: 20, position: 'fixed'}}
                    size="small" 
                    color="secondary" 
                    aria-label="match">
                    <CloseIcon onClick={handleButtonChange}/>
                </Fab>
            </Box>

            <MatchList 
                matches={matches} 
                addMatch={addMatch} 
                deleteMatch={deleteMatch}
                snackBar={snackBar}/>              
        </Grid>
    )
}

export default MatchView
