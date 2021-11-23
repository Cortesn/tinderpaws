import express from 'express';
import cors from 'cors';
import { signup } from './routes/signup.js'
import { login } from './routes/login.js'
import { auth } from './routes/auth.js';
import { images } from './routes/images.js'
import { password } from './routes/password.js';
import { shelters } from './routes/shelters.js';
import { matches } from './routes/matches.js';
import { users } from './routes/users.js';
import { breeds } from './routes/breeds.js';
import { pets } from './routes/pets.js';
import path from 'path'

// resolve path to current directory
const __dirname = path.resolve();

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../client/build')))

// Routes
app.use('/api/auth', auth)
app.use('/api/login', login)
app.use('/api/signup', signup)
app.use('/api/password', password)
app.use('/api/images', images)
app.use('/api/pets', pets)
app.use('/api/shelters', shelters)
app.use('/api/matches', matches)
app.use('/api/users', users)
app.use('/api/breeds', breeds)

// serve static react build
app.get('/*', (req,res) => res.sendFile(path.join(__dirname, '../client/build', 'index.html')))


const PORT = 5000
app.listen(PORT, () => console.log(`Server started on ${PORT}`));