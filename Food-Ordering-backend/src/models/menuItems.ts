import {model, Schema} from "mongoose";

const menuItemsSchema = new Schema({
    image: String,
    itemName: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true}
})
export const menuItemModel = model('menu-item', menuItemsSchema);
