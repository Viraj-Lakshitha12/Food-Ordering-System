import {model, models, Schema} from "mongoose";

const userSchema = new Schema({
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true}
});

export const UserModel = model('User', userSchema);
