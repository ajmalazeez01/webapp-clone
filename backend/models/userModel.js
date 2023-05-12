const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:[true,"firstname is Required"]
    },
    lname:{
        type:String,
        required:[true,"lastname is Required"]
    },
    email:{
        type:String,
        required:[true,"Email is Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is Required"]
    },
    image: String,

    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model("User",userSchema)