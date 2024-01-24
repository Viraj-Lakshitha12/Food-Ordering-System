// Modify your schema to include an array of items
import {model, Schema} from "mongoose";
import moment from "moment";

const orderSchema = new Schema({
    items: [{
        id: {type: String, required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
    }],
    email: {type: String, required: true},
    createdAt: {type: String, default: moment().format('YYYY-MM-DD HH:mm')}
});

orderSchema.pre('save', function (next) {
    this.createdAt = moment().format('YYYY-MM-DD HH:mm');
    next();
});

export const OrderModel = model('orders', orderSchema);
