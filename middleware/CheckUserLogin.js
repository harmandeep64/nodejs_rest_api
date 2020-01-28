var CheckUserLogin = function(req,res,next){
    console.log("Middleware2");
    next();
};

module.exports = CheckUserLogin;