import express from "express";
import {CategoryModel} from "../models/category";
import CustomResponse from "../util/customResponse";
import {menuItemModel} from "../models/menuItems";

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
// update category
export const updateCategory = async (req: express.Request, res: any) => {
    try {
        const id = req.params.categoryId;
        const req_body = req.body;
        console.log("update req body : ", req_body);
        console.log("update req id : " + id);
        const findOneCategory = await CategoryModel.findOne({_id: id});

        if (findOneCategory) {
            const updatedCategory = await CategoryModel.findOneAndUpdate(
                {_id: id},
                {type: req_body.type},
                {new: true}
            );

            res.status(200).send(new CustomResponse(200, "update category", updatedCategory));
        } else {
            res.status(500).send(new CustomResponse(500, "Cannot find category!"));
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).send(new CustomResponse(500, "Something went wrong", error));
    }
};

// get Category
export const getAllCategories = async (req: express.Request, res: any) => {
    await CategoryModel.find().then(r => {
        res.status(200).send(new CustomResponse(200, "find all categories", r))
    }).catch(error => {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    });

}

//save menu-item
export const saveMenuItem = async (req: express.Request, res: express.Response) => {
    const {itemName, description, price, image} = req.body;



    const newMenuItem = new menuItemModel({
        itemName,
        description,
        price,
        image,
    });

    try {
        await menuItemModel.create(newMenuItem).then(r => {
            res.status(200).send(new CustomResponse(200, "saved menu-items", r));
        }).catch(error => {
            res.status(400).send(new CustomResponse(400, "errors", error));
        });
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}

//get all menu-items
export const getAllMenuItems = async (req: express.Request, res: express.Response) => {
    try {
        await menuItemModel.find().then(r => {

            res.status(200).send(new CustomResponse(200, "find all menu items", r));
        }).catch(error => {
            res.status(500).send(new CustomResponse(500, "Cannot find", error));
        })
    } catch (error) {
        res.status(500).send(new CustomResponse(500, "something went wrong", error));
    }
}

