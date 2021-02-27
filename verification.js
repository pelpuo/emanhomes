const verify = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next();
    }
    // res.json({message:"User not logged in"}) 
    res.redirect("/?prompt=User_not_logged_in")
}

module.exports.verify = verify;