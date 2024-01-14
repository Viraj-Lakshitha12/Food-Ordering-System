import express, {Router} from "express";
import {saveCategory} from "../controllers/dashboardController";

const route: Router = express.Router();


//save category
route.post('/saveCategory', saveCategory);

export default route;
