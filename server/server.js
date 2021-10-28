import express from 'express';
import cors from 'cors';
import pool from './Database/dbcon.js'
import { signup } from './routes/signup.js'
import { login } from './routes/login.js'
import { auth } from './routes/auth.js';
import { forms } from './routes/forms.js';
import { userRouter } from './routes/userpage.js';

const app = express();
const db = pool;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/auth', auth)
app.use('/login', login)
app.use('/signup', signup)
app.use('/forms', forms)
app.use('/user', userRouter)


// below works - need to figure out how to send back to client! 

// endpoint to get shelter information given employee id
app.get("/shelters/employees/:id", (req,res)=>{
    const getShelterInfo = `SELECT Shelters.name, Shelters.street, Shelters.city, Shelters.state, Shelters.zip, Shelters.info FROM Shelters INNER JOIN Employees on Shelters.shelter_id = Employees.shelter_id WHERE Employees.employee_id = ${req.params.id}`;
    db.query(getShelterInfo, (err, result)=>{
        console.log(err)
        console.log(result[0].name) // name
        console.log(result) // all
        res.send("hello pedro")
    });

})

// endpoint to get employee name given employee id
app.get("/employee/:id", (req,res)=>{
    const getShelterInfo = `SELECT name FROM Employees WHERE employee_id = ${req.params.id}`;
    db.query(getShelterInfo, (err, result)=>{
        console.log(err)
        console.log(result[0].name) // name
        console.log(result) // all
        res.send("hello pedro")
    });

})


const port = process.env.PORT || 3001;
const hostname = process.env.HOSTNAME || 'localhost';
app.listen( port, () => console.log(`Server started on http://${hostname}:${port}`));
