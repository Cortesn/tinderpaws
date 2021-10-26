import express from 'express';
import cors from 'cors';
import pool from './Database/dbcon.js'
import { adminPage } from './routes/adminPage.js';
import { matches } from './routes/matches.js';
import { profileUserUpdate } from './routes/profileUserUpdate.js';
import { filterSetting } from './routes/filterSetting.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/adminHome', adminPage)
app.use('/matches', matches)
app.use('/userProfileUpdate', profileUserUpdate)
app.use('/filterSetting', filterSetting)

app.listen(3001, ()=>{
    console.log("running on port 3001")
})