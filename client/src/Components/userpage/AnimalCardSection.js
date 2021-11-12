import React, { useEffect, useState, useMemo, useRef } from "react";
import {
	Grid,
	IconButton,
	Stack,
	useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Clear, Favorite } from "@mui/icons-material";
import { AnimalCard } from "./AnimalCard";
import { api } from "../../helperFunctions/axiosInstace";


const AnimalCardSection = ({petState, user_id, buttonClicked, handleButtonChange}) => {
	const [currentIndex, setCurrentIndex] = useState()
	// insert a default placeholder in the front of the list used for end
	// console.log(petState)
	useEffect(() => {
		setCurrentIndex(petState.length-1)
	}, [petState.length])
	
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex)

	const childRefs = useMemo(() =>
		 Array(petState.length)
			.fill(0)
			.map((i) => React.createRef())
	, [petState.length]); 

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val)
		currentIndexRef.current = val
	}

	// const canGoBack = currentIndex < petState.length - 1
  	const canSwipe = currentIndex >= 0

	const swiped = (direction, idToDelete, index) => {
		updateCurrentIndex(index - 1)
		// Add pet-user pair to db matches table
		const data = { user_id: user_id, pet_id: idToDelete };
		if (direction === "right") {
			api.post("/user/match", data).then((response) => {
				// console.log(response.data);
			});
		}
	};

	const outOfFrame = (pet_id, idx) => {
		// handle the case in which go back is pressed before card goes outOfFrame
		currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
	};

	const swipe = async (dir) => {
		// console.log(canSwipe, currentIndex, childRefs[currentIndex])
		if (canSwipe && currentIndex < petState.length) {
			await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
		}
	};

	// increase current index and show card
	// const goBack = async () => {
	// 	if (!canGoBack) return
		// 	const newIndex = currentIndex + 1
		// 	updateCurrentIndex(newIndex)
		// 	await childRefs[newIndex].current.restoreCard()
	// }

	// reference to remove column spacing between cards
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md')); 

	const [detailRef, setDetailRef] = useState()
	// console.log(detailRef)

	const [detailHeight, setDetailHeight] = useState('')

	useEffect(() => {
		console.log(detailRef)
		if (detailRef && desktop){
			var height = 540 + detailRef.current.clientHeight
			console.log(height, detailRef.current.clientHeight)
			setDetailHeight(`${height}px ! important`)
		}else{
			setDetailHeight('540px ! important')
		}
	},[detailRef])


	return (
		<Grid 
			item 
			xs={12} sm={12} md={6} lg={4} 
			sx={{ 
				display: { xs: buttonClicked ? 'none':'block', md: 'block' },
				maxWidth: '650px ! important',
				paddingBottom: '2rem'
				}}>
			<div >
				<Stack
					direction="column"
					justifyContent="center"
					alignItems="center"
					spacing={1}>

					<div style={{
						position: 'relative', 
						width: '100%', 
						maxWidth: '650px'}}>

						{petState.map((pet, index) => (
							<AnimalCard
								pet={pet}
								key={pet.id}
								cardRef={childRefs[index]}
								swiped={swiped}
								outOfFrame={outOfFrame}
								index={index}
								setDetailRef={setDetailRef}/>
						))}
					</div>

					{/* buttons */}
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={6}
						sx={{ 
							marginTop: desktop ? detailHeight : '440px ! important'
							}}>
				
						<IconButton
							onClick={() => swipe("left")}
							color="secondary"
							sx={{ 
								boxShadow:'0px 5px 20px 0px rgba(0, 0, 0, 0.3)'
								}}>
							<Clear fontSize="large" />
						</IconButton>
						
						<IconButton
							onClick={() => swipe("right")}
							color="error"
							sx={{ 
								boxShadow:'0px 5px 20px 0px rgba(0, 0, 0, 0.3)' 
								}}>
							<Favorite fontSize="large" />
						</IconButton>
					</Stack>
				</Stack>

			</div>
		</Grid>
	);
};

export default AnimalCardSection;