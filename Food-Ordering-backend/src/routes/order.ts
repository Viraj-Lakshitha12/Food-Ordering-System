import express, {Router} from "express";
import {
    getAllOrderByEmailAndDate,
    getOrderDetailsByOrderId,
    getOrders,
    saveOrder
} from "../controllers/orderController";

const route: Router = express.Router();
//save orders
route.post('/saveOrder', saveOrder);

//get all orders
route.get('/getAllOrders', getOrders);

//get all by email and date
route.get('/getAllOrdersByEmailAndDate/:email', getAllOrderByEmailAndDate);

//get order details by orderId
route.get('/getOrderDetails/:orderId', getOrderDetailsByOrderId);

export default route;
