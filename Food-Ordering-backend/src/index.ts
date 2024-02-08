import express from "express";
import mongoose from "mongoose";
import * as process from "process";
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import dashboardRoutes from "./routes/dashboard";
import order from "./routes/order";
// import order from "./routes/order";


dotenv.config();

let app = express();


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

app.use(cors({origin: '*'}));

// body-parser middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));



//  user
app.use('/api/user', userRoutes);

//dashboard
app.use('/api/dashboard', dashboardRoutes);

//order
app.use('/api/order',order);
