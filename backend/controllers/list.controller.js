const listModel = require('../models/list');
const productModel = require('../models/product');
const listCtrl = {};

listCtrl.getLists = async (req, res) => {
    await listModel.find({}, (err, lists) =>{
        productModel.populate(lists, {path:"products"}, (err, lists)=>{
            res.json(lists);
        })
    });
}

listCtrl.createList = async (req, res) =>{
    // sin el _id
    const list = new listModel({
        name: req.body.name,
        products: req.body.products
    });
    console.log(list);
    await list.save();
    res.json({
        status: 'ok'
    });
}

listCtrl.getList = async (req, res) =>{
    await listModel.findById(req.params.id, (err, list) =>{
        productModel.populate(list, {path:"products"}, (err, list)=>{
            res.json(list);
        })
    });
}

listCtrl.editList = async (req, res) =>{
    const { id } = req.params;
    const list = {
        name: req.body.name,
        products: req.body.products
    }

    await listModel.findByIdAndUpdate(id, {$set: list, new:true});
    res.json({status: 'ok'});
}

listCtrl.deleteList = async (req, res) =>{
    await listModel.findByIdAndDelete(req.params.id);
    res.json({status: 'ok'})
}
module.exports = listCtrl;