import React, { useState } from "react";
import {
	Typography,
	Card,
	CardMedia,
	IconButton,
	useMediaQuery,
	Stack,
	Collapse,
	CardContent,
	Box
} from "@mui/material";
import { useTheme, styled } from '@mui/material/styles';
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TinderCard from "react-tinder-card";
import useImagesState from "../../hooks/useImagesState";


export const AnimalCard = ({ pet, swiped, outOfFrame, index, cardRef, detailRef, handleHeightChange }) => {
	const [imgIdx, prevImg, nextImg] = useImagesState();

	// console.log(pet)
	// reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md')); 
	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
		handleHeightChange(expanded, detailRef)
	};

	return (
		// {/* absolute container to stack cards on top of each other */}
		<Box sx={{
			width: '100% ! important',
			position:'absolute', 
			left:'50%', 
			transform:'translate(-50%, 0%)', 
			}}>
			
			<TinderCard
				className='tinderCard'
				key={index}
				ref={cardRef}
				onSwipe={(dir) => swiped(dir, pet.pet_id, index)}
				onCardLeftScreen={() => outOfFrame(pet.pet_id, index)}>
				
				<Card sx={{ 
					position: 'relative', 
					borderRadius: '20px',
					boxShadow: '0px 2px 5px 0px rgba(0, 0, 0, 0.3)'}}>

					{/* pet image */}
					<CardMedia
						component="img"
						image={pet.images[imgIdx]}
						alt={pet.name}
						sx={{
							opacity: index===0? 0.3 : 1,
							overflow: 'hidden',
							objectFit: "cover ! important",
						}}/>

					{index !== 0 ?
					<>
					{/* back button */}
					<IconButton
						onClick={() => prevImg(imgIdx)}
						onTouchStart={() => prevImg(imgIdx)}
						sx={{
							position: "absolute",
							color: "white",
							top: 200,
							display: imgIdx === 0 ? "none" : "block",
						}}>
						<NavigateBefore fontSize="large" />
					</IconButton>

					{/* next button */}
					<IconButton
						onClick={() => nextImg(pet.images, imgIdx)}
						onTouchStart={() => nextImg(pet.images, imgIdx)}
						sx={{
							position: "absolute",
							color: "white",
							top: 200,
							right: "0",
							display:
								imgIdx === pet.images.length - 1
									? "none"
									: "block",
						}}>
						<NavigateNext fontSize="large" />
					</IconButton>
					
					{/* pet information */}
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={2}
						sx={{
							position: 'absolute', 
							bottom: 20, 
							padding: '1rem',
							color: 'white',
							display: expanded ? 'none' : 'flex'}}>

						<span>
							<Typography variant='h5'>
								{pet.name}
							</Typography>
							<Typography variant='subtitle1'>
								{pet.description.length > 75 ?
								pet.description.substring(0,60) + ' . . .' : 
								pet.description}
							</Typography>
						</span>

						<IconButton
							onClick={handleExpandClick}
							onTouchStart={handleExpandClick}
							aria-label="show more"
							sx={{color: 'white'}}>
							<InfoIcon fontSize='large' />
						</IconButton>
					</Stack>

					{/* pet information details*/}
					<Collapse in={expanded} >
						<CardContent ref={detailRef} >
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							spacing={0}
							>
							<Typography variant='h5'>
								{pet.name}
							</Typography>
							<IconButton 
								onClick={handleExpandClick}
								onTouchStart={handleExpandClick}
								sx={{color: 'orange' }}>
								<ArrowUpwardIcon fontSize='large'  />
							</IconButton>
							</Stack>
							<Typography variant='subtitle1'>
								{pet.description}
							</Typography>

						</CardContent>
					</Collapse>	
					</>	
				: null}
				</Card>
			</TinderCard>
		</Box>
	);
};
