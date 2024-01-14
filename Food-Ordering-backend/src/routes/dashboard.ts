import express, {Router} from "express";
import {getAllCategories, saveCategory} from "../controllers/dashboardController";

const route: Router = express.Router();


//save category
route.post('/saveCategory', saveCategory);

//get all categories
route.get('/getAllCategories', getAllCategories);

export default route;
