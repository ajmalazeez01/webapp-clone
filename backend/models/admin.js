const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

    Email:{
        type:String,
    },
    Password:{
        type:String,
     
    },
    
})

module.exports = mongoose.model("Admin",adminSchema )