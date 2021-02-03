const mongoose = require("mongoose")
const Schema = mongoose.Schema

const HouseSchema = new Schema({
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    BuildingStatus:{
        type:Number,
        required:true
    },
    coverPhoto:{
        type:String
    },
    image1:{
        type:String
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },
    image4:{
        type:String
    },
    image5:{
        type:String
    },
    interiorFeatures:{
        type:String
    },
    exteriorFeatures:{
        type:String
    }
})

const House = mongoose.model("house", HouseSchema)
module.exports = House