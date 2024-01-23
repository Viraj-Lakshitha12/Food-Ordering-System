import {model, Schema} from "mongoose";

const orderSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    email: {type: String, required: true}

});

export const OrderModel = model('orders', orderSchema);
