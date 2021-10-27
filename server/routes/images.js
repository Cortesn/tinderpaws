
import express from 'express'
const router = express.Router()
import uploadImage from '../Database/awsS3/bucket.js'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
// import pool from '../Database/dbcon.js'
// const db = pool

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.file)
    const file = req.file
    // upload image to s3 bucket
    const image = await uploadImage(file)
    console.log(image)

    // save image address to mysql
    
   

    
})



export {router as images}