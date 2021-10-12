import React from "react";
import { Pets as PetsIcon } from "@mui/icons-material";
import {
	AppBar,
	Box,
	Toolbar,
	Typography,
	Button,
	IconButton,
} from "@mui/material";

export const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<Typography variant="h6" component="div" sx={{ mr: 2 }}>
							Tinder Paws
						</Typography>
						<PetsIcon sx={{ fontSize: "2rem" }} />
					</IconButton>
					<Box
						sx={{
							display: "flex",
							flexGrow: 1,
							justifyContent: "space-around",
						}}
					>
						<Typography>Mission</Typography>
						<Typography>About</Typography>
						<Typography>News</Typography>
					</Box>
					<Box sx={{ justifyContent: "flex-end" }}>
						<Button variant="contained" color="info">
							Login
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
