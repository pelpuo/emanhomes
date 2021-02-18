const verify = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    res.json({message:"User not logged in"}) 
}

module.exports.verify = verify;