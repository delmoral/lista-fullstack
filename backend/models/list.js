const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    name: { type: String, required: true},
    products: { type: [Schema.Types.ObjectId], ref: "Product"}
})

module.exports = mongoose.model("List", listSchema);