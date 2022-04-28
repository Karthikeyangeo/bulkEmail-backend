import express  from "express";
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import { sendMail } from './mailerApp.js';
import {mailRouter} from './routes/mailSend.js';

dotenv.config();  // getting all env keys from here

const app = express()

app.use(express.json());
// const MONGO_URL = "mongodb://localhost";

app.use(cors());
const MONGO_URL = process.env.MONGO_URL;

//To create connection 
async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
};

//calling that function 
export const client = await createConnection();        //await outside async fun allowed only in "type" :"module"

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is up and running at ${PORT}`)
})

app.get('/',(req,res)=>{
    res.send('Welcome to Email Backend Server')
})
app.use('/mailForm',mailRouter);


sendMail().then(result => console.log('Email Sent ', result))
.catch((error)=>console.log(error.message)) 