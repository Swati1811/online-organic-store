const mongoose=require('mongoose');
const Joi = require('joi');

const productSchema=new mongoose.Schema({
    category:{type:String,required:true,enum:['vegetables','fruits']},
    imageUrl:{type:String,required:true},
    price:{type:Number,required:true,min:0,max:200},
    title:{type:String,required:true,minlength:3,maxlength:200}
});

const Product=mongoose.model('Product',productSchema);


function validateProduct(product) {
    const schema = {
        title: Joi.string().min(5).max(50).required(),
        imageUrl: Joi.string().required(),
        price: Joi.required(),
        category: Joi.required(),
    };

    return Joi.validate(product, schema);
}

module.exports.Product=Product;
module.exports.validateProduct=validateProduct;