const productModel = require('../models/product');
const productCtrl = {};

productCtrl.getProducts = async (req, res) => {
    const products = await productModel.find({}, );
    res.json(products);
}

productCtrl.createProduct = async (req, res) =>{
    const product = new productModel({
        name: req.body.name,
        price: req.body.price,
        listId: req.body.listId
    });
    console.log(product);
    await product.save();
    res.json({
        status: 'ok'
    });
}

productCtrl.getProduct = async (req, res) =>{
    const product = await productModel.findById(req.params.id);
    res.json(product);
}

productCtrl.getProductById = async (req, res) =>{
    const products = await productModel.find({listId: req.params.id},(err, res) =>{
        this.products = res;
        console.log(res);
    })
    res.json(products);
}

productCtrl.editProduct = async (req, res) =>{
    const { id } = req.params;
    const product = {
        name: req.body.name,
        price: req.body.price,
        listId: req.body.listId
    }

    await productModel.findByIdAndUpdate(id, {$set: product, new:true});
    res.json({status: 'ok'});
}

productCtrl.deleteProduct = async (req, res) =>{
    await productModel.findByIdAndDelete(req.params.id);
    res.json({status: 'ok'})
}

module.exports = productCtrl;