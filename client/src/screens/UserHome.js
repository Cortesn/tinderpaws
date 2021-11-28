import React, { useState, useEffect } from "react";
import { api, setToken } from "../helperFunctions/axiosInstace";
import {
	Grid,
	useMediaQuery,
	Slide,
	Box,
	Card,
	Paper,
	Typography,
	Divider,
	Container,
	IconButton,
	Stack,
	Button,
	Snackbar,
	Alert
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AnimalFilterSection from "../Components/userpage/AnimalFilterSection";
import AnimalCardSection from "../Components/userpage/AnimalCardSection";
import useButtonState from "../hooks/useButtonState";
import UserProfileUpdateForm from "../Components/forms/UserProfileUpdateForm";
import MatchesGrid from "../Components/grids/MatchesGrid";
import AnimalFilterForm from "../Components/forms/AnimalFilterForm";
import PetsIcon from "@mui/icons-material/Pets";

const UserHome = (props) => {
	// toggle views in mobile

	const [profileButton, handleProfileButton] = useButtonState(false);
	const [filterButton, handleFilterButton] = useButtonState(false);
	const [matchesButton, handleMatchesButton] = useButtonState(false);

	// success / error msg for apply filter
	const [success, setSuccessState] = useState(false);
	const [filterError, setFilterErrorState] = useState(false);

	const [petState, setPetState] = useState([]); // Array of pets displayed on cards
	const [shelters, setShelters] = useState(null); // Shelters for the filter

	// snackbar alerts
	const [open, setOpen] = useState(false);
	const [snackMsg, setSnackMsg] = useState({})

	const [unmatch, toggleUnmatch] = useButtonState(false);

	// displaying snackbar
	const handleOpen = (msg) => {
			setSnackMsg(msg)
			setOpen(true)
	}
	// closing snackbar
	const handleClose = (event) => {
			setOpen(false)
	};

	// reference to remove column spacing between cards
	const theme = useTheme();
	const desktop = useMediaQuery(theme.breakpoints.up("md"));
	const containerRef = React.useRef(null);

	useEffect(() => {
		// Get all shelters from DB for Filter
		api.get("/shelters").then((response) => {
			setShelters(response.data);
		});
		// Get all pets from DB to show as initial page
		if (petState.length === 0) {
			setToken(localStorage.token); // setting token to get user id
			api.get("/pets").then((response) => {
				const noMorePets = {
					images: ["/assets/images/nomorepets.png"],
					pet_id: null,
				};
				// add the 'no more pets' placeholder to the front of the list
				response.data.unshift(noMorePets);
				// console.log(response.data)
				setPetState(response.data);
			});
		}
	}, [petState.length]);

	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="stretch"
			sx={{ margin: "auto", maxWidth: 1400, marginTop: "2rem" }}
			ref={containerRef}
		>
			{/* large screen rendering */}
			{desktop ? (
				<>
					<AnimalFilterSection
						shelters={shelters}
						setPetState={setPetState}
						success={success}
						setSuccessState={setSuccessState}
						filterError={filterError}
						setFilterErrorState={setFilterErrorState}
						handleOpen={handleOpen}
					/>
					<AnimalCardSection
						petState={petState}
						setPetState={setPetState}
					/>
				</>
			) : null}

			{/* transitions */}

			{/* right slide profile accordion */}
			<Slide
				direction="left"
				in={profileButton}
				container={containerRef.current}
			>
				<Box
					sx={{
						width: "100%",
						display: {
							xs: !profileButton ? "none" : "block",
							md: "none",
						},
					}}
				>
					<Card
						sx={{
							height: "100%",
							maxWidth: "600px",
							margin: "auto !important",
						}}
					>
						<Paper
							elevation={10}
							sx={{
								height: "100%",
								minHeight: "50vh",
								paddingTop: "1rem",
							}}
						>
							<Stack
								direction="row"
								justifyContent="flex-start"
								alignItems="center"
								spacing={{ xs: 4, sm: 20, md: 20 }}
							>
								{/* placeholder div to even out the header */}
								<Box sx={{ minWidth: 64 }}>
									<IconButton
										onClick={handleProfileButton}
										sx={{
											display: {
												xs: "block",
												md: "none",
											},
										}}
									>
										<PetsIcon color="#467eac" />
									</IconButton>
								</Box>
								<Typography
									sx={{
										display: "inline",
										fontWeight: "bold",
									}}
								>
									Profile Settings
								</Typography>
							</Stack>
							<Grid xs={11} item>
								<Divider sx={{ paddingBottom: ".5rem" }} />
							</Grid>
							<Container
								sx={{
									paddingBottom: "2rem",
									paddingTop: "1.5rem",
								}}
							>
								<UserProfileUpdateForm />
							</Container>
						</Paper>
					</Card>
				</Box>
			</Slide>

			{/* left slide matches accordion */}
			<Slide
				direction="right"
				in={matchesButton}
				container={containerRef.current}
			>
				<Box
					sx={{
						width: "100%",
						display: {
							xs: !matchesButton ? "none" : "block",
							md: "none",
						},
					}}
				>
					<Card
						sx={{
							height: "100%",
							maxWidth: "600px",
							margin: "auto !important",
						}}
					>
						<Paper
							elevation={10}
							sx={{
								height: "100%",
								minHeight: "70vh",
								paddingTop: "1rem",
							}}
						>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
								spacing={2}
							>
								<Button onClick={toggleUnmatch} sx={{ textTransform: "none" }}>
									{unmatch ? "Done" : "Edit"}
								</Button>
								<Typography
									sx={{
										display: "inline",
										fontWeight: "bold",
									}}
								>
									Matches
								</Typography>
								{/* placeholder div to even out the header */}
								<Box sx={{ minWidth: 64 }}>
									<IconButton
										onClick={handleMatchesButton}
										sx={{
											display: {
												xs: "block",
												md: "none",
											},
										}}
									>
										<PetsIcon color="#467eac" />
									</IconButton>
								</Box>
							</Stack>
							<Grid xs={11} item>
								<Divider
									variant="inset"
									sx={{ paddingBottom: ".5rem" }}
								/>
							</Grid>
							<MatchesGrid snackBar={handleOpen} unmatch={unmatch} />
						</Paper>
					</Card>
				</Box>
			</Slide>

			{/* left slide filter accordion */}
			<Slide
				direction="right"
				in={filterButton}
				container={containerRef.current}
			>
				<Box
					sx={{
						width: "100%",
						display: {
							xs: !filterButton ? "none" : "block",
							md: "none",
						},
					}}
				>
					<Card
						sx={{
							height: "100%",
							maxWidth: "600px",
							margin: "auto !important",
						}}
					>
						<Paper
							elevation={10}
							sx={{
								height: "100%",
								minHeight: "70vh",
								paddingTop: "1rem",
							}}
						>
							<Stack
								direction="row"
								justifyContent="flex-start"
								alignItems="center"
								spacing={{ xs: 4, sm: 20, md: 20 }}
							>
								{/* placeholder div to even out the header */}
								<Box sx={{ minWidth: 64 }}>
									<IconButton
										onClick={() => {
											setFilterErrorState(false);
											setSuccessState(false);
											handleFilterButton();
										}}
										sx={{
											display: {
												xs: "block",
												md: "none",
											},
										}}
									>
										<PetsIcon color="#467eac" />
									</IconButton>
								</Box>
								<Typography
									sx={{
										textAlign: "center",
										fontWeight: "bold",
										paddingLeft: "2rem",
									}}
								>
									Filter Settings
								</Typography>
							</Stack>
							<Grid xs={11} item>
								<Divider sx={{ paddingBottom: ".5rem" }} />
							</Grid>
							<Container
								sx={{
									paddingBottom: "2rem",
									paddingTop: "1.5rem",
								}}
							>
								{shelters && (
									<AnimalFilterForm
										shelters={shelters}
										setPetState={setPetState}
										success={success}
										setSuccessState={setSuccessState}
										filterError={filterError}
										setFilterErrorState={
											setFilterErrorState
										}
									/>
								)}
							</Container>
						</Paper>
					</Card>
				</Box>
			</Slide>

			{/* Right side edit profile card */}
			<Slide
				direction="left"
				in={!profileButton && !matchesButton && !filterButton}
				container={containerRef.current}
			>
				<Box
					sx={{
						width: "100%",
						display: {
							xs:
								filterButton || matchesButton || profileButton
									? "none"
									: "block",
							md: "none",
						},
					}}
				>
					<AnimalCardSection
						petState={petState}
						setPetState={setPetState}
						handleProfileButton={handleProfileButton}
						handleFilterButton={handleFilterButton}
						handleMatchesButton={handleMatchesButton}
					/>
				</Box>
			</Slide>
			{/* snackbar alerts */}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				{snackMsg.success ? (
					<Alert
						onClose={handleClose}
						severity="success"
						sx={{ width: "100%" }}
					>
						{snackMsg.success}
					</Alert>
				) : (
					<Alert
						onClose={handleClose}
						severity="error"
						sx={{ width: "100%" }}
					>
						{snackMsg.error}
					</Alert>
				)}
			</Snackbar>
		</Grid>
	);
};

export default UserHome;
