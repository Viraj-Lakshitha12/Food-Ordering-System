import {model, Schema} from "mongoose";

const categorySchema = new Schema({
    type: {type: String, require: true}
})
export const CategoryModel = model('category', categorySchema);
