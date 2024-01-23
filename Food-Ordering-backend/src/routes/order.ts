import express, {Router} from "express";
import {getAllOrderByEmailAndDate, getOrders, saveOrder} from "../controllers/orderController";

const route: Router = express.Router();
//save orders
route.post('/saveOrder', saveOrder);

//get all orders
route.get('/getAllOrders', getOrders);

//get all by email and date
route.get('/getAllOrdersByEmailAndDate/:email', getAllOrderByEmailAndDate);

export default route;
