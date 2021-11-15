import React from 'react'
import { IconButton, Typography } from '@mui/material'

const NavLink = (props) => {
    const { name, link, id} = props
    return (
        <IconButton
            id={id}
            size="small"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}
            href={link}>
            <Typography component="div" sx={{ flexGrow: 1 }}>
                {name}
            </Typography>
        </IconButton>
    )
}

export default NavLink
