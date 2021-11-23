import React from "react";
import { ImageList, Button, Box, Grid, Stack, Typography } from "@mui/material";
import ImageUploader from "../imageupload/ImageUploader.js";
import ImageItem from "../petprofile/ImageItem.js";
import useButtonState from "../../hooks/useButtonState";
import useDeleteItemState from "../../hooks/useDeleteItemState.js";

// transitions columns from 2 to 1
const updateDisplayCol = (items) => {
	if (items) {
		return items.length > 1 ? 2 : 1;
	}
};

export const AddPetImages = (props) => {
	const { pet, nextStep } = props;
	const [deleteClicked, handleDeleteChange] = useButtonState(false);
	const [images, , addImage, deleteImage] = useDeleteItemState([]);

	// console.log("images", images);
	// console.log("pet", pet);

	return (
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
					{/* camera button */}
					<ImageUploader
						style={{ left: 20 }}
						addImage={addImage}
						snackBar={pet.snackBar}
						pet_id={pet.pet_id}
					/>
				</Box>
				<Box sx={{pt:1}}>
					<Typography>Add Images and Click Finish!</Typography>
				</Box>

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

					{images.length !== 0 && (
						<Button
							onClick={handleDeleteChange}
							sx={{
								textTransform: "none",
								display: "inline",
							}}
						>
							{deleteClicked ? "done" : "delete"}
						</Button>
					)}
				</Box>
			</Box>

			{/* images */}
			<Stack
				direction="column"
				justifyContent="flex-start"
				alignItems="center"
				spacing={2}
			>
				<ImageList
					sx={{
						margin: "auto",
						padding: "20px",
						maxWidth: "100%",
						maxHeight: 500,
					}}
					cols={updateDisplayCol(images)}
				>
					{images
						? images.map((image) => (
								<ImageItem
									key={image.image_id}
									image={image}
									deleteImage={deleteImage}
									deleteClicked={deleteClicked}
									snackBar={pet.snackBar}
								/>
						  ))
						: null}
				</ImageList>
			</Stack>
			
			<Box textAlign="center" sx={{ p: 3 }}>
				<Button
					variant="contained"
					size="large"
					onClick={nextStep}
					disabled={images.length === 0}
				>
					Finish
				</Button>
			</Box>
		</Grid>
	);
};
