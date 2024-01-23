import {model, Schema} from "mongoose";

const orderDetailsSchema = new Schema({
    id: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},


    userName: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    postalCode: {type: String, required: true},
    city: {type: String, required: true},
});
export const OrderDetailsModel = model('orderDetails', orderDetailsSchema);
