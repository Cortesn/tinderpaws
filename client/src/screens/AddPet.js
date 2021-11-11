import React, { useState } from "react";
import PetProfile from "../Components/petprofile/PetProfile.js";
import {
	ImageList,
	Button,
	Box,
	IconButton,
	Card,
	Paper,
	Stack,
	Grid,
	Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useButtonState from "../hooks/useButtonState";
import useDeleteItemState from "../hooks/useDeleteItemState.js";
import FormTemplate from "../Components/forms/FormTemplate.js";
import GroupsIcon from "@mui/icons-material/Groups";
import ImageUploader from "../Components/imageupload/ImageUploader.js";
import ImageItem from "../Components/petprofile/ImageItem.js";

/* Page to add a Pet: information, images, and matches */
const AddPet = () => {
	// image state
	const [images, handleImageChange, addImage, deleteImage] =
		useDeleteItemState([]);
	const [pet, setPet] = useState({});

	return (
		<Grid
			container
			justifyContent="center"
			alignItems="stretch"
			direction="column"
			sx={{ margin: "auto" }}
			xs={12}
			sm={8}
			md={7}
			lg={6}
			xl={4}
		>
			<Grid item>
				<Typography variant="h3" align="center">
					Add A Pet
				</Typography>
			</Grid>
			<Grid item>
				<Card sx={{ maxWidth: "600px", margin: "auto !important" }}>
					<Paper elevation={10}>
						<Grid sx={{ paddingTop: "1rem" }} item>
							{/* heading */}
							<Box
								sx={{
									padding: "0px 20px 0px",
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Box>
									{/* matches toggler */}
									<IconButton
										// onClick={handleButtonChange}
										color="secondary"
										sx={{
											display: {
												xs: "inline",
												md: "none",
											},
										}}
									>
										<GroupsIcon />
									</IconButton>

									{/* camera button */}
									<ImageUploader
										style={{ left: 20 }}
										addImage={addImage}
										snackBar={pet.snackBar}
									/>
								</Box>

								<Typography
									sx={{
										textAlign: "center",
										display: "inline",
									}}
								>
									{pet.name}
								</Typography>

								<Box>
									{/* placeholder object for sizing */}
									<Box
										sx={{
											width: 24,
											display: {
												xs: "inline-block",
												md: "none",
											},
										}}
									></Box>

									<Button
										// onClick={handleDeleteChange}
										sx={{
											textTransform: "none",
											display: "inline",
										}}
									>
										{/* {deleteClicked ? "done" : "delete"} */}
									</Button>
								</Box>
							</Box>

							{/* images */}
							<ImageList
								sx={{
									margin: "auto",
									padding: "20px",
									maxWidth: "100%",
									maxHeight: 500,
								}}
								// cols={updateDisplayCol(images)}
							>
								{images
									? images.map((image) => (
											<ImageItem
												key={image.image_id}
												image={image}
												deleteImage={deleteImage}
												// deleteClicked={deleteClicked}
												snackBar={pet.snackBar}
											/>
									  ))
									: null}
							</ImageList>
						</Grid>
						<Stack
							direction="column"
							justifyContent="flex-start"
							alignItems="center"
							spacing={2}
						>
							{/* all images of a pet */}
							{/* <PetProfileImages
								handleButtonChange={handleButtonChange}
								pet={pet}
								images={images}
								addImage={addImage}
								deleteImage={deleteImage}
							/> */}

							{/* details about a pet */}
							<div style={{ width: "90%", marginBottom: 20 }}>
								<FormTemplate
									type={"addPet"}
									button={"Create Pet"}
									data={{ shelter_id: 2 }}
								/>
							</div>
						</Stack>
					</Paper>
				</Card>
			</Grid>
		</Grid>
	);
};

export default AddPet;
