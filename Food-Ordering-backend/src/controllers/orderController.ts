import express from "express";
import CustomResponse from "../util/customResponse";
import {OrderModel} from "../models/order";
import {sendOrderConfirmationEmail} from "../service/EmailService";



//save orders
export const saveOrder = async (req: express.Request, res: express.Response) => {
    try {
        const {cartItems, userData} = req.body;

        if (!cartItems || !userData || !userData.email) {
            return res.status(400).send(new CustomResponse(400, 'Bad Request', 'Invalid data format'));
        }

        const savedItems = [];

        for (const cartItem of cartItems) {
            const {id, name, description, image} = cartItem;

            const savedItem = await OrderModel.create({
                items: [{id, name, description, image}],
                email: userData.email,
            });

            savedItems.push(savedItem);
        }

        res.status(200).send(new CustomResponse(200, 'Save successful', savedItems));
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
