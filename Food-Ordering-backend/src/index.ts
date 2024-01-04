import express from "express";
import mongoose from "mongoose";
import * as process from "process";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();


let app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL as string);

const db = mongoose.connection;
db.on('error', (error) => {
    console.log("DB error : " + error);
});

db.on('open', () => {
    console.log("DB OK");
});

// app.use(cors({origin: '*'}))

app.listen(8080, () => {
    console.log("Server started 8080");
});

app.use(cors({origin:'*'}))

app.get('/test', (req: express.Request, res: express.Response) => {
    res.status(200).send("working");
});

app.post('/api/register', (req: express.Request, res: express.Response) => {
    const { email, password } = req.body;

    // Do something with the data
    console.log('Email:', email);
    console.log('Password:', password);

    // Send a response
    res.status(200).send('Received JSON data successfully');
});