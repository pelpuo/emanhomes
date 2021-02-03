const mongoose = require("mongoose")
const Schema = mongoose.Schema

const AdminSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    encryptedPassword:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    profilePhotoLocation:{
        type:String
    },
    phone_number:{
        type:String,
        required:true
    }
})

const Admin = mongoose.model("admin", AdminSchema)
module.exports = Admin