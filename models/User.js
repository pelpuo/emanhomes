const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    encryptedPassword:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    phone_number:{
        type:String,
        required:true
    },
    companyName:{
        type:String
    },
    description:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    contactEmail:{
        type:String
    },
})

const User = mongoose.model("user", UserSchema)
module.exports = User