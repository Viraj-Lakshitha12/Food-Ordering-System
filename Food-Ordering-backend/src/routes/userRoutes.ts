import express, {Router} from "express";
import * as userController from "controllers/userController";



const route: Router = express.Router();

// registerd user
route.post('/user/register', userController.registerUser);

export default route;