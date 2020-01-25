CheckAuth = function(req,res,next){

    if(!true){
        res.status(400).send({
            "status": 400,
            "message":"Bad request",
        });
    }

    next();
}

module.exports = CheckAuth;