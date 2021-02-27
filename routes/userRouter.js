require("dotenv").config()
const Router = require("express").Router()
const User = require("./../models/User")
const { body, header, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const multer  = require('multer')
const fs = require('fs');
const path = require("path")
const {verify} = require("./../verification")
const passport = require("passport");

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



// Router.get("/", async(req,res)=>{
//     res.status(200).json({message:"User Router"})
// })

Router.post("/register", upload.single('image'), [
    body("email").exists().isEmail(),
    body("password").exists(),
    body("firstname").exists(),
    body("lastname").exists(),
    body("phone").exists(),
], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        const emailExists = await User.findOne({email:req.body.email})
        if(emailExists)return res.status(400).json({message:"Email already in use"})
        

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        let image_url = "";
        if(req.file)image_url = req.file.path

        const user = await User.create({
            email:req.body.email,
            encryptedPassword:hash,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone_number:req.body.phone,
            imageUrl:image_url
        }) 

        const savedUser = await user.save()
        res.status(201).redirect("/?propmt=Account_created_successfully._Continue_to_account_to_fill_in_remaining_details")


    }catch(e){
        res.status(400).json({message:e.message})
    }
})

Router.post("/login", passport.authenticate('local'), async (req, res) => {
    res.status(200).redirect("/")
})

Router.get("/logout", async (req, res) => {
    req.logout();
    try{
        res.status(200).redirect("/?prompt=Logged_out")
    }catch(e){
        res.status(200).render("/")
    }
})

Router.put("/", verify, upload.single('image'),[
    body("email").exists().isEmail(),
    body("password").exists(),
    body("firstname").exists(),
    body("lastname").exists(),
    body("phone").exists(),
    body("company").exists(),
    body("description").exists(),
    body("mobileNumber").exists(),
    body("contactEmail").exists()
], async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findById(req.user._id)
    let imageUrl = user.imageUrl
    if(req.file) imageUrl = req.file.path

    try{
        console.log(req.user._id)
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        // await user.updateOne({
        //     email:req.body.email,
        //     encryptedPassword:hash,
        //     firstname:req.body.firstname,
        //     lastname:req.body.lastname,
        //     phone_number:req.body.phone,
        //     company: req.body.company,
        //     description: req.body.description,
        //     mobileNumber: req.body.mobileNumber,
        //     contactEmail: req.body.contactEmail,
        //     imageUrl:imageUrl   
        // })

        const newuser = await User.findByIdAndUpdate(req.user._id, {
            email:req.body.email,
            encryptedPassword:hash,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            phone_number:req.body.phone,
            companyName: req.body.company,
            description: req.body.description,
            mobileNumber: req.body.mobileNumber,
            contactEmail: req.body.contactEmail,
            imageUrl:imageUrl
        })

    res.status(200).json({message:"success"})

    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports = Router