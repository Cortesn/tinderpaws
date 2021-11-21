import express from "express";
const router = express.Router();
import pool from "../Database/dbcon.js";
const db = pool;

// get all pets with optional pagination for news feed
router.get("/offset/:offset?", (req, res) => {
	const offset = req.params.offset ? parseInt(req.params.offset) : 0;
	const limit = 12;
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - 6);
	const endDate = new Date();
	endDate.setDate(endDate.getDate() + 1);
	// console.log(startDate, endDate)
	const getAllPets = `SELECT Pets.pet_id, name, status, description, last_updated, GROUP_CONCAT(url) AS images FROM Pets 
                        JOIN Images ON Images.pet_id=Pets.pet_id WHERE last_updated BETWEEN ? AND ?
                        GROUP BY Pets.pet_id ORDER BY last_updated ASC LIMIT ? OFFSET ?;`;
	// const getImages =
	db.query(
		getAllPets,
		[startDate, endDate, limit, offset],
		(error, results) => {
			if (error) {
				console.log(error);
				return;
			}
			// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
			results.forEach((pet) => {
				pet.images = pet.images.split(",");
				pet.last_updated = Intl.DateTimeFormat("en-GB", {
					dateStyle: "full",
				}).format(pet.last_updated);
			});
			const payload = {
				pets: results,
				offset: offset + limit,
			};
			// console.log('payload : ', payload)
			return res.status(200).send(payload);
		}
	);
});

// route to get all pet data for the /admin/edit/:pet_id path ( single pet )
router.get("/:pet_id", (req, res) => {
	const id = req.params.pet_id;
	const pet = `SELECT Pets.pet_id, name, type, breed, status, date_created, last_updated, 
                description, shelter_id, GROUP_CONCAT(disposition_id) AS dispositions FROM 
                Pets LEFT JOIN Pets_Dispositions ON Pets.pet_id=Pets_Dispositions.pet_id 
                WHERE Pets.pet_id=?;`;
	const images = "SELECT image_id, url FROM Images WHERE pet_id=?;";
	const matches = `SELECT Matches.match_id, Users.user_id, l_name, f_name FROM Users 
                    LEFT JOIN Matches ON Matches.user_id=Users.user_id
                    WHERE pet_id=?;`;
	db.query(`${pet} ${images} ${matches}`, [id, id, id], (error, results) => {
		if (error) {
			console.log(error);
			return;
		} else if (results[0][0].pet_id) {
			// console.log(results)
			var payload = {};
			payload.pet = results[0][0];
			payload.pet.date_created = payload.pet.date_created
				.toISOString()
				.slice(0, 10);
			payload.pet.last_updated = payload.pet.last_updated
				.toISOString()
				.slice(0, 10);
			if (payload.pet.dispositions)
				payload.pet.dispositions = payload.pet.dispositions
					.split(",")
					.map(Number); // conver to int
			if (results[1].length > 0) payload.images = results[1];
			if (results[2].length > 0) payload.matches = results[2];
			// console.log(payload)
			return res.status(200).json(payload);
		}
		// redirect to a 404 page
		return res.status(404).json({ msg: "This pet does not exist." });
	});
});

// update a pet
router.patch("/:pet_id", (req, res) => {
	const pet_id = parseInt(req.params.pet_id);
	const { name, type, breed, status, dispositions, description } = req.body;
	const date = new Date().toISOString().slice(0, 10);
	console.log(date);
	// update intersection
	var newDisp = "";
	dispositions.map((disp, index) => {
		if (index === dispositions.length - 1) {
			newDisp += `(${pet_id}, ${disp});`;
		} else {
			newDisp += `(${pet_id}, ${disp}),`;
		}
	});
	const update =
		"UPDATE Pets SET name=?, type=?, breed=?, status=?, last_updated=?, description=? WHERE pet_id=?;";
	const deleteDisp = "DELETE FROM Pets_Dispositions WHERE pet_id=?;";
	const insertDisp =
		"INSERT INTO Pets_Dispositions (pet_id, disposition_id) VALUES" +
		newDisp;
	db.query(
		`${update} ${deleteDisp} ${insertDisp}`,
		[name, type, breed, status, date, description, pet_id, pet_id],
		(error, results) => {
			if (error) {
				console.log(error);
				return res
					.status(400)
					.json({
						msg: "Somthing went wrong. Please try agian later.",
					});
			}
			// console.log("results: ", results)
			return res.status(200).json({ msg: "Update Successful!" });
		}
	);
});

// create a pet
router.post("/", async (req, res) => {
	const { name, type, breed, status, dispositions, description, employee_id } = req.body;
	// insert new pet
	const query1 = `INSERT INTO Pets(name, type, breed, status, date_created, last_updated, description, shelter_id)
    VALUES (?, ?, ?, ?, CURDATE(), CURDATE(), ?, (SELECT shelter_id FROM Employees WHERE employee_id=?));`;
	const values1 = [name, type, breed, status, description, employee_id];
	const query2 =
		"INSERT INTO Pets_Dispositions (pet_id, disposition_id) VALUES ";
	db.query(query1, values1, (err, results) => {
		if (err) {
			console.log(error);
			return res
				.status(400)
				.json({ msg: "Somthing went wrong. Please try agian later." });
		}

		const pet_id = results.insertId;

        if (dispositions) {
            const newDisp = dispositions.map(() => '(?,?)').join();
            const query2 = `INSERT INTO Pets_Dispositions (pet_id, disposition_id) 
            VALUES ${newDisp};`;
            const values2 = [];
            dispositions.map(disp=> values2.push(pet_id, disp));
            console.log(values2);
            db.query(query2, values2, (err, result) => {
                if (err) {
                    console.log(error);
                    return res
                        .status(400)
                        .json({ msg: "Somthing went wrong. Please try agian later." });
                }
                console.log(result)
                return res.status(201).json({ msg: "Added Pet w Dispositions", pet_id: pet_id });
            })
        } else {
            return res.status(201).json({ msg: "Added Pet", pet_id: pet_id });
        }
	});
});

export { router as pets };
