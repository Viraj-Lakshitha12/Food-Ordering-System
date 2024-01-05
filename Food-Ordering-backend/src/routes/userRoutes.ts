import express, {Router} from "express";
import {registerUser} from "../controllers/userController";


const route: Router = express.Router();

// registerd user
route.post('/user/register', registerUser);

export default route;