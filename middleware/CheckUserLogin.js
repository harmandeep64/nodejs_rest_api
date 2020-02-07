const UserModel  = require("../models/UserModel");
const myhelper   = require("../helpers/CommonHelper");

var CheckUserLogin = function(req,res,next){
    user_id     = req.headers.user_id;
    session_key = req.headers.session_key;
    input       = req.headers;
    required    = ['user_id','session_key'];
    check       = myhelper.checkRequired(input,required);
    if(check){
        return res.status(400).send({
            "status" : 400,
            "message": "Missing params in header: "+check
        });
    }
    UserModel.checkSession(user_id,session_key,function(response){
        if(response){
            next();
        }else{
            return res.status(401).send({
                "status" : 401,
                "message": "Access denied"
            });
        }
    });
};

module.exports = CheckUserLogin;