import express from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../models/userModels";
import CustomResponse from "../util/customResponse";
import jwt, {Secret} from "jsonwebtoken";
import * as process from "process";

// register user
export const registerUser = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;

        // Use async/await with bcrypt.hash instead of callbacks
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new User instance with hashed password
        const registerUserModel = new UserModel({
            email: email,
            password: hashedPassword,
        });

        try {
            const createdUser = await UserModel.create(registerUserModel);

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

//auth user
export const authUser = async (req: express.Request, res: express.Response) => {
    try {
        const {email, password} = req.body;
        let user: any = await UserModel.findOne({email: email});
        if (user) {
            let isMatchUser: boolean = await bcrypt.compare(password, user.password);

            if (isMatchUser) {
                jwt.sign({user}, process.env.SECRET_KEY as Secret, (error: any, token: any) => {
                    if (error) {
                        res.status(500).send(new CustomResponse(500, "something went wrong"));
                    } else {
                        let req_body: any = {
                            user: user,
                            accsessToken: token
                        }
                        res.status(200).send(new CustomResponse(200, "Token generated", req_body));
                    }
                })
            } else {
                res.status(100).send(new CustomResponse(100, "wrong password..please try again"));
            }
        } else {
            res.status(100).send(new CustomResponse(100, "cannot find email"));
        }
    } catch (error) {
        res.status(500).send(new CustomResponse(100, "something went wrong"));
    }

}
