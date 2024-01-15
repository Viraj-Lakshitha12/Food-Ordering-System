import express, {Router} from "express";
import {getAllCategories, saveCategory, updateCategory} from "../controllers/dashboardController";

const route: Router = express.Router();


//save category
route.post('/saveCategory', saveCategory);

//update category
route.put('/saveCategory', updateCategory);

//get all categories
route.get('/getAllCategories', getAllCategories);

export default route;
