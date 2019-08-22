const mongoose=require('mongoose');
const winston=require('winston');
const config=require('config');

module.exports=function(){

    mongoose.connect('mongodb+srv://root:root@onlineorganicstore-fpv8x.mongodb.net/ProductDB?retryWrites=true&w=majority',{ useNewUrlParser: true })
        .then(()=>console.log(`Connected to the `));
}