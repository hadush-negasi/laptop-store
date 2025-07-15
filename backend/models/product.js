const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    description: {type:String, required: true},
    proCount: {type:Number, default:0},
    total: {type:Number, default:0}
})

module.exports = mongoose.model("Product", productSchema)