import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const NavLink = (props) => {
    const { name, link, id} = props
    return (
        <IconButton
            id={id}
            size="small"
            color="inherit"
            aria-label="menu"
            component={Link}
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
            to={link}>
            <Typography component="div" sx={{ flexGrow: 1 }}>
                {name}
            </Typography>
        </IconButton>
    )
}

export default NavLink
