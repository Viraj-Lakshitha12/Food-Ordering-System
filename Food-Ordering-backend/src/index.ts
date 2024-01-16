import express from "express";
import mongoose from "mongoose";
import * as process from "process";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import dashboardRoutes from "./routes/dashboard";

dotenv.config();

let app = express();
app.use(bodyParser.json());

// db config
mongoose.connect(process.env.MONGO_URL as string);

const db = mongoose.connection;
db.on('error', (error) => {
    console.log("DB error : " + error);
});

db.on('open', () => {
    console.log("DB OK");
});

//server started port
app.listen(8080, () => {
    console.log("Server started 8080");
});

// cross error config
app.use(cors({origin: '*'}))

//  user
app.use('/api/user', userRoutes);

//dashboard
app.use('/api/dashboard', dashboardRoutes);


