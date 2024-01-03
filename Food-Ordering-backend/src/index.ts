import express from "express";
import mongoose from "mongoose";
import * as process from "process";
import dotenv from 'dotenv';

dotenv.config();


let app = express();
mongoose.connect(process.env.MONGO_URL as string);

const db = mongoose.connection;
db.on('error', (error) => {
    console.log("DB error : " + error);
});

db.on('open', () => {
    console.log("DB OK");
})

app.listen(8080, () => {
    console.log("Server started 8080");
});

app.get('/test', (req: express.Request, res: express.Response) => {
    res.status(200).send("working");
})