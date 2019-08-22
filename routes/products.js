const express = require('express')
const router = express.Router();
const {Product,validateProduct}=require('../model/product');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const superadmin=require('../middleware/superadmin');
const asyncMiddleware=require('../middleware/async');
const validateObjectId=require('../middleware/validateObjectId');

router.get('/',asyncMiddleware(async(req,res,next)=>{
    const products=await Product.find();
    res.send(products);
    next(ex);
    
}));

router.post('/',auth, asyncMiddleware(async(req, res,next) => {
  const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product({
        "category": req.body.category,
        "imageUrl": req.body.imageUrl,
        "price": req.body.price,
        "title": req.body.title
    });

    product=await product.save();
    res.status(201).send(product);
}));

router.put('/:id',[auth,admin,superadmin], asyncMiddleware( async(req, res,next) => {
    const { error } = validateProduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product=await Product.findByIdAndUpdate(req.params.id,{ 
        category:req.body.category,
        imageUrl:req.body.imageUrl,
        price:req.body.price,
        title:req.body.title
       },{new:true});

    if (!product) return res.status(404).send('The product with the given ID was not found.');
  
    res.send(product);
}));

router.delete('/:id',[auth,admin], asyncMiddleware(async(req, res,next) => {
   let product=await Product.findByIdAndRemove(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
}));

router.get('/:id',validateObjectId ,asyncMiddleware(async(req, res,next) => {
    let product=await Product.findById(req.params.id);

    if (!product) return res.status(404).send('The product with the given ID was not found.');

    res.send(product);
}));



module.exports = router;
