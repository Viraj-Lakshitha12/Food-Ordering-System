import express, {Router} from "express";
import {authUser, registerUser, saveUserDetails} from "../controllers/userController";


const route: Router = express.Router();

// registerd user
route.post('/user/register', registerUser);

//check email and password
route.post('/user/auth', authUser);

//save user Details
route.post('/user/saveUserDetails', saveUserDetails);

export default route;
