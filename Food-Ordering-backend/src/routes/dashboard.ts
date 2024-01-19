import express, {Router} from "express";
import {
    getAllCategories,
    getAllMenuItems,
    saveCategory,
    saveMenuItem,
    updateCategory
} from "../controllers/dashboardController";

const route: Router = express.Router();


//save category
route.post('/saveCategory', saveCategory);

//update category
route.put('/saveCategory/:categoryId', updateCategory);

//get all categories
route.get('/getAllCategories', getAllCategories);

//save menu items
route.post('/saveMenuItems', saveMenuItem);

//get all menu items
route.get('/getAllMenuItems', getAllMenuItems);

export default route;


