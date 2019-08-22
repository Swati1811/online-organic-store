const winston=require('winston');
const async=require('../middleware/async');
//require('winston-mongodb');

module.exports=function(){
    // process.on('uncaughtException',(ex)=>{
    //     winston.error('Exception outside',ex);
    //     process.exit(1);
    // });
 
    winston.handleExceptions(
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtExcpetion.log'})
    );

    process.on('unhandledRejection',(ex)=>{
        throw ex;
    })
 
    // process.on('unhandledException',(ex)=>{
    //     winston.error('exception outside',ex);
    // })
 
    winston.add(new winston.transports.File({filename:'logfile.log'}));
    //winston.add(new winston.transports.MongoDB({ db: 'mongodb+srv://root:root@onlineorganicstore-fpv8x.mongodb.net/ProductDB?retryWrites=true&w=majority',level:'info'}));
 
}