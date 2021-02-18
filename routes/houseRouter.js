require("dotenv").config()
const Router = require("express").Router()
const House = require('./../models/House')
const {verify} = require("./../verification")
const { body, header, validationResult } = require('express-validator');
const multer  = require('multer')
const fs = require('fs');
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

Router.get("/edit/:id", verify, async (req,res) =>{
    try {
        const house = await House.findById(req.params.id)
        if(house.userId != res.locals.user._id){
            res.status(400).json("Forbidden")
        }

        res.render("addproduct", {house})
    }catch(e){
        
    }
})

Router.post("/", verify,  [
    body("price").exists(),
    body("description").exists(),
    body("location").exists(),
    body("size").exists(),
    body("buildingStatus").exists(),
    body("exfeatures").exists(),
    body("infeatures").exists(),
], upload.fields([
    { name: 'cover-image', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
  ]), async (req,res) =>{
    try {
        const house = new House({
            price: req.body.price,
            location: req.body.location,
            size: req.body.size,
            description:req.body.description,
            BuildingStatus: req.body.buildingStatus,
            interiorFeatures: req.body.infeatures,
            exteriorFeatures: req.body.exfeatures,
            userId: req.user._id,
            coverPhoto: "/" + req.files['cover-image'][0].path,
            image1:"/" + req.files.image1[0].path,
            image2:"/" + req.files.image2[0].path,
            image3:"/" + req.files.image3[0].path,
            image4:"/" + req.files.image4[0].path,
            image5:"/" + req.files.image5[0].path
        })

        await house.save()
        res.status(200).redirect("/account")

    }catch(e){
        res.status(400).json({error:e.message})
    }
})

Router.put("/:id", verify,  [
    body("price").exists(),
    body("description").exists(),
    body("location").exists(),
    body("size").exists(),
    body("buildingStatus").exists(),
    body("interiorFeatures").exists(),
    body("exteriorFeatures").exists(),
], upload.fields([
    { name: 'cover-image', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
    { name: 'image5', maxCount: 1 }
  ]), async (req,res) =>{
    try {
        const house = await House.findById(req.params.id)
        if(house.userId != req.user._id){
            res.status(400).json("Forbidden")
        }

        let coverPhoto = house.coverPhoto
        if(req.files["cover-image"])coverPhoto = "/" + req.files["cover-image"][0].path
        let image1 = house.image1
        if(req.files.image1)image1 = "/" + req.files.image1[0].path
        let image2 = house.image2
        if(req.files.image2)image2 = "/" + req.files.image2[0].path
        let image3 = house.image3
        if(req.files.image3)image3 = "/" + req.files.image3[0].path
        let image4 = house.image4
        if(req.files.image4)image4 = "/" + req.files.image4[0].path
        let image5 = house.image5
        if(req.files.image5)image5 = "/" + req.files.image5[0].path


        const updatedHouse = await House.findByIdAndUpdate( req.params.id,{
            price: req.body.price,
            description: req.body.description,
            location: req.body.location,
            size: req.body.size,
            buildingStatus: req.body.buildingStatus,
            interiorFeatures: req.body.interiorFeatures,
            exteriorFeatures: req.body.exteriorFeatures,
            userId: req.user._id,
            coverPhoto:coverPhoto,
            image1:image1,
            image2:image2,
            image3:image3,
            image4:image4,
            image5:image5
        })

        res.status(200).json({message:"success"})

    }catch(e){
        res.status(400).json(e)
    }
})

Router.delete("/:id", verify, async (req,res) =>{
    try {
        const house = await House.findById(req.params.id)
        if(house.userId != req.user._id){
            res.status(400).json("Forbidden")
        }

        await House.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"success"})
        
    }catch(e){
        res.status(400).json({message:e.message})
    }
})


module.exports = Router