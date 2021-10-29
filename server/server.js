import express from 'express';
import cors from 'cors';
import { signup } from './routes/signup.js'
import { login } from './routes/login.js'
import { auth } from './routes/auth.js';
import { forms } from './routes/forms.js';
import { password } from './routes/password.js';
import { adminPage } from './routes/adminPage.js';
import { matches } from './routes/matches.js';
import { profileUserUpdate } from './routes/profileUserUpdate.js';
import { filterSetting } from './routes/filterSetting.js';

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', auth)
app.use('/login', login)
app.use('/signup', signup)
app.use('/password', password)
app.use('/forms', forms)
app.use('/user', userRouter)
app.use('/adminHome', adminPage)
app.use('/matches', matches)
app.use('/userProfileUpdate', profileUserUpdate)
app.use('/filterSetting', filterSetting)

app.listen(process.env.PORT, () => console.log(`Server started on http://${process.env.HOSTNAME}:${process.env.PORT}`));
