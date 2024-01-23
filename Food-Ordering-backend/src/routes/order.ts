import express, {Router} from "express";
import {saveOrder} from "../controllers/orderController";

const route: Router = express.Router();

route.post('/saveOrder', saveOrder);

export default route;
