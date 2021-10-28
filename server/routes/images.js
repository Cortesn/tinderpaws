
import express from 'express'
const router = express.Router()
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
import uploadImage from '../Database/awsS3/bucket.js'
import pool from '../Database/dbcon.js'
const db = pool
import * as fs from 'fs';

router.get('/:pet_id', (req, res) => {
    const pet_id = parseInt(req.params.pet_id)
    const getImages = 'SELECT image_id, url FROM Images WHERE pet_id=?';
    db.query(getImages, [pet_id], (error, results) => {
        if (error){
            console.log(error)
            return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
        } 
        // console.log(results)
        return res.status(200).json({results})
    })
})



router.post('/', upload.single('image'), async (req, res) => {
    // console.log(req.file)
    const file = req.file
    // upload image to s3 bucket
    const s3Object = await uploadImage(file)

    // remove the image from local storage
    fs.unlinkSync(file.path)
    // ***** Temp id... once user auth route is linked id will be in the req.
    const tempId = 4
    // upload url to sql db
    if(s3Object.Location){
        const saveImgUrl = 'INSERT INTO Images (pet_id, url) VALUES (?,?)';
        db.query(saveImgUrl, [tempId, s3Object.Location], (error, results) => {
            if (error){
                console.log(error)
            } else {
                // console.log(results)
                const payload = {
                    msg: 'Success! New image added.',
                    image_id: results.insertId,
                    url: s3Object.Location
                }
                return res.status(201).json({payload})
            }
        })
    }
})

export {router as images}