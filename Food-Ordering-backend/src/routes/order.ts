import express, {Router} from "express";
import {getOrders, saveOrder} from "../controllers/orderController";

const route: Router = express.Router();
//save orders
route.post('/saveOrder', saveOrder);

//get all orders
route.get('/getAllOrders', getOrders);
export default route;
