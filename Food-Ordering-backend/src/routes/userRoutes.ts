import express, {Router} from "express";
import {authUser, registerUser} from "../controllers/userController";


const route: Router = express.Router();

// registerd user
route.post('/user/register', registerUser);

//check email and password
route.post('/user/auth', authUser);

export default route;