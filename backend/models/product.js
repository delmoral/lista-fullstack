const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true},
    price:{ type: Number, required: false}
})

module.exports = mongoose.model("Product", productSchema);