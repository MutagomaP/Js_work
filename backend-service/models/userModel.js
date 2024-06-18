const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is mandatory!"],
        max_length: [25, "Name should not have more than 25 characters."],
        trim:true,
    },
    email:{
        type: String,
        required: [true, "Email is mandatory!"],
        unique: true,
        trim:true,
    }
})

module.exports = mongoose.model("user",userSchema);