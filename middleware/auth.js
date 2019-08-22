const jwt=require('jsonwebtoken');
const config=require('config');

function auth(req,res,next){
    const token=req.header('x-auth-token');
    if(!token) return res.status(401).send('Need a token');

    try{
        const decoded=jwt.verify(token,config.get('jwtPrivateToken'));
        req.user=decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Inavlid Token');
    }
}
module.exports=auth;