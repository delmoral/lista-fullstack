const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true},
    price:{ type: Number, required: false},
    listId: { type: String, required: true}
})

module.exports = mongoose.model("Product", productSchema);