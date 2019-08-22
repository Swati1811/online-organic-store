const mongoose=require('mongoose');
const Joi = require('joi');
const jwt=require('jsonwebtoken');
const config=require('config');

const userSchema=new mongoose.Schema({
    name:{type:String,required:true,minlength:5,maxlength:200},
    email:{type:String,required:true,minlength:5,maxlength:255,unique:true},
    password:{type:String,required:true,minlength:5,maxlength:1024},
    isAdmin:Boolean,
    isSuperAdmin:Boolean
});

userSchema.methods.generateAuthToken=function(){
    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin,isSuperAdmin:this.isSuperAdmin},config.get('jwtPrivateToken'));
    return token;
}

const User=mongoose.model('User',userSchema);


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(200).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
    };

    return Joi.validate(user, schema);
}

module.exports.User=User;
module.exports.validateUser=validateUser;