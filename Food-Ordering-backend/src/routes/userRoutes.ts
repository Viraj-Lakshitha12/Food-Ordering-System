import express, {Router} from "express";
import {registerUser} from "../controllers/userController";


const route: Router = express.Router();

// registerd user
route.post('/user/register', registerUser);
route.post('/user/auth', registerUser);

export default route;