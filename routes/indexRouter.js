const Router = require("express").Router()
// const argon2 = require("argon2")
const bcrypt = require('bcrypt');
const { body, header, validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const {verify} = require("./../verification")

const House = require('./../models/House')
const Admin = require('./../models/Admin')

Router.get("/", async (req,res)=>{
    try {
        const houses = await House.find()

        res.render("index", {houses:houses, message:null, user:res.locals.user})
    } catch (error) {
        res.status(500).json({error:error.message})
    }

})

Router.get("/home/:id", async (req,res) =>{
    try {
        const house = await House.findById(req.params.id)

        let inter = house.interiorFeatures
        inter = inter.split(", ")
        let exter = house.exteriorFeatures
        exter = exter.split(", ")
        let editedHouse = {...house._doc, interior: inter, exterior:exter}
        delete editedHouse.interiorFeatures
        delete editedHouse.exteriorFeatures
    
        res.render("home", {house:editedHouse})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

Router.post("/contact", [
    body("name").exists(),
    body("email").exists(),
    body("phoneNumber").exists(),
    body("message").exists()
], async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_PASSWORD,
            },
        });

        const message = {
            from: process.env.MAIL_ADDRESS, // sender address
            to: `emanhomes993@gmail.com`, // list of receivers
            subject: "New Message from emanhomes.com", // Subject line
            text: `Client: ${req.body.name}
Client email: ${req.body.email}
Phone Number: ${req.body.phoneNumber}
Message: ${req.body.message}
            `, // plain text body
        }

        let info = await transporter.sendMail(message);
        const houses = await House.find()
        res.status(200).render("index", {houses:houses, message:"Message sent succesfully"})

    }catch(e){
        res.status(400).render("index", {houses:houses, message:e.message})
    }




})

// Router.get("/addhouse", verify, (req,res) =>{
//     res.status(200).render("addproduct")
// })

Router.get("/addhouse",verify, (req,res) =>{
    res.status(200).render("addproduct", {user:res.locals.user, house:null})
})


// Router.get("/account", verify, (req,res) =>{
//     try{
//         res.status(200).render("account", {user:res.locals.user})
//     }catch(e){

//     }
// })

Router.get("/account",verify, async (req,res) =>{
    try{
        const houses = await House.find({userId: res.locals.user._id})

        res.status(200).render("account", {user:res.locals.user, houses})
    }catch(e){
        res.status(400).json(e)
    }
})

// Router.post("/admin", async(req,res)=>{

//     try{
//         const emailExists = await Admin.findOne({email:req.body.email})
//         if(emailExists)return res.status(400).json({message:"Email already in use"})
//         const salt = await bcrypt.genSalt(10);

//         const hash = await bcrypt.hash(req.body.password, salt);

//         const admin = await Admin.create({
//             email:req.body.email,
//             encryptedPassword:hash,
//             name:req.body.name,
//             phone_number:req.body.phone_number
//         }) 

//         const savedUser = await admin.save()
//         res.status(201).send("Added successfully")


//     }catch(e){
//         res.status(400).json({message:e.message})
//     }
// })

module.exports = Router