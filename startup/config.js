const config=require('config');

module.exports=function(){
    if(!config.get('jwtPrivateToken')){
       throw new Error('Fatal Error..! jwtToken is missing');
       process.exit(1);
    }
    
}