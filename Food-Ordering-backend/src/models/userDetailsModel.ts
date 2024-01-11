import {Schema} from "mongoose";

const userDetailsModel = new Schema({
    username: {type: String, require: true},
    email: {type: String, unique: true, require: true},
    address: {type: String, require: true},
    postalCode: {type: String, require: true},
    city: {type: String, require: true},
})
