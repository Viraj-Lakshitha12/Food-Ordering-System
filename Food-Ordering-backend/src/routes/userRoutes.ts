import express, {Router} from "express";
import {authUser, registerUser, saveUserDetails} from "../controllers/userController";


const route: Router = express.Router();

// registerd user
route.post('/register', registerUser);

//check email and password
route.post('/auth', authUser);

//save user Details
route.post('/saveUserDetails', saveUserDetails);

export default route;
