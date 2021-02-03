const Router = require("express").Router()
const argon2 = require("argon2")
const { body, header, validationResult } = require('express-validator');

const House = require('./../models/House')
const Admin = require('./../models/Admin')

Router.get("/", async (req,res)=>{
    try {
        const houses = await House.find()

        res.render("index", {houses:houses})
    } catch (error) {
        res.status(500).json({error:error.message})
    }

})

Router.get("/:id", async (req,res) =>{
    const house = await House.findById(req.params.id)

    let inter = house.interiorFeatures
    inter = inter.split(", ")
    let exter = house.exteriorFeatures
    exter = exter.split(", ")
    let editedHouse = {...house._doc, interior: inter, exterior:exter}
    delete editedHouse.interiorFeatures
    delete editedHouse.exteriorFeatures

    res.render("home", {house:editedHouse})
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
            to: `${process.env.MAIL_ADDRESS}`, // list of receivers
            subject: "New Message from emanhomes.com", // Subject line
            text: `Client: ${req.body.name}
Client email: ${req.body.email}
Phone Number: ${req.body.phone}
Message: ${req.body.destination}
            `, // plain text body
        }

        let info = await transporter.sendMail(message);
        res.status(200).redirect("/#Contact")

    }catch(e){
        res.status(400).json({message:e.message})
    }




})

// Router.post("/admin", async(req,res)=>{

//     try{
//         const emailExists = await Admin.findOne({email:req.body.email})
//         if(emailExists)return res.status(400).json({message:"Email already in use"})
        
//         const hash = await argon2.hash(req.body.password);

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