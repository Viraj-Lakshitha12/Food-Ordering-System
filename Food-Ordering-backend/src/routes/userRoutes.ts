import express, {Router} from "express";
import {
    authUser, deleteUser,
    getAllUserDetails,
    getUserDetailsByEmail,
    registerUser,
    saveUserDetails
} from "../controllers/userController";
import {verifyToken} from "../middlewares";


const route: Router = express.Router();

//registerd user
route.post('/register', registerUser);

//check email and password
route.post('/auth', authUser);

//save user Details
route.post('/saveUserDetails', verifyToken, saveUserDetails);

//delete user by email
route.delete('/deleteUser/:email', deleteUser);

//get user details by email
route.get('/getUserDetailsByEmail/:email', getUserDetailsByEmail);

//get all user details
route.get('/getAllUserDetails', getAllUserDetails);


export default route;
