import {model, Schema} from "mongoose";

const userDetailsModelSchema = new Schema({
    userName: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    address: {type: String, required: true},
    postalCode: {type: String, required: true},
    city: {type: String, required: true},
    image: {type: String},
    admin: {type: Boolean, default: false},
});

export const userDetailsModel = model("userDetails", userDetailsModelSchema);
