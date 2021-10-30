import express from 'express';
import cors from 'cors';
import { signup } from './routes/signup.js'
import { login } from './routes/login.js'
import { auth } from './routes/auth.js';
import { forms } from './routes/forms.js';
import { images } from './routes/images.js'
import { password } from './routes/password.js';
import { adminPage } from './routes/adminPage.js';
import { matches } from './routes/matches.js';
import { profileUserUpdate } from './routes/profileUserUpdate.js';
import { filterSetting } from './routes/filterSetting.js';

const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use('/api/auth', auth)
app.use('/api/login', login)
app.use('/api/signup', signup)
app.use('/api/images', images)
app.use('/api/password', password)
app.use('/api/forms', forms)
app.use('/api/adminHome', adminPage)
app.use('/api/matches', matches)
app.use('/api/userProfileUpdate', profileUserUpdate)
app.use('/api/filterSetting', filterSetting)

const PORT = process.env.PORT || 5000
const HOSTNAME = process.env.HOSTNAME || 'localhost'
app.listen(PORT, () => console.log(`Server started on http://${HOSTNAME}:${PORT}`));
