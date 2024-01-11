import {model, Schema} from "mongoose";

const userDetailsModelSchema = new Schema({
    username: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    address: {type: String, require: true},
    postalCode: {type: String, require: true},
    city: {type: String, require: true},
})
export const userDetailsModel = model('userDetails', userDetailsModelSchema);
