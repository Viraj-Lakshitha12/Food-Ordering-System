import express from "express";
import CustomResponse from "../util/customResponse";
import {OrderModel} from "../models/order";


//save orders
export const saveOrder = async (req: express.Request, res: express.Response) => {
    try {
        const {cartItems, userData} = req.body;

        if (!cartItems || !userData || !userData.email) {
            return res.status(400).send(new CustomResponse(400, 'Bad Request', 'Invalid data format'));
        }

        const orders: any = [];
        for (const cartItem of cartItems) {
            const {id, name, description, image} = cartItem;

            // Create and save each order
            const order = await OrderModel.create({
                id,
                name,
                description,
                image,
                email: userData.email,
            });

            orders.push(order);
        }
        res.status(200).send(new CustomResponse(200, 'Save successful', orders));
    } catch (error) {
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
