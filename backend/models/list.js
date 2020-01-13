const mongoose = require('mongoose');
const { Schema } = mongoose;

const listSchema = new Schema({
    name: { type: String, required: true},
    products: { type: [String]},
    //products: { type: [Schema.Types.ObjectId], ref: "Product"},
    key: { type: String}
})

module.exports = mongoose.model("List", listSchema);