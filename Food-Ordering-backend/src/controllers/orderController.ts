import express from "express";
import CustomResponse from "../util/customResponse";
import {OrderModel} from "../models/order";
import {OrderDetailsModel} from "../models/orderDetails";

// save orders
export const saveOrder = async (req: express.Request, res: express.Response) => {
    try {
        const {cartItems, userData, total} = req.body;

        // Check if required data is present
        if (!cartItems || !userData || !userData.email) {
            return res.status(400).send(new CustomResponse(400, 'Bad Request', 'Invalid data format'));
        }

        const savedItems = cartItems.map((cartItem: any) => {
            const {id, name, description, image, price} = cartItem;
            return {id, name, description, image, price};
        });

        // Create the order
        const savedOrder = await OrderModel.create({
            items: savedItems,
            total: total,
            email: userData.email,
        });

        // Now use the _id of the savedOrder when creating OrderDetails
        const savedOrderDetails = await OrderDetailsModel.create({
            order: savedOrder._id, // Use the _id of the savedOrder
            items: savedItems,
            total: total,
            email: userData.email,
            userName: userData.userName,
            address: userData.address,
            postalCode: userData.postalCode,
            city: userData.city,
        });

        res.status(200).send(new CustomResponse(200, 'Save successful', {savedOrder, savedOrderDetails}));
    } catch (error) {
        console.error('Error saving order or sending email:', error);
        res.status(500).send(new CustomResponse(500, 'Internal Server Error', error));
    }
};

//get orders
export const getOrders = async (req: express.Request, res: any) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).send(new CustomResponse(200, "found orders", orders));
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}

// get all order by email & date
export const getAllOrderByEmailAndDate = async (req: express.Request, res: express.Response) => {
    const {email} = req.params;
    try {
        const allOrdersByEmailAndDate = await OrderModel.find({email: email}).then(r => {
            res.status(200).send(new CustomResponse(200, "found orders", r));
        }).catch(e => {
            res.status(500).send(new CustomResponse(500, "cannot found orders", e));
        });

    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}

//get order Details by id
export const getOrderDetailsByOrderId = async (req: express.Request, res: any) => {
    const {orderId} = req.params;
    try {
        await OrderDetailsModel.findOne({order: orderId}).then(r => {
            res.status(200).send(new CustomResponse(200, "find order details", r));
        });
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went Wrong", error));
    }
}

//get all order details
export const getAllOrderDetails = async (req: express.Request, res: any) => {
    try {
        await OrderDetailsModel.find().then(r => {
            res.status(200).send(new CustomResponse(200, "all order details are fount", r));
        });
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}

// Calculate and get income for the last 4 days
export const getIncomeDataForLast4Days = async (req: express.Request, res: express.Response) => {
    try {
        const incomes = await OrderModel.calculateIncomeForLastNDays(4); // Calculate income for the last 4 days
        console.log(incomes);

        res.json(incomes); // Send the income data to the frontend
    } catch (error) {
        console.error('Error fetching income data for the last 4 days:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

