import express, {Router} from "express";
import {
    deleteCategory,
    getAllCategories,
    getAllMenuItems, getMenuItemsByItemName,
    saveCategory,
    saveMenuItem,
    updateCategory, updateMenuItems
} from "../controllers/dashboardController";

const route: Router = express.Router();


//save category
route.post('/saveCategory', saveCategory);

//update category
route.put('/saveCategory/:categoryId', updateCategory);

//get all categories
route.get('/getAllCategories', getAllCategories);

//delete category
route.delete('/deleteCategory/:_id', deleteCategory);


// ------------------------------       menu items      -------------------------------------


//save menu items
route.post('/saveMenuItems', saveMenuItem);

//get all menu items
route.get('/getAllMenuItems', getAllMenuItems);

//get menu-items by itemName
route.get('/getAllMenuItems/:itemName', getMenuItemsByItemName);

//update menu items
route.put('/updateMenuItem', updateMenuItems)
export default route;


