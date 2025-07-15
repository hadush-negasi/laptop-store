const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fname: { type:String, required:true},
    lname: {type:String, required:true},
    uname: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    gender: {type:String}
}

)
module.exports = mongoose.model("User", userSchema);

