import React, { useState, useRef } from "react";
import {
	Typography,
	Card,
	CardMedia,
	IconButton,
	useMediaQuery,
	Stack,
	Grow,
	Collapse,
	CardContent
} from "@mui/material";
import { useTheme, styled } from '@mui/material/styles';
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import TinderCard from "react-tinder-card";
import useImagesState from "../../hooks/useImagesState";


const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
	  	duration: theme.transitions.duration.shortest,
	}),
}));


export const AnimalCard = ({ pet, swiped, outOfFrame, index, cardRef, setDetailRef }) => {
	const [imgIdx, prevImg, nextImg] = useImagesState();

	// console.log(pet)
	// reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md')); 

	const [expanded, setExpanded] = useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	// used to get the css of the expanded info details
	const ref= useRef(null)

	return (
		// {/* absolute container to stack cards on top of each other */}
		<div style={{
			position:'absolute', 
			left:'50%', 
			transform:'translate(-50%, 0%)', 
			width: desktop ? '370px' : '310px'}}>
			
			<TinderCard
				key={pet.name}
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
							width: "100%",
							objectFit: "cover",
						}}/>

					{/* back button */}
					<IconButton
						onClick={() => prevImg(imgIdx)}
						sx={{
							position: "absolute",
							color: "white",
							top: "40%",
							display: imgIdx === 0 ? "none" : "block",
						}}>
						<NavigateBefore fontSize="large" />
					</IconButton>

					{/* next button */}
					<IconButton
						onClick={() => nextImg(pet.images, imgIdx)}
						sx={{
							position: "absolute",
							color: "white",
							top: "40%",
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

						<ExpandMore
							expand={expanded}
							onClick={() => {
								setDetailRef(ref)
								handleExpandClick()
							}}
							aria-expanded={expanded}
							aria-label="show more"
							sx={{color: 'white' }}>
							<InfoIcon fontSize='large' />
						</ExpandMore>
					</Stack>

					{/* pet information details*/}
					<Collapse 
						ref={ref}
						in={expanded} 
						timeout={2}>
						<CardContent>
							<Typography variant='h5'>
								{pet.name}
							</Typography>
							<Typography variant='subtitle1'>
								{pet.description}
							</Typography>
	
							<IconButton 
								onClick={handleExpandClick}
								sx={{color: 'red' }}>
								<InfoIcon fontSize='large' />
							</IconButton>
						</CardContent>
					</Collapse>		

				</Card>
			</TinderCard>
		</div>
	);
};


export const DetailsCard = React.forwardRef(({pet}, ref) => {
	console.log(pet)
	// const {pet} = props
	const [imgIdx, prevImg, nextImg] = useImagesState();
	console.log("deeets : ", pet)
	return (
		<Stack
			direction="column"
			justifyContent="center"
			alignItems="center"
			spacing={2}>

			<div>The is the GROW! </div>

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
						width: "100%",
						objectFit: "cover",
					}}/>

				{/* back button */}
				<IconButton
					onClick={() => prevImg(imgIdx)}
					sx={{
						position: "absolute",
						color: "white",
						top: "40%",
						display: imgIdx === 0 ? "none" : "block",
					}}>
					<NavigateBefore fontSize="large" />
				</IconButton>

				{/* next button */}
				<IconButton
					onClick={() => nextImg(pet.images, imgIdx)}
					sx={{
						position: "absolute",
						color: "white",
						top: "40%",
						right: "0",
						display:
							imgIdx === pet.images.length - 1
								? "none"
								: "block",
					}}>
					<NavigateNext fontSize="large" />
				</IconButton>
			</Card>
		</Stack>
	)
})