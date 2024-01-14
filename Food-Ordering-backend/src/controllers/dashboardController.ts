import express from "express";
import {CategoryModel} from "../models/category";
import CustomResponse from "../util/customResponse";

//save Category
export const saveCategory = async (req: express.Request, res: any) => {
    let req_body = req.body;
    console.log(req_body)
    await CategoryModel.create(req_body).then(r => {
        res.status(200).send(new CustomResponse(200, "saved category", r));
    }).catch(error => {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    });
}

// get Category
export const getAllCategories = async (req: express.Request, res: any) => {
     await CategoryModel.find().then(r => {
        res.status(200).send(new CustomResponse(200, "find all categories", r))
    }).catch(error => {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    });

}
