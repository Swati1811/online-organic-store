function superadmin(req,res,next){
    if(!req.user.isSuperAdmin) 
      return res.status(403).send('forbidden');
    next();
}

module.exports=superadmin;