import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from 'config'
import pool from '../Database/dbcon.js'
const db = pool
import auth from '../middleware/auth.js'

// route used to authenticate user as they move about the webpage
// should be called on every "protected route"
router.get('/', auth, (req, res) => {
    const findUser = `SELECT user_id, email FROM Users WHERE user_id='${req.user.id}'`
    db.query(findUser, (error, results) => {
        if (error) {
            return res.status(500).json({ msg: 'Server error. Please try again later' })
        } else {
            return res.json(results[0])
        }
    }) 
})

export {router as auth}