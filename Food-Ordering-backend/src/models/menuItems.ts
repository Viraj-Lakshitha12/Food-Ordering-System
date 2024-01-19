import {model, Schema} from "mongoose";

const menuItemsSchema = new Schema({
    itemName: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: {type: String, required: true}
});

export const menuItemModel = model('menu-item', menuItemsSchema);
