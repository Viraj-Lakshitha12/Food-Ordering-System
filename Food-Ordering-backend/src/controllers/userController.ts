import express from "express";
import bcrypt from "bcrypt";
import {UserModel} from "../models/userModels";
import CustomResponse from "../util/customResponse";
import jwt, {Secret} from "jsonwebtoken";
import * as process from "process";
import {userDetailsModel} from "../models/userDetailsModel";

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
                // Set the expiration time for the token (e.g., 1 hour)
                const expiresIn = 36000; // seconds

                jwt.sign(
                    {user},
                    process.env.SECRET_KEY as Secret,
                    {expiresIn}, // Set the expiration time
                    (error: any, token: any) => {
                        if (error) {
                            res.status(500).send(new CustomResponse(500, "something went wrong"));
                        } else {
                            let req_body: any = {
                                user: user,
                                accessToken: token
                            }
                            res.status(200).send(new CustomResponse(200, "Token generated", req_body));
                        }
                    }
                );
            } else {
                res.status(100).send(new CustomResponse(100, "wrong password..please try again"));
            }
        } else {
            res.status(100).send(new CustomResponse(100, "cannot find email"));
        }
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong"));
    }

}

//user details save or update
export const saveUserDetails = async (req: express.Request, res: any) => {
    try {
        let req_body = req.body;
        let user_id = res.tokenData.user._id;
        console.log(user_id);
        console.log(req_body);
        const userDetails = new userDetailsModel({
            userName: req_body.userName,
            email: req_body.email,
            address: req_body.address,
            postalCode: req_body.postalCode,
            city: req_body.city,
            base64Image: req_body.base64Image
        });


        // Use findOne with the correct query
        let findOneBYEmail = await userDetailsModel.findOne({email: req_body.email});


        // if (findOneBYEmail) {
        //     console.log("User found with id: " + findOneBYEmail._id);
        // } else {
        //     console.log("No user found with the specified email.");
        // }


        if (findOneBYEmail) {

            // Make sure user_id is a valid ObjectId
            let updateUserDetails = await userDetailsModel.findOneAndUpdate(
                {_id: findOneBYEmail._id},
                {
                    userName: req_body.userName,
                    address: req_body.address,
                    postalCode: req_body.postalCode,
                    city: req_body.city,
                    base64Image: req_body.base64Image
                },
                {new: true}
            );

            res.status(200).send(new CustomResponse(200, "user details updated", updateUserDetails));
        } else {
            console.log(3);
            let createUser = await userDetailsModel.create(userDetails);
            res.status(200).send(new CustomResponse(200, "user details saved", createUser));
        }
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
};

//get user details using email
export const getUserDetailsByEmail = async (req: express.Request, res: any) => {
    try {
        let req_email = req.body;
        let findOneByEmail = await userDetailsModel.findOne(req_email);
        if (findOneByEmail) {
            res.status(200).send(new CustomResponse(200, "find user", findOneByEmail));
        } else {
            res.status(500).send(new CustomResponse(500, "Cannot find user"));
        }
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}
