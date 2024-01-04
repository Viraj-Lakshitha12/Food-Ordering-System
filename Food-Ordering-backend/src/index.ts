import express from "express";
import mongoose from "mongoose";
import * as process from "process";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";
import {User} from "./models/userModels";
import CustomResponse from "./util/customResponse";

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

app.use(cors({origin: '*'}))

app.get('/test', (req: express.Request, res: express.Response) => {
    res.status(200).send("working");
});

app.post('/api/register', async (req: express.Request, res: express.Response) => {

    try {
        const req_body = req.body;

        // Do something with the data
        console.log('Email:', req_body.email);
        console.log('Password:', req_body.password);

        const createUser = await User.create(req_body);

        // Send a response
        res.status(200).send(new CustomResponse(200, 'User Register successfully', createUser));
    } catch (error) {
        res.status(500).send(new CustomResponse(200, 'error' + error));

    }

});