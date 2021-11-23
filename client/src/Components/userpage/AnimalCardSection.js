import 
	React, { 
		useEffect, 
		useState, 
		useMemo, 
		useRef, 
		createRef 
	} from "react";
import {
	Grid,
	IconButton,
	Stack,
	useMediaQuery
} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { Clear, Favorite } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import PetsIcon from '@mui/icons-material/Pets';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AnimalCard } from "./AnimalCard";
import { api, setToken } from "../../helperFunctions/axiosInstace";


const AnimalCardSection = ({petState, buttonClicked }) => {
	const [currentIndex, setCurrentIndex] = useState()

	useEffect(() => {
		setCurrentIndex(petState.length-1)
	}, [petState.length])
	
	// used for outOfFrame closure
	const currentIndexRef = useRef(currentIndex)

	const childRefs = useMemo(() =>
		 Array(petState.length)
			.fill(0)
			.map((i) => createRef())
	, [petState.length]); 

	const updateCurrentIndex = (val) => {
		setCurrentIndex(val)
		currentIndexRef.current = val
	}

	// const canGoBack = currentIndex < petState.length - 1
  	const canSwipe = currentIndex >= 1

	const swiped = (direction, idToDelete, index) => {
		if (canSwipe) {
			updateCurrentIndex(index - 1)
			// Add pet-user pair to db matches table
			const data = {pet_id: idToDelete };
			setToken(localStorage.token)
			if (direction === "right") {
				setToken(localStorage.token)
				api.post("/matches", data).then((response) => {
					console.log(response.data);
				});
			}
		}
	};

	const outOfFrame = (idx) => {
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
    const desktop = useMediaQuery(theme.breakpoints.up('sm')); 

	const detailRefs = useMemo(() =>
		 Array(petState.length)
			.fill(0)
			.map((i) => createRef())
	, [petState.length]); 

	const [detailHeight, setDetailHeight] = useState({})
	const [isExpanded, setIsExpanded] = useState(false)

	const handleHeightChange = (expanded, detailRef) => {
		if (!expanded){
			setIsExpanded(true)
			const height = detailHeight.height + detailRef.current.clientHeight
			setDetailHeight({
				...detailHeight, 
				value: `${height}px ! important`})
		}else{
			setIsExpanded(false)
			setTimeout(function (){ 
				setDetailHeight({
				...detailHeight, 
				value: `${detailHeight.height}px ! important`})}, 1000
			)
		}
	};

	// update state when mediaquery is set
	useEffect(()=> {
		if (desktop && isExpanded){
			// toggle to desktop expanded
			const height = 600 + detailRefs[currentIndex].current.clientHeight
			setDetailHeight({ 
				height: 600, 
				value: `${height}px ! important` })
		} else if (desktop){
			// toggle to desktop not expanded
			setDetailHeight({ 
				height: 600 , 
				value: '600px ! important' })
		} else if (isExpanded){
			// toggle to mobile expanded
			const height = 540 + detailRefs[currentIndex].current.clientHeight
			setDetailHeight({ 
				height: 540, 
				value: `${height}px ! important`})
		} else{
			// toggle to mobile not expanded
			setDetailHeight({ 
				height: 540, 
				value: '540px ! important'})
		}
	}, [desktop, detailRefs, currentIndex, isExpanded])

	
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
						
						{/* header menu in mobile */}
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
							sx={{
								display: { xs: 'flex', md: 'none'},
								width: '95%',
								maxWidth: desktop? 420 : 370}}>
							<span>			
								<IconButton
									sx={{ 
										// boxShadow:'0px 5px 20px 0px rgba(0, 0, 0, 0.3)' 
										}}>
									<PetsIcon fontSize="large"/>
								</IconButton>
								<IconButton 
									sx={{ 
										marginLeft: '1rem',
										// boxShadow:'0px 5px 20px 0px rgba(0, 0, 0, 0.3)' 
										}}>
									<SettingsIcon fontSize="large"/>
								</IconButton>
							</span>
							<IconButton
								sx={{ 
									// boxShadow:'0px 5px 20px 0px rgba(0, 0, 0, 0.3)' 
									}}>
								<AccountCircleIcon fontSize="large"/>
							</IconButton>
						</Stack>

					<div
						style={{
						position: 'relative', 
						width: '95%', 
						maxWidth: desktop? 420 : 370}}>

						{petState.map((pet, index) => (
							<AnimalCard
								pet={pet}
								key={index}
								cardRef={childRefs[index]}
								swiped={swiped}
								outOfFrame={outOfFrame}
								index={index}
								detailRef={detailRefs[index]}
								handleHeightChange={handleHeightChange}
								/>
						))}
					</div>	

					{/* buttons */}
					<Stack
						direction="row"
						justifyContent="center"
						alignItems="center"
						spacing={6}
						sx={{ marginTop: detailHeight.value }}>
				
						<IconButton
							disabled={canSwipe ? false : true}
							onClick={() => swipe("left")}
							color="secondary"
							sx={{ 
								boxShadow:'0px 5px 20px 0px rgba(0, 0, 0, 0.3)'
								}}>
							<Clear fontSize="large" />
						</IconButton>
						
						<IconButton
							disabled={canSwipe ? false : true}
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