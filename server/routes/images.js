import express from 'express'
const router = express.Router()
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
import {uploadImage, deleteImage} from '../Database/awsS3/bucket.js'
import pool from '../Database/dbcon.js'
const db = pool
import * as fs from 'fs';
import auth from '../middleware/auth.js'

// get all images for a pet
router.get('/:pet_id', auth, (req, res) => {
    const pet_id = parseInt(req.params.pet_id)
    const getImages = 'SELECT image_id, url FROM Images WHERE pet_id=?';
    db.query(getImages, [pet_id], (error, results) => {
        if (error){
            console.log(error)
            return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
        } 
        return res.status(200).json({results})
    })
})


// add an image for a pet
router.post('/:pet_id', auth, upload.single('image'), async (req, res) => {
    const file = req.file
    // upload image to s3 bucket
    const s3Object = await uploadImage(file)
    // remove the image from local storage
    fs.unlinkSync(file.path)
    // upload url to sql db
    if(s3Object.Location){
        const saveImgUrl = 'INSERT INTO Images (image_id, pet_id, url) VALUES (?,?,?)';
        db.query(saveImgUrl, [file.filename, req.params.pet_id, s3Object.Location], (error, results) => {
            if (error){
                return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
            } else {
                const payload = {
                    msg: 'Success! New image added.',
                    image_id: file.filename,
                    url: s3Object.Location
                }
                return res.status(201).json({payload})
            }
        })
    }
})


// delete a single image for a pet
router.delete('/:image_id', auth, (req,res) => {
    const image_id = req.params.image_id
    // delete image from sql db
    const deleteImg = 'DELETE FROM Images WHERE image_id=?'
    db.query(deleteImg, [image_id], (error, results) => {
        if (error){
            console.log(error)
            return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
            // server msg
        } else if (results.affectedRows === 1){
            // delete image from bucket
            deleteImage(image_id)
            return res.status(200).json({msg: 'Success! Image deleted.'})
        } else {
            // invalid image_id. should probably never happen...
            return res.status(400).json({msg: 'Something went wrong. Please try again later.'})
        }
    }) 
})


export {router as images}