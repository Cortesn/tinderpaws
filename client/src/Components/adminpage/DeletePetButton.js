import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export const DeletePetButton = ({ deletePet, pet }) => {
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

  const handleDelete = () => {
    deletePet(pet.id);
    setOpen(false);
  }

	return (
		<div>
			<Button size="large"
			variant="contained"
			color="error"
      onClick={handleClickOpen}>
				DELETE PET PROFILE
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="delete-pet-profile"
			>
				<DialogTitle id="alert-dialog-title">
					Delete {pet.name}'s Profile?
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleDelete} autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
