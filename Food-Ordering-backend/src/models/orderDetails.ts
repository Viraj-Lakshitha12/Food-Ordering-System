import {model, Schema} from "mongoose";
import moment from "moment/moment";

const orderDetailsSchema = new Schema({
    items: [{ // Assuming items is an array of items
        id: {type: String, required: true},
        name: {type: String, required: true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true}
    }],
    total: {type: Number, required: true}, // Add the total field
    email: {type: String, required: true},
    userName: {type: String, required: true},
    address: {type: String, required: true},
    postalCode: {type: String, required: true},
    city: {type: String, required: true},
    createdAt: {type: String, default: moment().format('YYYY-MM-DD HH:mm')}


});


orderDetailsSchema.pre('save', function (next) {
    // Format the current date/time before saving
    this.createdAt = moment().format('YYYY-MM-DD HH:mm');
    next();
});

export const OrderDetailsModel = model('orderDetails', orderDetailsSchema);
