import express from "express";
import bcrypt from "bcrypt";
import {User} from "../models/userModels";
import CustomResponse from "../util/customResponse";

// register user
export const registerUser = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        // Use async/await with bcrypt.hash instead of callbacks
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User instance with hashed password
        const registerUserModel = new User({
            email: email,
            password: hashedPassword,
        });

        try {
            const createdUser = await User.create(registerUserModel);

            // Send a success response
            res.status(200).send(new CustomResponse(200, 'User registered successfully', createdUser));
        } catch (createError) {
            // Handle database create error
            res.status(500).send(new CustomResponse(500, 'Error creating user in the database', createError));
        }
    } catch (error) {
        // Handle other errors, e.g., invalid request body
        res.status(500).send(new CustomResponse(500, 'Internal server error'));
    }
};
